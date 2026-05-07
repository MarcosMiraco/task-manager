import { Redis } from 'ioredis';


export const CACHE_TTL = 60;

export enum CACHE_KEYS {
    ALL_TASKS = "tasks:all",
    TASK_BY_ID = "task:{x}"
}

export function generateSpecificKey(key: CACHE_KEYS, id: string) {
    return key.replace("{x}", id);
}

export const redisClient = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: 6379,
});
