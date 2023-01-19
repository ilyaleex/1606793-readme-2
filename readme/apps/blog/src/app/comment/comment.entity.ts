import {Comment} from '@readme/shared-types';

export class CommentEntity implements Comment {
  public id: number;
  public createdAt: Date;
  public text: string;
  public postId: number;
  public userId: string;

  constructor(comment: Comment) {
    this.fillEntity(comment);
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(comment: Comment) {
    this.text = comment.text;
    this.postId = comment.postId;
    this.userId = comment.userId;
  }
}
