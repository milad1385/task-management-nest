import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectStatusEnum } from './../enums/projectStatusEnums';
import { Task } from 'src/tasks/entities/task.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column({
    type: 'enum',
    enum: ProjectStatusEnum,
    default: ProjectStatusEnum.ENABLE,
  })
  status: ProjectStatusEnum;
  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
