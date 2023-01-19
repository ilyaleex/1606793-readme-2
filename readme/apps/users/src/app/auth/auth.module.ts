import {Module} from '@nestjs/common';
import {UserModule} from '../user/user.module';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {getJwtConfig} from '../../config/jwt.config';
import {JwtStrategy} from './strategies/jwt.strategy';
import {ClientsModule} from '@nestjs/microservices';
import {RABBITMQ_SERVICE} from './auth.constant';
import {getAuthServiceRabbitMqConfig} from '../../config/rabbitmq.config';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig
    }),
    ClientsModule.registerAsync([
      {
        name: RABBITMQ_SERVICE,
        useFactory: getAuthServiceRabbitMqConfig,
        inject: [ConfigService]
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
