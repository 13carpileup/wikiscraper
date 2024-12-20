const DBCache = require('./dbCache');
const FileService = require('./fileService');
const { Pool } = require('pg');
const fs = require('fs').promises;
const path = require('path');

class Graph {
    static connections = new Map();

    static async init() {
        console.log("Initting...")
        const dataDir = path.join(__dirname, '../../data');
        const files = await fs.readdir(dataDir);
        const textFiles = files.filter(file => file.endsWith('.txt'));

        for (const file of textFiles) {
            const tableName = path.basename(file, '.txt');

            const cons = await FileService.readFile(tableName);

            if (Graph.connections.has(tableName)) {
                Graph.connections.delete(tableName);
            }

            Graph.connections.set(tableName, cons);

            //console.log(`Created table: ${tableName}`);
        }

        console.log("Done!");
    }

    static get(title) {
        return Graph.connections.get(title);
    }

}

module.exports = Graph;
