document$.subscribe(() => {
  const scope = document.querySelector('.md-content');
  if (!scope) return;

  renderMathInElement(scope, {
    delimiters: [
      { left: "$$",  right: "$$",  display: true },
      { left: "$",   right: "$",   display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true }
    ],
    ignoredTags: ["script", "noscript", "style", "textarea", "pre", "code", "option"],
    throwOnError: false,
    strict: "ignore"
  })
})