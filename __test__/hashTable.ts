import { HashTable } from '../src/hashTable';

const hashTable = new HashTable(100);
hashTable.set('A', 'a');
hashTable.set('B', 'b');
// ハッシュ関数が不完全またはHashTableのサイズが小さい場合、異なるキーから同一のインデックスが生成されることがある
console.log(hashTable.hash('A')); // 0
console.log(hashTable.hash('B')); // 0

// 不正
console.log(hashTable.get('A')); // b
console.log(hashTable.get('B')); // b
