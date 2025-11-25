import { Nullable } from "../types/nullable";

class SinglyLinkedList<T> {
  head: ListNode<T>;

  constructor(headValue: T) {
    this.head = new ListNode(headValue);
  }

  findNodeByValue(value: T): Nullable<ListNode<T>> {
    let current: Nullable<ListNode<T>> = this.head;
    while (current !== null) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  findNodeByValueOrThrow(value: T): ListNode<T> {
    const node = this.findNodeByValue(value);
    if (!node) throw new Error("Node Not Found");
    return node;
  }

  findNodeByNextValueOrThrow(value: T): ListNode<T> {
    let current: Nullable<ListNode<T>> = this.head;
    while (current !== null && current.next !== null) {
      if (current.next.value === value) return current;
      current = current.next;
    }
    throw new Error("Node Not Found");
  }

  iterateAndApplyFunctionToValue(func: (node: ListNode<T>) => void): void {
    let current: Nullable<ListNode<T>> = this.head;
    while (current !== null) {
      func(current);
      current = current.next;
    }
  }

  getLength(): number {
    let current: Nullable<ListNode<T>> = this.head;
    let count = 0;
    while (current !== null) {
      count++;
      current = current.next;
    }
    return count;
  }

  getLastNode(): ListNode<T> {
    let current: ListNode<T> = this.head;
    while (current.next !== null) {
      current = current.next;
    }
    return current;
  }

  insertInTheEnd(value: T): void {
    const lastNode = this.getLastNode();
    lastNode.setNext(new ListNode(value));
  }

  insertInTheBeginning(value: T): void {
    this.head = new ListNode(value, this.head);
  }

  insertAfterValue(existingValue: T, newValue: T): void {
    const existingNode = this.findNodeByValueOrThrow(existingValue);
    const next = existingNode.getNextNodeOrNull();
    const newNode = new ListNode(newValue, next);
    existingNode.setNext(newNode);
  }

  removeByValue(value: T): void {
    if (this.head.value === value) {
      this.removeHead();
      return;
    }

    const prevNode = this.findNodeByNextValueOrThrow(value);
    const toRemove = prevNode.getNextNodeOrThrow();
    const next = toRemove.getNextNodeOrNull();

    if (next) prevNode.setNext(next);
    else prevNode.removeNext();
  }

  removeHead(): void {
    this.head = this.head.getNextNodeOrThrow();
  }
}

class ListNode<T> {
  value: T;
  next: Nullable<ListNode<T>>;

  constructor(value: T, next: Nullable<ListNode<T>> = null) {
    this.value = value;
    this.next = next;
  }

  getValue(): T {
    return this.value;
  }

  hasNext(): boolean {
    return this.next !== null;
  }

  getNextNodeOrNull(): Nullable<ListNode<T>> {
    return this.next;
  }

  getNextNodeOrThrow(): ListNode<T> {
    if (!this.next) throw new Error("Next Node Not Found");
    return this.next;
  }

  setNext(next: ListNode<T>): void {
    this.next = next;
  }

  removeNext(): void {
    this.next = null;
  }

  toString(): string {
    return `ListNode(${this.value})`;
  }

  print(): void {
    console.log(this.toString());
  }
}

export { SinglyLinkedList, ListNode };
