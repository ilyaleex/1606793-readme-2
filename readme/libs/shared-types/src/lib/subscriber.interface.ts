export interface Subscriber {
  _id?: string;
  email: string;
  firstName: string;
  lastName: string;
  userId: string;
  subscribersEmails: string[];
}
