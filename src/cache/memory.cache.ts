interface Cache<V = any> {
  value?: V;
  timeoutId?: ReturnType<typeof setTimeout>;
  time?: number;
  alive?: number;
}

const NOT_ALIVE = 0;

export class MemoryCache<T = any, V= any> {
  private cache: { [key in keyof T]?: Cache<V> } = {};
  private alive: number;

  constructor(_alive = NOT_ALIVE) {
    // Unit second
    this.alive = _alive * 1000;
  }

  get getCache() {
    return this.cache;
  }

  setCache(cache: { [key in keyof T]?: Cache<V> }) {
    this.cache = cache;
  }

  get<K extends keyof T>(key: K) {
    return this.cache[key];
  }

  set<K extends keyof T>({ key, value, expires }: { key: K; value: V; expires?: number }) {
    let item = this.get(key);

    if (!expires || (expires) <= 0) {
      expires = this.alive;
    }

    if (item) {
      if (item.timeoutId) {
        clearTimeout(item.timeoutId);
        item.timeoutId = undefined;
      }
      item.value = value;
    } else {
      item = {
        value,
        alive: expires,
      };
      this.cache[key] = item;
    }
    if (!expires) {
      return value;
    }

    const now = new Date().getTime();

    /**
     * Prevent overflow of the setTimeout Maximum delay value
     * Maximum delay value 2,147,483,647 ms
     * https://developer.mozilla.org/en-US/docs/Web/API/setTimeout#maximum_delay_value
     */
    item.time = expires > now ? expires : now + expires;
    item.timeoutId = setTimeout(
      () => {
        this.remove(key);
      },
      expires > now ? expires - now : expires,
    );

    return value;
  }

  remove<K extends keyof T>(key: K) {
    const item = this.get(key);
    Reflect.deleteProperty(this.cache, key);
    if (item) {
      clearTimeout(item.timeoutId!);
      return item.value;
    }
  }

  resetCache(cache: { [K in keyof T]: Cache }) {
    Object.keys(cache).forEach((key) => {
      const _key = key as any as keyof T;
      const item = cache[_key];
      if (item && item.time) {
        const now = new Date().getTime();
        const expires = item.time;
        if (expires > now) {
          this.set({ key: _key, value: item.value, expires });
        }
      }
    });
  }

  clear() {
    Object.keys(this.cache).forEach((key) => {
      const item = this.cache[key];
      item.timeoutId && clearTimeout(item.timeoutId);
    });
    this.cache = {};
  }
}
