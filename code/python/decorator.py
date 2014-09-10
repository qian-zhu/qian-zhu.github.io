from functools import wraps
def outer():
    x = 1
    def inner():
        print x
    return inner

foo = outer()
foo()


print [c.cell_contents for c in foo.__closure__]

def outer(func):
    @wraps(func)
    def inner():
        print "before function"
        ret = func()
        return ret+1
    return inner

def foo():
    return 1

decorated = outer(foo)
ret = decorated() #before function
print decorated.__name__
print ret #2

@outer
def boo():
    return 2

print boo() 
print boo.__name__ 
