import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import type { Response } from 'express';
import { GetTaskIdDto, GetTaskStatusDto } from './dto/get-task.dto';
import { createPagination } from 'src/utils/func';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Res() res: Response, @Body() createTaskDto: CreateTaskDto) {
    const task = await this.tasksService.create(createTaskDto);
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      message: 'تسک با موفقیت ساخته شد',
      data: task,
    });
  }

  @Get()
  async findAll(@Res() res: Response, @Query() queryDto: GetTaskStatusDto) {
    const { page, limit } = queryDto;
    const { tasks, count } = await this.tasksService.findAll(queryDto);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'تسک ها با موفقیت دریافت شد',
      data: {
        tasks,
        pagination: createPagination(page, limit, count, 'Tasks'),
      },
    });
  }

  @Get(':id')
  async findOne(@Res() res: Response, @Param() param: GetTaskIdDto) {
    const { id } = param;
    const task = await this.tasksService.findOne(id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      message: 'تسک با موفقیت دریافت شد',
      data: task,
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
