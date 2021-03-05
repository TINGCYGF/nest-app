import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { RoleInterface } from "../../interface/role.interface";

@Injectable()
export class RoleService {

  constructor(@InjectModel('Role') private roleModel){}

  async find(json:RoleInterface={}, firlds?:string){
    try {
      return await this.roleModel.find(json, firlds);
    }catch (error){
      return null;
    }
  }

  async add(json:RoleInterface){
    try {
      const role = new this.roleModel(json);
      return await role.save();
    }catch (error){
      return null;
    }
  }

  async update(json1:RoleInterface, json2:RoleInterface){
    try {
      return await this.roleModel.updateOne(json1,json2)
    }catch (error){
      return null;
    }
  }

  async delete(json:RoleInterface){
    try {
      return await this.roleModel.deleteOne(json)
    }catch (error){
      return null;
    }
  }
}
