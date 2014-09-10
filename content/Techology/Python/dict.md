Title:  Items order in dictionary 
Date: 2014-08-05
Tags: python, dictionary
Slug: dictionary in python 
Summary: item order in python dictionary 


dictionary在Python中是由hash table实现的。既然涉及到了hash table,就涉及到了两个问题:
1. hash value是如何计算的？
2. 如何处理hash的collision的?

在CPython中,python2.7的hash(x) == id(x)/16, 然后选取最后面的n位作为其index. 比如说，在dict初始化时，就有8个slots，那么元素x的index就是hash(x)%8,当有2/3的slots被占用时，再double下dict的size

采用的[open addressing][1], hash table其实是一个连续的地址（类似数组），如果object的primary position被占用了，那么将根据[random probing][2]算法去找到下一个地址。

```python
class A(object):pass
class B(object):pass
class C(object):pass
class D(object):pass
class E(object):pass
class F(object):pass
class G(object):pass

d = {A:1,B:2,C:3,D:4,E:5,F:6,G:7}
import time
for key,value in d.iteritems():
    print key.__name__
    print bin(id(key)/16)
```
通过这个示例程序，我们发现为什么id(x)/16的后8位在每次运行都是相同的?在Python中，id就是object的内存地址。为什么id(x)/16会一直相同的？难道是因为Python中，dict这一块内存都是32字节对其的的？

[1]: http://en.wikipedia.org/wiki/Hash_table#Open_addressing
[2]: http://hg.python.org/cpython/file/52f68c95e025/Objects/dictobject.c#l33
