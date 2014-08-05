#!/usr/bin/python

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

time.sleep(0)
