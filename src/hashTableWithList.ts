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
