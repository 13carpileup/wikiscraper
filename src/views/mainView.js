function renderMainPage() {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Wikipedia Path Finder</title>
            <link rel="stylesheet" href="/css/main.css">
        </head>
        <body>
            <h1>Wikipedia Path Finder</h1>
            <form action="/" method="POST">
                <div class="input-container">
                    <input type="text" name="from" id="fromInput" placeholder="From" required autocomplete="off">
                    <div id="fromAutocomplete" class="autocomplete-items"></div>
                </div>
                <div class="input-container">
                    <input type="text" name="to" id="toInput" placeholder="To" required autocomplete="off">
                    <div id="toAutocomplete" class="autocomplete-items"></div>
                </div>
                <button type="submit">Find Path</button>
                <i>NOTE: Some very obscure paths will throw 502 errors because my droplet isn't powerful enough to search for a complete path. Forgive me!</i>
            </form>
            <br>
            <a href="/">Return to main page</a>
            <script src="/js/autocomplete.js"></script>
        </body>
        </html>
    `;
}

module.exports = { renderMainPage };
