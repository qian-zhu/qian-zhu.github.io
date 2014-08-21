Title: Decorators in Python 
Date: 2014-08-07
Tags: python, decorators, closure
Slug: decorators in python 
Summary: 什么是decorators,以及Python的哪些特性使得可以有decorator这个功能和概念? 

## Closure
Python 中有decorator这个概念首先要归功于python支持**function closure** : inner functions defined in non-global scope remember what their enclosing namespaces looked like at definition time. 

比如:
```python
def outer():
    x = 1
    def inner():
        print x
    return inner

foo = outer()
foo()
```
根据python的variable lifetime, x是outer的local variable.那么当outer返回后x应该不存在了。但在这里我们通过 
```python
print [c.cell_contents for c in foo.__closure__]
```
可以看到x还是存在的。被记录到了inner function的\_\_closure\_\_这个属性里面.


## Function is an object
其次就是在python中，everything is object. 函数也是object, 而且是first class object. 比如:
```python
def foo():
	pass
foo.__class__ # <type 'function'>
issubclass(foo.__class__, object) # True
```
这就表示function也可以作为普通的object传给另一个function作为参数.
比如:
```python
def outer(func):
    def inner():
        print "before function"
        ret = func()
        return ret+1
    return inner

def foo():
    return 1

decorated = outer(foo)
ret = decorated() #before function
print ret #2
```
而且foo.\_\_name\_\_就是代表函数的名字。通过
```python
from functools import wraps 
def outer(func):
	@wraps(func)
    def inner():
        print "before function"
        ret = func()
        return ret+1
    return inner
```
这样使得decorator返回的被装饰后的函数的名字function.\_\_name\_\_和原函数相同。


## *args and **kwargs
如果没有这两个可以代表任意函数参数的变量，那么每一个function都是要事先确定好参数的个数，decorator的作用范围变窄了。
比如:
```python
def logger(function):
	def inner(*args,**kwargs):
		# some code
		return function(*args,**kwargs)
	return inner
@logger
def foo1(x,y=1):
	return x + y
```
比如这里被logger decorate的函数参数可以是任意的。







