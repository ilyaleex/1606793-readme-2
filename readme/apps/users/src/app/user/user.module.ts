import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {UserController} from './user.controller';
import {UserModel, UserSchema} from './user.model';
import {UserRepository} from './user.repository';
import {UserService} from './user.service';

@Module({
  imports: [MongooseModule.forFeature([
    {name: UserModel.name, schema: UserSchema}
  ])],
  controllers: [UserController],
  providers: [UserService, UserRepository],
  exports: [UserRepository]
})
export class UserModule {}
