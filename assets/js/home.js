// Home Page Logic
document.addEventListener('DOMContentLoaded', async () => {
    const text = await Core.fetchText('config/stocks.txt');
    const stocks = Core.parseConfig(text);
    if (!stocks || stocks.length === 0) return;

    renderMarketOverview(stocks);
    renderStockGrid(stocks);
    interceptWidgetClicks();
});

function renderMarketOverview(stocks) {
    const container = document.getElementById('market-overview-container');
    const symbols = stocks.map(s => ({ "s": `BMFBOVESPA:${s.ticker}`, "d": s.name }));

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
        "colorTheme": "dark",
        "dateRange": "12M",
        "showChart": true,
        "locale": "br",
        "largeChartUrl": "http://localhost:8001/analysis.html",
        "isTransparent": true,
        "showSymbolLogo": true,
        "width": "100%",
        "height": "600",
        "tabs": [{ "title": "Ações B3", "symbols": symbols }]
    });
    container.appendChild(script);
}

function renderStockGrid(stocks) {
    const grid = document.getElementById('stock-grid');
    grid.innerHTML = '';

    stocks.forEach(stock => {
        const card = document.createElement('div');
        card.className = 'stock-card-widget';

        // TradingView Mini Chart Widget
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
        script.async = true;
        script.innerHTML = JSON.stringify({
            "symbol": `BMFBOVESPA:${stock.ticker}`,
            "width": "100%",
            "height": 220,
            "locale": "br",
            "dateRange": "12M",
            "colorTheme": "dark",
            "trendLineColor": "rgba(59, 130, 246, 1)",
            "underLineColor": "rgba(59, 130, 246, 0.3)",
            "underLineBottomColor": "rgba(59, 130, 246, 0)",
            "isTransparent": true,
            "autosize": false,
            "largeChartUrl": "http://localhost:8001/analysis.html"
        });

        card.appendChild(script);
        grid.appendChild(card);
    });
}

function navigateToAnalysis(ticker) {
    window.location.href = `analysis.html?symbol=${ticker}`;
}

// Click Interception
function interceptWidgetClicks() {
    // If the widget redirects to the same page with a parameter, we catch it
    const params = new URLSearchParams(window.location.search);
    const symbol = params.get('tvwidgetsymbol') || params.get('symbol');
    if (symbol) {
        navigateToAnalysis(symbol);
    }
}
