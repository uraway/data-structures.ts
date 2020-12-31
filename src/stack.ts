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
