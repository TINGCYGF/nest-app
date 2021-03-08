import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { GoodsCateInterface } from "../../interface/goods_cate_interface";

@Injectable()
export class GoodsCateService {

  constructor(@InjectModel('GoodsCate') private readonly goodsCateModel) { }

  async find(json: GoodsCateInterface = {}, fields?: string) {
    try {
      return await this.goodsCateModel.find(json, fields);
    } catch (error) {
      return [];
    }
  }

  async add(json: GoodsCateInterface) {
    try {
      const admin = new this.goodsCateModel(json);
      return await admin.save();
    } catch (error) {
      return null;
    }
  }
  async update(json1: GoodsCateInterface, json2: GoodsCateInterface) {
    try {
      return await this.goodsCateModel.updateOne(json1, json2);
    } catch (error) {
      return null;
    }
  }

  async delete(json: GoodsCateInterface) {
    try {
      return await this.goodsCateModel.deleteOne(json);
    } catch (error) {
      return null;
    }
  }
  getModel() {
    return this.goodsCateModel;
  }

}
