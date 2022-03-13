import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { join } from 'path';

// modules
import { UserModule } from './modules/user/userModule';
import { FriendModule } from './modules/friend/friendModule';
import { AuthModule } from './modules/auth/authModule';
import { ChatModule } from './modules/chat/chetModule';


@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql', // 数据库类型
        entities: [join(__dirname, './entity/*.{ts,js}')], // 数据表实体
        host: configService.get('DB_HOST', 'localhost'), // 主机，默认为localhost
        port: configService.get<number>('DB_PORT', 3306), // 端口号
        username: configService.get('DB_USER', 'root'), // 用户名
        password: configService.get('DB_PASSWORD', '147896325'), // 密码
        database: configService.get('DB_DATABASE', 'cloundcade_chat'), //数据库名
        timezone: '+08:00', //服务器上配置的时区
        synchronize: true, //根据实体自动创建数据库表， 生产环境建议关闭
      }),
    }),
    UserModule,
    FriendModule,
    ChatModule,
    AuthModule
  ],
})
export class AppModule {}
