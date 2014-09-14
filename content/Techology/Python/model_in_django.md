Title: Model in Django
Date: 2014-09-10
Tags: Python, Django 
Slug: model_in_django
Summary: Model in Django

##1. Model method vs Model manager
**Model method** define custom methods on a model to add custom “**row-level**” functionality to your **objects**.

 Whereas **Manager methods** are intended to do “**table-wide**” things, model methods should act on a particular model instance.

###Model method：
一个例子:
```python
from django.db import models

class Person(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    birth_date = models.DateField()

    def baby_boomer_status(self):
        "Returns the person's baby-boomer status."
        import datetime
        if self.birth_date < datetime.date(1945, 8, 1):
            return "Pre-boomer"
        elif self.birth_date < datetime.date(1965, 1, 1):
            return "Baby boomer"
        else:
            return "Post-boomer"

    def _get_full_name(self):
        "Returns the person's full name."
        return '%s %s' % (self.first_name, self.last_name)
    full_name = property(_get_full_name)
```
这里可以看到baby_boomer_status以及_get_full_name都是针对于一个Model的instance的


###Manager methods
```python
from django.db import models

class PollManager(models.Manager):
    def with_counts(self):
        from django.db import connection
        cursor = connection.cursor()
        cursor.execute("""
            SELECT p.id, p.question, p.poll_date, COUNT(*)
            FROM polls_opinionpoll p, polls_response r
            WHERE p.id = r.poll_id
            GROUP BY p.id, p.question, p.poll_date
            ORDER BY p.poll_date DESC""")
        result_list = []
        for row in cursor.fetchall():
            p = self.model(id=row[0], question=row[1], poll_date=row[2])
            p.num_responses = row[3]
            result_list.append(p)
        return result_list

class OpinionPoll(models.Model):
    question = models.CharField(max_length=200)
    poll_date = models.DateField()
    objects = PollManager()
```
这里可以看到with_counts其实就是执行了一系列的SQL操作。是针对整个table的

也可以继承原有的models.Manager，修改原有的QuerySet
```python
class DahlBookManager(models.Manager):
    def get_queryset(self):
        return super(DahlBookManager, self).get_queryset().filter(author='Roald Dahl')
```



##2. Model Permission
Django的permission系统即可以针对一个Model,也可以针对一个Model的Instance.

django.contrib.auth.models中有User这个Model.其中有一个ManyToMany relationship to django.contrib.auth.models.Permission的field: user_permissions

class models.User中有
```Python
has_perm(perm,object=None)
```
如果这里的object被传入，那么这个函数将检查这个object有没有这个permission.


##3. Custom model field
首先要明白什么是model的field,django官方文档说的很好:
>The simplest way to think of a model field is that it provides a way to take a normal Python object – string, boolean, datetime, or something more complex like Hand – and convert it to and from a format that is useful when dealing with the database (and serialization, but, as we’ll see later, that falls out fairly naturally once you have the database side under control).

就是一个interface或者channel，专门处理python本身的对象和database数据之间的转换





[1]: https://docs.djangoproject.com/en/1.6/topics/auth/default/

