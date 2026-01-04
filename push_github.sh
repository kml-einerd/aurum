#!/bin/bash

# Cores para o terminal
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}  📤 ENVIANDO ATUALIZAÇÕES PARA O GITHUB${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
echo ""

# Ir para o diretório do projeto
cd "$(dirname "$0")"

# 1. Adicionar todos os arquivos (incluindo deleções e novos)
echo -e "${YELLOW}🔍 Preparando arquivos...${NC}"
git add .

# 2. Criar o commit com mensagem automática
# Se o usuário passou um argumento, usa como mensagem. Senão, usa padrão.
COMMIT_MSG=${1:-"Refactor: Reorganização completa do projeto Aurum (Limpeza e Simplificação)"}
echo -e "${YELLOW}📝 Criando commit: ${NC}$COMMIT_MSG"
git commit -m "$COMMIT_MSG"

# 3. Empurrar para o GitHub
echo -e "${YELLOW}🚀 Subindo para o branch main...${NC}"
git push origin main

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
    echo -e "${GREEN}  ✅ SUCESSO! Projeto atualizado no GitHub.${NC}"
    echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
else
    echo ""
    echo -e "\033[0;31m❌ ERRO: Falha ao enviar para o GitHub. Verifique sua conexão ou permissões.\033[0m"
fi
echo ""
