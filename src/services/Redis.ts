import {RedisClient} from "redis";
import {promisify} from "util"

class AsyncRedis extends RedisClient {
    public readonly getAsync = promisify(this.get).bind(this);
    public readonly setAsync = promisify(this.set).bind(this);
    public readonly delAsync = (key: string): any => {
        return new Promise((resolve, reject) => {
            this.del(key, (err: any, success: any) => {
                if (err) {
                    reject(err);
                }
                resolve(success);
            });
        });
    }
    public readonly hgetAsync = promisify(this.hget).bind(this);
    public readonly hsetAsync = promisify(this.hset).bind(this);
    public readonly hdelAsync = (hkey: string, key: string): any => {
        return new Promise((resolve, reject) => {
            this.hdel(hkey, key, (err: any, success: any) => {
                if (err) {
                    reject(err);
                }
                resolve(success);
            });
        });
    }
    public readonly hgetallAsync = promisify(this.hgetall).bind(this);
    //
    public readonly scanAsync = (pagination: string): any => {
        return new Promise((resolve, reject) => {
            this.scan( pagination, (err: any, success: any) => {
                if (err) {
                    reject(err);
                }
                resolve(success);
            });
        });
    }
    public readonly mgetAsync = (keys: []): any => {
        return new Promise((resolve, reject) => {
            this.mget(keys, (err: any, success: any) => {
                if (err) {
                    reject(err);
                }
                resolve(success);
            });
        });
    }
    // public readonly infoAsync = promisify(this.info).bind(this);
}

class Redis {
    private _async_redis_connection: AsyncRedis;

    constructor(host: string, password: string) {
        this._async_redis_connection = new AsyncRedis({
            host,
            password
        });
    }

    public async get(key: string): Promise<any> {
        return await this._async_redis_connection.getAsync(key);
    }

    public async set(key: string, value: string): Promise<any> {
        return await this._async_redis_connection.setAsync(key, value);
    }

    public async del(key: string): Promise<boolean> {
        return await this._async_redis_connection.delAsync(key) == 1;
    }

    public async hget (hkey: string, key: string): Promise<any> {
        return await this._async_redis_connection.hgetAsync(hkey, key);
    }

    public async hset(hkey: string, key: string, input: any): Promise<void> {
        const value = JSON.stringify(input);
        await this._async_redis_connection.hsetAsync([hkey, key, value]);
    }

    public async hdel(hkey: string, key: any): Promise<boolean> {
        return await this._async_redis_connection.hdelAsync(hkey, key) == 1;
    }

    public async hgetall(hkey: string): Promise<any> {
        return await this._async_redis_connection.hgetallAsync(hkey);
    }

    public async getAll(pagination: number): Promise<any> {
        const result: any = [];
        let page = "0";
        let scan = null;
        for (let i = 0; i < pagination; i++) {
            scan = await this._async_redis_connection.scanAsync(page);
            page = scan[0];
            if (page == "0") break;
        }
        const values = await this._async_redis_connection.mgetAsync(scan[1]);
        scan[1].forEach((key: string, index: number) => {
            if (values[index] == null) {
                result.push({[key]: {hashKey: "string"}})
            } else {
                result.push({[key]: values[index]});
            }
        });
        return result;
    }
}


export default Redis;