export interface Comment {
  id?: number;
  createdAt?: Date;
  text: string;
  postId: number;
  userId: string;
}
