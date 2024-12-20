function renderHomePage() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Wikipedia Path Finder</title>
            <link rel="stylesheet" href="/css/main.css">
            <style>
                body {
                    font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
                    line-height: 1.6;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 2rem;
                    background-color: #f8f9fa;
                    color: #1a1a1a;
                }

                .container {
                    background-color: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
                }

                h1 {
                    color: #2c3e50;
                    text-align: center;
                    font-size: 2.5rem;
                    margin-bottom: 2rem;
                    font-weight: 700;
                }

                .buttons-container {
                    display: flex;
                    gap: 1rem;
                    justify-content: center;
                    flex-wrap: wrap;
                }

                .button {
                    display: inline-block;
                    padding: 0.8rem 1.5rem;
                    background-color: #3498db;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    transition: background-color 0.2s ease;
                    font-weight: 500;
                }

                .button:hover {
                    background-color: #2980b9;
                }

                .description {
                    text-align: center;
                    color: #666;
                    margin: 2rem 0;
                    font-size: 1.1rem;
                }
            </style>
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
