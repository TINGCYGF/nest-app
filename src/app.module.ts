import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { AdminModule } from './module/admin/admin.module';
import { DefaultModule } from './module/defalut/default.module';
import { ApiModule } from './module/api/api.module';
import { ToolsService } from './service/tools/tools.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Config } from "./config/config.defult";
//配置中间件
import { AdminauthMiddleware } from "./middleware/adminauth.middleware";
import { InitMiddleware } from "./middleware/init.middleware";

@Module({
  imports: [AdminModule, DefaultModule, ApiModule,
    MongooseModule.forRoot(
      'mongodb://admin:123456@127.0.0.1:27017/nestapp',
      { useNewUrlParser: true }
    )
  ],
  providers: [ToolsService],

})
//配置权限中间件
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AdminauthMiddleware)
      .forRoutes(`${Config.adminPath}/*`)//在admin下面生效
      .apply(InitMiddleware)
      .forRoutes('*') //全局中间件
  }
}
