import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from 'class-validator';
import { ProjectStatusEnum } from '../enums/projectStatusEnums';

export class CreateProjectDto {
  @IsString({ message: 'عنوان باید از نوع رشته باشد' })
  @IsNotEmpty({ message: 'وارد کردن عنوان اجباری است' })
  @MinLength(2, { message: 'حداقل 2 کاراکتر برای عنوان ضروری است' })
  @MaxLength(100, { message: 'حداکثر کاراکتر 100 عدد است' })
  title: string;

  @IsString({ message: 'توضیحات باید از نوع رشته باشد' })
  @IsOptional()
  @MinLength(2, { message: 'حداقل 2 کاراکتر برای توضیحات ضروری است' })
  @MaxLength(1000, { message: 'حداکثر کاراکتر برای توضیحات 1000 عدد است' })
  description: string;

  @IsEnum(ProjectStatusEnum, {
    message: 'وضعیت باید یا disable باشد یا enable',
  })
  @IsOptional()
  status: ProjectStatusEnum;
}
