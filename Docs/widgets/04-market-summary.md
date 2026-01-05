# 📋 Market Summary (Resumo de Mercado)

![Demo do Market Summary](screenshots/04-market-summary.png)

> **Categoria:** Watchlists  
> **Tipo:** Visão Consolidada  
> **Script URL:** `embed-widget-market-summary.js`

---

## O que apresenta

Widget que mostra um resumo consolidado de múltiplos mercados em um só lugar:
- Principais índices globais
- Principais ações
- Commodities
- Forex
- Crypto
- Futuros

Cada item mostra: símbolo, preço, variação (% e absoluta), mini-sparkline.

---

## Contextos de Dados Possíveis

| Contexto | Uso | Notas |
|----------|-----|-------|
| 📊 Visão Global | Índices + Commodities + FX | Para overview de mercado |
| 🇧🇷 Mercado BR | IBOV + Principais ações B3 | Foco Brasil |
| 💱 Forex Focus | Principais pares de moedas | Para produto Dólar |
| ₿ Crypto Focus | Top 10 criptos | Para seção cripto |

---

## Casos de Uso no Lens/Terminal

```
// CONTEXTO: Home do app - visão geral do dia
→ Market Summary com índices globais + IBOV + Dólar

// CONTEXTO: Seção "Mercado Global" no feed
→ Market Summary com S&P500, Nasdaq, Euro Stoxx, Nikkei

// CONTEXTO: Produto Dólar - tela inicial
→ Market Summary focado em FX: USD/BRL, EUR/BRL, GBP/BRL

// CONTEXTO: Tela de Commodities
→ Market Summary com Ouro, Petróleo, Soja, Minério
```

---

## Parâmetros Principais

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `width` | string | Largura |
| `height` | number | Altura |
| `colorTheme` | string | "light" ou "dark" |
| `locale` | string | Idioma |
| `isTransparent` | bool | Fundo transparente |

---

## Notas Importantes

- O widget é pré-configurado pelo TradingView
- Os símbolos exibidos são fixos (não customizáveis diretamente)
- Ideal para visão macro do mercado
- Para listas customizadas, use Market Overview ou Market Data

---

## Demo Oficial

Não possui demos específicos na documentação.

---

## Referência

[Documentação Oficial](https://www.tradingview.com/widget-docs/widgets/watchlists/market-summary)
