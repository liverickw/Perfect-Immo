import Redis from "ioredis";
import { env } from "./env";

let redisClient: Redis | null = null;
let hasLoggedUnavailable = false;

if (env.REDIS_URL) {
  redisClient = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 2,
    retryStrategy(times) {
      // Cap backoff so a dead Redis never blocks the event loop from other work.
      if (times > 5) return null;
      return Math.min(times * 200, 2000);
    },
    lazyConnect: false,
  });

  redisClient.on("connect", () => {
    console.log("Redis connected");
  });

  redisClient.on("error", (error) => {
    if (!hasLoggedUnavailable) {
      console.warn("Redis unavailable, falling back to no cache:", error.message);
      hasLoggedUnavailable = true;
    }
  });
} else {
  console.warn("REDIS_URL not set, caching is disabled");
}

export const isRedisReady = () => redisClient?.status === "ready";

export default redisClient;
