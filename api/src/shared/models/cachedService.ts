import type Redis from "ioredis";
import { ErrorHTTP } from "../types/http.types.js";


export interface ICachedService {
    getOrSet<T>(key: string, fetcher: () => Promise<T>): Promise<T>;
    // getManyFromCacheOrMongo<T>(keys: string[], mongoQueryCallback: () => Promise<T>): Promise<T>;

    // set<T>(key: string): Promise<T>;
    // setMany<T>(keys: string[]): Promise<T>;

    deleteKeyAndGet<T>(key: string): Promise<T>;
    deleteKey(key: string): Promise<void>;
    // deleteMany<T>(keys: string[]): Promise<T>;

    exists(key: string): Promise<boolean>;
}


export class CachedService implements ICachedService {
    constructor(
        private cache: Redis.Redis,
        private cacheTTL: number
    ) { }

    private async parseJson<T>(jsonValue: string, key: string): Promise<T> {
        try {
            return JSON.parse(jsonValue) as T;
        }
        catch {
            await this.cache.del(key);
            throw new ErrorHTTP(500, "Cache corrupted");
        }
    }

    async getOrSet<T>(key: string, fetcher: () => Promise<T>): Promise<T> {
        const cached = await this.cache.get(key);
        if (cached) return await this.parseJson(cached, key);

        const lockKey = `lock:${key}`;
        const acquired = await this.cache.set(lockKey, 1, "EX", 5, "NX");
        if (acquired) {
            try {
                const fresh = await fetcher();
                await this.cache.setex(
                    key,
                    this.cacheTTL,
                    JSON.stringify(fresh)
                );

                return fresh;
            }
            finally {
                await this.cache.del(lockKey);
            }
        }

        await new Promise((resolve) => setTimeout(resolve, 100));
        const retry = await this.cache.get(key);
        if (retry) {
            return this.parseJson(retry, key);
        }

        return fetcher();
    }

    async deleteKeyAndGet<T>(key: string): Promise<T> {
        const value = await this.cache.getdel(key)
        if (!value) throw new ErrorHTTP(404, "Not Found");

        return await this.parseJson(value, key);
    }

    async deleteKey(key: string): Promise<void> {
        await this.cache.del(key)
    }

    async exists(key: string): Promise<boolean> {
        return await this.cache.exists(key) > 0;
    }
}
