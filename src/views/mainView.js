function renderMainPage() {
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
                    padding: 2.5rem;
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

                form {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .input-container {
                    position: relative;
                }

                input[type="text"] {
                    width: 100%;
                    padding: 0.8rem 1rem;
                    border: 2px solid #e1e4e8;
                    border-radius: 6px;
                    font-size: 1rem;
                    transition: border-color 0.2s ease;
                }

                input[type="text"]:focus {
                    outline: none;
                    border-color: #3498db;
                    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
                }

                .autocomplete-items {
                    position: absolute;
                    border: 1px solid #e1e4e8;
                    border-top: none;
                    z-index: 99;
                    top: 100%;
                    left: 0;
                    right: 0;
                    border-radius: 0 0 6px 6px;
                    background-color: white;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                    max-height: 200px;
                    overflow-y: auto;
                }

                .optional-text {
                    color: #666;
                    margin: 0.5rem 0;
                    font-size: 0.95rem;
                }

                button {
                    background-color: #3498db;
                    color: white;
                    padding: 0.8rem 1.5rem;
                    border: none;
                    border-radius: 6px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background-color 0.2s ease;
                    font-weight: 500;
                    margin-top: 1rem;
                }

                button:hover {
                    background-color: #2980b9;
                }

                .note {
                    background-color: #fff3cd;
                    border-left: 4px solid #ffc107;
                    padding: 1rem;
                    margin: 1.5rem 0;
                    font-size: 0.9rem;
                    color: #856404;
                    border-radius: 4px;
                }

                .back-link {
                    display: inline-block;
                    margin-top: 1.5rem;
                    color: #3498db;
                    text-decoration: none;
                    font-size: 0.95rem;
                }

                .back-link:hover {
                    text-decoration: underline;
                }

                @media (max-width: 600px) {
                    body {
                        padding: 1rem;
                    }

                    .container {
                        padding: 1.5rem;
                    }

                    h1 {
                        font-size: 2rem;
                    }
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Wikipedia Path Finder</h1>
                <form action="/" method="POST">
                    <div class="input-container">
                        <input
                            type="text"
                            name="from"
                            id="fromInput"
                            placeholder="Starting Wikipedia page..."
                            required
                            autocomplete="off"
                        >
                        <div id="fromAutocomplete" class="autocomplete-items"></div>
                    </div>

                    <div class="input-container">
                        <input
                            type="text"
                            name="to"
                            id="toInput"
                            placeholder="Destination Wikipedia page..."
                            required
                            autocomplete="off"
                        >
                        <div id="toAutocomplete" class="autocomplete-items"></div>
                    </div>

                    <p class="optional-text">Optional: Include an intermediate page that must be visited before reaching the end page.</p>

                    <div class="input-container">
                        <input
                            type="text"
                            name="through"
                            id="throughInput"
                            placeholder="Intermediate Wikipedia page (optional)"
                            autocomplete="off"
                        >
                        <div id="throughAutocomplete" class="autocomplete-items"></div>
                    </div>

                    <button type="submit">Find Path</button>

                    <div class="note">
                        <i>NOTE: Some very obscure paths may result in 504 errors due to server limitations. mb!! i will upgrade my droplet when i'm rich.</i>
                    </div>
                </form>

                <a href="/" class="back-link">← Return to main page</a>
            </div>
            <script src="/js/autocomplete.js"></script>
        </body>
        </html>
    `;
}

module.exports = { renderMainPage };
