import { contract } from '@jcmono/api-contract';
import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ThrottlerGuard } from '@nestjs/throttler';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { UploadService } from './upload.service';

@UseGuards(ThrottlerGuard)
@Controller()
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @TsRestHandler(contract.file.upload)
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 }), //5MB
          new FileTypeValidator({ fileType: 'image/jpeg' }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return tsRestHandler(contract.file.upload, async () => {
      const { url } = await this.uploadService.upload(
        file.originalname,
        file.buffer,
      );

      return {
        status: 200,
        body: url,
      };
    });
  }
}
