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

    async fetchText(url) {
        try {
            const response = await fetch(url);
            return await response.text();
        } catch (error) {
            console.error(`Error fetching ${url}:`, error);
            return null;
        }
    },

    // Parses a simple comma-separated or text config file with # or // comments
    parseConfig(text) {
        if (!text) return [];
        return text.split('\n')
            .map(line => line.split(/[#\/\/]/)[0].trim()) // Remove comments (# or //)
            .filter(line => line.length > 0) // Remove empty lines
            .map(line => {
                const [ticker, name] = line.split(',').map(item => item.trim());
                return { ticker: ticker.toUpperCase(), name: name || ticker };
            });
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
