import type { EncryptionParams } from '~/encryption/cipher.encryption';

import { isUnset } from '@vinicunca/js-utilities';

import { AesEncryption } from '~/encryption/cipher.encryption';
import { CACHE_CIPHER } from '~/encryption/setting.encryption';

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: number | null;
}

export function createStorageCache({
  prefixKey = '',
  storage = sessionStorage,
  key = CACHE_CIPHER.key,
  iv = CACHE_CIPHER.iv,
  timeout = null,
  hasEncrypt = true,
}: Partial<CreateStorageParams> = {}) {
  if (hasEncrypt && [key.length, iv.length].some((item) => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv must be 16 bits!');
  }

  const encryption = new AesEncryption({ key, iv });

  /**
   * CacheStorage class
   * Construction parameters can be passed into sessionStorage, localStorage,
   * @class CacheStorage
   */
  const CacheStorage = class CacheStorage {
    private storage: Storage;
    private prefixKey?: string;
    private encryption: AesEncryption;
    private hasEncrypt: boolean;

    constructor() {
      this.storage = storage;
      this.prefixKey = prefixKey;
      this.encryption = encryption;
      this.hasEncrypt = hasEncrypt;
    }

    private getKey(key: string) {
      return `${this.prefixKey}${key}`.toUpperCase();
    }

    /**
     * Set cache
     * @param options.key
     * @param options.value
     * @param options.expire Expiration time in seconds
     * @memberof CacheStorage
     */
    set({ key, value, expire = timeout }: { key: string; value: any; expire?: number | null }) {
      const stringData = JSON.stringify({
        value,
        time: Date.now(),
        expire: !isUnset(expire) ? new Date().getTime() + expire * 1000 : null,
      });
      const stringifyValue = this.hasEncrypt
        ? this.encryption.encryptByAES(stringData)
        : stringData;
      this.storage.setItem(this.getKey(key), stringifyValue);
    }

    /**
     * Read cache
     * @param {string} key
     * @param {*} def
     * @memberof CacheStorage
     */
    get(key: string, def: any = null): any {
      const val = this.storage.getItem(this.getKey(key));

      if (!val) {
        return def;
      }

      try {
        const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
        const data = JSON.parse(decVal);
        const { value, expire } = data;
        if (isUnset(expire) || expire >= new Date().getTime()) {
          return value;
        }
        this.remove(key);
      } catch (error) {
        return def;
      }
    }

    /**
     * Delete cache based on key
     * @param {string} key
     * @memberof CacheStorage
     */
    remove(key: string) {
      this.storage.removeItem(this.getKey(key));
    }

    /**
     * Delete all caches of this instance
     */
    clear(): void {
      this.storage.clear();
    }
  };

  return new CacheStorage();
}
