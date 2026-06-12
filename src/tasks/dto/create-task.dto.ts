import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TaskStatusEnum } from '../enums/taskStatusEnums';

export class CreateTaskDto {
  @IsString({ message: 'عنوان باید از نوع رشته باشد' })
  @IsNotEmpty({ message: 'وارد کردن عنوان اجباری است' })
  @MinLength(2, { message: 'حداقل 2 کاراکتر برای عنوان ضروری است' })
  @MaxLength(100, { message: 'حداکثر  100 کاراکتر برای عنوان لازم است' })
  title: string;

  @IsString({ message: 'توضیحات باید از نوع رشته باشد' })
  @IsOptional()
  @MinLength(2, { message: 'حداقل 2 کاراکتر برای توضیحات ضروری است' })
  @MaxLength(1000, { message: 'حداکثر کاراکتر برای توضیحات 1000 عدد است' })
  description: string;

  @IsEnum(TaskStatusEnum, {
    message: 'وضعیت باید یا doing باشد یا cancel ',
  })
  @IsOptional()
  status: TaskStatusEnum;
  
  @IsInt({ message: 'آیدی پروژه باید عدد صحیح باشد' })
  @IsPositive({ message: 'آیدی پروژه باید بزرگتر از 0 باشد' })
  @IsNumber({}, { message: 'آیدی پروژه باید عدد باشد' })
  @IsNotEmpty({ message: 'وارد کردن آیدی اجباری است' })
  projectId: number;
}
