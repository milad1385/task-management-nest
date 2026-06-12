import { Project } from 'src/projects/entities/project.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TaskStatusEnum } from '../enums/taskStatusEnums';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({nullable :true})
  description: string;
  @Column({
    type: 'enum',
    enum: TaskStatusEnum,
    default: TaskStatusEnum.DOING,
  })
  status: TaskStatusEnum;
  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;
}
