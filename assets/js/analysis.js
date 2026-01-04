// Analysis Page Logic
document.addEventListener('DOMContentLoaded', async () => {
    const symbol = Core.getSymbolParam() || 'PETR4';
    const fullSymbol = `BMFBOVESPA:${symbol}`;

    // Update input display
    document.getElementById('symbolInput').value = symbol;

    // Load Widgets Config (The central "Doc")
    const widgets = await Core.fetchJSON('config/widgets.json');
    if (!widgets) return;

    renderWidgets(widgets, fullSymbol);

    // Set up search
    document.getElementById('searchBtn').onclick = () => {
        const input = document.getElementById('symbolInput').value.trim().toUpperCase();
        if (input) window.location.href = `analysis.html?symbol=${input}`;
    };

    document.getElementById('symbolInput').onkeypress = (e) => {
        if (e.key === 'Enter') document.getElementById('searchBtn').click();
    };
});

async function renderWidgets(widgets, symbol) {
    const wrapper = document.getElementById('widgets-wrapper');
    wrapper.innerHTML = '';

    // The order here is strictly defined by the order in widgets.json
    for (const widget of widgets) {
        const container = document.createElement('div');
        container.className = `widget-wrapper ${widget.fullWidth ? 'full-width' : ''}`;
        container.id = `widget-${widget.id}`;

        container.innerHTML = `<div class="widget-title">${widget.title}</div><div class="widget-content" id="content-${widget.id}"></div>`;
        wrapper.appendChild(container);

        loadWidgetContent(widget, symbol);
    }
}

function loadWidgetContent(widget, symbol) {
    const contentDiv = document.getElementById(`content-${widget.id}`);

    if (widget.type === 'tradingview') {
        const config = { ...widget.config, symbol: symbol };
        const script = document.createElement('script');
        script.src = widget.scriptUrl;
        script.async = true;
        script.innerHTML = JSON.stringify(config);
        contentDiv.appendChild(script);
    } else if (widget.type === 'news') {
        renderNewsWidget(contentDiv, symbol, widget.config);
    }
}

async function renderNewsWidget(container, symbol, config) {
    const ticker = symbol.split(':')[1] || symbol;
    const rss = `https://news.google.com/rss/search?q=${ticker}+ações+brasil&hl=pt-BR&gl=BR&ceid=BR:pt-419`;
    const api = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`;

    try {
        container.innerHTML = '<div class="skeleton" style="height: 300px; border-radius: 8px; margin: 20px;"></div>';
        const res = await fetch(api).then(r => r.json());

        if (res.status === 'ok') {
            const list = document.createElement('div');
            list.className = 'news-list';

            res.items.slice(0, config.count || 5).forEach(item => {
                const date = new Date(item.pubDate).toLocaleDateString('pt-BR');
                list.innerHTML += `
                    <a href="${item.link}" target="_blank" class="news-item">
                        <span class="news-source">${item.author || 'Google News'}</span>
                        <h4 class="news-title">${item.title}</h4>
                        <span class="news-date">${date}</span>
                    </a>
                `;
            });
            container.innerHTML = '';
            container.appendChild(list);
        } else {
            container.innerHTML = '<p style="padding: 20px; color: var(--text-secondary);">Sem notícias recentes.</p>';
        }
    } catch (e) {
        container.innerHTML = '<p style="padding: 20px; color: var(--accent-red);">Erro ao carregar notícias.</p>';
    }
}
