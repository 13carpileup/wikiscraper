function renderMainPage() {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Path Finder</title>
            <link rel="stylesheet" href="/css/main.css">
        </head>
        <body>
            <h1>Path Finder</h1>
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
            </form>
            <script src="/js/autocomplete.js"></script>
        </body>
        </html>
    `;
}

module.exports = { renderMainPage };
