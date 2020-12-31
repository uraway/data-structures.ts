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
