import { IComment, IEntity } from '@readme/shared-types';

export class CommentEntity implements IEntity<CommentEntity>, IComment {
  public id?: number;
  public text: string;
  public postID: number;
  public userID: string;
  public createdAt?: Date;

  constructor(postID: number, comment: IComment) {
     this.fillEntity(comment);
     this.postID = postID
  }

  public toObject() {
    return {...this};
  }

  public fillEntity(comment: IComment) {
    this.id = comment.id;
    this.text = comment.text;
    this.userID = comment.userID;
    this.createdAt = comment.createdAt
  }
}
