const express = require('express');
const router = express.Router();
const FileService = require('../services/fileService');
const PathFinderService = require('../services/pathFinderService');
const { renderMainPage } = require('../views/mainView');
const { renderResultsPage } = require('../views/resultsView');

router.get('/', (req, res) => {
    res.send(renderMainPage());
});

router.post('/', async (req, res) => {
    const initial = req.body.from;
    const target = req.body.to;

    const targetExists = await FileService.checkFile(target);
    const initialExists = await FileService.checkFile(initial);

    if (!initialExists && targetExists) {
        return res.send('Error: Invalid path');
    }

    const foundPaths = await PathFinderService.findPaths(initial, target);
    res.send(renderResultsPage(foundPaths));
});

module.exports = router;
