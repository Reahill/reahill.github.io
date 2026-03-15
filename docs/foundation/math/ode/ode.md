# 常微分方程

## L01 & L02

### 微分方程

1. 定义: 未知量是一个函数，而且该方程含有此未知数的导数
2. 类别:
    - 常微分方程：未知函数单变量
    - 偏微分方程：未知函数有两个或两个以上的变量
3. 性质:
    1. 阶: 未知函数导数的最高阶数
    2. 解 (积分): $F(x,\varphi (x),\varphi \prime(x) )\equiv 0, a<x<b$, 则$y=\varphi(x)$是一个解
    3. 定义区间: $a<x<b$
    4. 积分曲线: 方程的解在 (x, y)平面上的图形
    5. 方向场: 在 (x, y) 画一条小线段，斜率$f(x, y)$
    6. 初值条件: $y\mid _{x=x_{0}}=y_{0}$

### 一阶ode

1. 可分离变量方程:
$\frac{dy}{dx} =\varphi (x)\psi (y)$  
解: $\frac{dy}{\psi (y)}=\varphi (x)dx $

2. 齐次方程:
$\frac{dy}{dx}=g(\frac{y}{x} ) $  
解:$u=\frac{y}{x}$  
得, $\frac{dy}{dx}=x\frac{du}{dx}+u$
带入得, $x\frac{du}{dx}+u=g(u)$
整理得, $\frac{du}{dx}=\frac{g(u)-u}{x}$

3. 一阶线性微分方程:
$\frac{dy}{dx}+p(x)y =f(x)$
解: 先考虑$f(x)=0$  
即 $\frac(dy)(dx)=-p(x)y$  
得到 $y=ce^{-\int p(x)dx} $  
设 $y=u(x)e^{-\int p(x)dx} $

4. 伯努利方程:
$\frac{dy}{dx} +p(x)y=f(x)y^{n}, n\ne 0, 1$  
解: 两边同除以$y^{n}$  
得 $y^{-n}\frac{dy}{dx}+p(x)y^{1-n}=f(x)$  
引入$z$ $z=y^{1-n}$
