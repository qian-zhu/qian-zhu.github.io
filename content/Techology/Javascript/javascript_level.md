Title: javascript level 
Date: 2014-07-22
Tags: javascript 
Slug: javascript level
Summary: javascript level

![Javascript](/images/javascript_level.png)

Javascript负责交互，但是其作为一个语言，在语法层面很弱了。很多面向对象的抽象都没有，extend,mixin,package这些概念都没有，必须通过其他方式实现。而且其在不同的浏览器上行为也不一致。所以有了很多的框架:jQuery, dojo等弥补这些功能上的不足。

## 封装(package),解决命名冲突:
### css上:
tabview.css
```css
.menu{xxx}
.content{xxx}
```

treeview.css
```css
.menu{xxx}
.content{xxx}
```

可以看到这两个css如果加载到同一个html文件下会产生冲突。解决方法有两个:

1.利用html的层级关系。

比如将tabview.css写做:
```css
.tabview .menu{xxx}
.tabview .content{xxx}
```
2.在css每个元素都加上前缀:
```css
.tabview_menu{xxx}
.tabview_content{xxx}
```

很多人用第一种方法，但是这里有个问题——依赖了html的层级关系。但是我们知道html负责结构，css是负责效果呈现。css应该和html尽可能的独立。所以这里依赖html已有的结构是部正确的。方法2比较合适，而且简单。

###Javascript上:
利用闭包(closure)
```javascript
(function(){
	var abc = "hello";
})()
```
这里的abc就不是全局的了。

##依赖关系:
[requirejs][1] : 将js的文件，抽象出package。可以解决package之间的依赖关系。

比如:
```javascript
//main.js 入口函数
require(['tabview','treeview'],function(tab,tree){
	var tabView = new tab.TabView(),
		treeView = new tree.TreeView();
});
```
```javascript
//tabview.js
define(['animate'],function(a){
	function TabView(){
		this.animate = new a.Animate();
	};
	return {TabView:TabView};
});
```
```javascript
//treeview.js
define(function(){
	function TreeView(){}
	return {TreeView:TreeView};
});
```
```javascript
//animate.js
define(function(){
	function Animate(){};
	return {Animate:Animate};
});
```
requirejs会自动的load js文件，并且解决依赖关系

源代码里面只需要添加:
```html
	<script src="js/require.js" data-main="js/main"></script>
```
就可以了。不需要手动的加载很多的js文件




[1]: http://www.requirejs.org/
