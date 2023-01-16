export enum Port {
  Min = 0,
  Max = 65535,
  DBDefault = 27017,
  BlogAPIDefault = 3333,
  NotifyAPIDefault = 5555,
  UsersAPIDefault = 4444,
  MailDefault = 5025
}

export enum EnvFilePath {
  Blog = 'environments/blog.env',
  Notify = 'environments/notify.env',
  Users = 'environments/users.env'
}

export enum Prefix {
  Global = 'api',
  Auth = 'auth',
  Blog = 'blog',
  Comments = 'comments',
  Mail = 'mail',
  Posts = 'posts',
  User = 'users'
}

export enum ParamName {
  UserID = 'userID',
  PostID = 'postID',
  CommentID = 'commentID',
  ID = 'id',
  Type = 'type'
}

export enum Path {
  Avatar = 'avatar',
  Blog = 'blog',
  Posts = 'posts',
  Comments = 'comments',
  Register = 'register',
  Spec = 'spec',
  Login = 'login',
  Upload = 'upload',
  Subscribe = 'sub',
  Subscriptions = 'subs',
  Users = 'users',
  Repost = 'repost'
}

export enum EntityName {
  User = 'User',
  Post = 'Post',
  Comment = 'Comment'
}

export enum KeyName {
  ID = 'id',
  ObjectID = '_id',
}

export enum APIConfig {
  BlogDesc = 'Blog service API',
  BlogTitle = 'Blog service',
  NotifyDesc = 'Notification service API',
  NotifyTitle = 'Notification service',
  UsersDesc = 'Users service API',
  UsersTitle = 'Users service',
  Version = '1.0'
}

export enum MinMax {
  TagMin = 3,
  TagMax = 10,
  TagsLimit = 8,
  TitleMin = 20,
  TitleMax = 50,
  AnnMin = 50,
  AnnMax = 255,
  TextMin = 100,
  TextMax = 1024,
  QuoteMin = 20,
  QuoteMax = 300,
  AuthorMin = 3,
  AuthorMax = 50,
  PhotoMaxBytes = 1000000,
  DescMax = 300,
  UserNameMin = 3,
  UserNameMax = 50,
  UserPassMin = 6,
  UserPassMax = 12,
  AvatarMaxBytes = 500000,
  CommentMin = 10,
  CommentMax = 300,
  CommentsLimit = 30,
  PostsLimit = 25
}
