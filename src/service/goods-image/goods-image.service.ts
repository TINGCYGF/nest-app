import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { GoodsImageInterface } from "../../interface/goods_image.interface";

@Injectable()
export class GoodsImageService {

  constructor(@InjectModel('GoodsImage') private readonly goodsImageModel) {}
  async find(json:GoodsImageInterface={},fields?:string){
    try {
      return await this.goodsImageModel.find(json,fields);
    } catch (error) {
      return [];
    }
  }

  async add(json:GoodsImageInterface){
    try {
      const access = new this.goodsImageModel(json);
      return await access.save();
    } catch (error) {
      return null;
    }
  }

  async update(json1:GoodsImageInterface,json2:GoodsImageInterface){
    try {
      return await this.goodsImageModel.updateOne(json1, json2);
    } catch (error) {
      return null;
    }
  }

  async delete(json:GoodsImageInterface){
    try {
      return await this.goodsImageModel.deleteOne(json);
    } catch (error) {
      return null;
    }
  }
  async deleteMany(json:GoodsImageInterface){
    try {
      return await this.goodsImageModel.deleteMany(json);
    } catch (error) {
      return null;
    }
  }

  getModel(){
    return this.goodsImageModel;
  }
}
