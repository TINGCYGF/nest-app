import { Controller, Get, Render, Post, Body, Response, Query } from "@nestjs/common";
import { AccessService } from '../../../service/access/access.service';
import { ToolsService } from '../../../service/tools/tools.service';
import { Config } from '../../../config/config.defult';
import * as mongoose from 'mongoose';

@Controller(`${Config.adminPath}/access`)
export class AccessController {

  constructor(private accessService:AccessService,private toolsService:ToolsService){}

  @Get()
  @Render('admin/access/index')
  async index(){
    //1、在access表中找出  module_id=0的数据
    //2、让access表和access表关联    条件：找出access表中module_id等于_id的数据
    const result = await this.accessService.getModel().aggregate([
      {
        $lookup: {
          from: "access",
          localField: "_id",
          foreignField: "module_id",
          as: "items"
        }
      },
      {
        $match: {
          "module_id": "0" //1、在access表中找出  module_id=0的数据
        }
      }
    ]);
    return {
      list: result
    };
  }

  @Get('add')
  @Render('admin/access/add')
  async add(){
    //获取模块列表
    const result = await this.accessService.find({ "module_id": "0" });
    // console.log(result);
    return {
      moduleList:result
    };
  }

  @Post('doAdd')
  async doAdd(@Body() body,@Response() res){
    const module_id = body.module_id;
    if(module_id !== 0){
      body.module_id = mongoose.Types.ObjectId(module_id);   //注意
    }
    await this.accessService.add(body);
    await this.toolsService.success(res, `/${Config.adminPath}/access`);
  }
  @Get('edit')
  @Render('admin/access/edit')
  async edit(@Query() query){
    //获取模块列表
    const result = await this.accessService.find({ "module_id": "0" });

    const accessResult = await this.accessService.find({ "_id": query.id });

    return {
      list:accessResult[0],
      moduleList:result
    };
  }


  @Post('doEdit')
  async doEdit(@Body() body,@Response() res){

    let _id = body._id;
    console.log(body);
    try {
      const module_id = body.module_id;
      if(module_id!=0){
        body.module_id=mongoose.Types.ObjectId(module_id);   //注意
      }
      await this.accessService.update({"_id":_id},body);
      await this.toolsService.success(res, `/${Config.adminPath}/access`);
    } catch (error) {
      await this.toolsService.error(res, '非法请求', `/${Config.adminPath}/access/edit?id=${_id}`);
    }
  }

  @Get('delete')
  async delete(@Query() query,@Response() res){
    try {
      await this.accessService.delete({"_id":query.id});
      await this.toolsService.success(res, `/${Config.adminPath}/access`);
    } catch (error) {
      await this.toolsService.error(res, '非法请求', `/${Config.adminPath}/access`);
    }
  }

}
