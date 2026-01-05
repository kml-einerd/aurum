# 🎫 Ticker Tape (Fita de Tickers)

![Demo do Ticker Tape](screenshots/08-ticker-tape.png)

> **Categoria:** Tickers  
> **Tipo:** Faixa Rolante  
> **Script URL:** `embed-widget-ticker-tape.js`

---

## O que apresenta

Faixa horizontal rolante com múltiplos ativos:
- Símbolo + Preço + Variação
- Cores indicando alta/baixa
- Scroll automático
- Clicável para abrir gráfico

Ideal para headers de páginas e telas de TV.

---

## Contextos de Dados Possíveis

| Contexto | Exemplo | Notas |
|----------|---------|-------|
| 🇧🇷 Ações B3 | PETR4, VALE3, ITUB4... | Principais ações brasileiras |
| 📊 Índices | IBOV, S&P500, DAX... | Índices globais |
| 💱 Forex | USD/BRL, EUR/USD... | Moedas |
| ₿ Crypto | BTC, ETH, BNB... | Criptomoedas |
| 🎯 Mix | Índices + FX + Crypto | Visão diversificada |

---

## Casos de Uso no Lens/Terminal

```
// CONTEXTO: Header do app (sempre visível)
→ Ticker Tape com IBOV, USD/BRL, BTC

// CONTEXTO: Tela de espera / loading
→ Ticker Tape animado com principais ativos

// CONTEXTO: Display de TV para escritório
→ Ticker Tape em fullscreen

// CONTEXTO: Footer de página
→ Ticker Tape compacto
```

---

## Parâmetros Principais

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `symbols` | array | Lista de símbolos |
| `colorTheme` | string | "light" ou "dark" |
| `locale` | string | Idioma |
| `isTransparent` | bool | Fundo transparente |
| `displayMode` | string | "adaptive", "regular", "compact" |
| `showSymbolLogo` | bool | Mostrar logos |

---

## Demo Oficial

- [Gallery](https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape/gallery)

---

## Referência

[Documentação Oficial](https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tape)
