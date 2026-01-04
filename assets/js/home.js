// Home Page Logic
document.addEventListener('DOMContentLoaded', async () => {
    const stocks = await Core.fetchJSON('config/stocks.json');
    if (!stocks) return;

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
    grid.innerHTML = stocks.map(stock => `
        <div class="stock-card" onclick="navigateToAnalysis('${stock.ticker}')">
            <div class="stock-card-header">
                <div class="stock-info">
                    <div class="stock-ticker">${stock.ticker}</div>
                    <div class="stock-name">${stock.name}</div>
                </div>
            </div>
            <div class="stock-price">R$ ${stock.price.toFixed(2)}</div>
            <span class="stock-change ${stock.change >= 0 ? 'positive' : 'negative'}">
                ${stock.change >= 0 ? '▲' : '▼'} ${Math.abs(stock.change)}%
            </span>
            <div class="stock-meta">
                <div class="stock-meta-item">
                    <div class="meta-label">Volume</div>
                    <div class="meta-value">${stock.volume}</div>
                </div>
                <div class="stock-meta-item">
                    <div class="meta-label">Market Cap</div>
                    <div class="meta-value">${stock.marketCap}</div>
                </div>
            </div>
            <span class="stock-sector">${stock.sector}</span>
        </div>
    `).join('');
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
