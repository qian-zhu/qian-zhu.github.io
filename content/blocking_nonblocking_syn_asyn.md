Title: Blocking vs Non-blocking, Syn vs Asyc 
Date: 2014-07-26
Category: System
Tags: System 
Slug: Blocking vs Non-blocking, Syn vs Asyc 
Summary: Discuss these definition 

#Simplified matrix of basic Linux I/O models
![Simplified matrix of basic Linux I/O models]({filename}/images/io_type.gif)

# Blocking vs Non-blocking
这两者的区分仅仅在于是否会阻塞当前进程上。如果会阻塞就是blocking,如果不会阻塞，无论是采用什么方法，都属于non-blocking.

比如在Linux中，通过fcntl可以设置O_NONBLOCK。当文件当前不可读/可写时，自动返回一个错误值。这属于sync and non-blocking.

#Asynchronous vs Synchronous
区别主要是同步的方式。Synchronous通过时钟同步，Asynchronous通过信号同步。Asynchronous and blocking I/O也是存在的。比如Linux中select的系统调用。

select监视若干个文件并且在background运行一个timer，如果文件中有一个可以读/写，或者timer到期，都返回。会阻塞当前进程，但是确实Async

