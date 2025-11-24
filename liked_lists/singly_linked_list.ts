import { TypeOrNull } from "../types/TypeOrNUll";

class SinglyLinkedList<T> {}

class ListNode<T> {
  value: T;
  next: TypeOrNull<ListNode<T>>;

  constructor(value: T, next: TypeOrNull<ListNode<T>> = null) {
    this.value = value;
    this.next = next;
  }

  getValue(): T {
    return this.value;
  }

  hasNext(): Boolean {
    return !!this.next;
  }

  getNextNodeOrNull(): ListNode<T> | null {
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
}
