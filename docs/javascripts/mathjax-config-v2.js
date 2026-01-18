MathJax.Hub.Config({
  tex2jax: {
    inlineMath: [['$', '$'], ['\\(', '\\)']],
    displayMath: [['$$', '$$'], ['\\[', '\\]']],
    processEscapes: true,
    processEnvironments: true,
    skipTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
    processClass: 'arithmatex',
    ignoreClass: 'tex2jax_ignore'
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
