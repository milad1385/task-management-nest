import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { Project } from 'src/projects/entities/project.entity';
import { GetTaskStatusDto } from './dto/get-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private readonly taskRepository: Repository<Task>,
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    try {
      const { projectId, ...taskData } = createTaskDto;
      const project = await this.projectRepository.findOneByOrFail({
        id: projectId,
      });

      const newTask = this.taskRepository.create({
        project,
        ...taskData,
      });

      return await this.taskRepository.save(newTask);
    } catch (error) {
      throw new BadRequestException('در هنگام ایجاد تسک مشکلی به وجود آمد');
    }
  }

  async findAll({
    page,
    limit,
    status,
  }: GetTaskStatusDto): Promise<{ tasks: Task[]; count: number }> {
    try {
      let where: any = {};
      if (status) {
        where.status = status;
      }

      const count = await this.taskRepository.count({ where });
      const tasks = await this.taskRepository.find({
        where,
        skip: (page - 1) * limit,
        take: limit,
        relations: { project: true },
      });

      return { tasks, count };
    } catch (error) {
      throw new BadRequestException(
        'در هنگام دریافت تسک ها با مشکل رو به رو شد',
      );
    }
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
      relations: { project: true },
    });

    if (!task) {
      throw new NotFoundException('تسکی با این آیدی پیدا نشد');
    }

    return task;
  }
 async update(
     id: number,
     updateTaskDto: UpdateTaskDto,
   ): Promise<Task> {
     const task = await this.taskRepository.findOne({ where: { id } });
     if (!task) {
       throw new NotFoundException('تسکی با این آیدی یافت نشد');
     }
 
     const updatedTask = await this.taskRepository.update(
       id,
       updateTaskDto,
     );
     if (updatedTask.affected === 0) {
       throw new BadRequestException('هنگام آپدیت تسک مشکلی به وجود آمد');
     }
 
     return await this.findOne(id);
   }

  async remove(id: number) {
     const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException('تسکی با این آیدی یافت نشد');
    }
    const deletedTask = await this.taskRepository.delete(id);
    if (deletedTask.affected === 0) {
      throw new BadRequestException('هنگام حذف تسک مشکلی به وجود آمد');
    }
    return task;
  }
}
