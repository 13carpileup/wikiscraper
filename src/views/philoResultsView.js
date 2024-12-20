function renderPhiloResultsPage(path) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Wikipedia Path Finder</title>
            <link rel="stylesheet" href="/css/philo-results.css">
            <script src="https://d3js.org/d3.v7.min.js"></script>
        </head>
        <body>
            <div class="container">
                <div class="card">
                    <h1>The Philosophy Game</h1>
                    <h2>Found Path:</h2>
                    <div class="path">
                        ${path.join(' → ')}
                    </div>
                    <div class="result">
                        Path Length: ${path.length} steps
                    </div>
                    <div id="graph"></div>
                    <a href="/philo" class="back-button">Try Another Search</a>
                </div>
            </div>
            <script src="/js/philo-graph.js"></script>
            <script>
                document.addEventListener('DOMContentLoaded', () => {
                    createGraph(${JSON.stringify(path)});
                });
            </script>
        </body>
        </html>
    `;
}

module.exports = { renderPhiloResultsPage };
