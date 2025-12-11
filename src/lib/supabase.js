import { createClient } from '@supabase/supabase-js';

// Configuração do cliente Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Verificar se as variáveis estão configuradas corretamente
const isSupabaseConfigured = supabaseUrl && 
  supabaseUrl.startsWith('http') && 
  supabaseAnonKey && 
  supabaseAnonKey !== 'your_supabase_anon_key';

// Criar cliente apenas se configurado corretamente
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Flag para verificar se Supabase está disponível
export const isSupabaseAvailable = isSupabaseConfigured;

// Função para incrementar visualizações de um post
export const incrementPostViews = async (postId) => {
  if (!isSupabaseConfigured || !supabase) {
    console.warn('Supabase não configurado. Visualizações não serão rastreadas.');
    return { views: 0, error: null };
  }
  
  try {
    // Verificar se já existe registro para este post
    const { data: existing, error: fetchError } = await supabase
      .from('post_views')
      .select('*')
      .eq('post_id', postId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 = não encontrado, o que é esperado para novos posts
      console.error('Error checking post views:', fetchError);
      return { views: 0, error: fetchError };
    }

    if (existing) {
      // Atualizar contador existente
      const { data, error } = await supabase
        .from('post_views')
        .update({ 
          views: existing.views + 1,
          last_viewed_at: new Date().toISOString()
        })
        .eq('post_id', postId)
        .select()
        .single();

      if (error) {
        console.error('Error updating post views:', error);
        return { views: existing.views, error };
      }

      return { views: data.views, error: null };
    } else {
      // Criar novo registro
      const { data, error } = await supabase
        .from('post_views')
        .insert({ 
          post_id: postId, 
          views: 1,
          last_viewed_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error creating post views:', error);
        return { views: 0, error };
      }

      return { views: data.views, error: null };
    }
  } catch (error) {
    console.error('Unexpected error in incrementPostViews:', error);
    return { views: 0, error };
  }
};

// Função para obter visualizações de um post
export const getPostViews = async (postId) => {
  if (!isSupabaseConfigured || !supabase) {
    return { views: 0, error: null };
  }
  
  try {
    const { data, error } = await supabase
      .from('post_views')
      .select('views')
      .eq('post_id', postId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        // Post ainda não tem visualizações
        return { views: 0, error: null };
      }
      console.error('Error fetching post views:', error);
      return { views: 0, error };
    }

    return { views: data?.views || 0, error: null };
  } catch (error) {
    console.error('Unexpected error in getPostViews:', error);
    return { views: 0, error };
  }
};

// Função para obter todas as visualizações (para dashboard)
export const getAllPostViews = async () => {
  if (!isSupabaseConfigured || !supabase) {
    return { data: [], error: null };
  }
  
  try {
    const { data, error } = await supabase
      .from('post_views')
      .select('*')
      .order('views', { ascending: false });

    if (error) {
      console.error('Error fetching all post views:', error);
      return { data: [], error };
    }

    return { data: data || [], error: null };
  } catch (error) {
    console.error('Unexpected error in getAllPostViews:', error);
    return { data: [], error };
  }
};

