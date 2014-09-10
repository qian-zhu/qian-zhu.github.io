Title: Permission in Django 
Date: 2014-09-10
Tags: Python, Django 
Slug: permission_in_django 
Summary: Django中permission的使用 

Django的permission系统即可以针对一个Model,也可以针对一个Model的Instance.

django.contrib.auth.models中有User这个Model.其中有一个ManyToMany relationship to django.contrib.auth.models.Permission的field: user_permissions

class models.User中有
```Python
has_perm(perm,object=None)
```
Returns True if the user has the specified permission, where perm is in the format "<app label>.<permission codename>". If the user is inactive, this method will always return False.

If **obj** is passed in, this method won’t check for a **permission** for the model, but for this **specific object**.


[1]: https://docs.djangoproject.com/en/1.6/topics/auth/default/

