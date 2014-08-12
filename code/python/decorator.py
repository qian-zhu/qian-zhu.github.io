def outer():
    x = 1
    def inner():
        print x
    return inner

foo = outer()
foo()


print [c.cell_contents for c in foo.__closure__]

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

print foo.__name__
