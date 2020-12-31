# TypeScriptで実装するデータ構造

## TOC
 
- [LinkedList](#linkedlist)
- [Stack](#stack)
- [Queue](#queue)
- [HashTable](#hashtable)
- [Tree](#tree)
- [Heap](#heap)
- [Trie](#trie)
- [BinarySearchTree](#binarysearchtree)
- [Graph](#graph)
- [参考](#参考)

## LinkedList

LinkedListは、各要素が次の要素を参照を持っているシーケンスなデータ構造です。配列と似た形でデータを保存しますが、インデックスによるアクセスは苦手で、時間計算量は配列が`O(1)`であるのに対して、LinkedListは最悪`O(n)`です。

### 仕様

- push(value) - `O(1)`: データを追加する
- pop() - `O(1)`: 最後に追加されたデータを削除する
- find(index) - `O(n)`: indexの要素を検索する
- findBy(callback) - `O(n)`: 要素を検索する
- insertAt(index) - `O(n)`: indexに要素を追加
- removeFrom(index) - `O(n)`: indexの要素を削除

### 実装

```javascript
export class LinkedListNode<T> {
  value: T;
  nextNode: LinkedListNode<T> | null;

  constructor(value: T, next = null) {
    this.value = value;
    this.nextNode = next;
  }
}

export class LinkedList<T> {
  headNode: LinkedListNode<T> | null = null;
  tailNode: LinkedListNode<T> | null = null;
  length = 0;

  constructor(values: T[]) {
    values.forEach((value) => this.push(value));
  }

  // 要素を最後尾に追加
  // O(1)
  push(value: T): LinkedListNode<T> {
    const newNode = new LinkedListNode<T>(value);

    // LinkedListがemptyの場合
    if (!this.headNode || !this.tailNode) {
      this.headNode = newNode;
      this.tailNode = newNode;
    } else {
      this.tailNode.nextNode = newNode;
      this.tailNode = newNode;
    }
    this.length += 1;
    return newNode;
  }

  // 最後尾の要素を削除
  // O(n)
  pop(): LinkedListNode<T> | null {
    const deletedNode = this.tailNode;
    // LinkedListがemptyの場合
    if (this.headNode && this.tailNode) {
      let curentNode = this.headNode;
      while (curentNode !== null) {
        if (curentNode.nextNode) {
          curentNode = curentNode.nextNode;
        } else {
          curentNode == null;
        }
      }
      this.tailNode = curentNode;
      this.length -= 1;
    }

    return deletedNode;
  }

  // indexの要素を検索
  // O(n)
  find(index: number): LinkedListNode<T> | null {
    let currentIndex = 0;
    let currentNode = this.headNode;

    if (index > this.length) {
      throw new Error(`Node index(${index}) does not exist in the list.`);
    }

    while (currentIndex < index) {
      if (currentNode?.nextNode) {
        currentIndex += 1;
        currentNode = currentNode?.nextNode;
      }
    }

    return currentNode;
  }

  // 要素を検索
  // O(n)
  findBy(
    callback: (currentNode: LinkedListNode<T>) => boolean
  ): LinkedListNode<T> | null {
    let currentNode = this.headNode;

    while (currentNode !== null) {
      if (callback(currentNode)) {
        return currentNode;
      }

      if (currentNode?.nextNode) {
        currentNode = currentNode?.nextNode;
      }
    }

    return null;
  }

  // indexに要素を追加
  // O(n)
  insertAt(value: T, index: number): LinkedList<T> {
    if (index > this.length) {
      throw new Error(`Node index(${index}) does not exist in the list.`);
    }

    const newNode = new LinkedListNode(value);
    let currentIndex = 0;
    let currentNode = this.headNode;
    let prevNode = null;

    if (index === 0) {
      newNode.nextNode = this.headNode;
      this.headNode = newNode;
      this.length += 1;
      return this;
    }

    while (currentIndex < index) {
      if (currentNode?.nextNode) {
        currentIndex += 1;
        prevNode = currentNode;
        currentNode = currentNode?.nextNode;
      }
    }

    if (prevNode) {
      newNode.nextNode = currentNode;
      prevNode.nextNode = newNode;
    }

    this.length += 1;
    return this;
  }

  // indexの要素を削除
  // O(n)
  removeFrom(index: number): LinkedList<T> {
    if (index > this.length) {
      throw new Error(`Node index(${index}) does not exist in the list.`);
    }

    let currentIndex = 0;
    let currentNode = this.headNode;
    let prevNode = null;

    if (index === 0 && currentNode?.nextNode) {
      this.headNode = currentNode?.nextNode;
      this.length -= 1;
      return this;
    }

    while (currentIndex < index) {
      if (currentNode?.nextNode) {
        currentIndex += 1;
        prevNode = currentNode;
        currentNode = currentNode?.nextNode;
      }
    }

    if (prevNode?.nextNode && currentNode) {
      prevNode.nextNode = currentNode.nextNode;
    }

    this.length -= 1;
    return this;
  }

  // 値をリストする
  values(): T[] {
    const array = [];
    let currentNode = this.headNode;
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.nextNode;
    }

    return array;
  }

  // イテレーター
  *[Symbol.iterator](): Generator {
    let currentNode = this.headNode;
    while (currentNode !== null) {
      currentNode = currentNode.nextNode;
      yield currentNode;
    }
  }
}

const list = new LinkedList([1, 2, 3]);
console.log(list.push(1)); // 1
console.log(list.values()); // [1, 2, 3, 1]
console.log(list.insertAt(10, 1).values()); // [1, 10, 2, 3, 1]
console.log(list.length); // 4
console.log(list.removeFrom(4).values()); // [ 1, 10, 2, 3 ]
console.log(list.find(2)?.value); // 2
console.log(list.find(10)?.value); // Error: Node index(10) does not exist in the list.
```

## Stack

Stackは、LIFO(Last In First Out)のデータ構造です。データを'A','B','C'という順番に入れた場合、'C','B','A'といった順番で取り除くことができます。LinkedListの応用で実装できます。

### 仕様

- push(value) - `O(1)`: データを追加する
- pop() - `O(1)`: 最後に追加されたデータを削除する
- peek() - `O(1)`: 最後に追加されたデータを返す

### 実装

```javascript
export class StackNode<T> {
  value: T;
  nextNode: StackNode<T> | null;

  constructor(value: T, next = null) {
    this.value = value;
    this.nextNode = next;
  }
}

export class Stack<T> {
  headNode: StackNode<T> | null = null;
  length = 0;

  constructor(values: T[]) {
    values.forEach((value) => this.push(value));
  }

  // データを追加する
  // O(1)
  push(value: T): StackNode<T> {
    const newNode = new StackNode(value);
    newNode.nextNode = this.headNode;
    this.headNode = newNode;
    this.length += 1;

    return newNode;
  }

  // 最後に追加されたデータを削除する
  // O(1)
  pop(): StackNode<T> | null {
    const deletedNode = this.headNode;
    if (this.headNode) {
      this.headNode = this.headNode.nextNode;
      this.length -= 1;
    }

    return deletedNode;
  }

  // 最後に追加されたデータを返す
  // O(1)
  peek(): StackNode<T> | null {
    return this.headNode;
  }

  values(): T[] {
    const array = [];
    let currentNode = this.headNode;
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.nextNode;
    }

    return array;
  }

  *[Symbol.iterator](): Generator {
    let currentNode = this.headNode;
    while (currentNode !== null) {
      currentNode = currentNode.nextNode;
      yield currentNode;
    }
  }
}

const stack = new Stack([1, 2, 3]);
console.log(stack.push(4).value); // 4
console.log(stack.values()); // [ 4, 3, 2, 1 ]
console.log(stack.pop()?.value); // 4
console.log(stack.pop()?.value); // 3
console.log(stack.peek()?.value); // 2
```

## Queue

Queueは、FIFO(First In First Out)のデータ構造です。データを'A','B','C'という順番に入れた場合、'A','B','C'といった順番で取り除くことができます。LinkedListの応用で実装できます。

### 仕様

- enqueue(value) - `O(1)`: データを追加する
- dequeue() - `O(1)`: 最も古いデータを削除する
- peek() - `O(1)`: 最も古いデータを返す

```javascript
export class QueueNode<T> {
  value: T;
  nextNode: QueueNode<T> | null;

  constructor(value: T, next = null) {
    this.value = value;
    this.nextNode = next;
  }
}

export class Queue<T> {
  headNode: QueueNode<T> | null = null;
  tailNode: QueueNode<T> | null = null;
  length = 0;

  constructor(values: T[]) {
    values.forEach((value) => this.enqueue(value));
  }

  // データを追加する
  // O(1)
  enqueue(value: T): QueueNode<T> {
    const newNode = new QueueNode(value);
    if (!this.headNode) {
      this.headNode = newNode;
    }

    if (!this.tailNode) {
      this.tailNode = newNode;
    } else {
      this.tailNode.nextNode = newNode;
      this.tailNode = newNode;
    }
    this.length += 1;

    return newNode;
  }

  // 最初に追加されたデータを削除する
  // O(1)
  dequeue(): QueueNode<T> | null {
    const deletedNode = this.headNode;
    if (this.headNode) {
      this.headNode = this.headNode.nextNode;
      this.length -= 1;
    }

    return deletedNode;
  }

  // 最初に追加されたデータを返す
  // O(1)
  peek(): QueueNode<T> | null {
    return this.headNode;
  }

  values(): T[] {
    const array = [];
    let currentNode = this.headNode;
    while (currentNode !== null) {
      array.push(currentNode.value);
      currentNode = currentNode.nextNode;
    }

    return array;
  }

  *[Symbol.iterator](): Generator {
    let currentNode = this.headNode;
    while (currentNode !== null) {
      currentNode = currentNode.nextNode;
      yield currentNode;
    }
  }
}


const queue = new Queue([1, 2, 3]);
console.log(queue.enqueue(4).value); // 4
console.log(queue.values()); // [ 1, 2, 3, 4 ]
console.log(queue.dequeue()?.value); // 1
console.log(queue.dequeue()?.value); // 2
console.log(queue.peek()?.value); // 3
```

## HashTable

HashTableは、`Object`と同じくキーバリューペアでデータを保存します。キーのハッシュ値をインデックスとして、テーブル内にデータを保存します。データを検索する場合は、検索キーをハッシュし、配列にアクセスします。

JavaScriptでは、`Object`/`Map`で事足りるはずなので、自分で実装する必要はありません。

### 仕様

- hash(key): キーのハッシュ関数
- set(key, value) - `O(1)`: 値をハッシュキーで保存する
- get(key) - `O(1)`: キーから値を取得する

### 実装

```javascript
export class HashTable {
  size: number;
  table: Array<unknown>;

  constructor(size: number) {
    this.size = size;
    this.table = [];
  }

  // キーのハッシュ関数
  hash(key: string): number {
    let id = 0;
    for (let i = 0; i < key.length; i++) {
      // キーの各文字列のUnicode値*100
      id += key.charCodeAt(i) * 100;
    }
    // this.sizeの範囲に収める
    return id % this.size;
  }

  // 値をハッシュキーで保存する
  // O(1)
  set(key: string, value: unknown): void {
    const id = this.hash(key);
    this.table[id] = value;
  }

  // 値をハッシュキーから検索して取得する
  // O(1)
  get(key: string): unknown {
    const id = this.hash(key);
    const value = this.table[id];

    return value;
  }
}

const hashTable = new HashTable(100);
hashTable.set('A', 'a');
hashTable.set('B', 'b');
// ハッシュ関数が不完全またはHashTableのサイズが小さい場合、異なるキーから同一のインデックスが生成されることがある
console.log(hashTable.hash('A')); // 0
console.log(hashTable.hash('B')); // 0

// 不正
console.log(hashTable.get('A')); // b
console.log(hashTable.get('B')); // b
```

ハッシュ関数が不完全またはHashTableのサイズが小さい場合、異なるキーから同一のインデックスが生成されることがあります。これを「衝突」と呼び、解決する方法の一つに、[連鎖法](https://ja.wikipedia.org/wiki/%E3%83%8F%E3%83%83%E3%82%B7%E3%83%A5%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB#%E9%80%A3%E9%8E%96%E6%B3%95)があります。

実装には、コンストラクタで定義する`table`に、LinkedListを使用します。ハッシュ値が衝突した場合、同一インデックスのLinkedListにデータを`push`します。

```javascript
import { LinkedList, LinkedListNode } from './list';

export class HashTableWithLinkedList {
  size: number;
  table: LinkedList<{ key: string; value: unknown }>[];

  constructor(size: number) {
    this.size = size;
    this.table = Array({ length: size }).map(() => new LinkedList([]));
  }

  // キーのハッシュ関数
  hash(key: string): number {
    let id = 0;
    for (let i = 0; i < key.length; i++) {
      // キーの各文字列のUnicode値*100
      id += key.charCodeAt(i) * 100;
    }
    // this.sizeの範囲に収める
    return id % this.size;
  }

  // 値をハッシュキーで保存する
  // O(1)
  set(key: string, value: unknown): void {
    const id = this.hash(key);
    const linkedList = this.table[id];
    linkedList.push({ value, key });
  }

  // 値をハッシュキーから検索して取得する
  // O(1)
  get(key: string): LinkedListNode<{ key: string; value: unknown }> | null {
    const id = this.hash(key);
    const linkedList = this.table[id];

    return linkedList.findBy((currentNode) => currentNode.value.key === key);
  }
}

const hashTableWithLinkedList = new HashTableWithLinkedList(100);
hashTableWithLinkedList.set('A', 'a');
hashTableWithLinkedList.set('B', 'b');
// キーのハッシュ値は同じ(衝突)
console.log(hashTableWithLinkedList.hash('A')); // 0
console.log(hashTableWithLinkedList.hash('B')); // 0
// 上書きされることはない
console.log(hashTableWithLinkedList.get('A')?.value); // { value: 'a', key: 'A' }
console.log(hashTableWithLinkedList.get('B')?.value); // { value: 'b', key: 'B' }
```

## Tree

Treeは、階層性があるデータを表すのに適したデータ構造です。それぞれのNodeは、自身のデータとほかのNodeへの参照(親子関係)を持ちます。

### 仕様

#### Node

- value: 値
- parent: 親Nodeへの参照
- children[]: 子Nodeへの参照

#### Tree

- root: ルートNode(親Nodeを持たないNode)への参照
- traverseWithDepthFirst(): 深さ優先探索(親Nodeから子Nodeへの走査を優先する)
- traverseWithBreadthFirst(): 幅優先探索(深さが同じNodeの走査を優先する)
- find(callback, traversal): Nodeを指定した探索方法で検索する
- add(value, parentValue, traversal): parentValueを指定した探索方法で検索し、その子Nodeとしてvalueを追加する
- remove(value, parentValue, traversal): parentValueを指定した探索方法で検索し、その子Nodeにvalueがあれば削除する

##### traverseWithDepthFirst

深さ優先探索では、以下のようなTree構造があった場合走査順は、G -> E -> C -> D -> A -> B -> F とします。

```
    G
   / \
  E   F
 / \ 
C   D
   / \
  A   B
```

単純な再帰呼び出しで実装することができます。

##### traverseWithBreadthFirst

幅優先探索では、以下のようなTree構造があった場合走査順は、G -> E -> F -> C -> D -> A -> B とします。

```
    G
   / \
  E   F
 / \ 
C   D
   / \
  A   B
```

子Nodeをキュー(Queue)に登録しておき、現在のNodeを探索したあとで、キューに登録されたNodeを探索することで実装することができます。

### 実装

```javascript
import { Queue } from './queue';

export class Node<T> {
  value: T;
  parent: Node<T> | null;
  children: Node<T>[];

  constructor(value: T) {
    this.value = value;
    this.parent = null;
    this.children = [];
  }
}

type Traversal<T> =
  | Tree<T>['traverseWithBreadthFirst']
  | Tree<T>['traverseWithDepthFirst'];

export class Tree<T> {
  root: Node<T>;

  constructor(value: T) {
    this.root = new Node(value);
  }

  // 深さ優先走査
  // O(n)
  traverseWithDepthFirst(callback: (node: Node<T>) => void): void {
    const traverse = (node: Node<T>) => {
      for (let i = 0; i < node.children.length; i++) {
        traverse(node.children[i]);
      }

      callback(node);
    };

    traverse(this.root);
  }

  // 幅優先走査
  // O(n)
  traverseWithBreadthFirst(callback: (node: Node<T>) => void): void {
    const queue = new Queue([this.root]);
    let currentTree = queue.dequeue()?.value;

    while (currentTree) {
      for (let i = 0, length = currentTree.children.length; i < length; i++) {
        queue.enqueue(currentTree.children[i]);
      }

      callback(currentTree);
      currentTree = queue.dequeue()?.value;
    }
  }

  // 指定した値のNodeを検索する
  // O(n)
  find(callback: (node: Node<T>) => void, traversal: Traversal<T>): void {
    traversal.call(this, callback);
  }

  // 指定した値のNodeに新しいNodeを追加する
  // O(n)
  add(value: T, parentValue: T, traversal: Traversal<T>): Node<T> {
    let parentNode = null;
    const newNode = new Node(value);
    this.find((node) => {
      if (node.value === parentValue) {
        parentNode = node;
        parentNode.children.push(newNode);
        newNode.parent = parentNode;
      }
    }, traversal);

    if (!parentNode) {
      throw new Error('Cannot add node to a non-existence parent.');
    }

    return newNode;
  }

  // 指定した親Nodeから指定した値のNodeを削除する
  // O(n)
  remove(value: T, parentValue: T, traversal: Traversal<T>): Node<T> | null {
    let deletedNode: Node<T> | null = null;
    this.find((node) => {
      if (node.value === parentValue) {
        const deletedNodeIndex = node.children.findIndex(
          (node) => node.value === value
        );
        if (!deletedNode) {
          throw new Error('Node to remove does not exist.');
        }
        deletedNode = node.children[deletedNodeIndex];
        node.children.splice(deletedNodeIndex, 1);
      }
    }, traversal);

    return deletedNode;
  }
}

/**
 *     G
 *    / \
 *   E   F
 *  / \
 * C   D
 *    / \
 *   A   B
 */
const tree = new Tree('G');
tree.add('E', 'G', tree.traverseWithBreadthFirst);
tree.add('F', 'G', tree.traverseWithBreadthFirst);
tree.add('C', 'E', tree.traverseWithBreadthFirst);
tree.add('D', 'E', tree.traverseWithBreadthFirst);
tree.add('A', 'D', tree.traverseWithBreadthFirst);
tree.add('B', 'D', tree.traverseWithBreadthFirst);
```

## Heap

Heapとは、子要素は親要素より常に大きいか等しい(または常に小さいか等しい)という制約を持つバイナリーツリー(ノードが持つ子要素が最大2である)構造のことです。[ヒープメモリ](https://ja.wikipedia.org/wiki/%E3%83%92%E3%83%BC%E3%83%97%E9%A0%98%E5%9F%9F)と混同しないように注意が必要です。

ここでは、MinHeap(子要素は親要素より常に小さい)を実装します。

### 仕様

- getMin() - `O(1)`: 最小値を返す
- insert(value) - `O(log n)`: 要素を追加する  
- remove(value) - `O(log n)`: 要素を削除する

#### add

MinHeapにおいて、Nodeを追加するプロセスを図解してみます。Heapは配列としても表現できます:

1. Node(10)を追加する

```
Node(10)をルートとして追加します
10

[10]
```

2. Node(49)を追加する

```
バイナリーツリーでは、ある要素に新しい要素を追加する際左から追加します
   10
  /
49

[10, 49]
```

3. Node(26)を追加する

```
   10
  /  \
49   26

[10, 49, 26]
```

4.1 Node(13)を追加する

```
一時的に、Node(49)の子要素として追加します
     10
    /  \
  49   26
 /
13

[10, 49, 26, 13]
```

配列において、Node(13)のインデックスが`n-1`であるとき、その親のNode(49)のインデックスは`Math.floor((n-1)/2)`と表すことができます。

4.2 Node(13)を正しい場所に移動する

```
13 < 49 なので、Node(13)とNode(49)の場所をスワップします。10 < 13 なのでこれ以上入れ替えません。
     10
    /  \
  13   26
 /
49

[10, 13, 26, 49]
```

次に、時間計算量を考えます。上記(4)では、要素の入れ替えのためにルートの片側の親要素すべてと比較しました。したがって、時間計算量はMinHeapの高さ`h`です。

MinHeapの要素数と、高さ(`h`)は次のような関係にあります。

heapの要素数 | h 
------------|---
1           | 1
2           | 2
3           | 2
4           | 3
5           | 3
6           | 3
7           | 3
8           | 3
9           | 4
<= [tex: 2^k]      | [tex: k]


<div align='center' class='scroll'>
[tex: \displaystyle
\begin{aligned}
n &\leqq 2^k \\
k &\leqq log_2 n
\end{aligned}
]
</div>

よって時間計算量は、[tex: O(\log n)]となります。

#### remove

次の概念図におけるMinHeapから、特定のNodeを削除するプロセスを見てみましょう:

```
      10
    /    \
  13      26
 /  \    /  \
33  40  51   69    

[10, 13, 26, 33, 40, 51, 69]
```

1.1 Node(10)を削除する

```
最も右(the last Node)を一時的にNode(10)のあった場所に据えます
      69
    /    \
  13      26
 /  \    /
33  40  51

[69, 13, 26, 33, 40, 51]
```

1.2 Node(69)を正しい場所に移動します

```
13 < 69 なので、Node(13)とNode(69)の場所をスワップします 
      13
    /    \
  69      26
 /  \    /
33  40  51

[13, 69, 26, 33, 40, 51]
```

1.3 さらに、Node(69)を正しい場所に移動します

```
33 < 69 なので、Node(33)とNode(69)の場所をスワップします 
      13
    /    \
  33      26
 /  \    /
69  40  51

[13, 33, 26, 69, 40, 51]
```

次に、時間計算量を考えます。最も入れ替えのコストが重い場合(最小の要素を削除する場合)を考えてみましょう。`add`と同じように、MinHeapの高さに比例します。

よって時間計算量は、[tex: O(\log n)]となります。

### 実装

```javascript
export class MinHeap {
  heap: Array<number>;

  constructor() {
    this.heap = [];
  }

  swap(currentIndex: number, targetIndex: number): void {
    const tmp = this.heap[targetIndex];
    this.heap[targetIndex] = this.heap[currentIndex];
    this.heap[currentIndex] = tmp;
  }

  add(value: number): void {
    // heap arrayの最後尾に要素を追加
    this.heap.push(value);

    const currentIndex = this.heap.length - 1;
    this.heapifyUp(currentIndex);
  }

  remove(value: number): void {
    if (this.heap.length < 1) return;

    for (let index = 0; index < this.heap.length; index++) {
      if (this.heap[index] !== value) continue;

      // 配列の最後尾の要素を削除する
      const lastItem = this.heap.pop() as number;

      // 削除する要素が配列の最後尾ならここで終了
      if (index === this.heap.length - 1) break;

      this.heap[index] = lastItem;
      this.heapifyUp(index);
      this.heapifyDown(index);
    }
  }

  // 対象の要素と親要素を比較してスワップ
  heapifyUp(index: number): void {
    let currentIndex = index - 1;
    const parentIndex = Math.floor((currentIndex - 1) / 2);

    while (
      currentIndex > 1 &&
      this.heap[parentIndex] > this.heap[currentIndex]
    ) {
      this.swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  // 対象の要素と子要素を比較してスワップ
  heapifyDown(index: number): void {
    let currentIndex = index;
    const currentValue = this.heap[index];

    while (true) {
      let indexToSwap = null;
      const rightChildIndex = (currentIndex + 1) * 2;
      const leftChildIndex = rightChildIndex - 1;
      const rightChild = this.heap[rightChildIndex];
      const leftChild = this.heap[leftChildIndex];

      // rightChildが存在する場合:
      if (rightChild) {
        if (rightChild < currentValue) {
          indexToSwap = rightChildIndex;
        }
      }

      // leftChildが存在する場合:
      if (leftChild) {
        if (leftChild < (indexToSwap === null ? currentValue : rightChild)) {
          indexToSwap = leftChildIndex;
        }
      }

      if (indexToSwap === null) break;

      // スワップ
      this.swap(currentIndex, indexToSwap);
      currentIndex = indexToSwap;
    }
  }
}
```

## Trie

[Trie](https://ja.wikipedia.org/wiki/%E3%83%88%E3%83%A9%E3%82%A4_(%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0))とは、ノードには自身に対応するプレフィックスがあるツリー構造。詳しくはwiki参照。

例えば、`to`/`tea`/`ten`が端NodeであるTrie構造は次のようになります。


```
     null
    /  
   t     
 /   \    
to    te
     /   \
    tea  ten    
```

### 仕様

- insert - `O(m)`: 単語を追加する。計算量は文字列の長さ`m`
- findWords(prefix) - `O(m)`: prefixに続く単語を検索する。計算量は最短でも文字列の長さ`m`

### 実装

```javascript
export class TrieNode {
  value: string;
  children: { [x: string]: TrieNode };
  isWord: boolean;

  constructor(value: string, isWord: boolean) {
    this.value = value;
    // オブジェクトにTrieNodeを保存する
    this.children = {};
    this.isWord = isWord;
  }

  addChild(value: string, isWord: boolean): TrieNode {
    this.children[value] = new TrieNode(value, isWord);
    return this.children[value];
  }

  removeChild(value: string): void {
    delete this.children[value];
  }

  // 自身とその子ノードにおいて、単語となる文字列を返す
  getWords(): string[] {
    const results: string[] = [];

    if (this.isWord) results.push(this.value);

    Object.values(this.children).forEach((child) => {
      const words = child.getWords();
      words.forEach((word) => results.push(word));
    });

    return results;
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode('', false);
  }

  // 単語を追加する
  insert(word: string): void {
    let currentNode = this.root;

    const characters = Array.from(word);

    let value = '';
    characters.forEach((chr, i) => {
      const isWord = i === characters.length - 1;
      value += chr;
      if (currentNode.children[value]) {
        currentNode = currentNode.children[value];
      } else {
        currentNode = currentNode.addChild(value, isWord);
      }
    });
  }

  // 単語を検索する
  findWords(prefix: string): string[] {
    let currentNode = this.root;
    const results: string[] = [];

    const characters = Array.from(prefix);

    let value = '';
    characters.forEach((chr, i) => {
      value += chr;
      const child = currentNode.children[value];

      if (i === characters.length - 1) {
        child.getWords().forEach((word) => {
          results.push(word);
        });
      }

      currentNode = child;
    });

    return results;
  }
}
```

## BinarySearchTree

「左の子孫の値 ≤ 親 ≤ 右の子孫の値」という制約を持つバイナリツリー。

### 実装

- insert - `O(log n)`: 要素を追加する
- find - `O(log n)`: 要素を検索する

時間計算量は、ツリーの高さが`k`であるとき、ノード数は`k^2`より小さいことから、

<div align='center' class='scroll'>
[tex: \displaystyle
\begin{aligned}
n &\leqq 2^k \\
k &\leqq log_2 n
\end{aligned}
]
</div>


よって時間計算等は[tex: O(log n)]

### 仕様

```javascript
export class BinarySearchTreeNode {
  value: number;
  right: null | BinarySearchTreeNode;
  left: null | BinarySearchTreeNode;

  constructor(value: number) {
    this.value = value;
    this.right = null;
    this.left = null;
  }

  insert(value: number): void {
    if (value === this.value) {
      return;
    }

    if (value < this.value) {
      if (this.left) {
        this.left.insert(value);
      } else {
        const newNode = new BinarySearchTreeNode(value);
        this.left = newNode;
      }
    }

    if (this.value < value) {
      if (this.right) {
        return this.right.insert(value);
      } else {
        const newNode = new BinarySearchTreeNode(value);
        this.right = newNode;
      }
    }
  }

  find(value: number): BinarySearchTreeNode | null {
    if (value === this.value) {
      return this;
    }

    if (value < this.value && this.left) {
      return this.left.find(value);
    }

    if (this.value < value && this.right) {
      return this.right.find(value);
    }

    return null;
  }
}

export class BinarySearchTree {
  root: BinarySearchTreeNode;

  constructor(value: number) {
    this.root = new BinarySearchTreeNode(value);
  }

  // 要素を追加する
  // O(log n)
  insert(value: number): void {
    return this.root.insert(value);
  }

  // 要素を検索する
  // O(log n)
  find(value: number): BinarySearchTreeNode | null {
    return this.root.find(value);
  }
}
```

## Graph

ノードの集合とエッジ(辺)の集合によるデータ構造です。ノード同士がどのようにエッジによって結ばれるのかの関係を表現します。ベイジアンネットワークやニューラルネットワークの元になるデータ構造です。

```
   4  -  5  -  1
 /  \      \  /
6     3  -  2
```

## 仕様

- traverseWithDepthFirst(): 深さ優先探索(開始Vertexから次のVertexへの走査を優先する)
- traverseWithBreadthFirst(): 幅優先探索(開始Vertexから深さが同じVertexの走査を優先する)

### traverseWithDepthFirst

スタックを使って、深さ優先探索を実装します。擬似コードは次のようになります。

```
function traverseWithDepthFirst
  スタック、結果配列、走査済みマップを初期化
  開始Vertexをスタックと走査済みマップに追加
  while スタックが空でない間:
    currentVertexをスタックから取り出す
    currentVertexを結果配列に保存
    adjacencyListからcurrentVertexにつながっているVertexを取り出し、
    各Vertexが走査済みではないなら、走査済みマップとスタックに追加

  return 結果配列
```

開始Vertexを4とすると、

1. 4につながるVertexをスタックと走査済みマップに追加 Stack(`3, 5, 6`) Visited(`4, 3, 5, 6`) Result(`4`)
2. スタックをpopし、6を取り出す。6につながる未走査Vertexはないので次へ Stack(`3, 5`) Visited(`4, 3, 5, 6`) Result(`4, 6`)
3. スタックをpopし、5を取り出す。5につながる未走査Vertexをスタックと走査済みマップに追加 Stack(`3, 1, 2`) Visited(`4, 3, 5, 6, 1, 2`) Result(`4, 6, 5`)
4. スタックをpopし、2を取り出す。1につながる未操作Vertexはないので次へ Stack(`3, 1`) Visited(`4, 3, 5, 6, 1, 2`) Result(`4, 6, 5, 2`)
5. 以後繰り返し

### traverseWithBreadthFirst

キューを使って、深さ優先探索を実装します。擬似コードは次のようになります。

```
function traverseWithBreadthFirst
  キュー、結果配列、走査済みマップを初期化
  開始Vertexをキューと走査済みマップに追加
  while キューが空でない間:
    currentVertexをキューから取り出す
    currentVertexを結果配列に保存
    adjacencyListからcurrentVertexにつながっているVertexを取り出し、
    各Vertexが走査済みではないなら、走査済みマップとキューに追加

  return 結果配列
```

開始Vertexを4とすると、

1. キューに`3, 5, 6`を追加 Queue(`3, 5, 6`) Result(`4, 3, 5, 6`)
3. キューから3を取り出す。3につながる未走査Vertex(`2`)をキューと走査済みマップに追加。 Queue(`5, 6, 2`) Result(`4, 3, 5, 6, 2`)
4. キューから5を取り出す。5につながる未走査Vertex(`1`)をキューと走査済みマップに追加。 Queue(`6, 2, 1`) Result(`4, 3, 5, 6, 2, 1`)
5. キューから6を取り出す。6につながる未走査Vertexはない
6. 以後繰り返し

## 実装

```javascript
import { Queue } from './queue';
import { Stack } from './stack';

export class Graph {
  adjacencyList: { [x: string]: string[] };

  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex: string): void {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(source: string, destination: string): void {
    if (!this.adjacencyList[source]) {
      this.addVertex(source);
    }
    if (!this.adjacencyList[destination]) {
      this.addVertex(destination);
    }
    this.adjacencyList[source].push(destination);
    this.adjacencyList[destination].push(source);
  }

  removeEdge(source: string, destination: string): void {
    this.adjacencyList[source] = this.adjacencyList[source].filter(
      (vertex) => vertex !== destination
    );
    this.adjacencyList[destination] = this.adjacencyList[destination].filter(
      (vertex) => vertex !== source
    );
  }

  removeVertex(vertex: string): void {
    while (this.adjacencyList[vertex]) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      if (adjacentVertex) {
        this.removeEdge(vertex, adjacentVertex);
      }
    }
    delete this.adjacencyList[vertex];
  }

  // 深さ優先探索
  traverseWithDepthFirst(start: string): string[] {
    const stack = new Stack([start]);
    const result = [];
    const visited: { [x: string]: boolean } = {};
    visited[start] = true;
    let currentVertex;

    while (stack.length) {
      currentVertex = stack.pop()?.value;
      if (!currentVertex) continue;

      result.push(currentVertex);

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  // 幅優先探索
  traverseWithBreadthFirst(start: string): string[] {
    const queue = new Queue([start]);
    const result = [];
    const visited: { [x: string]: boolean } = {};
    visited[start] = true;
    let currentVertex;

    while (queue.length) {
      currentVertex = queue.dequeue()?.value;
      if (!currentVertex) continue;

      result.push(currentVertex);
      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.enqueue(neighbor);
        }
      });
    }

    return result;
  }
}

//    4  -  5  -  1
//  /  \      \  /
// 6     3  -  2
const graph = new Graph();
['1', '2', '3', '4', '5', '6'].forEach((vertex) => {
  graph.addVertex(vertex);
});
[
  ['1', '2'],
  ['1', '5'],
  ['2', '5'],
  ['2', '3'],
  ['3', '4'],
  ['4', '5'],
  ['4', '6'],
].forEach(([source, target]) => {
  graph.addEdge(source, target);
});

console.log(graph);
// Graph {
//   adjacencyList: {
//     '1': [ '2', '5' ],
//     '2': [ '1', '5', '3' ],
//     '3': [ '2', '4' ],
//     '4': [ '3', '5', '6' ],
//     '5': [ '1', '2', '4' ],
//     '6': [ '4' ]
//   }
// }

// 深さ優先探索
console.log(graph.traverseWithDepthFirst('4')); // [ '4', '6', '5', '2', '1', '3' ]
// 幅優先探索
console.log(graph.traverseWithBreadthFirst('4')); // [ '4', '3', '5', '6', '2', '1' ]
```

## 参考

- https://code.tutsplus.com/articles/data-structures-with-javascript-singly-linked-list-and-doubly-linked-list--cms-23392
- https://github.com/trekhleb/javascript-algorithms/tree/master
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
- https://www.mattzeunert.com/2017/02/01/implementing-a-hash-table-in-javascript.html
- https://ja.wikipedia.org/wiki/%E3%83%8F%E3%83%83%E3%82%B7%E3%83%A5%E3%83%86%E3%83%BC%E3%83%96%E3%83%AB
- https://code.tutsplus.com/articles/data-structures-with-javascript-tree--cms-23393
- https://ja.wikipedia.org/wiki/%E6%9C%A8%E6%A7%8B%E9%80%A0_(%E3%83%87%E3%83%BC%E3%82%BF%E6%A7%8B%E9%80%A0)
- https://ja.wikipedia.org/wiki/%E3%83%92%E3%83%BC%E3%83%97
- https://blog.bitsrc.io/implementing-heaps-in-javascript-c3fbf1cb2e65
- https://eloquentjavascript.net/1st_edition/appendix2.html
- https://kevinwin.com/blog/How-to-implement-a-Trie-in-JavaScript/
- https://ja.wikipedia.org/wiki/%E4%BA%8C%E5%88%86%E6%8E%A2%E7%B4%A2%E6%9C%A8
- https://www.freecodecamp.org/news/8-essential-graph-algorithms-in-javascript/

