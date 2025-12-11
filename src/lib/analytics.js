// Google Analytics 4
export const initGA = (measurementId) => {
  if (typeof window === 'undefined' || !measurementId) return;

  // Carregar script do Google Analytics
  const script1 = document.createElement('script');
  script1.async = true;
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script1);

  const script2 = document.createElement('script');
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}', {
      page_path: window.location.pathname,
    });
  `;
  document.head.appendChild(script2);
};

// Função para trackear visualização de página
export const trackPageView = (path) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID, {
    page_path: path,
  });
};

// Função para trackear eventos customizados
export const trackEvent = (eventName, eventParams = {}) => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', eventName, eventParams);
};

// Função para trackear visualização de post
export const trackPostView = (postId, postTitle) => {
  trackEvent('view_post', {
    post_id: postId,
    post_title: postTitle,
  });
};

// Função para trackear cliques em links
export const trackLinkClick = (linkText, linkUrl) => {
  trackEvent('click_link', {
    link_text: linkText,
    link_url: linkUrl,
  });
};

