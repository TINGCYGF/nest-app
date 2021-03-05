import { Controller, Get, Render } from "@nestjs/common";

import {Config} from '../../../config/config.defult';
import { Helper } from "../../../extend/helper";

@Controller(`${Config.adminPath}/main`)
export class MainController {

  @Get()
  @Render('admin/main')
  index(){


  }

}
