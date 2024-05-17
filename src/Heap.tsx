import IHeapItem from "./IHeapItem";

class Heap<T extends IHeapItem<T>> {
  items: T[];
  currentItemCount: number = 0;

  constructor(maxHeapSize: number) {
    this.items = new Array<T>(maxHeapSize);
  }

  public push(item: T) {
    item.HeapIndex = this.currentItemCount;
    this.items[this.currentItemCount] = item;
    this.SortUp(item);
    this.currentItemCount++;
  }

  public RemoveFirst(): T {
    let firstItem: T = this.items[0];
    this.currentItemCount--;
    this.items[0] = this.items[this.currentItemCount];
    this.items[0].HeapIndex = 0;
    this.SortDown(this.items[0]);
    return firstItem;
  }

  SortDown(item: T): void {
    while (true) {
      let childIndexLeft: number = item.HeapIndex * 2 + 1;
      let childIndexRight: number = item.HeapIndex * 2 + 2;
      let swapIndex: number = 0;

      if (childIndexLeft < this.currentItemCount) {
        swapIndex = childIndexLeft;

        if (childIndexRight < this.currentItemCount) {
          if (
            this.items[childIndexLeft].CompareTo(this.items[childIndexRight]) <
            0
          ) {
            swapIndex = childIndexRight;
          }
        }
        if (item.CompareTo(this.items[swapIndex]) < 0) {
          this.Swap(item, this.items[swapIndex]);
        } else {
          return;
        }
      } else {
        return;
      }
    }
  }

  public includes(item: T): boolean {
    return this.items[item.HeapIndex] === item;
  }

  public get length(): number {
    return this.currentItemCount;
  }

  public UpdateItem(item: T): void {
    this.SortUp(item);
  }
  SortUp(item: T): void {
    let parentIndex: number = (item.HeapIndex - 1) / 2;
    if ((parentIndex %= 0.5)) {
      parentIndex -= 0.5;
    }

    while (true) {
      const parentItem: T = this.items[parentIndex];

      if (item.CompareTo(parentItem) > 0) {
        this.Swap(item, parentItem);
      } else {
        break;
      }
    }
  }

  Swap(itemA: T, itemB: T): void {
    this.items[itemA.HeapIndex] = itemB;
    this.items[itemB.HeapIndex] = itemA;
    let itemAIndex: number = itemA.HeapIndex;
    itemA.HeapIndex = itemB.HeapIndex;
    itemB.HeapIndex = itemAIndex;
  }
}

export default Heap;
