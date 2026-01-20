(function() {
  'use strict';
  
  let mathJaxLoaded = false;
  let mathJaxLoading = false;
  let currentPath = '';
  
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
    
    const arithmatexElements = contentArea.querySelectorAll('.arithmatex');
    if (arithmatexElements.length > 0) {
      console.log('MathJax: Found', arithmatexElements.length, 'arithmatex elements');
      return true;
    }
    
    const content = contentArea.innerHTML;
    console.log('MathJax: Checking content, length:', content.length);
    
    const mathPatterns = [
      /\$\$[\s\S]*?\$\$/,
      /\$[^$\n]+?\$/,
      /\\\[[\s\S]*?\\\]/,
      /\\\([\s\S]*?\\\)/,
      /\\begin\{equation\}/,
      /\\begin\{align\}/,
      /\\begin\{gather\}/,
      /\\begin\{matrix\}/,
      /\\begin\{pmatrix\}/,
      /\\begin\{bmatrix\}/,
      /\\begin\{Bmatrix\}/,
      /\\begin\{vmatrix\}/,
      /\\begin\{Vmatrix\}/,
      /\\frac\{/,
      /\\sum\{/,
      /\\int\{/,
      /\\sqrt\{/,
      /\\prod\{/,
      /\\lim\{/,
      /\\binom\{/
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
    console.log('MathJax: Loading MathJax 3.x...');
    
    window.MathJax = {
      tex: {
        inlineMath: [['$', '$'], ['\\(', '\\)']],
        displayMath: [['$$', '$$'], ['\\[', '\\]']],
        processEscapes: true,
        processEnvironments: true,
        processRefs: true,
        tags: 'ams',
        tagSide: 'right',
        tagIndent: '0.8em',
        useLabelIds: true,
        multlineWidth: '85%',
        maxMacros: 10000,
        maxBuffer: 5 * 1024,
        formatError: (jax, err) => {
          console.warn('MathJax TeX error:', err.message);
          jax.formatError(err);
        }
      },
      mml: {
        parseError: (jax, err) => {
          console.warn('MathJax MathML error:', err.message);
        }
      },
      startup: {
        ready: () => {
          console.log('MathJax: Startup ready');
          MathJax.startup.defaultReady();
          renderMath();
        }
      },
      svg: {
        fontCache: 'global'
      },
      chtml: {
        displayAlign: 'center',
        displayIndent: '0'
      },
      options: {
        enableAssistiveMml: false,
        skipHtmlTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code', 'nav', 'footer'],
        ignoreHtmlClass: 'tex2jax_ignore|no-math',
        processHtmlClass: 'arithmatex|tex2jax_process',
        enableMenu: false
      }
    };
    
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js';
      script.async = true;
      
      script.onload = function() {
        console.log('MathJax 3.x: Loaded successfully');
        mathJaxLoaded = true;
        mathJaxLoading = false;
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
  
  function renderMath() {
    if (mathJaxLoaded && typeof MathJax !== 'undefined' && MathJax.typesetPromise) {
      console.log('MathJax: Rendering with typesetPromise...');
      
      const arithmatexElements = document.querySelectorAll('.arithmatex');
      console.log('MathJax: Processing', arithmatexElements.length, 'arithmatex elements');
      
      MathJax.typesetPromise(arithmatexElements).then(() => {
        console.log('MathJax: Rendering completed');
      }).catch(err => {
        console.warn('MathJax: Rendering error:', err);
      });
    } else if (mathJaxLoaded && typeof MathJax !== 'undefined' && MathJax.typeset) {
      console.log('MathJax: Rendering with typeset...');
      const arithmatexElements = document.querySelectorAll('.arithmatex');
      console.log('MathJax: Processing', arithmatexElements.length, 'arithmatex elements');
      MathJax.typeset(arithmatexElements);
    } else if (mathJaxLoaded && typeof MathJax !== 'undefined' && MathJax.startup) {
      console.log('MathJax: Starting up...');
      MathJax.startup.promise.then(() => {
        const arithmatexElements = document.querySelectorAll('.arithmatex');
        console.log('MathJax: Processing', arithmatexElements.length, 'arithmatex elements');
        if (MathJax.typesetPromise) {
          MathJax.typesetPromise(arithmatexElements);
        } else if (MathJax.typeset) {
          MathJax.typeset(arithmatexElements);
        }
      });
    } else {
      console.log('MathJax: Not ready for rendering');
    }
  }
  
  function checkAndLoadMathJax(delay = 0, forceCheck = false) {
    const newPath = getPagePath();
    console.log('MathJax: Checking path:', newPath, 'Current path:', currentPath);
    
    if (newPath !== currentPath || forceCheck) {
      currentPath = newPath;
      
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
            checkAndLoadMathJax(300, true);
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
      checkAndLoadMathJax(300, true);
    });
    
    window.addEventListener('popstate', function() {
      console.log('MathJax: Popstate');
      checkAndLoadMathJax(300, true);
    });
    
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'visible') {
        console.log('MathJax: Page visible');
        checkAndLoadMathJax(300, true);
      }
    });
    
    // Listen for Material theme navigation events
    document.addEventListener('DOMContentLoaded', function() {
      // Check for instant navigation
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.addedNodes.length > 0) {
            // Check if new content contains math
            const hasNewMath = Array.from(mutation.addedNodes).some(node => {
              return node.nodeType === Node.ELEMENT_NODE && 
                     (node.querySelector('.arithmatex') || 
                      node.classList.contains('arithmatex') ||
                      /\$\$[\s\S]*?\$\$|\$[^$\n]+?\$|\\\[[\s\S]*?\\\]|\\\([\s\S]*?\\\)/.test(node.textContent || ''));
            });
            if (hasNewMath) {
              console.log('MathJax: New math content detected via navigation');
              checkAndLoadMathJax(100, true);
            }
          }
        });
      });
      
      // Observe the main content area
      const mainContent = document.querySelector('.md-content') || document.querySelector('.md-main__inner') || document.body;
      if (mainContent) {
        observer.observe(mainContent, {
          childList: true,
          subtree: true
        });
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
          // Force check on initial page load
          checkAndLoadMathJax(500, true);
          setupObservers();
          setupEventListeners();
        }, 100);
      });
    } else {
      console.log('MathJax: Document ready');
      setTimeout(() => {
        // Force check on initial page load
        checkAndLoadMathJax(500, true);
        setupObservers();
        setupEventListeners();
      }, 100);
    }
    
    if (typeof document$ !== 'undefined') {
      document$.subscribe(function() {
        console.log('MathJax: Document$ event');
        checkAndLoadMathJax(500, true);
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