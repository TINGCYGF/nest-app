import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { AccessInterface } from "../../interface/access.interface";

@Injectable()
export class AccessService {
  constructor(@InjectModel('Access') private readonly accessModel) {}

  async find(json:AccessInterface={},fields?:string){
    try {
      return await this.accessModel.find(json,fields);
    } catch (error) {
      return [];
    }
  }

  async add(json:AccessInterface){
    try {
      const access = new this.accessModel(json);
      return await access.save();
    } catch (error) {
      return null;
    }
  }

  async update(json1:AccessInterface,json2:AccessInterface){
    try {
      return await this.accessModel.updateOne(json1, json2);
    } catch (error) {
      return null;
    }
  }

  async delete(json:AccessInterface){
    try {
      return await this.accessModel.deleteOne(json);
    } catch (error) {
      return null;
    }
  }

  getModel(){
    return this.accessModel;
  }

}
