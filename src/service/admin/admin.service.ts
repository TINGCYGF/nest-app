import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class AdminService {
  constructor(@InjectModel('Admin') private adminModel) {
  }

  //操作数据库
  async find(json = {}) {
    return this.adminModel.find(json);
  }
}
