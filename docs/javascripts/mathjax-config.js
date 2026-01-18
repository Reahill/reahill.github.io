window.MathJax = {
  tex: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true
  },
  options: {
    ignoreHtmlClass: '.*',
    processHtmlClass: 'arithmatex'
  },
  startup: {
    typeset: false,
    ready: () => {
      MathJax.startup.defaultReady();
      MathJax.typesetPromise();
      
      // 监听 MkDocs 页面切换事件
      if (typeof document$ !== 'undefined') {
        document$.subscribe(function() {
          MathJax.typesetPromise();
        });
      }
      
      // 监听页面导航变化（备用方案）
      const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
          if (mutation.addedNodes.length > 0) {
            MathJax.typesetPromise();
          }
        });
      });
      
      // 观察主要内容区域
      const contentArea = document.querySelector('.md-content');
      if (contentArea) {
        observer.observe(contentArea, {
          childList: true,
          subtree: true
        });
      }
    }
  },
  svg: {
    fontCache: 'global',
    scale: 1.1,
    minScale: 0.5,
    mtextInheritFont: false,
    merrorInheritFont: true,
    mathmlSpacing: false,
    skipAttributes: {},
    exFactor: 0.5,
    displayAlign: 'center',
    displayIndent: '0'
  },
  chtml: {
    scale: 1.1,
    minScale: 0.5,
    mtextInheritFont: false,
    merrorInheritFont: true,
    mathmlSpacing: false,
    skipAttributes: {},
    exFactor: 0.5,
    displayAlign: 'center',
    displayIndent: '0',
    fontURL: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/output/chtml/fonts/woff-v2'
  }
};
