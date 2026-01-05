# 🌡️ Forex Heatmap (Mapa de Calor Forex)

![Demo do Forex Heatmap](screenshots/16-forex-heatmap.png)

> **Categoria:** Heatmaps  
> **Tipo:** Força Relativa de Moedas  
> **Script URL:** `embed-widget-forex-heat-map.js`

---

## O que apresenta

Mapa de calor que mostra a força relativa das moedas:
- Cada moeda vs todas as outras
- Cores indicando força (verde) ou fraqueza (vermelho)
- Múltiplos timeframes
- Atualização em tempo real

Diferente do Cross Rates (que mostra taxas), este mostra **força relativa**.

---

## Contextos de Dados Possíveis

| Contexto | Timeframe | Notas |
|----------|-----------|-------|
| ⏱️ Intraday | 1H, 4H | Força de curto prazo |
| 📅 Diário | 1D | Força do dia |
| 📊 Semanal | 1W | Tendência de médio prazo |
| 📈 Mensal | 1M | Tendência de longo prazo |

---

## Casos de Uso no Lens/Terminal

```
// CONTEXTO: Qual moeda está mais forte hoje?
→ Forex Heatmap em timeframe diário

// CONTEXTO: Identificar tendências de longo prazo
→ Forex Heatmap em timeframe mensal

// CONTEXTO: Trading de curto prazo
→ Forex Heatmap em 1H/4H

// CONTEXTO: Análise de dólar
→ Forex Heatmap focando em USD
```

---

## Parâmetros Principais

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `currencies` | array | Lista de moedas |
| `width` | string | Largura |
| `height` | number | Altura |
| `colorTheme` | string | "light" ou "dark" |
| `locale` | string | Idioma |
| `isTransparent` | bool | Fundo transparente |

---

## Referência

[Documentação Oficial](https://www.tradingview.com/widget-docs/widgets/heatmaps/forex-heatmap)
