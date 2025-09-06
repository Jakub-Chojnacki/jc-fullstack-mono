import { contract } from '@jcmono/api-contract';
import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { tsRestHandler, TsRestHandler } from '@ts-rest/nest';
import { UploadService } from './upload.service';

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
      await this.uploadService.upload(file.originalname, file.buffer);

      return {
        status: 200,
        body: `Uploaded: ${file.originalname}`,
      };
    });
  }
}
