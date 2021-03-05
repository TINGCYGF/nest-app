import { Body, Controller, Get, Post, Render, Response } from "@nestjs/common";
import { RoleService } from "../../../service/role/role.service";
import { ToolsService } from "../../../service/tools/tools.service";
import { Config } from "../../../config/config.defult";

@Controller('admin/role')
export class RoleController {

  constructor(private roleService: RoleService, private toolsService: ToolsService) {
  }

  @Get()
  @Render('admin/role/index')
  async index(){
    const data = await this.roleService.find({})
    return {
      roleList: data
    };
  }
  @Get('add')
  @Render('admin/role/add')
  async add(){
    return {};
  }

  @Post('add')
  async doAdd(@Body() body, @Response() res){
    const result = await this.roleService.add(body)
    if(result){
      await this.toolsService.success(res, `/${Config.adminPath}/role`)
    }
    return {};
  }

}
