## 修复数学公式渲染和 SPA 导航问题

### 问题
1. 矩阵公式无法正确渲染
2. 点击右侧目录导航后公式消失，需要手动刷新

### 解决方案
切换到 MathJax 3 并添加 SPA 导航支持：

1. **恢复 pymdownx.arithmatex 扩展**
   - 在 mkdocs.yml 中重新启用 pymdownx.arithmatex
   - 它会将 Markdown 数学公式转换为 HTML

2. **切换到 MathJax 3**
   - 移除 KaTeX CDN 链接
   - 添加 MathJax 3 CDN 链接
   - 创建 MathJax 3 配置文件

3. **添加 SPA 导航支持**
   - 监听 MkDocs 页面切换事件
   - 每次页面切换时自动重新渲染公式

4. **优化字体样式**
   - 保持教科书风格的数学字体
   - 更新 CSS 以适配 MathJax 3

### 预期效果
- 矩阵公式正确渲染
- 页面切换时公式自动重新渲染
- 无需手动刷新