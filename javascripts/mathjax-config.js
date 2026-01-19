(function() {
  'use strict';
  
  let isMathJaxReady = false;
  let currentPath = '';
  
  function getPagePath() {
    return window.location.pathname + window.location.search + window.location.hash;
  }
  
  function renderMath() {
    if (isMathJaxReady && typeof MathJax !== 'undefined' && MathJax.Hub) {
      console.log('Rendering MathJax...');
      MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    }
  }
  
  function setupObservers() {
    const contentArea = document.querySelector('.md-content') || 
                        document.querySelector('.md-typeset') || 
                        document.body;
    
    if (contentArea) {
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.addedNodes.length > 0) {
            const newPath = getPagePath();
            if (newPath !== currentPath) {
              currentPath = newPath;
              console.log('DOM changed, rendering MathJax...');
              setTimeout(renderMath, 50);
            }
          }
        });
      });
      
      observer.observe(contentArea, {
        childList: true,
        subtree: true
      });
      console.log('MathJax observer setup complete');
    }
  }
  
  function setupEventListeners() {
    window.addEventListener('hashchange', function() {
      console.log('Hash changed, rendering MathJax...');
      currentPath = getPagePath();
      setTimeout(renderMath, 50);
    });
    
    window.addEventListener('popstate', function() {
      console.log('Popstate, rendering MathJax...');
      currentPath = getPagePath();
      setTimeout(renderMath, 50);
    });
    
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'visible') {
        console.log('Page visible, rendering MathJax...');
        currentPath = getPagePath();
        setTimeout(renderMath, 100);
      }
    });
  }
  
  function init() {
    currentPath = getPagePath();
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        console.log('DOM loaded, initializing MathJax...');
        setTimeout(function() {
          isMathJaxReady = true;
          renderMath();
          setupObservers();
          setupEventListeners();
        }, 100);
      });
      
      window.addEventListener('load', function() {
        console.log('Window loaded, ensuring MathJax rendered...');
        setTimeout(renderMath, 200);
      });
    } else {
      console.log('Document ready, initializing MathJax immediately...');
      setTimeout(function() {
        isMathJaxReady = true;
        renderMath();
        setupObservers();
        setupEventListeners();
      }, 100);
    }
    
    if (typeof document$ !== 'undefined') {
      document$.subscribe(function() {
        console.log('Document$ event, rendering MathJax...');
        currentPath = getPagePath();
        setTimeout(renderMath, 50);
      });
    }
  }
  
  window.debugMathJax = {
    render: renderMath,
    status: function() {
      return {
        isMathJaxReady: isMathJaxReady,
        currentPath: currentPath
      };
    }
  };
  
  if (typeof MathJax !== 'undefined') {
    MathJax.Hub.Config({
      tex2jax: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true,
        skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code']
      },
      'HTML-CSS': {
        scale: 110,
        minScaleAdjust: 50,
        preferredFont: 'TeX',
        availableFonts: ['TeX'],
        webFont: 'TeX',
        imageFont: null,
        styles: {
          '.MathJax_Display': {
            'margin': '1em 0',
            'text-align': 'center'
          }
        }
      },
      SVG: {
        scale: 110,
        minScaleAdjust: 50,
        font: 'TeX'
      }
    });
    
    MathJax.Hub.Register.StartupHook('End', function() {
      console.log('MathJax startup complete');
      init();
    });
  } else {
    console.log('MathJax not loaded yet, waiting...');
    init();
  }
})();
