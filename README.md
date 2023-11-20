<div align="center">
<img src="logo.png" width="200px" alt="logo"/>
<h1>degital-twin-3D</h1>
</div>

<img width="auto" src="canvas.gif">

## 背景介绍

刚接触 3D 类项目，前期我与大家一样，也无从下手，前段时间，在掘金社区记录与分享过自己前期对于数字孪生项目搭建与实现的一些思考，没想到还是有很多私信、留言感兴趣的小伙伴。

原本计划专栏部分会继续写下去，但想将自己的想法和思路清晰的表达出来，过程太耗费时间精力了，所以还是将自己前期的代码在社区开源，希望这个事例，能给前期的你带来一些启发和思路～

由于项目本身是公司内部产品，只能将部分 POC 阶段的代码开源供大家学习与参考，当然，如果您有任何疑问与和想要交流的想法，随时都欢迎大家找我，和我一起思考和探讨数字孪生的技术方向～

专栏系列文章：

- [3D 数字孪生 - Three.js 项目介绍与基础环境搭建（一）](https://juejin.cn/post/7244894506305536057)
- [3D 数字孪生 - Three.js 项目实战之场景光源（二）](https://juejin.cn/post/7246316652048269373)
- [3D 数字孪生 - Three.js 项目实战之场景材质（三）](https://juejin.cn/post/7246657502842945597)
- [3D 数字孪生 - Three.js 项目实战之相机（四）](https://juejin.cn/post/7248545082130169893)
- [3D 数字孪生 - Three.js 项目实战之相机控制器（五）](https://juejin.cn/post/7250318500882432057)

我的掘金专栏： [G\_大雨](https://juejin.cn/column/7244783947820040253)

## 谏言

真正接触 3D 只有三个月，项目投入的时间大概只有两个月，前期对于 threejs 的学习成本还是蛮高的，所以代码上很多遗留的写法都未系统的优化和测试，如果您刚好在用，或者有更优的方案，欢迎 PR ～

# 3D 数字孪生智能仓储管理系统

## 功能介绍

由于是内部产品，只是将部分 POC 阶段的代码开源作为大家学习作为参考，项目中的数据源本身也是使用`JSON in TSX`的写法，更有利于您了解对于场景生成的数据结构。

- 智能仓库 3D 模型生成。
- 货架、立库生成。
- 车辆运动轨迹与搬运货物动画。
- 统计
-

#演示

> 待补充

## 相关技术栈

- `react18`，`vite3`，`antd5.x`，`typescript`，`redux`，`mbox`，`three-filber`，`three-drei`，`react-three/rapier`，`@react-spring`

## 环境

- nodejs >= 16
- npm
- pnpm

### pnpm 相关命令 [pnpm](https://www.pnpm.cn/cli/add)

- pnpm add MSW 保存到 dependencies 配置项下
- pnpm add -D MSW 保存到 devDependencies 配置项下
- pnpm add -O MSW 保存到 optionalDependencies 配置项下
- pnpm add -g MSW 安装软件包到全局环境中
- pnpm add MSW@next 安装标记为 next 的版本
- pnpm add MSW@3.0.0 安装指定版本 3.0.0

给某一个项目加依赖库

如： threejs 子包

- pnpm add @react-three/csg --filter threejs

### 开始

1. 创建项目
   ```bash
   git clone https://github.com/anyone-yuren/degital-twin-3d.git
   ```
2. 访问项目目录
   ```bash
   cd degital-twin-3d
   ```
3. 安装依赖包
   ```bash
   pnpm install
   ```
4. 启动项目，访问链接：http://localhost:5793
   ```bash
   pnpm run dev
   ```

### 发布

- 生产环境打包
  ```bash
  pnpm build
  ```
- 测试环境打包
  ```bash
  pnpm build:sit
  ```

### 校验代码 格式化代码

- 提交代码自动执行

```bash
pnpm run lint && pnpm run format
```

### 提交格式

- `feat`: 新增功能
- `fix`: 修复 bug
- `docs`: 仅仅修改了文档，比如 README, CHANGELOG 等等
- `test`: 增加/修改测试用例，包括单元测试、集成测试等
- `style`: 修改了空行、缩进格式、引用包排序等等（不改变代码逻辑）
- `perf`: 优化相关内容，比如提升性能、体验、算法等
- `refactor`: 代码重构，「没有新功能或者 bug 修复」
- `chore`: 改变构建流程、或者增加依赖库、工具等
- `revert`: 回滚到上一个版本
- `merge`: 代码合并

## License

This project is licensed under the MIT License. .

## 未来规划
