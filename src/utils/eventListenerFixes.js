// Correções para problemas de passive event listeners
// Este arquivo corrige os erros "Unable to preventDefault inside passive event listener invocation"

class EventListenerFixes {
  constructor() {
    this.init();
  }

  init() {
    // Sobrescrever addEventListener para usar passive: false quando necessário
    this.patchEventListener();
    
    // Corrigir eventos de touch e scroll problemáticos
    this.fixTouchEvents();
    this.fixScrollEvents();
  }

  patchEventListener() {
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    
    EventTarget.prototype.addEventListener = function(type, listener, options) {
      // Lista de eventos que precisam de preventDefault
      const eventsNeedingPreventDefault = [
        'touchstart',
        'touchmove', 
        'touchend',
        'wheel',
        'mousewheel',
        'DOMMouseScroll'
      ];

      if (eventsNeedingPreventDefault.includes(type)) {
        // Garantir que passive seja false para esses eventos
        if (typeof options === 'boolean') {
          options = { capture: options, passive: false };
        } else if (typeof options === 'object' && options !== null) {
          options = { ...options, passive: false };
        } else {
          options = { passive: false };
        }
      }

      return originalAddEventListener.call(this, type, listener, options);
    };
  }

  fixTouchEvents() {
    // Remover listeners problemáticos de touch
    document.addEventListener('touchstart', function(e) {
      // Não prevenir o comportamento padrão a menos que seja necessário
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
      // Só prevenir se realmente necessário (ex: em carrosséis)
      const target = e.target;
      const isCarousel = target.closest('.carousel, .slider, .swiper, [data-carousel]');
      
      if (isCarousel) {
        // Para carrosséis, permitir o comportamento padrão
        return;
      }
    }, { passive: true });

    document.addEventListener('touchend', function(e) {
      // Permitir comportamento padrão para touch end
    }, { passive: true });
  }

  fixScrollEvents() {
    // Corrigir eventos de scroll problemáticos
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          // Lógica de scroll aqui
          ticking = false;
        });
        ticking = true;
      }
    };

    // Usar passive scroll listeners para melhor performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Corrigir wheel events
    document.addEventListener('wheel', function(e) {
      // Só prevenir se realmente necessário
      const target = e.target;
      const needsPreventDefault = target.closest('[data-prevent-scroll]');
      
      if (!needsPreventDefault) {
        return; // Permitir comportamento padrão
      }
    }, { passive: true });
  }

  // Método para limpar listeners problemáticos existentes
  cleanupProblematicListeners() {
    // Encontrar e remover listeners que causam problemas
    const problematicSelectors = [
      '.swiper-container',
      '.carousel',
      '.slider',
      '[data-carousel]'
    ];

    problematicSelectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(element => {
        // Clonar elemento para remover todos os listeners
        const newElement = element.cloneNode(true);
        element.parentNode.replaceChild(newElement, element);
      });
    });
  }
}

// Inicializar as correções quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new EventListenerFixes();
  });
} else {
  new EventListenerFixes();
}

export default EventListenerFixes;
