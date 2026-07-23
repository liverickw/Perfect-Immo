import { env } from "../config/env";
import redisClient, { isRedisReady } from "../config/redis";

/**
 * Cache-aside helper.
 * - get(key): returns parsed JSON or null (never throws)
 * - set(key, value, ttl): stores JSON with TTL (never throws)
 * - del(...keys/patterns): deletes exact keys and/or key patterns (e.g. "properties:*")
 * If Redis isn't configured or is down, every call is a safe no-op so the API
 * keeps working straight from PostgreSQL.
 */
export const cache = {
  async get<T>(key: string): Promise<T | null> {
    if (!redisClient || !isRedisReady()) return null;

    try {
      const raw = await redisClient.get(key);
      return raw ? (JSON.parse(raw) as T) : null;
    } catch (error) {
      console.warn(`Cache get failed for key "${key}"`, error);
      return null;
    }
  },

  async set(key: string, value: unknown, ttlSeconds: number = env.CACHE_TTL_SECONDS): Promise<void> {
    if (!redisClient || !isRedisReady()) return;

    try {
      await redisClient.set(key, JSON.stringify(value), "EX", ttlSeconds);
    } catch (error) {
      console.warn(`Cache set failed for key "${key}"`, error);
    }
  },

  async del(...keysOrPatterns: string[]): Promise<void> {
    if (!redisClient || !isRedisReady() || keysOrPatterns.length === 0) return;

    try {
      const exactKeys: string[] = [];
      const patternKeys: string[] = [];

      for (const entry of keysOrPatterns) {
        (entry.includes("*") ? patternKeys : exactKeys).push(entry);
      }

      if (exactKeys.length > 0) {
        await redisClient.del(...exactKeys);
      }

      for (const pattern of patternKeys) {
        const keys = await redisClient.keys(pattern);
        if (keys.length > 0) {
          await redisClient.del(...keys);
        }
      }
    } catch (error) {
      console.warn(`Cache invalidation failed for "${keysOrPatterns.join(", ")}"`, error);
    }
  },

  /** Fetch from cache, or compute + store on miss. */
  async wrap<T>(key: string, ttlSeconds: number, fn: () => Promise<T>): Promise<T> {
    const cached = await cache.get<T>(key);
    if (cached !== null) return cached;

    const fresh = await fn();
    await cache.set(key, fresh, ttlSeconds);
    return fresh;
  },
};
