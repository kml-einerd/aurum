# ✨ Aurum - Inteligência Financeira B3

Sistema simplificado e moderno para análise de ativos da bolsa brasileira (B3) utilizando widgets oficiais do TradingView.

## 🚀 O que mudou?

O projeto foi completamente reorganizado para ser mais modular, performático e fácil de manter. A lógica central agora é baseada em arquivos de configuração que controlam dinamicamente a interface.

## 📂 Estrutura Simplificada

```text
aurum/
├── index.html           # Grade principal de ativos
├── analysis.html        # Página detalhada de análise
├── config/
│   ├── stocks.json      # Lista de ativos da grade principal
│   └── widgets.json     # Ordem e configuração dos widgets na análise
├── assets/
│   ├── js/              # Lógica core, home e analysis
│   └── css/             # Estilo unificado (main.css)
├── iniciar_servidor.sh  # Script para rodar localmente
└── push_github.sh      # Script para subir atualizações p/ GitHub
```

## 🛠️ Como Usar

### 1. Iniciar o Servidor
Execute o script na raiz do projeto:
```bash
./iniciar_servidor.sh
```
Acesse em: [http://localhost:8001](http://localhost:8001)

### 2. Personalizar a Grade de Ativos
Edite `config/stocks.json` para adicionar ou remover empresas da página inicial.

### 3. Personalizar os Widgets (A Central da Aplicação)
Edite `config/widgets.json`. Você pode:
- Alterar a ordem dos widgets movendo os blocos.
- Ativar/Desativar widgets.
- Alterar o layout (Full width ou Grid).

## 📤 Atualizar GitHub

Para subir todas as suas alterações locais de uma vez para o repositório:
```bash
./push_github.sh "Descrição da sua atualização"
```

## ✨ Funcionalidades Key
- **Interceptação Inteligente:** Clicar em qualquer widget ou card redireciona para a página de análise filtrada.
- **Lazy Loading:** Widgets TradingView são carregados de forma assíncrona para melhor performance.
- **Design Premium:** Interface focada em legibilidade e análise técnica profissional.
