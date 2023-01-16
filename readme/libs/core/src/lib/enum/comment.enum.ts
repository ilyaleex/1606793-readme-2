export enum CommentError {
  Permission = 'You can only delete your own comments',
  NotFound = 'Comment not found',
}

export enum CommentInfo {
  Loaded = 'Comments have been loaded successfully.',
  Created = 'New comment created successfully.',
  Deleted = 'Your comment has been successfully deleted.',
}

export enum APIDesc {
  Feed = 'Comments feed for post',
  Text = 'Comment text',
  Limit = 'Max entries per page',
  UserID = 'Unique comment author ID',
  CommentID = 'Unique comment ID',
  PostID = 'Unique post ID',
  Post = 'Comment post'
}

export enum APIExample {
  Feed = '[{comment}, {comment}, {comment}]',
  Limit = 10,
  ID = 123,
  Text = 'Идет медведь по лесу, видит, машина горит. Сел в нее и сгорел.',
}
