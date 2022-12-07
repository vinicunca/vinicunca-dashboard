import type { CreateStorageParams } from './storage.cache';

import { createStorageCache } from './storage.cache';

import { getStorageShortName } from '~/utils/env';
import { DEFAULT_CACHE_TIME, ENABLE_STORAGE_ENCRYPTION } from '~/encryption/setting.encryption';

type Options = Partial<CreateStorageParams>;

function createOptions(storage: Storage, options: Options = {}): Options {
  return {
    // No encryption in debug mode
    hasEncrypt: ENABLE_STORAGE_ENCRYPTION,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  };
}

export function createStorage(storage: Storage = sessionStorage, options: Options = {}) {
  return createStorageCache(createOptions(storage, options));
}

export function createSessionStorage(options: Options = {}) {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
}

export function createLocalStorage(options: Options = {}) {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
}
