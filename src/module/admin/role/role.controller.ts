import { Controller, Get, Render, Post, Body, Response, Query } from '@nestjs/common';
import { RoleService } from '../../../service/role/role.service';
import { ToolsService } from '../../../service/tools/tools.service';
import { Config } from '../../../config/config.defult'
@Controller(`${Config.adminPath}/role`)
export class RoleController {

  constructor(private roleService: RoleService, private toolsService: ToolsService) { }

  @Get()
  @Render('admin/role/index')
  async index() {
    const result = await this.roleService.find({});
    return {
      roleList: result
    };
  }

  @Get('add')
  @Render('admin/role/add')
  async add() {
    return {};
  }

  @Post('doAdd')
  async doAdd(@Body() body, @Response() res) {
    console.log(body);
    if (body.title != '') {
      const result = await this.roleService.add(body);
      if (result) {
        await this.toolsService.success(res, `/${Config.adminPath}/role`);
      } else {
        await this.toolsService.error(res, '增加失败', `/${Config.adminPath}/role`);
      }
    } else {
      await this.toolsService.error(res, '标题不能为空', `/${Config.adminPath}/role`);
    }
  }

  @Get('edit')
  @Render('admin/role/edit')
  async edit(@Query() query) {
    const result = await this.roleService.find({ "_id": query.id });
    return {
      roleList: result[0]
    };
  }

  @Post('doEdit')
  async doEdit(@Body() body, @Response() res) {
    if (body.title != '') {
      const result = await this.roleService.update({ "_id": body._id }, body);
      if (result) {
        await this.toolsService.success(res, `/${Config.adminPath}/role`);
      } else {
        await this.toolsService.error(res, '增加失败', `/${Config.adminPath}/role`);
      }
    } else {
      await this.toolsService.error(res, '标题不能为空', `/${Config.adminPath}/role`);
    }
  }

  @Get('delete')
  async delete(@Query() query,@Response() res) {
    const result = await this.roleService.delete({ "_id": query.id });
    console.log(result);
    await this.toolsService.success(res, `/${Config.adminPath}/role`);
  }
}
