# WikiScraper

A small project I put together allowing you to:
1) find the shortest(ish) path between any two pages on wikipedia (and set a required intermediate page as well)
2) try to find the page the furthest away from philosophy (with a leaderboard!)

The project is currently being hosted on my droplet @ [alexclimie.com](https://alexclimie.com). Due to performance constraints, some paths may lead to the droplet crashing. My bad! I've tried to optimize to avoid this, but if it happens again, feel free to let me know what path you were attempting to find so that I can investigate the root cause & fix it.

### stack
- express js server
- - server rendered html/css
- postgresql db (for leaderboards and caching)
- python to scrape for wikipedia connections (see /dataGen)

### notes
this project does not currently contain every single wikipedia page. There's a lot of them, and most full data-dumps are too large for my poor little droplet. I used wikipedia's links api endpoint to get the links between each page, and bfsed to get a good portion of the most common pages (it's a kind of heuristic: the most common pages are more likely to appear in a connection, so are more likely to be scraped by me!).

feel free to reach out if you have any questions or suggestions!
