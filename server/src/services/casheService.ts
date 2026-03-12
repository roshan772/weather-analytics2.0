type CacheEntry<T> = {
  data: T;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

export function getCache<T>(key: string): T | null {
  const entry = cache.get(key);

  if (!entry) {
    return null;
  }

  const isExpired = Date.now() > entry.expiresAt;

  if (isExpired) {
    cache.delete(key);
    return null;
  }

  return entry.data as T;
}

export function setCache<T>(key: string, data: T, ttlInSeconds: number): void {
  const expiresAt = Date.now() + ttlInSeconds * 1000;

  cache.set(key, {
    data,
    expiresAt,
  });
}

export function getCacheKeys(): string[] {
  return Array.from(cache.keys());
}

export function clearCache(): void {
  cache.clear();
}
