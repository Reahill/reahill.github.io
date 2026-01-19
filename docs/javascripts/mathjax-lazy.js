(function() {
  'use strict';
  
  let mathJaxLoaded = false;
  let mathJaxLoading = false;
  let currentPath = '';
  let checkAttempts = 0;
  const MAX_CHECK_ATTEMPTS = 10;
  
  function getPagePath() {
    return window.location.pathname + window.location.search + window.location.hash;
  }
  
  function hasMathContent() {
    const contentArea = document.querySelector('.md-content') || 
                        document.querySelector('.md-typeset') || 
                        document.body;
    
    if (!contentArea) {
      console.log('MathJax: Content area not found');
      return false;
    }
    
    const content = contentArea.innerHTML;
    console.log('MathJax: Checking content, length:', content.length);
    
    const mathPatterns = [
      /\$\$[\s\S]*?\$\$/,
      /\$[^$\n]+?\$/,
      /\\\[\\\]/,
      /\\\(\\\)/,
      /\\begin\{equation\}/,
      /\\begin\{align\}/,
      /\\begin\{gather\}/,
      /\\begin\{matrix\}/,
      /\\begin\{pmatrix\}/,
      /\\frac\{/,
      /\\sum\{/,
      /\\int\{/,
      /\\sqrt\{/
    ];
    
    for (const pattern of mathPatterns) {
      if (pattern.test(content)) {
        console.log('MathJax: Math content detected with pattern:', pattern);
        return true;
      }
    }
    
    console.log('MathJax: No math content detected');
    return false;
  }
  
  function loadMathJax() {
    if (mathJaxLoaded || mathJaxLoading) {
      return Promise.resolve();
    }
    
    mathJaxLoading = true;
    console.log('MathJax: Loading on demand...');
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.9/MathJax.js?config=TeX-AMS-MML_HTMLorMML';
      script.async = true;
      
      script.onload = function() {
        console.log('MathJax: Loaded successfully');
        mathJaxLoaded = true;
        mathJaxLoading = false;
        configureMathJax();
        resolve();
      };
      
      script.onerror = function() {
        console.error('MathJax: Failed to load');
        mathJaxLoading = false;
        reject(new Error('Failed to load MathJax'));
      };
      
      document.head.appendChild(script);
    });
  }
  
  function configureMathJax() {
    if (typeof MathJax !== 'undefined' && MathJax.Hub) {
      console.log('MathJax: Configuring...');
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
        console.log('MathJax: Configured and ready');
        renderMath();
      });
    }
  }
  
  function renderMath() {
    if (mathJaxLoaded && typeof MathJax !== 'undefined' && MathJax.Hub) {
      console.log('MathJax: Rendering...');
      MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
    }
  }
  
  function checkAndLoadMathJax(delay = 0) {
    const newPath = getPagePath();
    console.log('MathJax: Checking path:', newPath, 'Current path:', currentPath);
    
    if (newPath !== currentPath) {
      currentPath = newPath;
      checkAttempts = 0;
      
      setTimeout(() => {
        if (hasMathContent()) {
          console.log('MathJax: Math content detected, loading...');
          loadMathJax().then(() => {
            setTimeout(renderMath, 200);
          }).catch(err => {
            console.error('MathJax: Error loading:', err);
          });
        } else {
          console.log('MathJax: No math content, skipping load');
        }
      }, delay);
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
            console.log('MathJax: DOM changed, checking...');
            checkAndLoadMathJax(300);
          }
        });
      });
      
      observer.observe(contentArea, {
        childList: true,
        subtree: true
      });
      console.log('MathJax: Observer setup complete');
    }
  }
  
  function setupEventListeners() {
    window.addEventListener('hashchange', function() {
      console.log('MathJax: Hash changed');
      checkAndLoadMathJax(300);
    });
    
    window.addEventListener('popstate', function() {
      console.log('MathJax: Popstate');
      checkAndLoadMathJax(300);
    });
    
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'visible') {
        console.log('MathJax: Page visible');
        checkAndLoadMathJax(300);
      }
    });
  }
  
  function init() {
    currentPath = getPagePath();
    console.log('MathJax: Initializing...');
    
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        console.log('MathJax: DOM loaded');
        setTimeout(() => {
          checkAndLoadMathJax(500);
          setupObservers();
          setupEventListeners();
        }, 100);
      });
    } else {
      console.log('MathJax: Document ready');
      setTimeout(() => {
        checkAndLoadMathJax(500);
        setupObservers();
        setupEventListeners();
      }, 100);
    }
    
    if (typeof document$ !== 'undefined') {
      document$.subscribe(function() {
        console.log('MathJax: Document$ event');
        checkAndLoadMathJax(500);
      });
    }
  }
  
  window.debugMathJax = {
    load: loadMathJax,
    render: renderMath,
    check: hasMathContent,
    status: function() {
      return {
        mathJaxLoaded: mathJaxLoaded,
        mathJaxLoading: mathJaxLoading,
        currentPath: currentPath,
        hasMathContent: hasMathContent()
      };
    }
  };
  
  init();
})();
