import { Injectable, NestMiddleware } from '@nestjs/common';
import { Config } from "../config/config.defult";
import { AdminService } from "../service/admin/admin.service";

@Injectable()
export class AdminauthMiddleware implements NestMiddleware {

  constructor(private readonly adminService:AdminService){}

  async use(req: any, res: any, next: () => void) {
    let pathname = req.baseUrl;  //获取访问的地址
    let userinfo = req.session.userinfo;
    if (userinfo && userinfo.username) {
      //登录成功，设置全局变量
      res.locals.userinfo = userinfo;
      if (await this.adminService.checkAuth(req)) {
        next();
      }else {
        res.send('您无权访问')
      }
    } else {
      //排除不需要做权限判断的页面
      if (pathname == `/${Config.adminPath}/login` || pathname == `/${Config.adminPath}/login/code` || pathname == `/${Config.adminPath}/login/doLogin`) {
        next();
      } else {
        res.redirect(`/${Config.adminPath}/login`);
      }
    }
  }
}
