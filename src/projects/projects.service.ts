import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { GetIdProjectDto, GetProjectQueryDto } from './dto/get-projects.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}
  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    try {
      const newProject = this.projectRepository.create(createProjectDto);
      return await this.projectRepository.save(newProject);
    } catch (error) {
      throw new BadRequestException('هنگام ایجاد پروژه مشکلی به وجود آمد');
    }
  }

  async findAll({
    page,
    limit,
  }: GetProjectQueryDto): Promise<{ projects: Project[]; count: number }> {
    try {
      const [projects, count] = await this.projectRepository.findAndCount({
        skip: (page - 1) * limit,
        take: limit,
      });

      return { projects, count };
    } catch (error) {
      throw new BadRequestException(
        'در هنگام دریافت پروژه ها مشکلی به وجود آمد.',
      );
    }
  }

  async findOne({ id }: GetIdProjectDto): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('پروژه ای با این آیدی یافت نشد');
    }
    return project;
  }

  async update(
    id: number,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('پروژه ای با این آیدی یافت نشد');
    }

    const updatedProject = await this.projectRepository.update(
      id,
      updateProjectDto,
    );
    if (updatedProject.affected === 0) {
      throw new BadRequestException('هنگام حذف پروژه مشکلی به وجود آمد');
    }

    return await this.findOne({ id });
  }

  async remove({ id }: GetIdProjectDto): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException('پروژه ای با این آیدی یافت نشد');
    }
    const deletedProject = await this.projectRepository.delete(id);
    if (deletedProject.affected === 0) {
      throw new BadRequestException('هنگام حذف پروژه مشکلی به وجود آمد');
    }
    return project;
  }
}
