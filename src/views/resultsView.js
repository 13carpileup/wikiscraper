function renderResultsPage(foundPaths) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Path Results</title>
            <link rel="stylesheet" href="/css/results.css">
            <script src="https://d3js.org/d3.v7.min.js"></script>
        </head>
        <body>
            <h1>Results</h1>
            ${foundPaths.length > 0
                ? `<h2>Found Paths:</h2>
                   ${foundPaths.map(path => `
                       <div class="path">
                           ${path.join(' → ')}
                       </div>
                   `).join('')}`
                : '<p>No paths found.</p>'
            }
            <div id="graph"></div>
            <a href="/search" class="back-button">Try Another Search</a>
        </body>
        <script src="/js/philo-graph.js"></script>
        <script>
            document.addEventListener('DOMContentLoaded', () => {
                createGraph(${JSON.stringify(foundPaths[0])});
            });
        </script>
        </html>
    `;
}

module.exports = { renderResultsPage };
