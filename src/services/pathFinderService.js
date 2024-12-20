const FileService = require('./fileService');
const DBCache = require('./dbCache');
const Graph = require('./graph');


class PathFinderService {
    static async findPaths(initial, target, pathCount=3) {
        await DBCache.initDB();
        if (Graph.connections.size < 10) await Graph.init();

        await FileService.logRequest(initial, target);
        let res = await DBCache.checkCache(initial, target);
        console.log(res);

        if (res && res.length!=0) return res;

        const visited = new Map();
        const queue = [[[initial], Graph.get(initial)]];
        let foundPaths = [];
        let foundLength = -1;

        while (queue.length > 0) {
            const next = queue.shift();
            const currentPath = next[0];
            const connections = next[1];

            if (foundLength != -1 && foundLength < currentPath.length || foundPaths.length > pathCount) break;

            for (const con of connections) {
                let res = await DBCache.checkCache(con, target);
                if (res && res.length > 0) {
                    let pathLen = res.length;
                    for (let i = 0; i < pathLen; i++) {
                        let p = res[i];
                        let fullNewPath = currentPath.concat(p);
                        await DBCache.addCache(initial, target, fullNewPath);
                        foundPaths.push(fullNewPath);
                    };

                    foundLength = res[0].length;



                    continue;
                }

                if (visited.has(con)) continue;
                visited.set(con, true);

                if (!Graph.connections.get(con)) continue;

                const newConnections = Graph.get(con);
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

    static async philosophyGame(initial) {
        const result = await PathFinderService.findPaths(initial, "Philosophy", 1);
        DBCache.addPhiloResults(initial, result[0].length);
        return result[0];
    }
}

module.exports = PathFinderService;
