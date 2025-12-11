import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

// Formatar data para exibição
export const formatDate = (dateString, formatStr = 'dd/MM/yyyy') => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return format(date, formatStr, { locale: ptBR });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

// Formatar data relativa (ex: "há 2 dias")
export const formatRelativeDate = (dateString) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { 
      addSuffix: true, 
      locale: ptBR 
    });
  } catch (error) {
    console.error('Error formatting relative date:', error);
    return dateString;
  }
};

// Gerar slug a partir de string
export const generateSlug = (str) => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
};

// Truncar texto
export const truncateText = (text, maxLength = 150) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

// Extrair texto do bloco de conteúdo do Sanity
export const extractTextFromBlocks = (blocks) => {
  if (!blocks || !Array.isArray(blocks)) return '';
  
  return blocks
    .map(block => {
      if (block._type === 'block' && block.children) {
        return block.children
          .map(child => child.text || '')
          .join('');
      }
      return '';
    })
    .join(' ')
    .trim();
};

// Calcular tempo de leitura
export const calculateReadTime = (content) => {
  if (!content) return 1;
  
  const text = typeof content === 'string' 
    ? content 
    : extractTextFromBlocks(content);
  
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  
  return Math.max(1, minutes);
};

