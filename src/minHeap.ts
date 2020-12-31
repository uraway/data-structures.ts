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
