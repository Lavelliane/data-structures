class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(element, priority) {
        this.queue.push({ element, priority });
        this.sort();
    }

    dequeue() {
        if (this.isEmpty()) {
            return null;
        }
        return this.queue.shift().element;
    }

    sort() {
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}

class Graph {
    constructor() {
        this.nodes = new Map();
    }

    addNode(node) {
        this.nodes.set(node, []);
    }

    addEdge(node1, node2, weight) {
        this.nodes.get(node1).push({ node: node2, weight });
        this.nodes.get(node2).push({ node: node1, weight });
    }

    dijkstra(startNode) {
        const distances = new Map();
        const previous = new Map();
        const pq = new PriorityQueue();

        // Initialize distances
        for (let node of this.nodes.keys()) {
            if (node === startNode) {
                distances.set(node, 0);
                pq.enqueue(node, 0);
            } else {
                distances.set(node, Infinity);
                pq.enqueue(node, Infinity);
            }
            previous.set(node, null);
        }

        while (!pq.isEmpty()) {
            let currentNode = pq.dequeue();
            
            for (let neighbor of this.nodes.get(currentNode)) {
                let distance = distances.get(currentNode) + neighbor.weight;
                
                if (distance < distances.get(neighbor.node)) {
                    distances.set(neighbor.node, distance);
                    previous.set(neighbor.node, currentNode);
                    pq.enqueue(neighbor.node, distance);
                }
            }
        }

        return { distances, previous };
    }

    getPath(startNode, endNode) {
        const { distances, previous } = this.dijkstra(startNode);
        const path = [];
        let currentNode = endNode;

        while (currentNode !== null) {
            path.unshift(currentNode);
            currentNode = previous.get(currentNode);
        }

        return {
            path: path,
            distance: distances.get(endNode)
        };
    }
}

// Example usage:
const graph = new Graph();

graph.addNode("A");
graph.addNode("B");
graph.addNode("C");
graph.addNode("D");

graph.addEdge("A", "B", 4);
graph.addEdge("A", "C", 2);
graph.addEdge("B", "D", 3);
graph.addEdge("C", "D", 1);

const result = graph.getPath("A", "D");
console.log("Shortest path:", result.path);
console.log("Total distance:", result.distance);
