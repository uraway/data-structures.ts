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
