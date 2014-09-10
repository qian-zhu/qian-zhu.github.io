Title: Pratical Vim
Date: 2014-07-19
Tags: Tools, Vim 
Slug: pratical_vim
Summary: The vim way

#What is the idea behind vim?

> Vim is optimized for repetition.Act,repeat, reverse 

vim不是一大堆插件以及一大堆的命令。很多人觉得vim难以上手也是因为不了解vim的精髓。Dot command 是vim中处理重复操作基本命令.需要注意的是"."重复上一组**修改**而不是**跳转**的动作

举个例子:

|Keystrokes |Buffer Contents|
|-----------|---------------|
|\{start\} 	|...We're waiting for content before the site can go live If you are **c**ontent with this, let's go ahead with it We'll launch as soon as we have the content
|* 			|...We're waiting for **content** before the site can go live.If you are **content** with this, let's go ahead with it.We'll launch as soon as we have the **content**...
|cwcopy<Esc>|...We're waiting for content before the site can go live.If you are content with this, let's go ahead with it.We'll launch as soon as we have the **copy**...
|n 			|...We're waiting for **content** before the site can go live.If you are **content** with this, let's go ahead with it.We'll launch as soon as we have the copy...
|. 			|...We're waiting for **copy** before the site can go live.If you are content with this, let's go ahead with it.We'll launch as soon as we have the copy...

# Compose Repeatable Changes

Suppose our cursor is positioned on the "h", and we want to delete the word "nigh"

>The end is nigh

### Method 1:
|Keystrokes |Buffer Contents|
|-----------|---------------|
|\{start\}  |The end is nig**h**|
|db 		|The end is h	|
|x 			|The end is		|
"." repeat "x"

###Method 2:
|Keystrokes |Buffer Contents|
|-----------|---------------|
|\{start\} 	|The end is nig**h**|
|b 			|The end is nigh|
|dw 		|The end is		|
"." repeat "dw"

###Method 3:
|Keystrokes |Buffer Contents|
|-----------|---------------|
|\{start\}  |The end is nig**h**|
|daw		|The end is		|
"." repeat "daw"

Method 3 is the best one. 

# Register + Operator + Motion = Action
d\{motion\} :

* dl : delete a single character
* daw: delete a complete word
* dap : delete a paragraphy

d,c,y 都属于operator, l,aw,ap属于motion，说明operator作用的对象。vim基本的语法就是operator + motion.

* "ayy: yank current line to register a
* "ayiw: yank current inner work to register a
## Operator:

* a : around 删除word,包括周边空格
* i : inner 删除字,但是不包括周围空格


## Register
### The Unnamed Register ("")
默认寄存器就是"", 所以**dd**相当于**""dd**

###The Yank Register : "0
yank register. 顾名思义就是在yank使会更新的register. 这个的好处就是不会被dd,diw这些命令覆盖了之前yank的内容。

### The black hole register("_)
A place from which nothing returns. 

### More Registers:

* "% : Name of the current file
* "# : Name of the alternate file
* ". : Last inserted text
* ": : Last Ex command
* "/ : Last search pattern -- it can be set explicitly using *:let*

### Commands

* reg : show all register content
