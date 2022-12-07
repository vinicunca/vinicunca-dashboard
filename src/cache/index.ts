import type { CreateStorageParams } from './cache.storage';

import { createStorageCache } from './cache.storage';

import { getStorageShortName } from '~/utils/env';
import { DEFAULT_CACHE_TIME, ENABLE_STORAGE_ENCRYPTION } from '~/encryption/encryption.setting';

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
