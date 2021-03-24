import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { GoodsAttrInterface } from "../../interface/goods_attr.interface";

@Injectable()
export class GoodsAttrService {

  constructor(@InjectModel('GoodsAttr') private readonly goodsAttrModel) {}
  async find(json:GoodsAttrInterface={},fields?:string){
    try {
      return await this.goodsAttrModel.find(json,fields);
    } catch (error) {
      return [];
    }
  }

  async add(json:GoodsAttrInterface){
    try {
      const access = new this.goodsAttrModel(json);
      return await access.save();
    } catch (error) {
      return null;
    }
  }

  async update(json1:GoodsAttrInterface,json2:GoodsAttrInterface){
    try {
      return await this.goodsAttrModel.updateOne(json1, json2);
    } catch (error) {
      return null;
    }
  }

  async delete(json:GoodsAttrInterface){
    try {
      return await this.goodsAttrModel.deleteOne(json);
    } catch (error) {
      return null;
    }
  }

  async deleteMany(json:GoodsAttrInterface){
    try {
      return await this.goodsAttrModel.deleteMany(json);
    } catch (error) {
      return null;
    }
  }

  getModel(){
    return this.goodsAttrModel;
  }
}
