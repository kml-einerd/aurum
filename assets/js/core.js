// Core Utilities & State
const Core = {
    async fetchJSON(url) {
        try {
            const response = await fetch(url);
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${url}:`, error);
            return null;
        }
    },

    getSymbolParam() {
        const urlParams = new URLSearchParams(window.location.search);
        let symbol = urlParams.get('symbol') || urlParams.get('tvwidgetsymbol');
        if (symbol) {
            symbol = symbol.replace('BMFBOVESPA:', '').replace('BMFBOVESPA%3A', '');
        }
        return symbol;
    },

    formatCurrency(val) {
        if (typeof val !== 'number') return val;
        return val.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }
};

window.Core = Core;
