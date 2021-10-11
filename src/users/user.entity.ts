import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
  @Exclude()
  password: string;
  @AfterInsert()
  logAfter() {
    console.log('inserted user', this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('user updated');
  }
  @AfterRemove()
  logRemove() {
    console.log('user Removed');
  }
}
