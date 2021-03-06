import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class RoleAccessService {

  constructor(@InjectModel('RoleAccess') private roleAccessModel){}

  async find(json,fields?:string){
    try {
      return await this.roleAccessModel.find(json,fields);
    } catch (error) {
      return [];
    }
  }

  async add(json){
    try {
      const role = new this.roleAccessModel(json);
      return await role.save();
    } catch (error) {
      return null;
    }
  }

  async update(json1,json2){
    try {
      return await this.roleAccessModel.updateOne(json1, json2);
    } catch (error) {
      return null;
    }
  }

  async delete(json){
    try {
      return await this.roleAccessModel.deleteOne(json);
    } catch (error) {
      return null;
    }
  }

  async deleteMany(json){
    try {
      return await this.roleAccessModel.deleteMany(json);
    } catch (error) {
      return null;
    }
  }
}
