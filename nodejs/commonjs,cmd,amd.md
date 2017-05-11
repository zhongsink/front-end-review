# commonjs cmd amd 规范对比

### CommonJS规范

CommonJS 一般是应用于服务器端,桌面端。CommonJS规范是为了解决JavaScript的作用域问题而定义的模块形式，
模块必须通过  module.exports导出对外的变量或接口，通过require()来导入其他模块的输出到当前模块。

例子：
```
// moduleA.js  
module.exports = function( value ){  

}  
// moduleB.js  
var muldul2 = require('./moduleA');  

```

 服务器端的Node.js遵循CommonJS规范。核心思想是允许模块通过require 方法来同步加载所要依赖的其他模块(每一个模块就是一个作用域)，然后通过 exports或module.exports来导出需要暴露的接口。

``` 
require("b");  
require("./a.js");  
exports.a = a;  
module.exports = b;  
```

优点：

服务器端便于重用
简单并容易使用

缺点：

同步的模块方式不适合不适合在浏览器环境中，同步意味着阻塞加载，浏览器资源是异步加载的
不能非阻塞的并行加载多个模块

### AMD

AMD是"Asynchronous Module Definition"的缩写，意思就是"异步模块定义"。它采用异步方式加载模块，模块的加载不影响它后面语句的运行。所有依赖这个模块的语句，都定义在一个回调函数中，等到加载完成之后，这个回调函数才会运行。
```
require([module], callback);

```
实现：require.js

适合在浏览器环境异步加载
不符合通用的模块思维方式，是一种妥协的实现

[详细](http://www.ruanyifeng.com/blog/2012/10/asynchronous_module_definition.html)

[详细(en)](https://github.com/amdjs/amdjs-api/wiki/AMD)

### CMD

CMD规范和AMD相似，尽量保持简单，并且与CommonJS和NodeJS的Modules规范保持了很大的兼容性。

```
define(function(require, exports, module) {  
   ...  
  module.exports = ...  
})  
```

依赖就近，延迟执行

实现： SeaJS

[详细](https://github.com/seajs/seajs/issues/242)

### AMD CMD区别：

1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible.
2. CMD 推崇依赖就近，AMD 推崇依赖前置。
