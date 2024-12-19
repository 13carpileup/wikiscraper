function renderHomePage() {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Wikipedia Path Finder</title>
            <link rel="stylesheet" href="/css/main.css">
        </head>
        <body>
            <h1>Wikipedia Path Finder</h1>
            <a href = "/philo">Philosophy Game</a>
            <a href = "/search">Path Finder</a>
        </body>
        </html>
    `;
}

module.exports = { renderHomePage };
