import {
  Controller,
  Post,
  Body,
  Req,
  Get,
  Put,
  Delete,
  UseInterceptors,
  UploadedFile,
  Param,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { RenameUserDTO } from './dto/rename-user.dto';
import { ChangeEmailDTO } from './dto/change-email.dto';
import { ChangePasswordDTO } from './dto/change-password';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/decorators/public.decorator';
import { diskStorage } from 'multer';
import { join, parse } from 'path';
import { v4 as uuidv4 } from 'uuid';

export const storage = {
  storage: diskStorage({
    destination: './uploads/profileimages',
    filename: (req, file, cb) => {
      const filename: string =
        parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Put('name')
  async renameUser(@Body() renameUserDTO: RenameUserDTO, @Req() req) {
    return await this.userService.renameUser(renameUserDTO.name, req.user.id);
  }

  @Put('email')
  async changeEmail(@Body() changeEmailDTO: ChangeEmailDTO, @Req() req) {
    return await this.userService.changeEmail(changeEmailDTO, req.user.id);
  }

  @Post('image/upload')
  @UseInterceptors(FileInterceptor('file', storage))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Req() req) {
    return await this.userService.updateAvatar(req.user.id, file.filename);
  }

  @Post('image/delete')
  async deleteAvatar(@Req() req) {
    return await this.userService.deleteAvatar(req.user.id);
  }

  @Put('password')
  async changePassword(
    @Body() changePasswordDTO: ChangePasswordDTO,
    @Req() req,
  ) {
    return await this.userService.changePassword(
      changePasswordDTO,
      req.user.id,
    );
  }

  @Delete()
  async deleteUser(@Req() req) {
    return await this.userService.deleteUser(req.user.id);
  }

  @Get()
  async getCurrentUser(@Req() req) {
    return await this.userService.findUser(req.user.id);
  }

  @Public()
  @Get('image/:imagename')
  findProfileImage(@Param('imagename') imagename, @Res() res) {
    return res.sendFile(
      join(process.cwd(), 'uploads/profileimages/' + imagename),
    );
  }
}
