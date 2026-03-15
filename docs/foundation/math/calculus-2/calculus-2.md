# 微积分 (甲)Ⅱ

## L01 & L02

### 重要级数

1. 几何级数/等比级数: $\sum_{n=1}^{\infty } aq^{n-1} $  
    - $\left\lvert q \right\rvert <1$, 收敛到 $\frac{a}{1-q} $  
    - $\left\lvert q \right\rvert \ge1$, 发散  
2. $p$ 级数: $\sum_{n=1}^{\infty}\frac{1}{n^{p}}$  
    - $p>1$, 收敛  
    - $p\le1$, 发散  

### 数项级数基本性质

1. 线性运算法则: 若级数 $\sum_{n=1}^{\infty } u_{n}$, $\sum_{n=1}^{\infty } v_{n}$ 均收敛,  
且 $\sum_{n=1}^   {\infty } u_{n}=A$, $\sum_{n=1}^{\infty } v_{n}=B$,  
则 $\sum_{n=1}^{\infty}(\alpha u_{n}+\beta v_{n})$ 收敛,  
且 $\sum_{n=1}^{\infty}(\alpha u_{n}+\beta v_{n})=\alpha A+\beta B$  

2. 改变一个级数的有限项, 不影响级数的敛散性.  
3. 结合性: 若级数收敛, 则在级数中任意添加括号所得到的新级数也收敛, 且和不变.  
(加括号后的级数发散, 原级数必发散)  

4. 若级数 $\sum_{n=1}^{\infty}u_{n}$ 收敛, 则 $\lim_{n \to \infty} u_{n}=0$  
(可用于初步判断是否收敛)  

5. Cauchy 收敛准则: 级数 $\sum_{n=1}^{\infty}u_{n}$ 收敛的充要条件是: $\forall \varepsilon >0, \exists$ 正整数 $N$, 当 $n>N$ 时, 对一切正整数 $p$, 都有 $\left\lvert u_{n+1}+u_{n+2}+\cdots+u_{n+p} \right\rvert <\varepsilon$  

### 正项级数敛散性判别法

1. 比较判别法: 设 $\sum u_n$ 与 $\sum v_n$ 是两个正项级数, 且存在常数 $c>0$ 与正整数 $N$, 使得当 $n>N$ 时, 有 $u_n \leq c v_n$. 则  
    - 若 $\sum v_n$ 收敛, 则 $\sum u_n$ 收敛;  
    - 若 $\sum u_n$ 发散, 则 $\sum v_n$ 发散.  
2. 比较判别法的极限形式: 设 $\sum u_n$ 与 $\sum v_n$ 是两个正项级数, 且 $\lim_{n \to \infty} \frac{u_n}{v_n} = l$, 其中 $0 \leq l \leq +\infty$. 则  
    - 若 $0 < l < +\infty$, 则 $\sum u_n$ 与 $\sum v_n$ 同敛散;  
    - 若 $l = 0$, 则当 $\sum v_n$ 收敛时, $\sum u_n$ 也收敛;  
    - 若 $l = +\infty$, 则当 $\sum v_n$ 发散时, $\sum u_n$ 也发散.  
3. 比值判别法 (达朗贝尔判别法): 设 $\sum u_n$ 为正项级数, 且 $\lim_{n \to \infty} \frac{u_{n+1}}{u_n} = \rho$, 其中 $0 \leq \rho \leq +\infty$. 则  
    - 若 $\rho < 1$, 级数收敛;  
    - 若 $\rho > 1$ 或 $\rho = +\infty$, 级数发散;  
    - 若 $\rho = 1$, 判别法失效.  
4. 根值判别法 (柯西判别法): 设 $\sum u_n$ 为正项级数, 且 $\lim_{n \to \infty} \sqrt[n]{u_n} = \rho$, 其中 $0 \leq \rho \leq +\infty$. 则  
    - 若 $\rho < 1$, 级数收敛;  
    - 若 $\rho > 1$ 或 $\rho = +\infty$, 级数发散;  
    - 若 $\rho = 1$, 判别法失效.  
5. 积分判别法: 设 $f(x)$ 在 $[1, +\infty)$ 上非负, 单调递减且连续, 令 $u_n = f(n)$. 则级数 $\sum_{n=1}^{\infty} u_n$ 与反常积分 $\int_1^{+\infty} f(x) \, dx$ 同敛散.  

## L03 & L04

### 交错级数

1. 定义: $\sum_{n=1}^{\infty}(-1)^{n-1}u_{n}, u_{n}>0$

2. Leibniz 定理:
    设数列 $\{u_n\}$ 满足
    1. $u_n\ge 0$, 且单调递减
    2. $\lim_{n\to\infty}u_n=0$

则交错级数 $\sum_{n=1}^{\infty}(-1)^{n-1}u_n=u_1-u_2+u_3-u_4+\cdots$ 收敛.  

### 绝对收敛, 条件收敛

1. 定义
    - 若级数 $\sum_{n=1}^{\infty}u_n$ 满足 $\sum_{n=1}^{\infty}\lvert u_n\rvert$ 收敛, 则称 $\sum_{n=1}^{\infty}u_n$ 绝对收敛.
    - 若级数 $\sum_{n=1}^{\infty}u_n$ 收敛, 但 $\sum_{n=1}^{\infty}\lvert u_n\rvert$ 发散, 则称 $\sum_{n=1}^{\infty}u_n$ 条件收敛.
2. 直观例子
    - $\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{n^2}$: 绝对收敛, 因为 $\sum_{n=1}^{\infty}\left\lvert\frac{(-1)^{n-1}}{n^2}\right\rvert=\sum_{n=1}^{\infty}\frac{1}{n^2}$ 收敛.
    - $\sum_{n=1}^{\infty}\frac{(-1)^{n-1}}{n}$: 条件收敛, 因为它本身收敛, 但 $\sum_{n=1}^{\infty}\left\lvert\frac{(-1)^{n-1}}{n}\right\rvert=\sum_{n=1}^{\infty}\frac{1}{n}$ 发散.
3. 总结
    - 先看绝对值级数 $\sum\lvert u_n\rvert$: 它收敛就直接判 "绝对收敛"; 它发散再看原级数是否收敛, 若收敛则是 "条件收敛".

### 幂级数

1. 定义: $\sum_{n=0}^{\infty}a_{n}x^{n} $
2. 收敛半径计算方法
    1. $\frac{1}{R}= \lim_{n \to \infty}\frac{\left\lvert a_{n} \right\rvert }{\left\lvert a_{n+1} \right\rvert }$
    2. $\frac{1}{R}= \lim_{n \to \infty}\sqrt[n]{\left\lvert a_{n} \right\rvert }$
3. 做题顺序
    - 第一步: 先求 $R$.
    - 第二步: 写出收敛区间 $(-R,\,R)$.
    - 第三步: 分别检验左右端点, 最后合并成收敛域.

### 和函数

1. 定义: $S(x)=\sum_{n=0}^{\infty}a_{n}x^{n}$
2. 经典例子:
    - $\sum_{n=1}^{\infty}\frac{x^{n}}{n}$
    - $\sum_{n=1}^{\infty}nx^{n-1}$
3. 关键: 求和符号与积分符号可以交换
