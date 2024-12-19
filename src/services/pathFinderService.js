const FileService = require('./fileService');

class PathFinderService {
    static cache = new Map();

    static checkCache(initial, target) {
        const key = `${initial}-${target}`;
        if (PathFinderService.cache.has(key)) {
            let res = PathFinderService.cache.get(key);

            if (res.length > 0) {
                return res;
            }

            return false;
        }

        PathFinderService.cache.set(key, []);
        return false;
    }

    static addCache(initial, target, path) {
        for (let i = 0; i < path.length - 1; i++) {
            for (let j = i + 1; j < path.length; j++) {

                let spliceArray = path.slice(i, j + 1);

                let newFrom = spliceArray[0];
                let newTo = spliceArray[spliceArray.length - 1];

                let key = `${newFrom}-${newTo}`;
                console.log(key)

                let res = PathFinderService.checkCache(newFrom, newTo);;
                if (!res) {
                    PathFinderService.cache.set(key, [spliceArray]);
                    continue;
                }

                if (res.includes(spliceArray)) continue;

                res.push(spliceArray);
                PathFinderService.cache.set(key, res);
            }
        }

        return false;
    }

    static async findPaths(initial, target) {
        await FileService.logRequest(initial, target);
        let res = PathFinderService.checkCache(initial, target);

        if (res) return res;

        const visited = new Map();
        const queue = [[[initial], await FileService.readFile(initial)]];
        let foundPaths = [];
        let foundLength = -1;

        while (queue.length > 0) {
            const next = queue.shift();
            const currentPath = next[0];
            const connections = next[1];

            if (foundLength != -1 && foundLength < currentPath.length) break;

            for (const con of connections) {
                if (visited.has(con)) continue;
                visited.set(con, true);

                if (!(await FileService.checkFile(con))) continue;

                const newConnections = await FileService.readFile(con);
                queue.push([currentPath.concat([con]), newConnections]);

                if (newConnections.includes(target)) {
                    foundPaths.push(currentPath.concat([con, target]));
                    PathFinderService.addCache(initial, target, currentPath.concat([con, target]));
                    foundLength = currentPath.length;
                }
            }
        }

        return foundPaths;
    }
}

module.exports = PathFinderService;
