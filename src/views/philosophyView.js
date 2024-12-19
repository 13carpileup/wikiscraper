function renderPhilosophyPage() {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <title>Wikipedia Path Finder</title>
            <link rel="stylesheet" href="/css/main.css">
            <style>
                :root {
                    --primary: #2563eb;
                    --primary-dark: #1d4ed8;
                }

                body {
                    font-family: system-ui, -apple-system, sans-serif;
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 2rem;
                    line-height: 1.5;
                    background: #f8fafc;
                }

                .container {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }

                h1 {
                    color: #0f172a;
                    font-size: 2.5rem;
                    margin-bottom: 1rem;
                    text-align: center;
                }

                .description {
                    text-align: center;
                    color: #475569;
                    margin-bottom: 2rem;
                    font-size: 1.1rem;
                }

                .form-container {
                    max-width: 500px;
                    margin: 0 auto 2rem;
                }

                .input-container {
                    position: relative;
                    margin-bottom: 1rem;
                }

                input[type="text"] {
                    width: 100%;
                    padding: 0.75rem 1rem;
                    font-size: 1rem;
                    border: 2px solid #e2e8f0;
                    border-radius: 6px;
                    outline: none;
                    transition: border-color 0.2s;
                }

                input[type="text"]:focus {
                    border-color: var(--primary);
                }

                .autocomplete-items {
                    border: 1px solid #e2e8f0;
                    border-radius: 6px;
                    margin-top: 4px;
                    max-height: 200px;
                    overflow-y: auto;
                    background: white;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
                }

                button {
                    width: 100%;
                    padding: 0.75rem 1.5rem;
                    background: var(--primary);
                    color: white;
                    border: none;
                    border-radius: 6px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                button:hover {
                    background: var(--primary-dark);
                }

                .back-link {
                    display: inline-block;
                    color: var(--primary);
                    text-decoration: none;
                    margin-top: 1rem;
                }

                .back-link:hover {
                    text-decoration: underline;
                }

                .leaderboard {
                    margin-top: 3rem;
                }

                .leaderboard h2 {
                    color: #0f172a;
                    text-align: center;
                    margin-bottom: 1.5rem;
                }

                .leaderboard-table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .leaderboard-table th,
                .leaderboard-table td {
                    padding: 0.75rem;
                    text-align: left;
                    border-bottom: 1px solid #e2e8f0;
                }

                .leaderboard-table th {
                    background: #f1f5f9;
                    font-weight: 600;
                    color: #475569;
                }

                .leaderboard-table tr:last-child td {
                    border-bottom: none;
                }

                .leaderboard-table tbody tr:hover {
                    background: #f8fafc;
                }

                .loading {
                    text-align: center;
                    color: #64748b;
                    padding: 2rem;
                }

                .error {
                    text-align: center;
                    color: #ef4444;
                    padding: 1rem;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>The Philosophy Game</h1>
                <p class="description">
                    Choose a page that is the <strong>furthest</strong> away from the Wikipedia page for Philosophy as possible.
                </p>

                <div class="form-container">
                    <form action="/philo" method="POST">
                        <div class="input-container">
                            <input
                                type="text"
                                name="from"
                                id="fromInput"
                                placeholder="Make your choice..."
                                required
                                autocomplete="off"
                            >
                            <div id="fromAutocomplete" class="autocomplete-items"></div>
                        </div>
                        <button type="submit">Find Path to Philosophy</button>
                    </form>
                </div>

                <div class="leaderboard">
                    <h2>Longest Paths Found</h2>
                    <div id="leaderboardContent"></div>
                </div>

                <a href="/" class="back-link">← Return to main page</a>
            </div>

            <script src="/js/autocomplete.js"></script>
            <script>
                // Fetch and display leaderboard data
                async function fetchLeaderboard() {
                    const leaderboardContent = document.getElementById('leaderboardContent');

                    try {
                        leaderboardContent.innerHTML = '<div class="loading">Loading leaderboard...</div>';

                        const response = await fetch('/philo/results');
                        const results = await response.json();

                        if (results.length === 0) {
                            leaderboardContent.innerHTML = '<div class="loading">No results yet. Be the first to play!</div>';
                            return;
                        }

                        const table = \`
                            <table class="leaderboard-table">
                                <thead>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Starting Page</th>
                                        <th>Path Length</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    \${results.slice(0, 10).map((result, index) => \`
                                        <tr>
                                            <td>\${index + 1}</td>
                                            <td>\${result.initial}</td>
                                            <td>\${result.length} steps</td>
                                        </tr>
                                    \`).join('')}
                                </tbody>
                            </table>
                        \`;

                        leaderboardContent.innerHTML = table;
                    } catch (error) {
                        leaderboardContent.innerHTML = \`
                            <div class="error">
                                Failed to load leaderboard. Please try again later.
                            </div>
                        \`;
                    }
                }

                // Load leaderboard when page loads
                document.addEventListener('DOMContentLoaded', fetchLeaderboard);
            </script>
        </body>
        </html>
    `;
}

module.exports = { renderPhilosophyPage };
