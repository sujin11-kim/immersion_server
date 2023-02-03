import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Users {
  @PrimaryGeneratedColumn()
  public index: number;

  @Column({ unique: true })
  public id: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  public password: string;
}

export default Users;