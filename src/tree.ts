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
