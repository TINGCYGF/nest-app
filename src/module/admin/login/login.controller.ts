import { Controller, Get, Render, Request, Response, Post, Body } from '@nestjs/common';
import { ToolsService } from '../../../service/tools/tools.service';
import { AdminService } from '../../../service/admin/admin.service';

@Controller('admin/login')
export class LoginController {

  constructor(private toolsService: ToolsService, private adminService: AdminService) { }

  @Get()
  @Render('admin/login')
  async index() {
    // console.log(await this.adminService.find());
    return {};
  }

  @Get('code')
  getCode(@Request() req, @Response() res) {

    let svgCaptcha = this.toolsService.getCaptcha();
    //设置session
    req.session.code = svgCaptcha.text;
    res.type('image/svg+xml');
    res.send(svgCaptcha.data);
  }

  @Post('doLogin')
  async doLogin(@Body() body, @Request() req,@Response() res) {
    try {
      const code: string = body.code;
      const username: string = body.username;
      let password: string = body.password;
      if (username == "" || password.length < 6) {
        this.toolsService.error(res,"用户名或者密码不合法","/admin/login");
      } else {
        if (code.toUpperCase() == req.session.code.toUpperCase()) {
          password = this.toolsService.getMd5(password);
          var userResult = await this.adminService.find({ "username": username, "password": password });
          if (userResult.length > 0) {
            console.log('登录成功');
            req.session.userinfo=userResult[0];
            this.toolsService.success(res,"/admin/main");
          } else {
            this.toolsService.error(res,"用户名或者密码不正确","/admin/login");
          }
        } else {
          this.toolsService.error(res,"验证码不正确","/admin/login");
        }
      }
    } catch (error) {
      console.log(error);
      res.redirect('/admin/login');
    }
  }


  @Get('loginOut')

  loginOut(@Request() req,@Response() res){
    req.session.userinfo=null;
    res.redirect('/admin/login');

  }


}
