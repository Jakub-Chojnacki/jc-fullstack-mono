import { PutObjectCommand, PutObjectCommandOutput } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from './upload.service';

const mockSend = jest.fn();

jest.mock('@aws-sdk/client-s3', () => {
  return {
    S3Client: jest.fn().mockImplementation(() => ({
      send: mockSend,
    })),
    PutObjectCommand: jest.fn(),
  };
});

describe('UploadService', () => {
  let service: UploadService;

  const mockConfigService: Partial<ConfigService> = {
    getOrThrow: (key: string) => {
      const values: Record<string, string> = {
        AWS_S3_REGION: 'us-east-1',
        AWS_ACCESS_KEY: 'fake-access-key',
        AWS_SECRET_ACCESS_KEY: 'fake-secret',
        AWS_BUCKET_NAME: 'test-bucket',
        CLOUDFRONT_URL: 'http://localhost/cloudfront',
      };
      return values[key];
    },
  };

  beforeEach(async () => {
    jest.clearAllMocks(); // reset between tests

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UploadService,
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should upload file and return URL', async () => {
    mockSend.mockResolvedValueOnce({} as PutObjectCommandOutput);

    const result = await service.upload('test.txt', Buffer.from('hello'));

    expect(mockSend).toHaveBeenCalledWith(expect.any(PutObjectCommand));
    expect(result.url).toContain('http://localhost/cloudfront/');
  });
});
