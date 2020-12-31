import { Stack } from '../src/stack';

const stack = new Stack([1, 2, 3]);
console.log(stack.push(4).value); // 4
console.log(stack.values()); // [ 4, 3, 2, 1 ]
console.log(stack.pop()?.value); // 4
console.log(stack.pop()?.value); // 3
console.log(stack.peek()?.value); // 2
