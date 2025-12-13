#!/bin/bash

# Script para converter fotos para o formato da seção STAFF
# Uso: ./convert-staff-photos.sh [arquivo1] [arquivo2] ... [arquivoN]
# Ou: ./convert-staff-photos.sh *.jpg (para converter todos os JPGs na pasta)

# Cores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Diretório de saída
OUTPUT_DIR="images"
OUTPUT_PREFIX="team"

# Dimensões padrão baseadas nas imagens existentes
# As imagens existentes têm dimensões variadas: 696x728, 585x725, 551x727
# Vamos padronizar para um formato vertical consistente
# O CSS usa height: 247px, mas mantemos imagens maiores para qualidade
TARGET_WIDTH=600
TARGET_HEIGHT=750

echo -e "${GREEN}=== Conversor de Fotos para Seção STAFF ===${NC}\n"

# Verificar se há argumentos
if [ $# -eq 0 ]; then
    echo -e "${YELLOW}Uso: $0 [arquivo1] [arquivo2] ... [arquivoN]${NC}"
    echo -e "${YELLOW}Exemplo: $0 foto1.jpg foto2.jpg${NC}"
    echo -e "${YELLOW}Ou: $0 *.jpg (para converter todos os JPGs)${NC}"
    exit 1
fi

# Contador
count=1

# Processar cada arquivo
for input_file in "$@"; do
    # Verificar se o arquivo existe
    if [ ! -f "$input_file" ]; then
        echo -e "${RED}Erro: Arquivo não encontrado: $input_file${NC}"
        continue
    fi
    
    # Obter nome do arquivo sem extensão
    filename=$(basename "$input_file")
    name_without_ext="${filename%.*}"
    
    # Nome do arquivo de saída
    output_file="${OUTPUT_DIR}/${OUTPUT_PREFIX}${count}.png"
    
    echo -e "${YELLOW}Processando: $filename${NC}"
    
    # Obter dimensões originais
    original_width=$(sips -g pixelWidth "$input_file" 2>/dev/null | awk '{print $2}')
    original_height=$(sips -g pixelHeight "$input_file" 2>/dev/null | awk '{print $2}')
    
    if [ -z "$original_width" ] || [ -z "$original_height" ]; then
        echo -e "${RED}  Erro: Não foi possível ler as dimensões da imagem${NC}"
        continue
    fi
    
    echo -e "  Dimensões originais: ${original_width}x${original_height}"
    
    # Calcular proporção para manter aspect ratio
    # Vamos fazer crop centralizado para manter proporção vertical
    aspect_ratio=$(echo "scale=4; $original_width / $original_height" | bc)
    target_aspect=$(echo "scale=4; $TARGET_WIDTH / $TARGET_HEIGHT" | bc)
    
    # Se a imagem for mais larga que alta, fazer crop vertical
    if (( $(echo "$aspect_ratio > $target_aspect" | bc -l) )); then
        # Imagem mais larga - crop horizontal
        new_height=$original_height
        new_width=$(echo "scale=0; $new_height * $target_aspect" | bc | cut -d. -f1)
        crop_x=$(echo "scale=0; ($original_width - $new_width) / 2" | bc | cut -d. -f1)
        crop_y=0
    else
        # Imagem mais alta - crop vertical
        new_width=$original_width
        new_height=$(echo "scale=0; $new_width / $target_aspect" | bc | cut -d. -f1)
        crop_x=0
        crop_y=$(echo "scale=0; ($original_height - $new_height) / 2" | bc | cut -d. -f1)
    fi
    
    echo -e "  Fazendo crop para: ${new_width}x${new_height} (offset: ${crop_x},${crop_y})"
    
    # Criar diretório de saída se não existir
    mkdir -p "$OUTPUT_DIR"
    
    # Fazer crop e redimensionar usando sips
    # Primeiro fazer crop, depois redimensionar
    temp_file="${OUTPUT_DIR}/temp_${count}.png"
    
    # Crop usando sips (cropToHeightWidth)
    sips -c "$new_height" "$new_width" "$input_file" --out "$temp_file" 2>/dev/null
    
    if [ $? -ne 0 ]; then
        # Se crop falhar, tentar apenas redimensionar mantendo proporção
        echo -e "  ${YELLOW}Aviso: Crop falhou, redimensionando mantendo proporção${NC}"
        sips -z "$TARGET_HEIGHT" "$TARGET_WIDTH" "$input_file" --out "$temp_file" 2>/dev/null
    fi
    
    # Redimensionar para tamanho final
    sips -z "$TARGET_HEIGHT" "$TARGET_WIDTH" "$temp_file" --out "$output_file" 2>/dev/null
    
    if [ $? -eq 0 ]; then
        # Verificar dimensões finais
        final_width=$(sips -g pixelWidth "$output_file" 2>/dev/null | awk '{print $2}')
        final_height=$(sips -g pixelHeight "$output_file" 2>/dev/null | awk '{print $2}')
        
        echo -e "${GREEN}  ✓ Sucesso! Arquivo salvo: $output_file${NC}"
        echo -e "  Dimensões finais: ${final_width}x${final_height}"
        
        # Remover arquivo temporário
        rm -f "$temp_file"
    else
        echo -e "${RED}  ✗ Erro ao processar $filename${NC}"
        rm -f "$temp_file"
        continue
    fi
    
    echo ""
    count=$((count + 1))
done

echo -e "${GREEN}=== Conversão concluída! ===${NC}"
echo -e "${YELLOW}Arquivos salvos em: $OUTPUT_DIR/${OUTPUT_PREFIX}[número].png${NC}"
echo -e "${YELLOW}Use os arquivos gerados substituindo team1.png, team2.png, etc. na pasta images/${NC}"

