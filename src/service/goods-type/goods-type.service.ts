import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { GoodsTypeInterface } from "../../interface/goods_type.interface";

@Injectable()
export class GoodsTypeService {

  constructor(@InjectModel('GoodsType') private readonly goodsTypeModel) { }


  async find(json: GoodsTypeInterface = {}, fields?: string) {
    try {
      return await this.goodsTypeModel.find(json, fields);
    } catch (error) {
      return [];
    }
  }

  async add(json: GoodsTypeInterface) {
    try {
      const admin = new this.goodsTypeModel(json);
      return await admin.save();
    } catch (error) {
      return null;
    }
  }

  async update(json1: GoodsTypeInterface, json2: GoodsTypeInterface) {
    try {
      return await this.goodsTypeModel.updateOne(json1, json2);
    } catch (error) {
      return null;
    }
  }

  async delete(json: GoodsTypeInterface) {
    try {
      return await this.goodsTypeModel.deleteOne(json);
    } catch (error) {
      return null;
    }
  }

  getModel() {
    return this.goodsTypeModel;
  }
}
