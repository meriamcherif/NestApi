import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { UserRoleEnum } from 'src/enums/user-role.enum';

@Entity()
export class User {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'johndoe' })
  @Column()
  username: string;

  @ApiProperty({ example: 'John' })
  @Column()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @Column()
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  @Column()
  email: string;

  @ApiProperty()
  @Column()
  @Exclude()
  password: string;

  @Column()
  salt: string;

  @Column({
    type: 'enum',
    default: UserRoleEnum.USER,
    enum: UserRoleEnum,
  })
  role: string;
}
