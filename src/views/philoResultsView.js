function renderPhiloResultsPage(path) {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Wikipedia Path Finder</title>
            <link rel="stylesheet" href="/css/main.css">
        </head>
        <body>
            <h1>The Philosophy Game</h1>
            <br>
            <h1>Results</h1>
                <h2>Found Path:</h2>
                <div class="path">
                    ${path.join(' → ')}
                </div>
                <div class="result">
                    Length: ${path.length}
                </div>

            <a href="/philo" class="back-button">Try Another Search</a>
        </body>
        </html>
    `;
}

module.exports = { renderPhiloResultsPage };
