export class TrieNode {
  value: string;
  children: { [x: string]: TrieNode };
  isWord: boolean;

  constructor(value: string, isWord: boolean) {
    this.value = value;
    // オブジェクトにTrieNodeを保存する
    this.children = {};
    this.isWord = isWord;
  }

  addChild(value: string, isWord: boolean): TrieNode {
    this.children[value] = new TrieNode(value, isWord);
    return this.children[value];
  }

  removeChild(value: string): void {
    delete this.children[value];
  }

  // 自身とその子ノードにおいて、単語となる文字列を返す
  getWords(): string[] {
    const results: string[] = [];

    if (this.isWord) results.push(this.value);

    Object.values(this.children).forEach((child) => {
      const words = child.getWords();
      words.forEach((word) => results.push(word));
    });

    return results;
  }
}

export class Trie {
  root: TrieNode;

  constructor() {
    this.root = new TrieNode('', false);
  }

  // 単語を追加する
  insert(word: string): void {
    let currentNode = this.root;

    const characters = Array.from(word);

    let value = '';
    characters.forEach((chr, i) => {
      const isWord = i === characters.length - 1;
      value += chr;
      if (currentNode.children[value]) {
        currentNode = currentNode.children[value];
      } else {
        currentNode = currentNode.addChild(value, isWord);
      }
    });
  }

  // 単語を検索する
  findWords(prefix: string): string[] {
    let currentNode = this.root;
    const results: string[] = [];

    const characters = Array.from(prefix);

    let value = '';
    characters.forEach((chr, i) => {
      value += chr;
      const child = currentNode.children[value];

      if (i === characters.length - 1) {
        child.getWords().forEach((word) => {
          results.push(word);
        });
      }

      currentNode = child;
    });

    return results;
  }
}
