import { Queue } from './queue';
import { Stack } from './stack';

export class Graph {
  adjacencyList: { [x: string]: string[] };

  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex: string): void {
    if (!this.adjacencyList[vertex]) {
      this.adjacencyList[vertex] = [];
    }
  }

  addEdge(source: string, destination: string): void {
    if (!this.adjacencyList[source]) {
      this.addVertex(source);
    }
    if (!this.adjacencyList[destination]) {
      this.addVertex(destination);
    }
    this.adjacencyList[source].push(destination);
    this.adjacencyList[destination].push(source);
  }

  removeEdge(source: string, destination: string): void {
    this.adjacencyList[source] = this.adjacencyList[source].filter(
      (vertex) => vertex !== destination
    );
    this.adjacencyList[destination] = this.adjacencyList[destination].filter(
      (vertex) => vertex !== source
    );
  }

  removeVertex(vertex: string): void {
    while (this.adjacencyList[vertex]) {
      const adjacentVertex = this.adjacencyList[vertex].pop();
      if (adjacentVertex) {
        this.removeEdge(vertex, adjacentVertex);
      }
    }
    delete this.adjacencyList[vertex];
  }

  // 深さ優先探索
  traverseWithDepthFirst(start: string): string[] {
    const stack = new Stack([start]);
    const result = [];
    const visited: { [x: string]: boolean } = {};
    visited[start] = true;
    let currentVertex;

    while (stack.length) {
      currentVertex = stack.pop()?.value;
      if (!currentVertex) continue;

      result.push(currentVertex);

      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          stack.push(neighbor);
        }
      });
    }
    return result;
  }

  // 幅優先探索
  traverseWithBreadthFirst(start: string): string[] {
    const queue = new Queue([start]);
    const result = [];
    const visited: { [x: string]: boolean } = {};
    visited[start] = true;
    let currentVertex;

    while (queue.length) {
      currentVertex = queue.dequeue()?.value;
      if (!currentVertex) continue;

      result.push(currentVertex);
      this.adjacencyList[currentVertex].forEach((neighbor) => {
        if (!visited[neighbor]) {
          visited[neighbor] = true;
          queue.enqueue(neighbor);
        }
      });
    }

    return result;
  }
}
