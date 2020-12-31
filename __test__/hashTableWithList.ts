import { HashTableWithLinkedList } from '../src/hashTableWithList';

const hashTableWithLinkedList = new HashTableWithLinkedList(100);
hashTableWithLinkedList.set('A', 'a');
hashTableWithLinkedList.set('B', 'b');
console.log(hashTableWithLinkedList.hash('A')); // 0
console.log(hashTableWithLinkedList.hash('B')); // 0
console.log(hashTableWithLinkedList.get('A')?.value); // { value: 'a', key: 'A' }
console.log(hashTableWithLinkedList.get('B')?.value); // { value: 'b', key: 'B' }
