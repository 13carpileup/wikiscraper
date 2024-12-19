const FileService = require('./fileService');
const DBCache = require('./dbCache');


class PathFinderService {
    static async findPaths(initial, target) {
        await DBCache.initDB();

        await FileService.logRequest(initial, target);
        let res = await DBCache.checkCache(initial, target);
        console.log(res);

        if (res && res.length!=0) return res;

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
                    await DBCache.addCache(initial, target, currentPath.concat([con, target]));
                    foundLength = currentPath.length;
                }
            }
        }

        return foundPaths;
    }
}

module.exports = PathFinderService;
