import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entities/project.entity';
import { Repository } from 'typeorm';
import { GetProjectQueryDto } from './dto/get-projects.dto';

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

  findOne(id: number) {
    return `This action returns a #${id} project`;
  }

  update(id: number, updateProjectDto: UpdateProjectDto) {
    return `This action updates a #${id} project`;
  }

  remove(id: number) {
    return `This action removes a #${id} project`;
  }
}
