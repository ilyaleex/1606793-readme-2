export interface IEntity<T> {
  toObject(): T;
  fillEntity(entity: T): void;
}
