const express = require('express');
const router = express.Router();
const FileService = require('../services/fileService');

router.get('/', async (req, res) => {
    const query = req.query.q.toLowerCase();
    const files = await FileService.getAllFiles();
    const matches = files.filter(file =>
        file.toLowerCase().startsWith(query)
    ).slice(0, 10);
    res.json(matches);
});

module.exports = router;
