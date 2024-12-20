const { debugPort } = require('node:process');
const FileService = require('./fileService');
const { Pool } = require('pg');


class DBCache {
    static pool = new Pool({
        user: 'your_username',
        host: 'localhost',
        database: 'pathfinder_db',
        password: 'your_password',
        port: 5432,
    });

    static async initPhiloDB() {
        const result = await DBCache.pool.query(`
            CREATE TABLE IF NOT EXISTS philo_game (
                id SERIAL PRIMARY KEY,
                initial TEXT,
                length BIGINT
            )
        `);
    }

    static async getPhiloResults() {
        await DBCache.initPhiloDB();
        let query = {
            text: 'SELECT initial, length FROM philo_game',
        };

        let result = await DBCache.pool.query(query);

        return result.rows;
    }

    static async addPhiloResults(initial, length) {
        await DBCache.initPhiloDB();

        let query = {
            text: 'SELECT * FROM philo_game WHERE initial = $1;',
            values: [initial],
        };

        let result = await DBCache.pool.query(query);

        if (result.rows.length != 0) return;

        query = {
            text: 'INSERT INTO philo_game (initial, length) VALUES ($1, $2);',
            values: [initial, length],
        };

        result = await DBCache.pool.query(query);
    }

    static async initDB() {
        console.log("dropping...")
        const query = await DBCache.pool.query(`DROP TABLE IF EXISTS path_cache;`)
        const result = await DBCache.pool.query(`
            CREATE TABLE IF NOT EXISTS path_cache (
                id SERIAL PRIMARY KEY,
                initial TEXT,
                target TEXT,
                paths TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
    }

    static async checkCache(initial, target) {
        let query = {
            text: 'SELECT paths FROM path_cache WHERE initial = $1 AND target = $2',
            values: [initial, target],
        };

        let result = await DBCache.pool.query(query);
        if (result.rows.length === 0) {
            return false;
        }

        let paths = JSON.parse(result.rows[0].paths);

        if (paths) {
            if (paths.length > 0) {
                return paths;
            }

            return false;
        }

        return false;
    }

    static async addCache(initial, target, path) {
        let query = {
            text: 'SELECT paths FROM path_cache WHERE initial = $1 AND target = $2',
            values: [initial, target],
        };

        let result = await DBCache.pool.query(query);

        if (result.rows.length === 0) {
            query = {
                text: 'INSERT INTO path_cache (initial, target, paths) VALUES ($1, $2, $3)',
                values: [initial, target, JSON.stringify([path])],
            };

            result = await DBCache.pool.query(query);
            return;
        }

        let paths = JSON.parse(result.rows[0].paths);

        if (paths.includes(path)) return;

        paths.push(path);
        query = {
            text: 'UPDATE path_cache SET paths = $1 WHERE initial = $2 AND target = $3;',
            values: [JSON.stringify(paths), initial, target],
        };

        result = await DBCache.pool.query(query);


    }

}

module.exports = DBCache;
