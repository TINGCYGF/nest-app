import { Module } from '@nestjs/common';
import { MainController } from './main/main.controller';
import { LoginController } from './login/login.controller';
import { ManagerController } from './manager/manager.controller';
import { ToolsService } from '../../service/tools/tools.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminSchema } from '../../schema/admin.schema';
import { AdminService } from '../../service/admin/admin.service';
import { RoleSchema } from "../../schema/role.schema";
import { RoleService } from '../../service/role/role.service';
import { RoleController } from './role/role.controller';
import { AccessService } from "../../service/access/access.service";
import { AccessSchema } from "../../schema/access.schema";
import { AccessController } from './access/access.controller';
import { RoleAccessSchema } from "../../schema/role_access.schema";
import { RoleAccessService } from "../../service/role-access/role-access.service";
import { FocusController } from './focus/focus.controller';
import { FocusService } from "../../service/focus/focus.service";
import { FocusSchema } from "../../schema/focus.schema";
import { GoodsTypeService } from "../../service/goods-type/goods-type.service";
import { GoodsTypeSchema} from "../../schema/goods_type.schema";
import { GoodsTypeController } from './goods-type/goods-type.controller';
import { GoodsTypeAttributeController } from './goods-type-attribute/goods-type-attribute.controller';
import { GoodsTypeAttributeService } from "../../service/goods-type-attribute/goods-type-attribute.service";
import { GoodsTypeAttributeSchema } from "../../schema/goods_type_attribute.schema";
import { GoodsCateController } from './goods-cate/goods-cate.controller';
import { GoodsCateSchema } from "../../schema/goods_cate.schema";
import { GoodsCateService } from "../../service/goods-cate/goods-cate.service";
import { GoodsService } from "../../service/goods/goods.service";
import { GoodsSchema } from "../../schema/goods.schema";
import { GoodsController } from './goods/goods.controller';
import { GoodsAttrService } from "../../service/goods-attr/goods-attr.service";
import { GoodsColorService } from "../../service/goods-color/goods-color.service";
import { GoodsImageService } from "../../service/goods-image/goods-image.service";
import { GoodsAttrSchema } from "../../schema/goods_attr.schema";
import { GoodsColorSchema } from "../../schema/goods_color.schema";
import { GoodsImageSchema } from "../../schema/goods_image.schema";

@Module({
  imports:[
    MongooseModule.forFeature([
      { name: 'Admin', schema: AdminSchema,collection:"admin" },
      { name: 'Role', schema: RoleSchema,collection:"role" },
      { name: 'Access', schema: AccessSchema,collection:"access"},
      { name: 'RoleAccess', schema: RoleAccessSchema,collection:"role_access"},
      { name: 'Focus', schema: FocusSchema,collection:"focus"},
      { name: 'GoodsType', schema: GoodsTypeSchema,collection:"goods_type"},
      { name: 'GoodsTypeAttribute', schema: GoodsTypeAttributeSchema,collection:"goods_type_attribute"},
      { name: 'GoodsCate', schema: GoodsCateSchema,collection:"goods_cate"},
      { name: 'Goods', schema: GoodsSchema,collection:"goods"},
      { name: 'GoodsAttr', schema: GoodsAttrSchema,collection:"goods-attr"},
      { name: 'GoodsColor', schema: GoodsColorSchema,collection:"goods-color"},
      { name: 'GoodsImage', schema: GoodsImageSchema,collection:"goods-image"},


    ])],
  controllers: [MainController, LoginController, ManagerController, RoleController, AccessController, FocusController, GoodsTypeController, GoodsTypeAttributeController, GoodsCateController, GoodsController],
  providers: [ToolsService, AdminService, RoleService, AccessService, RoleAccessService, FocusService, GoodsTypeService, GoodsTypeAttributeService, GoodsCateService, GoodsService, GoodsAttrService, GoodsImageService, GoodsColorService],
  exports: [AdminService, RoleService, AccessService, RoleAccessService, GoodsCateService, GoodsService, GoodsAttrService, GoodsImageService, GoodsColorService],
})
export class AdminModule {}
