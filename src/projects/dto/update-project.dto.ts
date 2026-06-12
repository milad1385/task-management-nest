import { PartialType } from '@nestjs/mapped-types';
import { CreateProjectDto } from './create-project.dto';
import { IsEnum } from 'class-validator';
import { ProjectStatusEnum } from '../enums/projectStatusEnums';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
export class UpdateProjectStatusDto {
  @IsEnum(ProjectStatusEnum, {
    message: 'وضعیت باید یا disable باشد یا enable',
  })
  status: ProjectStatusEnum;
}
