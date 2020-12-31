import { BinarySearchTree } from '../src/binarySearchTree';

/**
 *      8
 *    /   \
 *   3     10
 *  / \      \
 * 1  6      14
 *   / \     /
 *  4  7   13
 */
const binarySearchTree = new BinarySearchTree(8);
binarySearchTree.insert(3);
binarySearchTree.insert(10);
binarySearchTree.find(3)?.insert(1);
binarySearchTree.find(3)?.insert(6);
binarySearchTree.find(6)?.insert(4);
binarySearchTree.find(6)?.insert(7);
binarySearchTree.find(10)?.insert(14);
binarySearchTree.find(14)?.insert(13);

console.log(binarySearchTree.find(6));
