const express = require('express');
const router = express.Router();
const FileService = require('../services/fileService');
const PathFinderService = require('../services/pathFinderService');
const DBCache = require('../services/dbCache');
const { renderHomePage } = require('../views/homeView');
const { renderMainPage } = require('../views/mainView');
const { renderResultsPage } = require('../views/resultsView');
const { renderPhilosophyPage } = require('../views/philosophyView');
const { renderPhiloResultsPage } = require('../views/philoResultsView');



router.get('/', (req, res) => {
    res.send(renderHomePage());
});

router.get('/philo', (req, res) => {
    res.send(renderPhilosophyPage());
});

function compare(a, b) {
    if (a.length > b.length) return -1;
    else if (b.length > a.length) return 1;
    return 0;
}

router.get('/philo/results', async (req, res) => {
    const results = await DBCache.getPhiloResults();
    results.sort(compare).slice(0, 10);
    res.json(results);
});

router.post('/philo', async (req, res) => {
    const initial = req.body.from;

    const initialExists = FileService.checkFile(initial);

    if (!initialExists) {
        return res.send("Invalid page!");
    }

    const path = await PathFinderService.philosophyGame(initial);
    res.send(renderPhiloResultsPage(path));
});

router.get('/search', (req, res) => {
    res.send(renderMainPage());
});

router.post('/', async (req, res) => {
    const initial = req.body.from;
    const target = req.body.to;

    const targetExists = await FileService.checkFile(target);
    const initialExists = await FileService.checkFile(initial);

    if (!initialExists || !targetExists) {
        return res.send('One or both of your provided pages does not exist. Sorry! It is possible that the page does exist on the real wikipedia, but that my app does not recognize this. If you would like me to add your page, please reach out.');
    }

    const foundPaths = await PathFinderService.findPaths(initial, target);
    res.send(renderResultsPage(foundPaths));
});

module.exports = router;
