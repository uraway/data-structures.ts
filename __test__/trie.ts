import { Trie } from '../src/trie';

const trie = new Trie();

trie.insert('hell');
trie.insert('hello');
trie.insert('hall');

console.log(trie.findWords('hell')); // [ 'hell', 'hello' ]
