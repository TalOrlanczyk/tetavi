import {AllowNull, Column, Model, Table} from 'sequelize-typescript';

@Table({tableName: 'users'})
export class User extends Model {
  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @AllowNull(false)
  @Column
  age: number;
}
