// SEO & Analytics - Reusable script for all pages
(function() {
    // Google Analytics (GA4)
    if (typeof gtag === 'undefined') {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=G-E7E4GJ0QP9';
        document.head.appendChild(script);
        
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', 'G-E7E4GJ0QP9');
    }
})();

