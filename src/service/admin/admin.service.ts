import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Config } from "../../config/config.defult";
import { AdminInterface } from "../../interface/admin.interface";
import { AccessService } from "../access/access.service";
import { RoleAccessService } from "../role-access/role-access.service";

@Injectable()
export class AdminService {
  constructor(@InjectModel('Admin') private readonly adminModel, private accessService:AccessService, private roleAccessService:RoleAccessService) {}

  async find(json:AdminInterface={},fields?:string){
    try {
      return await this.adminModel.find(json,fields);
    } catch (error) {
      return [];
    }
  }
  async add(json:AdminInterface){
    try {
      const admin = new this.adminModel(json);
      return await admin.save();
    } catch (error) {
      return null;
    }
  }
  async update(json1:AdminInterface,json2:AdminInterface){
    try {
      return await this.adminModel.updateOne(json1, json2);
    } catch (error) {
      return null;
    }
  }
  async delete(json:AdminInterface){
    try {
      return await this.adminModel.deleteOne(json);
    } catch (error) {
      return null;
    }
  }
  getModel() {
    return this.adminModel;
  }

  async checkAuth(req) {
    //  1、获取当前用户的角色
    let pathname: string = req.baseUrl;
    pathname = pathname.replace(`/${Config.adminPath}/`, '');
    const userinfo = req.session.userinfo;
    const role_id = userinfo.role_id;
    if (userinfo.is_super == 1 || pathname == 'login/loginOut' || pathname == "main/welcome") {
      return true;
    }
    // 2、根据角色获取当前角色的权限列表
    let accessResult = await this.roleAccessService.find({ "role_id": role_id });
    const roleAccessArray = [];
    accessResult.forEach(value => {
      roleAccessArray.push(value.access_id.toString());
    });
    console.log(roleAccessArray);
    //   3、获取当前访问的url 对应的权限id
    accessResult = await this.accessService.find({ "url": pathname });
    if (accessResult.length > 0) {
      // 4、判断当前访问的url对应的权限id 是否在权限列表中的id中
      return roleAccessArray.indexOf(accessResult[0]._id.toString()) !== -1;
    } else {
      return false;
    }
  }
}
