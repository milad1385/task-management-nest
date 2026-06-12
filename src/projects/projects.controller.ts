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
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import type { Response } from 'express';
import { GetProjectQueryDto } from './dto/get-projects.dto';
import { createPagination } from 'src/utils/func';

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
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
