function renderHomePage() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Wikipedia Path Finder</title>
            <link rel="stylesheet" href="/css/main.css">
        </head>
        <body>
            <div class="container">
                <h1>Wikipedia Path Finder</h1>

                <p class="description">
                    Explore Wikipedia articles and discover interesting connections between them.
                    Choose your adventure below:
                </p>

                <div class="buttons-container">
                    <a href="/philo" class="button">Philosophy Game</a>
                    <a href="/search" class="button">Path Finder</a>
                </div>
            </div>
        </body>
        </html>
    `;
}

module.exports = { renderHomePage };
