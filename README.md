# clound-cade-chat
一个仓促写的聊天项目

## 前端
```
1 cd client
2 npm i
3 npm run serve
```

### 技术栈 vue2.6.11 + vue-router + vuex + ant-design-vue
### 为啥不用vue3 + ts ?
因为目前我还没有玩转

## 后台
```
1 cd server
2 npm i
3 npm run start:dev
```

### 技术栈 nestjs + ts + mysql
使用nest cli 自动生成项目, 自动包含ts, 对于我来说还是能够cover住

## 逼逼几句部署方面的预想

### 前端自动部署
没有运维, 自己用jekins又比较麻烦,所以预想使用前端自动部署脚手架工具[deploy-cli-service](https://github.com/fuchengwei/deploy-cli-service)
还需配置 nginx 代理下请求

### 后端部署
1 安装配置mysql
2 创建名称为clound_cade_chat的数据库
3 配置账号密码(目前只有一套, 当然完善版本可以根据环境使用.env文件进行区分)
```
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
```

4 安装使用pm2 对服务进行启动,监控

