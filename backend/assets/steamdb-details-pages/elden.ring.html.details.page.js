export const eldenRingHtmlDetailsPageDb = `

<!DOCTYPE HTML>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>ELDEN RING · SteamDB</title>
<link rel="preload" href="/static/fonts/Inter-Regular.woff2?v=4.0" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/static/fonts/Inter-Bold.woff2?v=4.0" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/static/fonts/Inter-Italic.woff2?v=4.0" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" integrity="sha512-xdgteujE0OsfyENsi9vKIEzepYjMka4xiDQ7Mh1os8aq/zkCkP/kN5aOxiwYGb2rO+keeuoTtOhI1zeuc+1Dqg==" href="/static/css/headcrab.css?v=c5d82d7ae8c4d0eb">
<link rel="stylesheet" integrity="sha512-2F5Ah0IcwkIC95gvYIYJLAy8htXS0j/lrcVgyUdQO3V/jiI3oNzR58eT+RTRnhJl6qmfi/02FGEMKMDZnWNHag==" href="/static/css/app.css?v=d85e4087421cc242">
<link rel="alternate" type="application/rss+xml" title="SteamDB Blog" href="https://steamdb.info/api/BlogRSS/">
<link rel="canonical" href="https://steamdb.info/app/1245620/info/">
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:site" content="@SteamDB">
<meta property="og:type" content="website">
<meta property="og:site_name" content="SteamDB">
<meta property="og:title" content="ELDEN RING">
<meta name="description" content="THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.
ELDEN RING Steam charts, data, update history.">
<meta property="og:description" content="THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.
ELDEN RING Steam charts, data, update history.">
<meta property="og:image" content="https://steamdb.info/app/1245620.png?_=122567736">
<meta name="theme-color" content="#000000">
<link rel="manifest" href="/steamdb.webmanifest">
<link rel="icon" type="image/svg+xml" href="/static/logos/vector_prefers_schema.svg">
<link rel="search" type="application/opensearchdescription+xml" href="/opensearch.xml" title="SteamDB">
<link rel="preconnect" href="https://cdn.cloudflare.steamstatic.com/">
</head>
<body class="page-apps" itemscope itemtype="http://schema.org/WebSite" data-steam-cdn="https://cdn.cloudflare.steamstatic.com/" data-rev="0db54feeae">
<a class="skip-main" href="#main" id="js-skip-main">Skip to content</a>
<div class="header" role="banner">
<div class="header-menu-button-container">
<button type="button" class="header-menu-button" id="js-header-hamburger" accesskey="m" aria-label="Toggle menu"><svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-three-bars" aria-hidden="true"><path d="M1 2.75A.75.75 0 0 1 1.75 2h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 2.75Zm0 5A.75.75 0 0 1 1.75 7h12.5a.75.75 0 0 1 0 1.5H1.75A.75.75 0 0 1 1 7.75ZM1.75 12h12.5a.75.75 0 0 1 0 1.5H1.75a.75.75 0 0 1 0-1.5Z"></path></svg> <span>Menu</span></button>
</div>
<div class="header-navbar">
<a href="/" class="header-brand" itemprop="url"><svg width="30" height="30" viewBox="0 0 128 128" class="octicon octicon-steamdb" aria-hidden="true"><path fill-rule="evenodd" d="M63.9 0C30.5 0 3.1 11.9.1 27.1l35.6 6.7c2.9-.9 6.2-1.3 9.6-1.3l16.7-10c-.2-2.5 1.3-5.1 4.7-7.2 4.8-3.1 12.3-4.8 19.9-4.8 5.2-.1 10.5.7 15 2.2 11.2 3.8 13.7 11.1 5.7 16.3-5.1 3.3-13.3 5-21.4 4.8l-22 7.9c-.2 1.6-1.3 3.1-3.4 4.5-5.9 3.8-17.4 4.7-25.6 1.9-3.6-1.2-6-3-7-4.8L2.5 38.4c2.3 3.6 6 6.9 10.8 9.8C5 53 0 59 0 65.5c0 6.4 4.8 12.3 12.9 17.1C4.8 87.3 0 93.2 0 99.6 0 115.3 28.6 128 64 128c35.3 0 64-12.7 64-28.4 0-6.4-4.8-12.3-12.9-17 8.1-4.8 12.9-10.7 12.9-17.1 0-6.5-5-12.6-13.4-17.4 8.3-5.1 13.3-11.4 13.3-18.2 0-16.5-28.7-29.9-64-29.9zm22.8 14.2c-5.2.1-10.2 1.2-13.4 3.3-5.5 3.6-3.8 8.5 3.8 11.1 7.6 2.6 18.1 1.8 23.6-1.8s3.8-8.5-3.8-11c-3.1-1-6.7-1.5-10.2-1.5zm.3 1.7c7.4 0 13.3 2.8 13.3 6.2 0 3.4-5.9 6.2-13.3 6.2s-13.3-2.8-13.3-6.2c0-3.4 5.9-6.2 13.3-6.2zM45.3 34.4c-1.6.1-3.1.2-4.6.4l9.1 1.7a10.8 5 0 1 1-8.1 9.3l-8.9-1.7c1 .9 2.4 1.7 4.3 2.4 6.4 2.2 15.4 1.5 20-1.5s3.2-7.2-3.2-9.3c-2.6-.9-5.7-1.3-8.6-1.3zM109 51v9.3c0 11-20.2 19.9-45 19.9-24.9 0-45-8.9-45-19.9v-9.2c11.5 5.3 27.4 8.6 44.9 8.6 17.6 0 33.6-3.3 45.2-8.7zm0 34.6v8.8c0 11-20.2 19.9-45 19.9-24.9 0-45-8.9-45-19.9v-8.8c11.6 5.1 27.4 8.2 45 8.2s33.5-3.1 45-8.2z" /></svg> <span>SteamDB</span></a>
<form class="header-search" id="js-header-form" method="get" action="/search/" itemprop="potentialAction" itemscope itemtype="http://schema.org/SearchAction" role="search">
<input type="hidden" name="a" value="all">
<meta itemprop="target" content="https://steamdb.info/search/?a=all&amp;q={q}">
<input type="text" accesskey="/" class="field" autocomplete="off" name="q" placeholder="Search…" itemprop="query-input" aria-label="Search">
<button type="submit" class="submit" aria-label="Perform search" tabindex="-1"><svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-search" aria-hidden="true"><path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path></svg></button>
</form>
<a href="/sales/">Sales</a>
<a href="/charts/">Charts</a>
<a href="/calculator/">Calculator</a>
<a href="/calendar/">Calendar</a>
<a href="/patchnotes/">Patches</a>
<a href="/discord/">Discord</a>
<a href="/instantsearch/">Find games</a>
<button type="button" class="btn btn-outline header-search-close">Close</button>
</div>
<button type="button" class="header-search-mobile" aria-label="Open search"><svg width="24" height="24" viewBox="0 0 16 16" class="octicon octicon-search" aria-hidden="true"><path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path></svg></button>
<div class="header-user hide-small">
<a class="header-user-avatar" href="/calculator/76561197998905791/" aria-label="User menu">
<svg width="20" height="20" viewBox="0 0 16 16" class="octicon octicon-triangle-down" aria-hidden="true"><path d="m4.427 7.427 3.396 3.396a.25.25 0 0 0 .354 0l3.396-3.396A.25.25 0 0 0 11.396 7H4.604a.25.25 0 0 0-.177.427Z"></path></svg><img class="avatar" src="https://avatars.cloudflare.steamstatic.com/26a309b5e0182571ae1c539eb641b11062d70f4c_full.jpg" alt width="30" height="30">
</a>
</div>
</div>
<div class="header-search-suggestions">
<div class="container" id="js-search-tips">
<p>Start typing to see game suggestions. This only suggests apps that have a store page.</p>
<ul>
<li class="hide-small">Use slash key (<kbd>/</kbd>) to focus search from anywhere.</li>
<li class="hide-small">Use arrow keys (<kbd>↑</kbd> and <kbd>↓</kbd>) to navigate suggestions.</li>
<li class="hide-small">Use escape (<kbd>Esc</kbd>) to close search.</li>
<li>Enter an appid to be redirected to the app page.</li>
<li>Enter a steamid (765...) to be redirected to calculator.</li>
<li>Paste a profile link (/id/ or /profiles/) to be redirected to calculator.</li>
<li>Paste any url that contains app/, sub/, bundle/, or depot/ to be redirected to the relevant page.</li>
<li><a href="https://www.algolia.com/?utm_content=steamdb.info&amp;utm_campaign=poweredby">Search is powered by Algolia.</a></li>
</ul>
</div>
<div class="container" id="js-search-suggestions"></div>
<div class="container header-search-enter">
Only apps with a store page are suggested.
<span class="hide-small">
<kbd>Enter</kbd> Submit to view all results.
<kbd>Ctrl+Enter</kbd> View and filter in instant search.
</span>
</div>
<div class="header-search-side-close">
<div class="header-search-side-close-inner">Close &times;</div>
</div>
</div>
<div class="header-menu-container" hidden>
<div class="header-menu" tabindex="0">
<ul>
<li class="navigation-heading"><svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-info" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.5 7.75A.75.75 0 0 1 7.25 7h1a.75.75 0 0 1 .75.75v2.75h.25a.75.75 0 0 1 0 1.5h-2a.75.75 0 0 1 0-1.5h.25v-2h-.25a.75.75 0 0 1-.75-.75ZM8 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"></path></svg> About</li>
<li><a href="/blog/">Blog</a></li>
<li><a href="/discord/">Discord</a></li>
<li><a href="/discord/bot/">Discord Bot</a></li>
<li><a href="/faq/">FAQ &amp; help</a></li>
<li><a href="/donate/">Donate &amp; contribute</a></li>
<li><a href="/extension/">Browser extension</a></li>
</ul>
<ul>
<li class="navigation-heading"><svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-search" aria-hidden="true"><path d="M10.68 11.74a6 6 0 0 1-7.922-8.982 6 6 0 0 1 8.982 7.922l3.04 3.04a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215ZM11.5 7a4.499 4.499 0 1 0-8.997 0A4.499 4.499 0 0 0 11.5 7Z"></path></svg> Tools</li>
<li><a href="/sales/">Sales</a></li>
<li><a href="/charts/">Charts</a></li>
<li><a href="/calculator/">Calculator</a></li>
<li><a href="/patchnotes/">Patch notes</a></li>
<li><a href="/search/">Search</a></li>
<li><a href="/instantsearch/">Instant search</a></li>
<li><a href="/sales/history/">When is next sale?</a></li>
</ul>
<ul>
<li class="navigation-heading"><svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-sync" aria-hidden="true"><path d="M1.705 8.005a.75.75 0 0 1 .834.656 5.5 5.5 0 0 0 9.592 2.97l-1.204-1.204a.25.25 0 0 1 .177-.427h3.646a.25.25 0 0 1 .25.25v3.646a.25.25 0 0 1-.427.177l-1.38-1.38A7.002 7.002 0 0 1 1.05 8.84a.75.75 0 0 1 .656-.834ZM8 2.5a5.487 5.487 0 0 0-4.131 1.869l1.204 1.204A.25.25 0 0 1 4.896 6H1.25A.25.25 0 0 1 1 5.75V2.104a.25.25 0 0 1 .427-.177l1.38 1.38A7.002 7.002 0 0 1 14.95 7.16a.75.75 0 0 1-1.49.178A5.5 5.5 0 0 0 8 2.5Z"></path></svg> Tracking</li>
<li><a href="/bundles/">Bundles</a></li>
<li><a href="/history/">History</a></li>
<li><a href="/pricechanges/">Price changes</a></li>
<li><a href="/upcoming/free/">Free promotions</a></li>
<li><a href="/tech/">Engines &amp; technologies</a></li>
<li><a href="/stats/releases/">Game releases by year</a></li>
</ul>
<ul>
<li class="navigation-heading"><svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-database" aria-hidden="true"><path d="M1 3.5c0-.626.292-1.165.7-1.59.406-.422.956-.767 1.579-1.041C4.525.32 6.195 0 8 0c1.805 0 3.475.32 4.722.869.622.274 1.172.62 1.578 1.04.408.426.7.965.7 1.591v9c0 .626-.292 1.165-.7 1.59-.406.422-.956.767-1.579 1.041C11.476 15.68 9.806 16 8 16c-1.805 0-3.475-.32-4.721-.869-.623-.274-1.173-.62-1.579-1.04-.408-.426-.7-.965-.7-1.591Zm1.5 0c0 .133.058.318.282.551.227.237.591.483 1.101.707C4.898 5.205 6.353 5.5 8 5.5c1.646 0 3.101-.295 4.118-.742.508-.224.873-.471 1.1-.708.224-.232.282-.417.282-.55 0-.133-.058-.318-.282-.551-.227-.237-.591-.483-1.101-.707C11.102 1.795 9.647 1.5 8 1.5c-1.646 0-3.101.295-4.118.742-.508.224-.873.471-1.1.708-.224.232-.282.417-.282.55Zm0 4.5c0 .133.058.318.282.551.227.237.591.483 1.101.707C4.898 9.705 6.353 10 8 10c1.646 0 3.101-.295 4.118-.742.508-.224.873-.471 1.1-.708.224-.232.282-.417.282-.55V5.724c-.241.15-.503.286-.778.407C11.475 6.68 9.805 7 8 7c-1.805 0-3.475-.32-4.721-.869a6.15 6.15 0 0 1-.779-.407Zm0 2.225V12.5c0 .133.058.318.282.55.227.237.592.484 1.1.708 1.016.447 2.471.742 4.118.742 1.647 0 3.102-.295 4.117-.742.51-.224.874-.47 1.101-.707.224-.233.282-.418.282-.551v-2.275c-.241.15-.503.285-.778.406-1.247.549-2.917.869-4.722.869-1.805 0-3.475-.32-4.721-.869a6.327 6.327 0 0 1-.779-.406Z"></path></svg> Database</li>
<li><a href="/tags/">Game tags</a></li>
<li><a href="/calendar/">Release calendar</a></li>
<li><a href="/upcoming/">Upcoming releases</a></li>
<li><a href="/upcoming/mostfollowed/">Most followed upcoming</a></li>
<li><a href="/badges/">Profile badges</a></li>
<li><a href="/developers/">Developers</a></li>
<li><a href="/publishers/">Publishers</a></li>
</ul>
<ul>
<li class="navigation-heading"><svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-number" aria-hidden="true"><path d="M9 4.75A.75.75 0 0 1 9.75 4h4a.75.75 0 0 1 .53 1.28l-1.89 1.892c.312.076.604.18.867.319.742.391 1.244 1.063 1.244 2.005 0 .653-.231 1.208-.629 1.627-.386.408-.894.653-1.408.777-1.01.243-2.225.063-3.124-.527a.751.751 0 0 1 .822-1.254c.534.35 1.32.474 1.951.322.306-.073.53-.201.67-.349.129-.136.218-.32.218-.596 0-.308-.123-.509-.444-.678-.373-.197-.98-.318-1.806-.318a.75.75 0 0 1-.53-1.28l1.72-1.72H9.75A.75.75 0 0 1 9 4.75Zm-3.587 5.763c-.35-.05-.77.113-.983.572a.75.75 0 1 1-1.36-.632c.508-1.094 1.589-1.565 2.558-1.425 1 .145 1.872.945 1.872 2.222 0 1.433-1.088 2.192-1.79 2.681-.308.216-.571.397-.772.573H7a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75c0-.69.3-1.211.67-1.61.348-.372.8-.676 1.15-.92.8-.56 1.18-.904 1.18-1.474 0-.473-.267-.69-.587-.737ZM5.604.089A.75.75 0 0 1 6 .75v4.77h.711a.75.75 0 0 1 0 1.5H3.759a.75.75 0 0 1 0-1.5H4.5V2.15l-.334.223a.75.75 0 0 1-.832-1.248l1.5-1a.75.75 0 0 1 .77-.037Z"></path></svg> Rankings</li>
<li><a href="/stats/gameratings/">Top rated games</a></li>
<li><a href="/badge/13/">Top game owners</a></li>
<li><a href="/stats/toplevels/">Top profile levels</a></li>
<li><a href="/stats/globaltopsellers/">Top selling games</a></li>
<li><a href="/topsellers/">Top selling games last week</a></li>
<li><a href="/stats/mostfollowed/">Most followed games</a></li>
<li><a href="/stats/mostwished/">Most wishlisted games</a></li>
</ul>
<ul>
<li class="navigation-heading"><svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-person" aria-hidden="true"><path d="M10.561 8.073a6.005 6.005 0 0 1 3.432 5.142.75.75 0 1 1-1.498.07 4.5 4.5 0 0 0-8.99 0 .75.75 0 0 1-1.498-.07 6.004 6.004 0 0 1 3.431-5.142 3.999 3.999 0 1 1 5.123 0ZM10.5 5a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"></path></svg> Account</li>
<li><a href="/watching/38640063/">Watch list</a></li>
<li><a href="/sales/?displayOnly=OwnedGames&amp;min_reviews=0&amp;min_rating=0&amp;min_discount=0">Your games</a></li>
<li><a href="/freepackages/">Free packages</a></li>
<li><a href="/user/">Settings</a></li>
<li><a href="/signout/">Sign out</a></li>
<li>&nbsp;</li>
<li><a href="https://steamstat.us/">Steam Status</a></li>
<li><a href="https://steamapi.xpaw.me/">Steam Web API</a></li>
</ul>
<div class="header-disclaimer">SteamDB is a hobby project and is not affiliated with Valve or Steam.<br>All times on the site are UTC.</div>
<div class="header-kbd hide-small"><kbd>M</kbd> toggle this menu <kbd>/</kbd> focus search</div>
</div>
</div>
<div class="header-menu account-menu" hidden>
<ul>
<li><a href="/calculator/76561197998905791/">Your calculator</a></li>
<li><a href="/sales/?displayOnly=OwnedGames&amp;min_reviews=0&amp;min_rating=0&amp;min_discount=0">Your games</a></li>
<li><a href="/watching/38640063/">Watch list</a></li>
<li><a href="/user/">Settings</a></li>
<li><a href="/signout/">Sign out</a></li>
</ul>
</div>
<script nonce="n62c/MbZovFns2szRP+IN+v6WO4=" integrity="sha512-FhlGQY0qc/pbrCIh1yFvjKD4yBTm9E1CnuuATGQSTQJ6MW1MA+azYKSBUSSBfjqNbkT0WaXfDFksI/rylaYMfQ==" src="/static/js/vendor/bugsnag.js?v=161946418d2a73fa"></script>
<script nonce="n62c/MbZovFns2szRP+IN+v6WO4=" integrity="sha512-KdH8H31M4uxaqRFt46s+kEbCNuL1B1DeIE3UB8aUwAuPRK+fjruAaqsMGBanMWTp4nG3L9jlH1JU8/GHbA32QA==" src="/static/js/hover.js?v=29d1fc1f7d4ce2ec" defer></script>
<script nonce="n62c/MbZovFns2szRP+IN+v6WO4=" integrity="sha512-1ybGGSXu45WDVLpQVF82WqtnS2bxLx/FPHJTns9Vs3s6fB+Z9IRphuQHYGo6iv2bFbVXVRuQ2xNJLdKPOMw+bw==" src="/static/js/toast.js?v=d726c61925eee395" defer></script>
<script nonce="n62c/MbZovFns2szRP+IN+v6WO4=" integrity="sha512-54Asi0fh+BQyjP2G5y135RRYrHtTIQJ8JG8I2hH/RB/PR76OwQKfCMave0EwftDgsk8ol/qmj/Q2phGg8kxf9A==" src="/static/js/footer.js?v=e7802c8b47e1f814" defer></script>
<script nonce="n62c/MbZovFns2szRP+IN+v6WO4=" integrity="sha512-2g858q6QL+wHquNAz5ooHXQcRTmk/IndYhPVZaotftnNx7u4A5aZ3rft+31gN1W68zKMt2ivbVtiP2B6hAskLQ==" src="/static/js/global.js?v=da0f39f2ae902fec"></script>
<div class="body-wrap">
<style>
.global-announcement {
    text-align: center;
    color: #fff;
    background-color: hsl(137 55% 25% / 1);
}
</style>
<div class="global-announcement" role="banner">
<div class="container">


Please run our <a href="/tokendumper/">token dumper program</a> to help us keep packages data up to date. <small>ArchiSteamFarm users can type !std ASF</small>
</div>
</div>
<div class="body-content" id="main"><script nonce="n62c/MbZovFns2szRP+IN+v6WO4=" integrity="sha512-S9A+xaXckkrmeGWlaWeUY1vynDrTpT3QfVzDvsJJLJZnl4vQ6yZBYidcqGTWskanxHJobBbH9d/qFOxfCuRPtQ==" src="/static/js/timeago.js?v=4bd03ec5a5dc924a" defer></script>
<script nonce="n62c/MbZovFns2szRP+IN+v6WO4=" integrity="sha512-Qt/GSd9xHe7Vqf5SKYe+WCPeNk6dvMcQpDI4XnkMq4AwBIoffvMw2uVOhiJJAy1NDDpbgCuWFkIfXam6a9+vdA==" src="/static/js/vendor/tablesort.js?v=42dfc649df711dee" defer></script>
<script nonce="n62c/MbZovFns2szRP+IN+v6WO4=" integrity="sha512-lSgsVW7oLJtj08+CcWO7JFmFm+1uOCgCk1XhmiH7pybx79uW1t4KzMOZFszpujp93Bw5dRNSjb3/yKMIdc8+jw==" src="/static/js/tabnav.js?v=95282c556ee82c9b" defer></script>
<script nonce="n62c/MbZovFns2szRP+IN+v6WO4=" integrity="sha512-NO/kzezYPc6pX1+rDDDJgiCLhhmbRbQLssWh5jKQtPZM8KPQYaYferewqcWPr89dA9ucrJKBwl0KudwyempSnQ==" src="/static/js/vendor/diff_match_patch.js?v=34efe4cdecd83dce" defer></script>
<script nonce="n62c/MbZovFns2szRP+IN+v6WO4=" integrity="sha512-hA9mALtVpJAIy64JMN/XVq8zm/AhYCDAUubnoFlZ8mbqYQD5ocNs1shZJD1PYJF3Tn+Ib7wYWGIknIJ4IKG1mA==" src="/static/js/history.js?v=840f6600bb55a490" defer></script>
<script nonce="n62c/MbZovFns2szRP+IN+v6WO4=" integrity="sha512-UqcsgBiF7cN/UKp+yvGvIQk7Zm+RtcMsqaaA3uRPkY+Af3zsC/beYo9Q/IHzglp4XbB9R+5FyMWVSxI8oeT59Q==" src="/static/js/app.js?v=52a72c801885edc3" defer></script>
<script nonce="n62c/MbZovFns2szRP+IN+v6WO4=" integrity="sha512-WOIsaNfcitNmTekdqtelpu5DwoiGM+VQpEklSDM1KuMO7xlNJGHabo6H8W1Bpij21P0X3ACplJhph2es3O0P7g==" src="/static/js/app_extension.js?v=58e22c68d7dc8ad3" defer></script>
<div class="scope-app" itemscope itemtype="http://schema.org/SoftwareApplication" data-appid="1245620" data-charts-type="1" data-default-tab="info">
<meta name="applicationCategory" content="GameApplication">
<meta itemprop="screenshot" content="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/ss_c97bcad291f4f45d4be4594f34bd78921d961099.jpg">
<div class="header-wrapper">
<div class="container">
<div class="pagehead">
<div class="d-flex flex-grow">
<img class="app-icon avatar" src="https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/1245620/b6e290dd5a92ce98f89089a207733c70c41a1871.jpg" alt width="32" height="32">
<h1 itemprop="name">ELDEN RING</h1>
</div>
<div class="pagehead-actions app-links">
<a href="/extension/" id="js-extension-wishlist" class="tooltipped tooltipped-n disabled" aria-label="Install our browser extension to be able
to wishlist on Steam store directly">Wishlist</a>
<a href="/extension/" id="js-extension-follow" class="tooltipped tooltipped-n disabled" aria-label="Install our browser extension to be able
to follow on Steam store directly">Follow</a>
<a href="/extension/" id="js-extension-ignore" class="tooltipped tooltipped-n disabled" aria-label="Install our browser extension to be able
to ignore on Steam store directly">Ignore</a>
<a href="steam://install/1245620" class="tooltipped tooltipped-n" id="js-app-install" aria-label="Launch Steam and try installing this game
steam://install/1245620">
<svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-steam" aria-hidden="true"><path d="M8 0a8 8 0 00-8 7.47c.07.1.13.21.18.32l4.15 1.67a2.2 2.2 0 011.31-.36l1.97-2.8v-.04c0-1.65 1.37-3 3.05-3a3.03 3.03 0 013.05 3 3.03 3.03 0 01-3.12 3l-2.81 1.97c0 .3-.05.6-.17.9a2.25 2.25 0 01-4.23-.37L.4 10.56A8.01 8.01 0 108 0zm2.66 4.27c-1.12 0-2.03.9-2.03 2s.91 1.99 2.03 1.99c1.12 0 2.03-.9 2.03-2s-.9-2-2.03-2zm0 .5c.85 0 1.53.66 1.53 1.49s-.68 1.5-1.53 1.5c-.84 0-1.52-.67-1.52-1.5s.68-1.5 1.52-1.5zM5.57 9.6c-.22 0-.43.04-.62.11l1.02.42c.65.26.95.99.68 1.62-.27.63-1 .93-1.65.67l-1-.4a1.73 1.73 0 003.13-.08c.18-.42.18-.88.01-1.3A1.69 1.69 0 005.57 9.6z" /></svg> <span>Install</span>
</a>
<a href="#" role="button" id="js-watch"><svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-eye" aria-hidden="true"><path d="M8 2c1.981 0 3.671.992 4.933 2.078 1.27 1.091 2.187 2.345 2.637 3.023a1.62 1.62 0 0 1 0 1.798c-.45.678-1.367 1.932-2.637 3.023C11.67 13.008 9.981 14 8 14c-1.981 0-3.671-.992-4.933-2.078C1.797 10.83.88 9.576.43 8.898a1.62 1.62 0 0 1 0-1.798c.45-.677 1.367-1.931 2.637-3.022C4.33 2.992 6.019 2 8 2ZM1.679 7.932a.12.12 0 0 0 0 .136c.411.622 1.241 1.75 2.366 2.717C5.176 11.758 6.527 12.5 8 12.5c1.473 0 2.825-.742 3.955-1.715 1.124-.967 1.954-2.096 2.366-2.717a.12.12 0 0 0 0-.136c-.412-.621-1.242-1.75-2.366-2.717C10.824 4.242 9.473 3.5 8 3.5c-1.473 0-2.825.742-3.955 1.715-1.124.967-1.954 2.096-2.366 2.717ZM8 10a2 2 0 1 1-.001-3.999A2 2 0 0 1 8 10Z"></path></svg> <span id="js-watch-text">Watch</span></a>
</div>
</div>
<div class="row app-row">
<div class="span8">
<table class="table table-bordered table-hover table-responsive-flex">
<tbody>
<tr>
<td class="span3">App ID</td>
<td>1245620</td>
</tr>
<tr>
<td>App Type</td>
<td>Game</td>
</tr>
<tr>
<td>Developer</td>
<td><a href="/developer/FromSoftware+Inc./" itemprop="author" content="FromSoftware Inc.">FromSoftware Inc.</a>
</td>
</tr>
<tr>
<td>Publisher</td>
<td><a href="/publisher/FromSoftware+Inc./" itemprop="publisher" content="FromSoftware Inc.">FromSoftware Inc.</a>, <a href="/publisher/Bandai+Namco+Entertainment/" itemprop="publisher" content="Bandai Namco Entertainment">Bandai Namco Entertainment</a>
</td>
</tr>
<tr>
<td>Franchise</td>
<td><a href="/franchise/Bandai+Namco+Entertainment/">Bandai Namco Entertainment</a>
</td>
</tr>
<tr>
<td>Supported Systems</td>
<td class="os-icons">
<svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-windows" aria-hidden="true"><path d="M0 1h7v7H0zM0 9h7v7H0zM8 9h7v7H8zM8 1h7v7H8z" /></svg> Windows
<span class="tooltipped tooltipped-n" aria-label="Steam Deck: Verified" aria-hidden="true">
<svg width="16" height="16" viewBox="0 0 20 20" class="octicon octicon-steamdeck" aria-hidden="true"><path d="M7.777 4.302a5.698 5.698 0 1 1 0 11.396v3.19a8.889 8.889 0 1 0 0-17.777v3.191Zm0 9.587a3.889 3.889 0 1 0 0-7.778 3.889 3.889 0 0 0 0 7.778Z" /></svg>
<svg width="16" height="16" viewBox="0 0 20 20" class="octicon octicon-steamdeck_verified" aria-hidden="true"><path fill-rule="evenodd" d="M10 19a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-1.667-7.078 6.162-6.155 1.96 1.96-8.122 8.129-5.066-5.073 1.96-1.96 3.106 3.1Z" /></svg>
</span>
<meta itemprop="operatingSystem" content="Windows">
</td>
</tr>
<tr>
<td>Technologies <span class="muted tooltipped tooltipped-n" aria-label="SteamDB automatically detects used technologies from game files.
View all in app info tab."><svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-question" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.92 6.085h.001a.749.749 0 1 1-1.342-.67c.169-.339.436-.701.849-.977C6.845 4.16 7.369 4 8 4a2.756 2.756 0 0 1 1.637.525c.503.377.863.965.863 1.725 0 .448-.115.83-.329 1.15-.205.307-.47.513-.692.662-.109.072-.22.138-.313.195l-.006.004a6.24 6.24 0 0 0-.26.16.952.952 0 0 0-.276.245.75.75 0 0 1-1.248-.832c.184-.264.42-.489.692-.661.103-.067.207-.132.313-.195l.007-.004c.1-.061.182-.11.258-.161a.969.969 0 0 0 .277-.245C8.96 6.514 9 6.427 9 6.25a.612.612 0 0 0-.262-.525A1.27 1.27 0 0 0 8 5.5c-.369 0-.595.09-.74.187a1.01 1.01 0 0 0-.34.398ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg></span></td>
<td><a href="/tech/AntiCheat/EasyAntiCheat/">AntiCheat.EasyAntiCheat</a>, <a href="/tech/SDK/EpicOnlineServices/">SDK.EpicOnlineServices</a>
</td>
</tr>
<tr>
<td>Last Change Number <a href="/faq/#changenumber" class="muted tooltipped tooltipped-n" aria-label="What is a changenumber?"><svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-question" aria-hidden="true"><path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13ZM6.92 6.085h.001a.749.749 0 1 1-1.342-.67c.169-.339.436-.701.849-.977C6.845 4.16 7.369 4 8 4a2.756 2.756 0 0 1 1.637.525c.503.377.863.965.863 1.725 0 .448-.115.83-.329 1.15-.205.307-.47.513-.692.662-.109.072-.22.138-.313.195l-.006.004a6.24 6.24 0 0 0-.26.16.952.952 0 0 0-.276.245.75.75 0 0 1-1.248-.832c.184-.264.42-.489.692-.661.103-.067.207-.132.313-.195l.007-.004c.1-.061.182-.11.258-.161a.969.969 0 0 0 .277-.245C8.96 6.514 9 6.427 9 6.25a.612.612 0 0 0-.262-.525A1.27 1.27 0 0 0 8 5.5c-.369 0-.595.09-.74.187a1.01 1.01 0 0 0-.34.398ZM9 11a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z"></path></svg></a></td>
<td><a href="/changelist/22758623/" rel="nofollow">22758623</a></td>
</tr>
<tr>
<td>Last Record Update</td>
<td>14 March 2024 – 09:04:36 UTC <i class="muted">(<time class="timeago" datetime="2024-03-14T09:04:36+00:00" itemprop="dateModified" content="2024-03-14T09:04:36+00:00"></time>)</i></td>
</tr>
<tr>
<td>Release Date</td>
<td>24 February 2022 – 23:07:00 UTC <i class="muted">(<time class="timeago" datetime="2022-02-24T23:07:00+00:00" itemprop="datePublished" content="2022-02-24"></time>)</i></td>
</tr>
</tbody>
</table>
<nav class="app-links" itemprop="offers" itemscope itemtype="http://schema.org/Offer">
<meta itemprop="availability" content="http://schema.org/OnlineOnly">
<meta itemprop="price" content="59.99">
<meta itemprop="priceCurrency" content="USD">
<a href="https://store.steampowered.com/app/1245620/?curator_clanid=4777282&amp;utm_source=SteamDB" itemprop="url"><svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-steam" aria-hidden="true"><path d="M8 0a8 8 0 00-8 7.47c.07.1.13.21.18.32l4.15 1.67a2.2 2.2 0 011.31-.36l1.97-2.8v-.04c0-1.65 1.37-3 3.05-3a3.03 3.03 0 013.05 3 3.03 3.03 0 01-3.12 3l-2.81 1.97c0 .3-.05.6-.17.9a2.25 2.25 0 01-4.23-.37L.4 10.56A8.01 8.01 0 108 0zm2.66 4.27c-1.12 0-2.03.9-2.03 2s.91 1.99 2.03 1.99c1.12 0 2.03-.9 2.03-2s-.9-2-2.03-2zm0 .5c.85 0 1.53.66 1.53 1.49s-.68 1.5-1.53 1.5c-.84 0-1.52-.67-1.52-1.5s.68-1.5 1.52-1.5zM5.57 9.6c-.22 0-.43.04-.62.11l1.02.42c.65.26.95.99.68 1.62-.27.63-1 .93-1.65.67l-1-.4a1.73 1.73 0 003.13-.08c.18-.42.18-.88.01-1.3A1.69 1.69 0 005.57 9.6z" /></svg> Store</a>
<a href="https://steamcommunity.com/app/1245620/?curator_clanid=4777282&amp;utm_source=SteamDB">Hub</a>
<a href="https://steamcommunity.com/profiles/76561197998905791/gamecards/1245620?curator_clanid=4777282&amp;utm_source=SteamDB" class="tooltipped tooltipped-n" aria-label="View your game cards">
<svg width="16" height="16" viewBox="0 0 16 16" class="octicon" fill-rule="evenodd" aria-hidden="true"><path d="M11.5 3V2a1 1 0 0 0-1-1H1a1 1 0 0 0-1 1v12c0 .6.4 1 1 1h9.5a1 1 0 0 0 1-1v-1H15c.6 0 1-.5 1-1V4c0-.5-.4-1-1-1h-3.5ZM10 2.7H1.5v9.3H10V2.6ZM11.5 4v6.3H15V4h-3.5Z" /></svg>
</a>
<a href="https://pcgamingwiki.com/api/appid.php?appid=1245620&amp;utm_source=SteamDB" class="tooltipped tooltipped-n" aria-label="View article on PCGamingWiki"><svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-book" aria-hidden="true"><path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z"></path></svg> PCGW</a>
<a href="/app/1245620/patchnotes/" class="tooltipped tooltipped-n" aria-label="View patch notes for this game" itemprop="releaseNotes">
<svg width="16" height="16" viewBox="0 0 16 16" class="octicon octicon-megaphone" aria-hidden="true"><path d="M3.25 9a.75.75 0 0 1 .75.75c0 2.142.456 3.828.733 4.653a.122.122 0 0 0 .05.064.212.212 0 0 0 .117.033h1.31c.085 0 .18-.042.258-.152a.45.45 0 0 0 .075-.366A16.743 16.743 0 0 1 6 9.75a.75.75 0 0 1 1.5 0c0 1.588.25 2.926.494 3.85.293 1.113-.504 2.4-1.783 2.4H4.9c-.686 0-1.35-.41-1.589-1.12A16.4 16.4 0 0 1 2.5 9.75.75.75 0 0 1 3.25 9Z"></path><path d="M0 6a4 4 0 0 1 4-4h2.75a.75.75 0 0 1 .75.75v6.5a.75.75 0 0 1-.75.75H4a4 4 0 0 1-4-4Zm4-2.5a2.5 2.5 0 1 0 0 5h2v-5Z"></path><path d="M15.59.082A.75.75 0 0 1 16 .75v10.5a.75.75 0 0 1-1.189.608l-.002-.001h.001l-.014-.01a5.775 5.775 0 0 0-.422-.25 10.63 10.63 0 0 0-1.469-.64C11.576 10.484 9.536 10 6.75 10a.75.75 0 0 1 0-1.5c2.964 0 5.174.516 6.658 1.043.423.151.787.302 1.092.443V2.014c-.305.14-.669.292-1.092.443C11.924 2.984 9.713 3.5 6.75 3.5a.75.75 0 0 1 0-1.5c2.786 0 4.826-.484 6.155-.957.665-.236 1.154-.47 1.47-.64.144-.077.284-.161.421-.25l.014-.01a.75.75 0 0 1 .78-.061Z"></path></svg> Patches
</a>
</nav>
</div>
<div class="span4">
<div class="js-open-screenshot-viewer">
<img src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/header.jpg?t=1710407076" class="app-logo" itemprop="image" alt="ELDEN RING" width="324" height="151">
</div>
<div class="header-two-things">
<a href="/blog/steamdb-rating/" class="header-thing tooltipped tooltipped-n" aria-label="92.66% of the 788,856 user reviews are positive.&#xa;&#xa;SteamDB Rating" itemprop="aggregateRating" itemscope itemtype="http://schema.org/AggregateRating">
<meta itemprop="worstRating" content="0">
<meta itemprop="bestRating" content="100">
<meta itemprop="ratingValue" content="91.95">
<meta itemprop="reviewCount" content="788856">
<div class="header-thing-number header-thing-good">😍 91.95%</div>
<span class="header-thing-good">↑730,980</span> <span class="header-thing-poor">↓57,876</span>
</a>
<a href="/app/1245620/charts/" class="header-thing header-thing-good" id="js-charts-button">
<div class="header-thing-number">72,525</div>
In-Game
</a>
</div>
<div class="header-thing header-thing-categories">
<a href="/search/?a=app&amp;q=&amp;category=2" class="tooltipped tooltipped-n" aria-label="Single-player">
<img src="/static/img/categories/2.png" width="26" height="16" alt>
</a>
<a href="/search/?a=app&amp;q=&amp;category=36" class="tooltipped tooltipped-n" aria-label="Online PvP">
<img src="/static/img/categories/36.png" width="26" height="16" alt>
</a>
<a href="/search/?a=app&amp;q=&amp;category=38" class="tooltipped tooltipped-n" aria-label="Online Co-op">
<img src="/static/img/categories/38.png" width="26" height="16" alt>
</a>
<a href="/search/?a=app&amp;q=&amp;category=22" class="tooltipped tooltipped-n" aria-label="Steam Achievements">
<img src="/static/img/categories/22.png" width="26" height="16" alt>
</a>
<a href="/search/?a=app&amp;q=&amp;category=29" class="tooltipped tooltipped-n" aria-label="Steam Trading Cards">
<img src="/static/img/categories/29.png" width="26" height="16" alt>
</a>
<a href="/search/?a=app&amp;q=&amp;category=23" class="tooltipped tooltipped-n" aria-label="Steam Cloud">
<img src="/static/img/categories/23.png" width="26" height="16" alt>
</a>
<a href="/search/?a=app&amp;q=&amp;category=62" class="tooltipped tooltipped-n" aria-label="Family Sharing">
<img src="/static/img/categories/62.png" width="26" height="16" alt>
</a>
<a href="/search/?a=app&amp;q=&amp;category=1" class="tooltipped tooltipped-n" aria-label="Multi-player">
<img src="/static/img/categories/1.png" width="26" height="16" alt>
</a>
<a href="/search/?a=app&amp;q=&amp;category=49" class="tooltipped tooltipped-n" aria-label="PvP">
<img src="/static/img/categories/49.png" width="26" height="16" alt>
</a>
<a href="/search/?a=app&amp;q=&amp;category=9" class="tooltipped tooltipped-n" aria-label="Co-op">
<img src="/static/img/categories/9.png" width="26" height="16" alt>
</a>
<a href="/search/?a=app&amp;q=&amp;category=28" class="tooltipped tooltipped-n" aria-label="Full Controller Support">
<img src="/static/img/categories/28.png" width="26" height="16" alt>
</a>
</div>
<p class="header-description" itemprop="description">THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.</p>
</div>
</div>
</div>
</div>
</body>
</html>`