import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { TaskStatusEnum } from '../enums/taskStatusEnums';
import { IsEnum } from 'class-validator';

export class UpdateTaskDto extends PartialType(CreateTaskDto) {}

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatusEnum, {
    message: 'وضعیت باید done , doing , cancel باشد',
  })
  status: TaskStatusEnum;
}
