# The Thread Model

[Prev]() [Next]()

The Game Boy's CPU is single-core, therefore in GB BASIC, threads run [concurrently](https://en.wikipedia.org/wiki/Concurrent_computing) but not in [parallel](https://en.wikipedia.org/wiki/Parallel_computing). In other words, the thread scheduler divides all threads into small execution time slices. After running one thread's time slice, the scheduler switches execution to the next thread's time slice; at any given moment, only one thread is running. In GB BASIC, the introduction of threads makes developing concurrent behaviour and asynchronous processes simpler.

The diagram below illustrates the thread states.

<img src="imgs/gbbvm-thread-states.png" class="diagram-image diagram-schematic">

* **New**: When a new thread is created, it is in the new state.
* **Runnable**: A thread that is ready to run is moved to a runnable state.
* **Running**: A thread that is currently running is in the running state.
* **Terminated**: A thread terminates because of either of user `kill` or encountering an `end` statement.
* **Blocked**: The thread will be in blocked state when it is trying to acquire execution flow control, but another thread has acquired an execution lock. It will move to the runnable state when the execution lock is released.
* **Waiting**: The thread will be in waiting state when it calls `wait ...`, `join ...`, or other waitable statements. When the specified time expires or the joining thread terminates, it will switch to the runnable state.

## Thread Creation and Termination

Every thread has a complete lifecycle, from creation to termination. After program startup, its first instructions run on an initial thread. This initial thread is no different from other ordinary threads and can also be terminated.

<details open>
<summary><b>Details</b></summary>
<div class="details-text">
Thread creation and termination can be caused by the following operations.

* Thread creation
  * User `start`
  * Input callbacks like `btn`, `touch`, etc.
  * `actor` behaviour and collision callbacks
  * `trigger` event callbacks
  * `menu` event callbacks
* Thread termination
  * User `kill`
  * Normal completion, i.e., encountering an `end` statement
  * Program shutdown
</div>
</details>

## Thread Execution and Scheduling

When a thread is in the running state, the scheduler allocates a time slice (quant) to it before switching to the next thread. The length of this quant is determined by the scheduler, typically equivalent to 16 instructions. However, if the thread is in a waiting state, the quant is 1, meaning it remains on the waiting instruction until the wait phase is over. The scheduler ensures that each thread is allocated reasonable time slices overall, and that the response is timely.

The diagram below illustrates a typical thread execution flow.

<img src="imgs/gbbvm-thread-execution-model.png" class="diagram-image diagram-schematic">

<!-- gem -->
