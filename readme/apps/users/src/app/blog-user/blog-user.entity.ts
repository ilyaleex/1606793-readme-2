import {UserInterface} from '@readme/shared-types';
import {genSalt, hash, compare} from 'bcrypt';

const SALT_ROUND = 10;

export class BlogUserEntity implements UserInterface {
  public _id: string;
  public email: string;
  public firstname: string;
  public lastname: string;
  public passwordHash: string;
  public avatar: string;

  constructor(blogUser: UserInterface) {
    this.fillEntity(blogUser);
  }

  public toObject() {
    return {...this};
  }

  public async setPassword(password: string): Promise<BlogUserEntity> {
    const salt = await genSalt(SALT_ROUND);
    this.passwordHash = await hash(password, salt);
    return this;
  }

  public async comparePassword(password: string): Promise<boolean> {
    return compare(password, this.passwordHash);
  }

  public fillEntity(blogUser: UserInterface) {
    this._id = blogUser._id;
    this.email = blogUser.email;
    this.firstname = blogUser.firstname;
    this.lastname = blogUser.lastname;
    this.passwordHash = blogUser.passwordHash;
    this.avatar = blogUser.avatar;
  }
}
