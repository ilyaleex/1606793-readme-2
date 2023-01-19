export interface User {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  avatarPath?: string;
  postsCount: number;
  subscribersCount: number;
  subscribersEmails: string[];
}
