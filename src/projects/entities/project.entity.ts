import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { ProjectStatusEnum } from './../enums/projectStatusEnums';
import { Task } from 'src/tasks/entities/task.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column({ nullable: true })
  description: string;
  @Column({
    type: 'enum',
    enum: ProjectStatusEnum,
    default: ProjectStatusEnum.ENABLE,
  })
  status: ProjectStatusEnum;

  @CreateDateColumn({
    name: 'created_at', 
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP', 
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP', 
  })
  updatedAt: Date;
  @OneToMany(() => Task, (task) => task.project)
  tasks: Task[];
}
