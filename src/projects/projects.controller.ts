import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
  Put,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import {
  UpdateProjectDto,
  UpdateProjectStatusDto,
} from './dto/update-project.dto';
import type { Response } from 'express';
import { GetIdProjectDto, GetProjectQueryDto } from './dto/get-projects.dto';
import { createPagination } from 'src/utils/func';
import { ProjectStatusEnum } from './enums/projectStatusEnums';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(
    @Res() res: Response,
    @Body() createProjectDto: CreateProjectDto,
  ) {
    const project = await this.projectsService.create(createProjectDto);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'پروژه با موفقیت ساخته شد',
      data: project,
    });
  }

  @Get()
  async findAll(@Res() res: Response, @Query() queryDto: GetProjectQueryDto) {
    const { page, limit } = queryDto;
    const { projects, count } = await this.projectsService.findAll({
      page,
      limit,
    });
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'پروژه ها با موفقیت ثبت شد',
      data: {
        projects,
        pagination: createPagination(page, limit, count, 'Projects'),
      },
    });
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param() param: GetIdProjectDto) {
    const { id } = param;
    const project = await this.projectsService.findOne({ id });
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'پروژه با موفقیت دریافت شد',
      data: project,
    });
  }

  @Put(':id')
  async update(
    @Res() res: Response,
    @Param() param: GetIdProjectDto,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const { id } = param;
    const updatedProject = await this.projectsService.update(
      id,
      updateProjectDto,
    );
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'پروژه با موفقیت آپدیت شد',
      data: updatedProject,
    });
  }

  @Patch(':id')
  async changeStatus(
    @Res() res: Response,
    @Param() param: GetIdProjectDto,
    @Body() projectStatus: UpdateProjectStatusDto,
  ) {
    const { id } = param;
    const updatedProject = await this.projectsService.changeStatus(
      id,
      projectStatus,
    );
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'پروژه با موفقیت وضعیتش عوض شد',
      data: updatedProject,
    });
  }

  @Delete(':id')
  async remove(@Res() res: Response, @Param() param: GetIdProjectDto) {
    const { id } = param;
    const deletedProject = await this.projectsService.remove({ id });
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'پروژه با موفقیت حذف شد',
      data: deletedProject,
    });
  }
}
