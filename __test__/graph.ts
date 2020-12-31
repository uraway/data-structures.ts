import { Graph } from '../src/graph';

//    4  -  5  -  1
//  /  \      \  /
// 6     3  -  2
const graph = new Graph();
['1', '2', '3', '4', '5', '6'].forEach((vertex) => {
  graph.addVertex(vertex);
});
[
  ['1', '2'],
  ['1', '5'],
  ['2', '5'],
  ['2', '3'],
  ['3', '4'],
  ['4', '5'],
  ['4', '6'],
].forEach(([source, target]) => {
  graph.addEdge(source, target);
});

console.log(graph);
// Graph {
//   adjacencyList: {
//     '1': [ '2', '5' ],
//     '2': [ '1', '5', '3' ],
//     '3': [ '2', '4' ],
//     '4': [ '3', '5', '6' ],
//     '5': [ '1', '2', '4' ],
//     '6': [ '4' ]
//   }
// }

// 深さ優先探索
console.log(graph.traverseWithDepthFirst('4')); // [ '4', '6', '5', '2', '1', '3' ]
// 幅優先探索
console.log(graph.traverseWithBreadthFirst('4')); // [ '4', '3', '5', '6', '2', '1' ]
