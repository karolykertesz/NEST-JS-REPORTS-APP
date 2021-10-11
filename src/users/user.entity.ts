import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  email: string;
  @Column()
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
