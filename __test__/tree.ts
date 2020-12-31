import { Tree } from '../src/tree';
import { measure } from '../utils/measure';

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

const traverseWithBreadthFirstTime = async (target: string) =>
  measure(() => {
    tree.find((node) => {
      if (node.value === target) {
        return;
      }
    }, tree.traverseWithBreadthFirst);
  });
const traverseWithDepthFirstTime = async (target: string) =>
  await measure(() => {
    tree.find((node) => {
      if (node.value === target) {
        return;
      }
    }, tree.traverseWithDepthFirst);
  });

['A', 'F'].forEach(async (target) => {
  console.log(
    `traverseWithBreadthFirst (${target}): ${await traverseWithBreadthFirstTime(
      target
    )}`
  );
  console.log(
    `traverseWithDepthFirst (${target}): ${await traverseWithDepthFirstTime(
      target
    )}`
  );
});
