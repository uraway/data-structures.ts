import { MinHeap } from '../src/minHeap';

const minHeap = new MinHeap();
[10, 13, 26, 33, 40, 51].forEach((v) => minHeap.add(v));

minHeap.add(69);

console.log(JSON.stringify(minHeap.heap)); // [10,13,26,33,40,51,69]

minHeap.remove(10);

console.log(JSON.stringify(minHeap.heap)); // [13,33,26,69,40,51]
