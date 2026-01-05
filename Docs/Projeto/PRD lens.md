## PDR — **Aurum Lens (Terminal de Perguntas → Dashboards + Análise)**

### 0) Contexto e premissas

* O **Lens** é um produto separado (pode aparecer **bloqueado** dentro dos outros produtos).
* O Lens recebe **linguagem natural**, confirma entendimento e entrega uma “página/resposta” composta por:

  1. **Widgets TradingView** (gráficos, heatmaps, screeners, etc.)
  2. **Blocos de texto gerados por IA** (explicações, contexto e leitura do que os widgets mostram)
* Os widgets da TradingView podem ser embutidos via **iframe** ou **Web Components**. ([TradingView][1])
* Widgets vêm com **dados embutidos da TradingView** (sem você ter que fornecer API própria), mas a disponibilidade de **tempo real vs delay** depende do mercado/dados. ([TradingView][1])

---

## 1) Problema que o Lens resolve (Job-to-be-done)

**Para leigos:** “Eu não sei o que olhar. Eu só sei o que eu quero descobrir.”
O Lens transforma **perguntas humanas** em:

* uma **visualização certa** (widgets adequados, sem excesso),
* uma **leitura objetiva** do que está acontecendo,
* e um caminho claro de “o que investigar a seguir” (sem recomendar compra/venda).

---

## 2) Objetivos (o que define sucesso)

1. **Tempo até valor:** usuário faz 1 pergunta e entende algo útil em < 60s.
2. **Clareza sem jargão:** 80% dos usuários conseguem repetir “o que aprendi” sem termos técnicos.
3. **Precisão operacional:** a seleção de widgets “faz sentido” (baixa taxa de “não era isso”).
4. **Escala:** o custo marginal por resposta é baixo (cache, reaproveitamento, componentes).
5. **Conversão natural:** Lens bloqueado vira o principal motor de upgrade (sem fricção feia).

**Não-objetivos (v1):**

* Execução de ordens / roteamento de investimento.
* “Recomendação” direta (compra/venda). O Lens é análise e leitura.

---

## 3) Catálogo de “Blocos” do Lens (peças que ele pode montar)

### 3.1 Widgets TradingView (biblioteca oficial)

O Lens escolhe entre categorias reais do ecossistema TradingView Widgets: ([TradingView][2])

**A) Charts (gráficos)**

* **Advanced Real-Time Chart** (principal gráfico completo) ([TradingView][3])
* **Symbol Overview** (visão rápida + gráfico simples) ([TradingView][4])

**B) Symbol Details (detalhes do ativo)**

* **Company Profile** (descrição, setor/indústria) ([TradingView][5])
* **Fundamental Data** (fundamentos) ([TradingView][6])
* **Technical Analysis** (ratings/gauges) ([TradingView][7])

**C) Watchlists / visão macro**

* **Market Overview** (macro, bom para home) ([TradingView][8])
* **Market Data** (performance e OHLC de instrumentos selecionados) ([TradingView][9])
* **Market Summary** (resumo) ([TradingView][10])

**D) Heatmaps**

* **Stock Heatmap** ([TradingView][11])
* **Forex Heatmap** ([TradingView][12])
* **ETF Heatmap** (inclui filtros como dividend yield, AUM, etc.) ([TradingView][13])
* **Forex Cross Rates** ([TradingView][14])

**E) Screeners**

* **Screener** (filtragem por critérios) ([TradingView][15])

**F) News**

* **Top Stories** ([TradingView][16])

**G) Calendars**

* **Economic Calendar** ([TradingView][17])

**H) Economics**

* **Economic Map** ([TradingView][18])

**I) Tickers**

* **Ticker Tag** (pílula inline que expande) ([TradingView][19])
* Tickers em geral (tape, single, etc.) ([TradingView][16])

**J) Brokers (para “parceiro regulado”, se fizer sentido no seu modelo)**

* **Broker Rating** / **Broker Reviews** ([TradingView][20])
  *(observação: Broker Rating tem requisito de CSP para imagens via blob em certos cenários) ([TradingView][20])*

---

## 4) Experiência do Lens (fluxo principal)

### 4.1 Entrada (Natural Language)

**Campo único** (estilo “pesquisa”) com exemplos em chips:

* “Quero as ações do setor X com preço médio até Y”
* “Compare PETR4 vs VALE3”
* “Mostre um mapa do mercado hoje”
* “O que está mexendo com dólar e juros?”

### 4.2 Entendimento + Confirmação (obrigatório)

O Lens sempre gera um “cartão de entendimento” antes de montar a tela final:

**Entendi que você quer:**

* Universo: (Brasil / EUA / Global)
* Recorte: (setor, faixa de preço, liquidez, dividendos, etc.)
* Forma de ver: (lista, comparação, mapa/heatmap, macro + detalhes)
* Nível: (rápido / detalhado)

**Botões:**

* ✅ “Isso mesmo”
* ✏️ “Ajustar” (abre controles simples, sem jargão)

> Regra: se tiver ambiguidade (ex.: “ações baratas” sem país), o Lens pergunta 1 coisa só.

### 4.3 Montagem da Resposta (Layout por complexidade)

O Lens decide o *mínimo* de widgets que resolvem.

**Nível 1 — 1 ativo**

* 1 gráfico (Advanced Chart ou Symbol Overview) + 2–3 detalhes (Company Profile + Fundamental Data + Technical Analysis) ([TradingView][3])

**Nível 2 — 2 a 5 ativos**

* Comparação: 1 bloco de visão geral + 1 bloco comparativo (lista/screener/quotes) + mini-charts quando necessário. ([TradingView][15])

**Nível 3 — muitos ativos / setor / “panorama”**

* Começa com heatmap (Stock/ETF/Forex) e só depois aprofunda em 1–3 ativos “representativos”. ([TradingView][11])

**Nível 4 — macro + contexto**

* Market Overview/Data + Economic Calendar + (opcional) Economic Map, se a pergunta for macro. ([TradingView][8])

### 4.4 Texto gerado por IA (sem “alucinar”)

O texto do Lens **não inventa dados fora do que aparece nos widgets**.
Ele funciona em 3 camadas:

1. **O que os widgets mostram (descritivo)**
2. **Como interpretar (educacional, simples)**
3. **Perguntas de próximo passo (investigação)**

---

## 5) IA do Lens: regras de segurança e compliance

* Proibido: “compre / venda / entre agora / retorno garantido”.
* Permitido: “o ativo apresenta X e Y; isso *pode* indicar Z; riscos: A/B/C; o que olhar a seguir: …”
* Sempre exibir: “conteúdo educacional e de análise; não é recomendação”.

---

## 6) UI/UX (mobile-first) — tela do Lens (padrão)

### Estrutura base da tela “Resposta do Lens”

1. **Header compacto**: pergunta + “Editar”
2. **Resumo em 2 linhas**: “Você pediu: …” + filtros aplicados (chips)
3. **Bloco 1: Widget principal** (um só, grande)
4. **Bloco 2: Widgets secundários** (cards empilhados)
5. **Bloco 3: Texto IA** (curto, escaneável, bullets)
6. **Bloco 4: Próximas explorações** (chips)
7. **Rodapé**: “Salvar visão” (gera um “Lens Card” para voltar depois)

### Padrões de interação

* Tap em qualquer widget abre “**Modo Foco**” (full screen).
* “Comparar” vira ação contextual (seleciona 2–5 símbolos e pede ao Lens).
* Sempre mostrar “de onde veio” a estrutura: (ex.: “Usei Heatmap + Screener porque você pediu muitos ativos”).

---

## 7) Estados de acesso (bloqueio e upsell nativo)

O Lens aparece sempre, mas:

* **Sem Lens (bloqueado):** usuário vê:

  * o campo de pergunta (para criar desejo),
  * uma “prévia” (ex.: skeleton + 1 card exemplo),
  * e CTA: “Desbloquear Lens / Terminal”.
* **Com Lens:** tudo funciona + “Salvar visões”.

**Cross-sell dentro do Lens**

* Se o usuário está no produto “Renda Vitalícia”, e pergunta algo típico de “Segundo Salário em Dólar”, o Lens:

  1. responde o que dá com o que ele tem,
  2. mostra um bloco “Você destrava mais profundidade com: Dólar”.

---

## 8) Requisitos técnicos (essenciais para v1)

* Suportar **iframe e Web Components** (decisão por widget/categoria). ([TradingView][1])
* “Widget Budget”: limite de widgets por resposta (performance).
* Cache de respostas por (pergunta normalizada + filtros) para reduzir custo e latência.
* Observabilidade: logs de intenção detectada, widgets escolhidos, taxa de “Ajustar”.

---

## 9) Métricas (instrumentação)

* **Activation:** % que faz 1 pergunta e confirma entendimento.
* **Success:** % que não clica “Ajustar” depois da confirmação.
* **Time-to-Insight:** tempo até o usuário rolar e abrir 1 widget em foco.
* **Upgrade:** CTR do Lens bloqueado → compra.
* **Retention:** usuários que salvam ≥1 “Lens Card” e retornam.

---

## 10) Decisão estratégica: manter ou matar o Lens?

**Manter (recomendado) se:**

* Ele vira o “Google do mercado” para leigos (uma pergunta → uma tela clara).
* Ele é o melhor motor de upgrade, porque a pessoa *sente* a lacuna quando está bloqueado.

**Matar (só se):**

* A seleção de widgets ficar confusa demais para leigos (alto “Ajustar” e abandono), ou
* o custo/performance ficar inviável sem simplificar.

O caminho correto não é matar: é **reduzir liberdade** com “modos” (Rápido / Detalhado) e “modelos” (Ativo / Comparação / Setor / Macro), sempre com confirmação.

---

[1]: https://www.tradingview.com/widget-docs/getting-started/?utm_source=chatgpt.com "Your Starting Point For Financial Widgets"
[2]: https://www.tradingview.com/widget-docs/widgets/?utm_source=chatgpt.com "Financial Widgets Collection"
[3]: https://www.tradingview.com/widget-docs/widgets/charts/advanced-chart/?utm_source=chatgpt.com "Advanced Chart: Widget Code & Settings"
[4]: https://www.tradingview.com/widget-docs/widgets/charts/?utm_source=chatgpt.com "Chart Widgets. Explore, Set Up, Embed"
[5]: https://www.tradingview.com/widget-docs/widgets/symbol-details/company-profile/?utm_source=chatgpt.com "Company Profile: Widget Code & Settings"
[6]: https://www.tradingview.com/widget-docs/widgets/symbol-details/fundamental-data/?utm_source=chatgpt.com "Fundamental Data: Widget Code & Settings"
[7]: https://www.tradingview.com/widget-docs/widgets/symbol-details/technical-analysis/?utm_source=chatgpt.com "Technical Analysis: Widget Code & Settings"
[8]: https://www.tradingview.com/widget-docs/widgets/watchlists/market-overview/?utm_source=chatgpt.com "Market Overview: Widget Code & Settings"
[9]: https://www.tradingview.com/widget-docs/widgets/watchlists/market-quotes/?utm_source=chatgpt.com "Market Data: Widget Code & Settings"
[10]: https://www.tradingview.com/widget-docs/widgets/watchlists/market-summary/?utm_source=chatgpt.com "Market Summary: Widget Code & Settings"
[11]: https://www.tradingview.com/widget-docs/widgets/heatmaps/stock-heatmap/?utm_source=chatgpt.com "Stock Heatmap: Widget Code & Settings"
[12]: https://www.tradingview.com/widget-docs/widgets/heatmaps/forex-heatmap/?utm_source=chatgpt.com "Forex Heatmap: Widget Code & Settings"
[13]: https://www.tradingview.com/widget-docs/widgets/heatmaps/?utm_source=chatgpt.com "Heatmap Widgets. Explore, Set Up, Embed"
[14]: https://www.tradingview.com/widget-docs/widgets/heatmaps/forex-cross-rates/?utm_source=chatgpt.com "Forex Cross Rates: Widget Code & Settings"
[15]: https://br.tradingview.com/widget-docs/widgets/screeners/screener/?utm_source=chatgpt.com "Screener: Widget Code & Settings"
[16]: https://www.tradingview.com/widget/?utm_source=chatgpt.com "Free Financial Widgets: Stocks, Crypto & More"
[17]: https://www.tradingview.com/widget-docs/widgets/calendars/?utm_source=chatgpt.com "Calendar Widgets. Explore, Set Up, Embed"
[18]: https://www.tradingview.com/widget-docs/widgets/economics/economic-map/?utm_source=chatgpt.com "Economic Map: Widget Code & Settings"
[19]: https://www.tradingview.com/widget-docs/widgets/tickers/ticker-tag/?utm_source=chatgpt.com "Ticker Tag: Widget Code & Settings"
[20]: https://www.tradingview.com/widget-docs/widgets/brokers/rating "Broker Ratings: Widget Code & Settings — TradingView"


---

# 1) Backlog de épicos (MVP → V1)

## MVP (colocar no ar com conversão e utilidade real)

### ÉPICO M0 — Fundamentos do produto (Entitlements + Paywalls)

**Objetivo:** o app saber exatamente o que liberar/bloquear e como vender sem quebrar a experiência.
**Inclui:**

* Entitlements: `SUB_TERMINAL`, `SUB_VITALICIA`, `SUB_DOLAR`, etc.
* Estados: Sem assinatura / 1 produto / 1 produto+Lens / multi-produtos / tudo.
* Paywall contextual (Produto irmão) e Paywall Lens.
  **Critérios de aceite:**
* Se usuário não tem Lens: Lens abre em **Demo** e oferece upgrade.
* Se usuário tem só Vitalícia: pedidos “Dólar” mostram **preview + paywall do Dólar**.

---

### ÉPICO M1 — Parser de intenção + Confirmação “Entendi assim”

**Objetivo:** linguagem natural virar intenção + parâmetros com baixa taxa de erro.
**Inclui:**

* Detecção de intenção (5 modos): **Explorar / Comparar / Entender 1 ativo / Mapa / Contexto**
* Extração de parâmetros: mercado (BR/EUA/Global), universo (setor), quantidade (1 vs muitos), foco (renda/crescimento/risco), filtros (faixa preço/variação etc.)
* **Cartão de confirmação** com ✅ “Isso” e ✏️ “Ajustar”
* “Ajustar” com 3 controles simples (chips): Universo / Escopo / Foco
  **Critérios de aceite:**
* 1 pergunta → sempre gera 1 confirmação clara em 1 tela.
* Ambiguidade dispara **1 pergunta curta** no máximo.

---

### ÉPICO M2 — Roteador de widgets (Widget Orchestrator)

**Objetivo:** Lens escolher **apenas os widgets necessários** para cada pedido.
**Inclui:**

* Biblioteca interna de widgets (TV): heatmap, screener, market overview/data, symbol details (perfil/fundamentos/técnico), chart, news, calendar, economic map.
* Regras: “1 widget principal + até 3 secundários” (mobile).
* “Widget budget” por resposta (performance).
  **Critérios de aceite:**
* Para “1 ação”: renderiza **1 gráfico + 2–3 detalhes**.
* Para “muitas ações”: renderiza **heatmap OU screener** (não ambos sempre).

---

### ÉPICO M3 — Canvas da resposta (widgets + texto IA)

**Objetivo:** depois do ✅ “Isso”, renderizar uma tela bonita e escaneável.
**Inclui:**

* Layout padrão (sempre igual): Resumo → Widget principal → Widgets secundários → Texto IA → Próximos passos
* Texto IA em 3 camadas colapsáveis: Resumo / Interpretação / Riscos
* Texto ancorado: “afirmação importante” precisa apontar para um dado/visível
  **Critérios de aceite:**
* Sem “parede de texto”: resumo limitado.
* Sempre existe 1 CTA: “Virar radar / Comparar / Abrir detalhe”.

---

### ÉPICO M4 — Drill-down (Foco do widget + Comparação rápida)

**Objetivo:** tocar em qualquer widget abrir “Modo Foco” sem perder contexto.
**Inclui:**

* Focus Mode (full screen) para gráfico/screener/heatmap
* Ação “Comparar” (selecionar 2–3 símbolos) → gera visão comparativa
  **Critérios de aceite:**
* Voltar do foco retorna no mesmo scroll.
* Comparação funciona sem refazer tudo.

---

### ÉPICO M5 — Salvar e voltar (Lens Cards)

**Objetivo:** Lens criar hábito e retenção.
**Inclui:**

* “Salvar visão” → cria um **Lens Card** (com título, filtros, data, produto)
* Lista “Recentes” dentro do Lens
* Atualização (re-run) com 1 toque
  **Critérios de aceite:**
* Usuário salva e abre de novo com 1 toque.
* Card mostra “mudou / não mudou” desde a última vez (simples).

---

### ÉPICO M6 — Observabilidade + Analytics (mínimo viável)

**Objetivo:** medir erro de entendimento e funil de upgrade.
**Eventos mínimos:**

* `lens_open`, `lens_query_submit`, `lens_confirm_yes/no`, `lens_adjust_open`
* `lens_widget_rendered(type)`, `lens_focus_open`, `lens_save`
* `paywall_view(type)`, `paywall_cta_click`, `purchase_success`
  **Critérios de aceite:**
* Dashboard interno mostra taxa de “Ajustar” por intenção.

---

## V1 (refinar, escalar e tornar “inevitável”)

### ÉPICO V1.1 — Personalização leve (sem assustar leigo)

* Preferências: BR/EUA/Global padrão, nível (Rápido/Detalhado)
* “Lentes favoritas” (pin)
* Reordenação de blocos (limitada)
  **Aceite:** reduz “Ajustar” e aumenta “Salvar”.

---

### ÉPICO V1.2 — Templates de painéis (promessas prontas)

* Templates fixos por produto: Vitalícia/Dólar/Multiplica/Aluguel/Fluxo
* Cada template com “perguntas rápidas” (chips) que montam Canvas pronto
  **Aceite:** usuário leigo consegue usar sem digitar.

---

### ÉPICO V1.3 — Upsell inteligente dentro do Lens (produto irmão + bundles)

* Se pedido exige dataset/tema de produto não comprado: mostrar preview + “desbloquear”
* Ofertas: “desbloquear Dólar” ou “bundle Vitalícia + Dólar”
  **Aceite:** melhora conversão sem aumentar churn.

---

### ÉPICO V1.4 — Performance (produção pesada)

* Lazy-load por bloco
* Cache por “consulta normalizada”
* Pre-render skeletons
  **Aceite:** TTI (time-to-interactive) consistente e sem travar.

---

### ÉPICO V1.5 — Conteúdo educacional contextual (puxar Aprender)

* Botão “Aprender isso em 3 min” dentro do Lens
* Volta do vídeo/aula mantendo contexto do Lens
  **Aceite:** aumenta retenção e entendimento.

---

### ÉPICO V1.6 — Guardrails / Compliance (robusto)

* “Fato vs Interpretação” padronizado
* Frases proibidas + revisão automática de texto
* Logs de fontes e snapshot
  **Aceite:** reduz risco e retrabalho editorial.

---

# 2) Wireframe textual — Tela do Lens (mobile-first)

## 2.1 Lens (estado bloqueado) — “Demo Mode”

```
[Top Bar]
Aurum Lens (bloqueado)                  [X]

[Input]
“Pergunte qualquer coisa sobre o mercado…”
[ Ex: “Compare PETR4 e VALE3” ]

[Chips de exemplos]
• “O que mexeu hoje?”  • “Mapa do mercado”  • “Setor X até R$Y”  • “Entender 1 ação”

[Demo Card]
🔒 Veja como o Lens monta um painel ao vivo
[Botão] Rodar demo (grátis)

[Demo Preview]
- 1 widget principal (blur parcial)
- 2 cards de texto (resumo + riscos)
[CTA] Desbloquear Aurum Lens

[Rodapé]
“Você pode usar o app sem o Lens — o Lens acelera e organiza.”
```

## 2.2 Lens (entrada liberada) — “Home do Lens”

```
[Top Bar]
Aurum Lens                            [Histórico] [X]

[Contexto ativo]
Produto ativo: Vitalícia   [Trocar ▾]   (irmãos aparecem 🔒)

[Input]
“Digite sua pergunta…”
[Botão] Enviar

[Chips rápidos]
• Explorar setor
• Comparar 2 ações
• Entender 1 ação
• Ver mapa (heatmap)
• Macro (dólar/juros)

[Recentes]
- Card: “Setor elétrico até R$ X”  (Salvo)  [Abrir]
- Card: “Compare PETR4 vs VALE3”            [Abrir]
```

## 2.3 Confirmação — “Entendi assim” (sheet)

```
[Sheet]
Entendi que você quer:

Universo: Brasil • Setor Elétrico
Escopo: Muitas ações (lista)
Filtro: Preço até R$ X
Forma: Lista + visual (mapa)
Nível: Rápido

[✅ Isso mesmo]   [✏️ Ajustar]

(Ajustar abre 3 controles simples)
Universo: BR / EUA / Global
Escopo: 1 ativo / 2-3 / Lista / Mapa
Foco: renda / crescimento / risco / contexto
```

## 2.4 Resposta do Lens — Canvas (padrão)

**Regra Jobs:** sempre começa com **Resumo + 1 visual principal**.

```
[Top Bar]
← Voltar     “Setor elétrico até R$ X”     [Editar]

[Filtros aplicados (chips)]
BR • Elétrico • ≤ R$ X • Lista • Rápido

[Bloco 0 — Resumo IA (máx 5 linhas)]
“Encontrei N empresas no recorte. O grupo está [x] hoje e os destaques são [y].”
[Ver “Como interpretar” ▾]   [Ver “Riscos” ▾]

[Bloco 1 — Widget Principal (um só)]
(Escolha automática)
- Se muitos ativos: HEATMAP ou SCREENER
- Se 1 ativo: SYMBOL OVERVIEW / CHART

[Bloco 2 — Widgets Secundários (cards empilhados)]
[Card Widget] Screener (filtrado)  [Abrir em foco]
[Card Widget] Top Stories          [Ler]
[Card Widget] Calendar (se macro)  [Abrir]

[Bloco 3 — “O que isso significa” (bullets)]
• 3 pontos objetivos
• 2 riscos/limites
• 1 “o que observar”

[Bloco 4 — Próximos passos (chips)]
• “Comparar 2–3 nomes”
• “Abrir detalhes do #1”
• “Salvar como radar”
• “Ver isso em modo detalhado”

[Rodapé fixo]
[Salvar visão]   [Salvar como radar]   [Compartilhar]
```

## 2.5 Modo Foco (full screen de um widget)

```
[Top Bar]
←     Screener (Elétrico ≤ R$ X)      [⋯]

[Widget em tela cheia]
(screener / heatmap / chart)

[Ações rápidas]
[Selecionar 2–3 para comparar]
[Fixar no Radar]
[Adicionar ao acompanhar]
```

## 2.6 Caso de produto irmão bloqueado (ex.: pedir Dólar dentro de Vitalícia)

```
[Canvas]
Resumo IA: “Posso te explicar o conceito…”
[Widget principal] (preview blur parcial)

🔒 Para montar este painel completo você precisa de: “Segundo Salário em Dólar”
- O que você ganha (3 bullets)
- Por que complementa Vitalícia (1 frase)
[Ver prévia]   [Desbloquear Dólar]
```

## 2.7 Caso Lens bloqueado ao tentar “Gerar painel” (de qualquer lugar)

```
[Demo Lens]
3 prompts prontos + preview parcial
[CTA] Desbloquear Aurum Lens
[Voltar]
```

---
