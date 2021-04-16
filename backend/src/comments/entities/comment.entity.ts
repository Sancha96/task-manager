import {
    Column,
    Table,
    Model,
    CreatedAt,
    UpdatedAt,
    DeletedAt,
    ForeignKey,
    BelongsTo,
  } from 'sequelize-typescript';
import { Task } from 'src/tasks/entities/task.entity';
  
@Table
export class Comment extends Model<Comment> {
    @Column
    text: string;

    @ForeignKey(() => Task)
    @Column
    taskId: number;

    @BelongsTo(() => Task)
    task: Task;

    @CreatedAt
    createdAt: Date;

    @UpdatedAt
    updatedAt: Date;

    @DeletedAt
    deletedAt: Date;
}
