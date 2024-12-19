function renderResultsPage(foundPaths) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Path Results</title>
            <link rel="stylesheet" href="/css/results.css">
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
            <a href="/search" class="back-button">Try Another Search</a>
        </body>
        </html>
    `;
}

module.exports = { renderResultsPage };
