import {Expose, Transform} from 'class-transformer';

export class TransformedUserRdo {
  @Transform(({obj}) => obj._id.toString())
  @Expose({name: '_id'})
  public _id: string;

  @Expose()
  public email: string;

  @Expose()
  public firstName: string;

  @Expose()
  public lastName: string;
}
