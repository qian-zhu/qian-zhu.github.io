Title:Form in Django 
Date: 2014-09-13
Tags: Python, Django 
Slug: form_in_django
Summary: Form in Django

##Form
Django中form主要3个作用:
 
* Render,渲染: Http Get请求时，返回对应的HTML form ,当验证错误时，返回对应的form以及错误的tip
* Validate,验证: 包括在后台验证以及返回验证的结果
* Convert: 将提交的数据转换为相应的Python的数据


针对这几个作用，有几个相关的概念:

* Render : Widget以及Form assets. 前者对应html form的元素，后者对应选择这个form所需的css和javascript资源
* Validate: Field和Form. 前者定义了单个field的验证方法。后者对应了整个表单的验证。

##相关的函数和属性
###Validation
is_valid(): 如果返回True意味着提交的数据正确，并且已经转换成了对应的Python object, 其显示为:
```python
    @property
    def errors(self):
        "Returns an ErrorDict for the data provided for the form"
        if self._errors is None:
            self.full_clean()
        return self._errors

    def is_valid(self):
        """
        Returns True if the form has no errors. Otherwise, False. If errors are
        being ignored, returns False.
        """
        return self.is_bound and not bool(self.errors)

```
可以看到其主要是返回errors这个函数的结果。error其实是调用了full_clean这个函数:
```python
 def full_clean(self):
        """
        Cleans all of self.data and populates self._errors and
        self.cleaned_data.
        """
        self._errors = ErrorDict()
        if not self.is_bound: # Stop further processing.
            return
        self.cleaned_data = {}
        # If the form is permitted to be empty, and none of the form data has
        # changed from the initial data, short circuit any validation.
        if self.empty_permitted and not self.has_changed():
            return
        self._clean_fields()
        self._clean_form()
        self._post_clean()
```
这里可以看到validate的顺序: 首先是对每一个field执行clean(validate)，然后对整个form执行。

####1. 对每个field进行validate

```python
def _clean_fields(self):
        for name, field in self.fields.items():
            # value_from_datadict() gets the data from the data dictionaries.
            # Each widget type knows how to retrieve its own data, because some
            # widgets split data over several HTML fields.
            value = field.widget.value_from_datadict(self.data, self.files, self.add_prefix(name))
            try:
                if isinstance(field, FileField):
                    initial = self.initial.get(name, field.initial)
                    value = field.clean(value, initial)
                else:
                    value = field.clean(value)
                self.cleaned_data[name] = value
                if hasattr(self, 'clean_%s' % name):
                    value = getattr(self, 'clean_%s' % name)()
                    self.cleaned_data[name] = value
            except ValidationError as e:
                self._errors[name] = self.error_class(e.messages)
                if name in self.cleaned_data:
                    del self.cleaned_data[name]
```
可以看到_clean_fields:

1.  先是调用field自身的clean函数，而每个field在初始化的时候可以传入validator作为此field的validate函数。
2. 调用getattr(self, 'clean_%s' % name)() : clean_fieldname. 这里注意没有传入参数? 此时clean_fieldname这个函数可以访问self.cleaned_data[],获取之前field的cleaned_data

Field的validator的初始化和调用如下:
```python
class Field(object):
    def __init__(self, required=True, widget=None, label=None, initial=None,
                 help_text='', error_messages=None, show_hidden_initial=False,
                 validators=[], localize=False):
#.....

    def run_validators(self, value):
        if value in self.empty_values:
            return
        errors = []
        for v in self.validators:
            try:
                v(value)
            except ValidationError as e:
                if hasattr(e, 'code') and e.code in self.error_messages:
                    e.message = self.error_messages[e.code]
                errors.extend(e.error_list)
        if errors:
            raise ValidationError(errors)

```
可以看到每一field的validator都会被传入此field的value。

####2. 对整个Form进行validate
```python
    def _clean_form(self):
        try:
            self.cleaned_data = self.clean()
        except ValidationError as e:
            self._errors[NON_FIELD_ERRORS] = self.error_class(e.messages)

```
这里可以看到主要是调用clean这个函数
```python
    def clean(self):
        """
        Hook for doing any extra form-wide cleaning after Field.clean() been
        called on every field. Any ValidationError raised by this method will
        not be associated with a particular field; it will have a special-case
        association with the field named '__all__'.
        """
        return self.cleaned_data

```
在form这个父类里面clean没有定义，直接返回当前的cleaned_data,在具体的form类时，如果我们要对整个form进行validate，需要定义clean函数并且返回cleaned_data.

综上所述，执行validate的顺序如下:

1. **field**: clean(self,data,initial=None)调用:
  1.to_python() : 把数据转换成python object
  2.validate() :  handles field-specific validation that is not suitable for a validator
   3.run_validator() :  runs all of the field’s validators and aggregates all the errors into a single ValidationError

2.  clean_<fieldname>() method in a **form subclass**
3. The **Form subclass’s** clean() method

##ModelForm
ModelForm其实就是根据对应的Model自动生成相应的Form.所以它不仅有:

1. Render: render model field as HTML
2. Validation: selector validator based off of model field definitions

而且能够save(insert,update)对应的model.

对于ModelForm，不要进行重复定义，比如:
```python
from django.db import models

class MyModel(models.Model):

    name = models.CharField(max_length=50, blank=True)
    age = models.IntegerField(blank=True, null=True)
    profession = models.CharField(max_length=100, blank=True)
    bio = models.TextField(blank=True)

class MyModelForm(forms.ModelForm):

    name = forms.CharField(max_length=100, required=True)
    age = forms.IntegerField(required=True)
    profession = forms.CharField(required=True)
    bio = forms.TextField(required=True)

    class Meta:
        model = MyModel
```
这里MyModelForm违反了DRY(Dont't repeat yourself)的原则。相反，我们只需要修改我们想要修改的部分：
```python
class MyModelForm(forms.ModelForm):

    def __init__(self, *args, **kwargs):
        super(MyModelForm, self).__init__(*args, **kwargs)
        # Making name required
        self.fields['name'].required = True
        self.fields['age'].required = True
        self.fields['bio'].required = True
        self.fields['profession'].required = True

    class Meta:
        model = MyModel
```