# 数学公式测试

## 行内公式

这是一个行内公式：$a_{11}x_1 + a_{12}x_2 = b_1$。

另一个行内公式：$E = mc^2$。

复杂行内公式：$\frac{d}{dx}\left( \int_{0}^{x} f(t)\,dt \right) = f(x)$。

## 块级公式

这是一个块级公式：

$$
\sum_{i=1}^{n} i = \frac{n(n+1)}{2}
$$

另一个块级公式：

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

## 矩阵公式

$$
\begin{pmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{pmatrix}
$$

## 分式和二项式系数

$$
\frac{n!}{k!(n-k)!} = \binom{n}{k}
$$

$$
\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} = 0
$$

## 求和与积分

$$
\sum_{n=1}^{\infty} \frac{1}{n^2} = \frac{\pi^2}{6}
$$

$$
\int_{a}^{b} f(x) \, dx = F(b) - F(a)
$$

$$
\oint_C \mathbf{F} \cdot d\mathbf{r} = \iint_S (\nabla \times \mathbf{F}) \cdot d\mathbf{S}
$$

## 极限和导数

$$
\lim_{x \to 0} \frac{\sin x}{x} = 1
$$

$$
f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}
$$

$$
\frac{d^2 y}{dx^2} + p(x)\frac{dy}{dx} + q(x)y = 0
$$

## 方程组

$$
\begin{cases}
a_1 x + b_1 y = c_1 \\
a_2 x + b_2 y = c_2
\end{cases}
$$

## 多行对齐公式

$$
\begin{aligned}
\nabla \cdot \mathbf{E} &= \frac{\rho}{\varepsilon_0} \\
\nabla \cdot \mathbf{B} &= 0 \\
\nabla \times \mathbf{E} &= -\frac{\partial \mathbf{B}}{\partial t} \\
\nabla \times \mathbf{B} &= \mu_0 \mathbf{J} + \mu_0 \varepsilon_0 \frac{\partial \mathbf{E}}{\partial t}
\end{aligned}
$$

## 行列式

$$
\begin{vmatrix}
a & b \\
c & d
\end{vmatrix} = ad - bc
$$

## 分段函数

$$
f(x) = 
\begin{cases}
x^2 & \text{if } x \geq 0 \\
-x^2 & \text{if } x < 0
\end{cases}
$$

## 数学符号测试

- 希腊字母：$\alpha, \beta, \gamma, \Gamma, \Delta, \theta, \Theta, \lambda, \Lambda, \pi, \Pi, \sigma, \Sigma, \omega, \Omega$
- 运算符：$\pm, \mp, \times, \div, \cdot, \ast, \star, \circ, \bullet$
- 关系符号：$\leq, \geq, \neq, \approx, \sim, \simeq, \cong, \equiv, \propto$
- 集合符号：$\in, \notin, \subset, \subseteq, \supset, \supseteq, \cup, \cap, \emptyset, \infty$

## 复杂公式示例

$$
\frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

$$
\det\begin{pmatrix}
\lambda - a & -b & -c \\
-d & \lambda - e & -f \\
-g & -h & \lambda - i
\end{pmatrix} = 0
$$

$$
\forall \varepsilon > 0, \exists \delta > 0 \text{ such that } |x - c| < \delta \implies |f(x) - f(c)| < \varepsilon
$$
