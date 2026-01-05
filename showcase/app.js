// ===== AURUM Charts - Main Application =====
// Complete TradingView Lightweight Charts Showcase for Brazilian Stock Market

const { createChart, CandlestickSeries, LineSeries, AreaSeries, BarSeries, BaselineSeries, HistogramSeries, ColorType, CrosshairMode, LineStyle } = LightweightCharts;

// ===== Brazilian Stocks Data =====
const STOCKS = [
    { symbol: 'BBDC4', name: 'Bradesco', sector: 'Financeiro', basePrice: 14.50 },
    { symbol: 'PETR4', name: 'Petrobras', sector: 'Energia', basePrice: 38.20 },
    { symbol: 'ITUB4', name: 'Itaú', sector: 'Financeiro', basePrice: 32.80 },
    { symbol: 'VALE3', name: 'Vale', sector: 'Mineração', basePrice: 68.50 },
    { symbol: 'ABEV3', name: 'Ambev', sector: 'Consumo', basePrice: 12.90 },
    { symbol: 'WEGE3', name: 'WEG', sector: 'Indústria', basePrice: 42.30 },
    { symbol: 'RENT3', name: 'Localiza', sector: 'Locação', basePrice: 55.70 },
    { symbol: 'MGLU3', name: 'Magalu', sector: 'Varejo', basePrice: 2.15 },
    { symbol: 'BBAS3', name: 'BB', sector: 'Financeiro', basePrice: 28.40 },
    { symbol: 'SUZB3', name: 'Suzano', sector: 'Papel', basePrice: 58.90 },
    { symbol: 'GGBR4', name: 'Gerdau', sector: 'Siderurgia', basePrice: 22.50 },
    { symbol: 'VIVT3', name: 'Vivo', sector: 'Telecom', basePrice: 45.80 }
];

// ===== State Management =====
let state = {
    selectedStock: STOCKS[1], // PETR4
    chartType: 'candlestick',
    timeframe: '1M',
    theme: 'dark',
    indicators: { sma: false, ema: false, volume: true, bollinger: false },
    charts: {},
    series: {},
    simulationInterval: null
};

// ===== Chart Theme Configuration =====
const getChartTheme = (theme) => ({
    dark: {
        layout: {
            background: { type: ColorType.Solid, color: '#15151f' },
            textColor: '#a0a0b0',
        },
        grid: {
            vertLines: { color: 'rgba(255, 255, 255, 0.04)' },
            horzLines: { color: 'rgba(255, 255, 255, 0.04)' },
        },
        crosshair: {
            mode: CrosshairMode.Normal,
            vertLine: { color: 'rgba(212, 175, 55, 0.5)', width: 1, style: LineStyle.Dashed },
            horzLine: { color: 'rgba(212, 175, 55, 0.5)', width: 1, style: LineStyle.Dashed },
        },
        rightPriceScale: { borderColor: 'rgba(255, 255, 255, 0.1)' },
        timeScale: { borderColor: 'rgba(255, 255, 255, 0.1)' },
    },
    light: {
        layout: {
            background: { type: ColorType.Solid, color: '#ffffff' },
            textColor: '#1a1a2e',
        },
        grid: {
            vertLines: { color: 'rgba(0, 0, 0, 0.06)' },
            horzLines: { color: 'rgba(0, 0, 0, 0.06)' },
        },
        crosshair: {
            mode: CrosshairMode.Normal,
            vertLine: { color: 'rgba(212, 175, 55, 0.7)', width: 1, style: LineStyle.Dashed },
            horzLine: { color: 'rgba(212, 175, 55, 0.7)', width: 1, style: LineStyle.Dashed },
        },
        rightPriceScale: { borderColor: 'rgba(0, 0, 0, 0.1)' },
        timeScale: { borderColor: 'rgba(0, 0, 0, 0.1)' },
    }
})[theme];

// ===== Data Generation Functions =====
function generateCandleData(basePrice, days = 365, volatility = 0.02) {
    const data = [];
    let currentPrice = basePrice;
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    for (let i = 0; i < days; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);

        // Skip weekends
        if (date.getDay() === 0 || date.getDay() === 6) continue;

        const change = (Math.random() - 0.48) * volatility * currentPrice;
        const open = currentPrice;
        const close = currentPrice + change;
        const high = Math.max(open, close) * (1 + Math.random() * volatility * 0.5);
        const low = Math.min(open, close) * (1 - Math.random() * volatility * 0.5);

        currentPrice = close;

        data.push({
            time: date.toISOString().split('T')[0],
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: parseFloat(close.toFixed(2)),
            volume: Math.floor(Math.random() * 50000000 + 10000000)
        });
    }
    return data;
}

function generateLineData(basePrice, days = 365) {
    const candleData = generateCandleData(basePrice, days);
    return candleData.map(d => ({ time: d.time, value: d.close }));
}

function generateVolumeData(candleData) {
    return candleData.map(d => ({
        time: d.time,
        value: d.volume,
        color: d.close >= d.open ? 'rgba(0, 200, 83, 0.5)' : 'rgba(255, 23, 68, 0.5)'
    }));
}

function calculateSMA(data, period = 20) {
    const result = [];
    for (let i = period - 1; i < data.length; i++) {
        let sum = 0;
        for (let j = 0; j < period; j++) {
            sum += data[i - j].close || data[i - j].value;
        }
        result.push({
            time: data[i].time,
            value: parseFloat((sum / period).toFixed(2))
        });
    }
    return result;
}

function calculateEMA(data, period = 20) {
    const result = [];
    const multiplier = 2 / (period + 1);
    let ema = data[0].close || data[0].value;

    for (let i = 0; i < data.length; i++) {
        const price = data[i].close || data[i].value;
        ema = (price - ema) * multiplier + ema;
        if (i >= period - 1) {
            result.push({
                time: data[i].time,
                value: parseFloat(ema.toFixed(2))
            });
        }
    }
    return result;
}

function calculateBollingerBands(data, period = 20, stdDev = 2) {
    const upper = [];
    const lower = [];
    const middle = calculateSMA(data, period);

    for (let i = period - 1; i < data.length; i++) {
        let sum = 0;
        for (let j = 0; j < period; j++) {
            const price = data[i - j].close || data[i - j].value;
            const ma = middle[i - period + 1]?.value || price;
            sum += Math.pow(price - ma, 2);
        }
        const std = Math.sqrt(sum / period);
        const m = middle[i - period + 1]?.value || 0;

        upper.push({ time: data[i].time, value: parseFloat((m + std * stdDev).toFixed(2)) });
        lower.push({ time: data[i].time, value: parseFloat((m - std * stdDev).toFixed(2)) });
    }

    return { upper, middle, lower };
}

// ===== Stock Data Cache =====
const stockDataCache = {};
function getStockData(symbol) {
    if (!stockDataCache[symbol]) {
        const stock = STOCKS.find(s => s.symbol === symbol);
        stockDataCache[symbol] = generateCandleData(stock.basePrice, 365, 0.025);
    }
    return stockDataCache[symbol];
}

// ===== UI Initialization =====
function initStocksGrid() {
    const grid = document.getElementById('stocksGrid');
    grid.innerHTML = '';

    STOCKS.forEach((stock, index) => {
        const data = getStockData(stock.symbol);
        const lastPrice = data[data.length - 1].close;
        const prevPrice = data[data.length - 2].close;
        const change = ((lastPrice - prevPrice) / prevPrice * 100).toFixed(2);
        const isPositive = change >= 0;

        const card = document.createElement('div');
        card.className = `stock-card ${stock.symbol === state.selectedStock.symbol ? 'active' : ''}`;
        card.innerHTML = `
            <div class="stock-symbol">${stock.symbol}</div>
            <div class="stock-name">${stock.name}</div>
            <div class="stock-price ${isPositive ? 'positive' : 'negative'}">R$ ${lastPrice.toFixed(2)}</div>
            <div class="stock-change ${isPositive ? 'positive' : 'negative'}">${isPositive ? '+' : ''}${change}%</div>
        `;
        card.addEventListener('click', () => selectStock(stock));
        grid.appendChild(card);
    });
}

function selectStock(stock) {
    state.selectedStock = stock;
    document.querySelectorAll('.stock-card').forEach(card => card.classList.remove('active'));
    event.currentTarget.classList.add('active');
    updateMainChart();
    updateChartInfo();
}

function updateChartInfo() {
    const data = getStockData(state.selectedStock.symbol);
    const lastPrice = data[data.length - 1].close;
    const prevPrice = data[data.length - 2].close;
    const change = ((lastPrice - prevPrice) / prevPrice * 100).toFixed(2);
    const isPositive = change >= 0;

    document.getElementById('currentSymbol').textContent = state.selectedStock.symbol;
    document.getElementById('currentName').textContent = state.selectedStock.name;
    document.getElementById('currentPrice').textContent = `R$ ${lastPrice.toFixed(2)}`;
    document.getElementById('currentPrice').className = `chart-price ${isPositive ? 'positive' : 'negative'}`;
    document.getElementById('currentChange').textContent = `${isPositive ? '+' : ''}${change}%`;
    document.getElementById('currentChange').className = `chart-change ${isPositive ? 'positive' : 'negative'}`;
}

// ===== Chart Creation Functions =====
function createChartInstance(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return null;

    container.innerHTML = '';
    const theme = getChartTheme(state.theme);

    return createChart(container, {
        width: container.clientWidth,
        height: container.clientHeight || 400,
        ...theme,
        ...options
    });
}

function initHeroChart() {
    const chart = createChartInstance('heroChart');
    if (!chart) return;

    const data = generateLineData(100, 180);
    const series = chart.addSeries(AreaSeries, {
        lineColor: '#d4af37',
        topColor: 'rgba(212, 175, 55, 0.4)',
        bottomColor: 'rgba(212, 175, 55, 0.0)',
        lineWidth: 2,
    });
    series.setData(data);
    chart.timeScale().fitContent();
    state.charts.hero = chart;
}

function initMainChart() {
    const chart = createChartInstance('mainChart');
    if (!chart) return;

    state.charts.main = chart;
    state.series.main = {};
    updateMainChart();
}

function updateMainChart() {
    const chart = state.charts.main;
    if (!chart) return;

    // Remove existing series
    Object.values(state.series.main || {}).forEach(s => {
        try { chart.removeSeries(s); } catch (e) { }
    });
    state.series.main = {};

    const data = getStockData(state.selectedStock.symbol);

    // Add main series based on chart type
    let mainSeries;
    switch (state.chartType) {
        case 'candlestick':
            mainSeries = chart.addSeries(CandlestickSeries, {
                upColor: '#00c853',
                downColor: '#ff1744',
                borderUpColor: '#00c853',
                borderDownColor: '#ff1744',
                wickUpColor: '#00c853',
                wickDownColor: '#ff1744',
            });
            mainSeries.setData(data);
            break;
        case 'line':
            mainSeries = chart.addSeries(LineSeries, {
                color: '#d4af37',
                lineWidth: 2,
            });
            mainSeries.setData(data.map(d => ({ time: d.time, value: d.close })));
            break;
        case 'area':
            mainSeries = chart.addSeries(AreaSeries, {
                lineColor: '#2196f3',
                topColor: 'rgba(33, 150, 243, 0.4)',
                bottomColor: 'rgba(33, 150, 243, 0.0)',
                lineWidth: 2,
            });
            mainSeries.setData(data.map(d => ({ time: d.time, value: d.close })));
            break;
        case 'bar':
            mainSeries = chart.addSeries(BarSeries, {
                upColor: '#00c853',
                downColor: '#ff1744',
            });
            mainSeries.setData(data);
            break;
        case 'baseline':
            const baseValue = data[Math.floor(data.length / 2)].close;
            mainSeries = chart.addSeries(BaselineSeries, {
                baseValue: { type: 'price', price: baseValue },
                topLineColor: '#00c853',
                topFillColor1: 'rgba(0, 200, 83, 0.3)',
                topFillColor2: 'rgba(0, 200, 83, 0.0)',
                bottomLineColor: '#ff1744',
                bottomFillColor1: 'rgba(255, 23, 68, 0.0)',
                bottomFillColor2: 'rgba(255, 23, 68, 0.3)',
            });
            mainSeries.setData(data.map(d => ({ time: d.time, value: d.close })));
            break;
        case 'histogram':
            mainSeries = chart.addSeries(HistogramSeries, {
                color: '#d4af37',
            });
            mainSeries.setData(data.map(d => ({
                time: d.time,
                value: d.close,
                color: d.close >= d.open ? '#00c853' : '#ff1744'
            })));
            break;
    }
    state.series.main.price = mainSeries;

    // Add indicators
    if (state.indicators.volume) {
        const volumeSeries = chart.addSeries(HistogramSeries, {
            priceFormat: { type: 'volume' },
            priceScaleId: 'volume',
        });
        volumeSeries.priceScale().applyOptions({
            scaleMargins: { top: 0.8, bottom: 0 },
        });
        volumeSeries.setData(generateVolumeData(data));
        state.series.main.volume = volumeSeries;
    }

    if (state.indicators.sma) {
        const smaSeries = chart.addSeries(LineSeries, {
            color: '#ff9800',
            lineWidth: 1,
        });
        smaSeries.setData(calculateSMA(data, 20));
        state.series.main.sma = smaSeries;
    }

    if (state.indicators.ema) {
        const emaSeries = chart.addSeries(LineSeries, {
            color: '#9c27b0',
            lineWidth: 1,
        });
        emaSeries.setData(calculateEMA(data, 20));
        state.series.main.ema = emaSeries;
    }

    if (state.indicators.bollinger) {
        const bb = calculateBollingerBands(data);
        const upperSeries = chart.addSeries(LineSeries, {
            color: 'rgba(33, 150, 243, 0.5)',
            lineWidth: 1,
            lineStyle: LineStyle.Dashed,
        });
        const lowerSeries = chart.addSeries(LineSeries, {
            color: 'rgba(33, 150, 243, 0.5)',
            lineWidth: 1,
            lineStyle: LineStyle.Dashed,
        });
        upperSeries.setData(bb.upper);
        lowerSeries.setData(bb.lower);
        state.series.main.bbUpper = upperSeries;
        state.series.main.bbLower = lowerSeries;
    }

    chart.timeScale().fitContent();
}

// ===== Compare Charts =====
function initCompareCharts() {
    const selects = ['compare1', 'compare2', 'compare3', 'compare4'];
    const defaultStocks = ['PETR4', 'VALE3', 'ITUB4', 'BBDC4'];

    selects.forEach((selectId, index) => {
        const select = document.getElementById(selectId);
        if (!select) return;

        // Populate select
        select.innerHTML = STOCKS.map(s =>
            `<option value="${s.symbol}" ${s.symbol === defaultStocks[index] ? 'selected' : ''}>${s.symbol} - ${s.name}</option>`
        ).join('');

        // Create chart
        const chartId = `compareChart${index + 1}`;
        const chart = createChartInstance(chartId);
        if (!chart) return;

        const data = getStockData(select.value);
        const series = chart.addSeries(AreaSeries, {
            lineColor: ['#d4af37', '#2196f3', '#00c853', '#9c27b0'][index],
            topColor: `rgba(${index === 0 ? '212, 175, 55' : index === 1 ? '33, 150, 243' : index === 2 ? '0, 200, 83' : '156, 39, 176'}, 0.3)`,
            bottomColor: 'transparent',
            lineWidth: 2,
        });
        series.setData(data.map(d => ({ time: d.time, value: d.close })));
        chart.timeScale().fitContent();

        state.charts[chartId] = chart;
        state.series[chartId] = series;

        // Update on change
        select.addEventListener('change', () => {
            const newData = getStockData(select.value);
            series.setData(newData.map(d => ({ time: d.time, value: d.close })));
            chart.timeScale().fitContent();
        });
    });
}

// ===== Advanced Charts =====
function initAdvancedCharts() {
    // Stacked Area (Sector Performance)
    const stackedChart = createChartInstance('stackedChart');
    if (stackedChart) {
        const sectors = ['Financeiro', 'Energia', 'Mineração'];
        const colors = ['#d4af37', '#2196f3', '#00c853'];

        sectors.forEach((sector, i) => {
            const series = stackedChart.addSeries(AreaSeries, {
                lineColor: colors[i],
                topColor: colors[i].replace(')', ', 0.3)').replace('rgb', 'rgba'),
                bottomColor: 'transparent',
                lineWidth: 2,
            });
            series.setData(generateLineData(100 + i * 20, 180));
        });
        stackedChart.timeScale().fitContent();
        state.charts.stacked = stackedChart;
    }

    // Baseline Chart (IBOV Reference)
    const baselineChart = createChartInstance('baselineChart');
    if (baselineChart) {
        const data = generateLineData(120000, 180);
        const baseValue = data[Math.floor(data.length / 2)].value;

        const series = baselineChart.addSeries(BaselineSeries, {
            baseValue: { type: 'price', price: baseValue },
            topLineColor: '#00c853',
            topFillColor1: 'rgba(0, 200, 83, 0.4)',
            topFillColor2: 'rgba(0, 200, 83, 0.0)',
            bottomLineColor: '#ff1744',
            bottomFillColor1: 'rgba(255, 23, 68, 0.0)',
            bottomFillColor2: 'rgba(255, 23, 68, 0.4)',
        });
        series.setData(data);
        baselineChart.timeScale().fitContent();
        state.charts.baseline = baselineChart;
    }

    // Heatmap Style (using histograms)
    const heatmapChart = createChartInstance('heatmapChart');
    if (heatmapChart) {
        const data = [];
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 90);

        for (let i = 0; i < 90; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            if (date.getDay() === 0 || date.getDay() === 6) continue;

            const value = Math.random() * 2 - 1;
            const intensity = Math.abs(value);
            data.push({
                time: date.toISOString().split('T')[0],
                value: value,
                color: value >= 0
                    ? `rgba(0, 200, 83, ${0.3 + intensity * 0.7})`
                    : `rgba(255, 23, 68, ${0.3 + intensity * 0.7})`
            });
        }

        const series = heatmapChart.addSeries(HistogramSeries);
        series.setData(data);
        heatmapChart.timeScale().fitContent();
        state.charts.heatmap = heatmapChart;
    }

    // Waterfall (Cumulative Performance)
    const waterfallChart = createChartInstance('waterfallChart');
    if (waterfallChart) {
        const data = [];
        let cumulative = 0;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - 60);

        for (let i = 0; i < 60; i++) {
            const date = new Date(startDate);
            date.setDate(date.getDate() + i);
            if (date.getDay() === 0 || date.getDay() === 6) continue;

            const change = (Math.random() - 0.45) * 5;
            cumulative += change;
            data.push({
                time: date.toISOString().split('T')[0],
                value: cumulative,
                color: change >= 0 ? '#00c853' : '#ff1744'
            });
        }

        const series = waterfallChart.addSeries(HistogramSeries);
        series.setData(data);
        waterfallChart.timeScale().fitContent();
        state.charts.waterfall = waterfallChart;
    }
}

// ===== Tools Chart =====
function initToolsChart() {
    const chart = createChartInstance('toolsChart', {
        crosshair: {
            mode: CrosshairMode.Normal,
        }
    });
    if (!chart) return;

    const data = getStockData('PETR4');
    const series = chart.addSeries(CandlestickSeries, {
        upColor: '#00c853',
        downColor: '#ff1744',
        borderUpColor: '#00c853',
        borderDownColor: '#ff1744',
        wickUpColor: '#00c853',
        wickDownColor: '#ff1744',
    });
    series.setData(data);

    // Add markers for demo
    const markers = [
        { time: data[data.length - 50].time, position: 'belowBar', color: '#00c853', shape: 'arrowUp', text: 'Compra' },
        { time: data[data.length - 30].time, position: 'aboveBar', color: '#ff1744', shape: 'arrowDown', text: 'Venda' },
        { time: data[data.length - 15].time, position: 'belowBar', color: '#2196f3', shape: 'circle', text: 'Alerta' },
    ];
    series.setMarkers(markers);

    // Add price lines
    const lastPrice = data[data.length - 1].close;
    series.createPriceLine({
        price: lastPrice * 1.05,
        color: '#00c853',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: true,
        title: 'Resistência',
    });
    series.createPriceLine({
        price: lastPrice * 0.95,
        color: '#ff1744',
        lineWidth: 1,
        lineStyle: LineStyle.Dashed,
        axisLabelVisible: true,
        title: 'Suporte',
    });

    chart.timeScale().fitContent();
    state.charts.tools = chart;
    state.series.tools = series;
}

// ===== Realtime Chart =====
function initRealtimeChart() {
    const chart = createChartInstance('realtimeChart');
    if (!chart) return;

    const series = chart.addSeries(CandlestickSeries, {
        upColor: '#00c853',
        downColor: '#ff1744',
        borderUpColor: '#00c853',
        borderDownColor: '#ff1744',
        wickUpColor: '#00c853',
        wickDownColor: '#ff1744',
    });

    // Start with some data
    const initialData = generateCandleData(40, 100);
    series.setData(initialData);
    chart.timeScale().fitContent();

    state.charts.realtime = chart;
    state.series.realtime = series;
    state.realtimeData = initialData;
}

function startSimulation() {
    if (state.simulationInterval) return;

    const statusEl = document.getElementById('simStatus');
    statusEl.textContent = '🔴 Executando...';
    statusEl.classList.add('running');

    state.simulationInterval = setInterval(() => {
        const lastCandle = state.realtimeData[state.realtimeData.length - 1];
        const lastDate = new Date(lastCandle.time);
        lastDate.setDate(lastDate.getDate() + 1);

        // Skip weekends
        while (lastDate.getDay() === 0 || lastDate.getDay() === 6) {
            lastDate.setDate(lastDate.getDate() + 1);
        }

        const change = (Math.random() - 0.48) * 0.02 * lastCandle.close;
        const open = lastCandle.close;
        const close = open + change;
        const high = Math.max(open, close) * (1 + Math.random() * 0.01);
        const low = Math.min(open, close) * (1 - Math.random() * 0.01);

        const newCandle = {
            time: lastDate.toISOString().split('T')[0],
            open: parseFloat(open.toFixed(2)),
            high: parseFloat(high.toFixed(2)),
            low: parseFloat(low.toFixed(2)),
            close: parseFloat(close.toFixed(2)),
        };

        state.realtimeData.push(newCandle);
        state.series.realtime.update(newCandle);
    }, 1000);
}

function stopSimulation() {
    if (state.simulationInterval) {
        clearInterval(state.simulationInterval);
        state.simulationInterval = null;
    }

    const statusEl = document.getElementById('simStatus');
    statusEl.textContent = 'Parado';
    statusEl.classList.remove('running');
}

// ===== Event Listeners =====
function initEventListeners() {
    // Theme Toggle
    document.getElementById('themeSelect')?.addEventListener('change', (e) => {
        state.theme = e.target.value;
        document.documentElement.setAttribute('data-theme', state.theme);
        // Recreate all charts with new theme
        initAllCharts();
    });

    // Chart Type Buttons
    document.querySelectorAll('.chart-type-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.chart-type-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.chartType = btn.dataset.type;
            updateMainChart();
        });
    });

    // Timeframe Buttons
    document.querySelectorAll('.tf-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tf-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.timeframe = btn.dataset.tf;
            // Could filter data based on timeframe
        });
    });

    // Indicator Toggles
    document.getElementById('smaToggle')?.addEventListener('change', (e) => {
        state.indicators.sma = e.target.checked;
        updateMainChart();
    });
    document.getElementById('emaToggle')?.addEventListener('change', (e) => {
        state.indicators.ema = e.target.checked;
        updateMainChart();
    });
    document.getElementById('volumeToggle')?.addEventListener('change', (e) => {
        state.indicators.volume = e.target.checked;
        updateMainChart();
    });
    document.getElementById('bollingerToggle')?.addEventListener('change', (e) => {
        state.indicators.bollinger = e.target.checked;
        updateMainChart();
    });

    // Tool Buttons
    document.querySelectorAll('.tool-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tool-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Simulation Controls
    document.getElementById('startSimulation')?.addEventListener('click', startSimulation);
    document.getElementById('stopSimulation')?.addEventListener('click', stopSimulation);

    // Responsive Resize
    window.addEventListener('resize', debounce(() => {
        Object.entries(state.charts).forEach(([key, chart]) => {
            const container = chart.chartElement().parentElement;
            if (container) {
                chart.applyOptions({
                    width: container.clientWidth,
                    height: container.clientHeight
                });
            }
        });
    }, 250));

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// ===== Utility Functions =====
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Initialize All Charts =====
function initAllCharts() {
    initHeroChart();
    initMainChart();
    initCompareCharts();
    initAdvancedCharts();
    initToolsChart();
    initRealtimeChart();
}

// ===== Main Initialization =====
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 AURUM Charts - Initializing...');

    initStocksGrid();
    initAllCharts();
    initEventListeners();
    updateChartInfo();

    console.log('✅ AURUM Charts - Ready!');
});
