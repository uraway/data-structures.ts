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
