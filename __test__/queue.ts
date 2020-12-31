import { Queue } from '../src/queue';

const queue = new Queue([1, 2, 3]);
console.log(queue.enqueue(4).value); // 4
console.log(queue.values()); // [ 1, 2, 3, 4 ]
console.log(queue.dequeue()?.value); // 1
console.log(queue.dequeue()?.value); // 2
console.log(queue.peek()?.value); // 3
