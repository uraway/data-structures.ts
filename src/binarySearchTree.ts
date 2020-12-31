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
