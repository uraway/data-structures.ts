import { LinkedList } from '../src/list';

const list = new LinkedList([1, 2, 3]);
console.log(list.push(1)); // 1
console.log(list.values()); // [1, 2, 3, 1]
console.log(list.insertAt(10, 1).values()); // [1, 10, 2, 3, 1]
console.log(list.length); // 4
console.log(list.removeFrom(4).values()); // [ 1, 10, 2, 3 ]
console.log(list.find(2)?.value); // 2
console.log(list.find(10)?.value); // Error: Node index(10) does not exist in the list.
