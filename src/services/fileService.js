const fs = require('fs').promises;
const path = require('path');

class FileService {
    static async checkFile(fname) {
        try {
            await fs.access(path.join(__dirname, '../../data', `${fname.replace(/\//g, '%2F')}.txt`));
            return true;
        } catch {
            return false;
        }
    }

    static async readFile(fname) {
        try {
            const content = await fs.readFile(
                path.join(__dirname, '../../data', `${fname.replace(/\//g, '%2F')}.txt`),
                'utf8'
            );
            return content.split('\n');
        } catch {
            return [];
        }
    }

    static async getAllFiles() {
        try {
            const files = await fs.readdir(path.join(__dirname, '../../data'));
            return files
                .filter(file => file.endsWith('.txt'))
                .map(file => file.slice(0, -4))
                .map(file => file.replace(/%2F/g, '/'));
        } catch {
            return [];
        }
    }

    static async logRequest(from, to) {
        let data = `FROM ||${from}|| TO ||${to}||\n`;
        fs.appendFile('Log.txt', data, (err) => {
            if (err) throw err;
        })
    }
}

module.exports = FileService;
