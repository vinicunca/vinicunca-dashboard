import type { RouteLocationNormalized } from 'vue-router';
import type { MULTIPLE_TABS_KEY, PROJ_CFG_KEY, ROLES_KEY } from '~~/cache/cache.entity';
import type { ProjectConfig } from '~~/app/app.entity';
import type { UserInfo } from '~~/user/user.entity';

import { toRaw } from 'vue';
import { omitProps, pickProps } from '@vinicunca/js-utilities';

import { MemoryCache } from './cache.memory';

import { createLocalStorage, createSessionStorage } from '.';

import { APP_LOCAL_CACHE_KEY, APP_SESSION_CACHE_KEY, LOCK_INFO_KEY, TOKEN_KEY, USER_INFO_KEY } from '~~/cache/cache.entity';
import { DEFAULT_CACHE_TIME } from '~~/encryption/encryption.setting';

interface BasicStore {
  [TOKEN_KEY]: string | number | null | undefined;
  [USER_INFO_KEY]: UserInfo;
  [ROLES_KEY]: string[];
  [LOCK_INFO_KEY]: LockInfo;
  [PROJ_CFG_KEY]: ProjectConfig;
  [MULTIPLE_TABS_KEY]: RouteLocationNormalized[];
}

type LocalStore = BasicStore;
type SessionStore = BasicStore;
type LocalKeys = keyof LocalStore;
type SessionKeys = keyof SessionStore;

export type BasicKeys = keyof BasicStore;

const localMemory = new MemoryCache(DEFAULT_CACHE_TIME);
const sessionMemory = new MemoryCache(DEFAULT_CACHE_TIME);

const _localStorage = createLocalStorage();
const _sessionStorage = createSessionStorage();

function initPersistentMemory() {
  const localCache = _localStorage.get(APP_LOCAL_CACHE_KEY);
  const sessionCache = _sessionStorage.get(APP_SESSION_CACHE_KEY);
  localCache && localMemory.resetCache(localCache);
  sessionCache && sessionMemory.resetCache(sessionCache);
}

export class PersistentCache {
  static getLocal<T>(key: LocalKeys) {
    return localMemory.get(key)?.value as T | null;
  }

  static setLocal({ key, value, immediate = false }: { key: LocalKeys; value: LocalStore[LocalKeys]; immediate?: boolean }) {
    localMemory.set({ key, value });
    immediate && _localStorage.set({ key: APP_LOCAL_CACHE_KEY, value: localMemory.getCache });
  }

  static removeLocal({ key, immediate = false }: { key: LocalKeys; immediate?: boolean }) {
    localMemory.remove(key);
    immediate && _localStorage.set({ key: APP_LOCAL_CACHE_KEY, value: localMemory.getCache });
  }

  static clearLocal(immediate = false): void {
    localMemory.clear();
    immediate && _localStorage.clear();
  }

  static getSession<T>(key: SessionKeys) {
    return sessionMemory.get(key)?.value as T | null;
  }

  static setSession({ key, value, immediate = false }: { key: SessionKeys; value: SessionStore[SessionKeys]; immediate?: boolean }): void {
    sessionMemory.set({ key, value: toRaw(value) });
    immediate && _sessionStorage.set({ key: APP_SESSION_CACHE_KEY, value: sessionMemory.getCache });
  }

  static removeSession({ key, immediate = false }: { key: SessionKeys; immediate?: boolean }): void {
    sessionMemory.remove(key);
    immediate && _sessionStorage.set({ key: APP_SESSION_CACHE_KEY, value: sessionMemory.getCache });
  }

  static clearSession(immediate = false): void {
    sessionMemory.clear();
    immediate && _sessionStorage.clear();
  }

  static clearAll(immediate = false) {
    sessionMemory.clear();
    localMemory.clear();
    if (immediate) {
      _localStorage.clear();
      _sessionStorage.clear();
    }
  }
}

window.addEventListener('beforeunload', () => {
  /**
   * TOKEN_KEY has been written to storage when logging in or logging out, here is to solve the problem that the token is not synchronized when multiple windows are opened at the same time
   *
   * LOCK_INFO_KEY is written when the screen is locked and unlocked, and should not be modified here
   */
  _localStorage.set({
    key: APP_LOCAL_CACHE_KEY,
    value: {
      ...omitProps(localMemory.getCache, [LOCK_INFO_KEY]),
      ...pickProps(_localStorage.get(APP_LOCAL_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY]),
    },
  });

  _sessionStorage.set({
    key: APP_SESSION_CACHE_KEY,
    value: {
      ...omitProps(sessionMemory.getCache, [LOCK_INFO_KEY]),
      ...pickProps(_sessionStorage.get(APP_SESSION_CACHE_KEY), [TOKEN_KEY, USER_INFO_KEY, LOCK_INFO_KEY]),
    },
  });
});

function storageChange(event: any) {
  const { key, newValue, oldValue } = event;

  if (!key) {
    PersistentCache.clearAll();
    return;
  }

  if (!!newValue && !!oldValue) {
    if (APP_LOCAL_CACHE_KEY === key) {
      PersistentCache.clearLocal();
    }
    if (APP_SESSION_CACHE_KEY === key) {
      PersistentCache.clearSession();
    }
  }
}

window.addEventListener('storage', storageChange);

initPersistentMemory();

