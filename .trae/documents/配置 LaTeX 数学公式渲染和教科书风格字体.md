## LaTeX 数学公式渲染 + 教科书风格字体配置计划

### 当前状态分析

* ✅ 已安装 `mdx_math` 扩展（mkdocs.yml 第118行）

* ❌ 缺少数学渲染引擎（extra\_javascript 为空）

* ✅ 已有霞鹜文楷中文字体

* ❌ 数学公式未配置专用字体

### 实施步骤

**1. 配置 MathJax 3 渲染引擎**

* 在 mkdocs.yml 的 `extra_javascript` 添加 MathJax 3 CDN 链接

* 创建 MathJax 配置文件 `docs/javascripts/mathjax-config.js`

* 配置 LaTeX 分隔符（`$...$` 和 `$$...$$`）

**2. 设置教科书风格数学字体**

* 使用 Latin Modern Math（TeX 标准字体，教科书风格）

* 或使用 STIX Math（更接近印刷教科书）

* 在 MathJax 配置中设置字体族

**3. 更新字体样式文件**

* 在 `docs/stylesheets/fonts.css` 添加数学公式字体样式

* 确保数学公式使用教科书风格字体

**4. 测试验证**

* 重新构建并启动 MkDocs 服务器

* 检查 test\_math.md 和线性代数页面的公式渲染效果

* 验证字体是否为教科书风格

### 预期效果

* 行内公式：$E=mc^2$ 正确渲染

* 块级公式：$$\sum\_{i=1}^{n} i = \frac{n(n+1)}{2}$$ 正确渲染

* 矩阵公式正确渲染

* 数学公式使用教科书风格的优雅字体（Latin Modern Math 或 STIX Math）

