import {
    Column,
    Table,
    Model,
    HasOne,
    HasMany,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    BelongsToMany,
  } from 'sequelize-typescript';
import { TaskPerson } from 'src/projects/entities/project-person.entity';
import { Project } from 'src/projects/entities/project.entity';
import { Person } from '../../persons/entities/person.entity';
import { Comment } from '../../comments/entities/comment.entity';
  
  @Table
  export class Task extends Model<Task> {
    @Column
    title: string;

    @Column
    description: string;

    @Column
    complexity: number;

    @Column
    estimatedTime: Date;

    @Column
    actualTime: Date;

    @Column
    status: string;

    @BelongsToMany(() => Person, () => TaskPerson)
    executors: Person[];

    @HasOne(() => Project)
    project: Project;

    @HasMany(() => Comment)
    comments: Comment[];
  
    @CreatedAt
    createdAt: Date;
  
    @UpdatedAt
    updatedAt: Date;
  
    @DeletedAt
    deletedAt: Date;
  }
  