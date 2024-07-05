import { ApiProperty } from "@nestjs/swagger";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'movies' })
export class MoviesEntity {

  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: string;

  @Column()
  @ApiProperty()
  title: string;

  @Column({ name: "release_year" })
  @ApiProperty()
  releaseYear: string;

  @Column()
  @ApiProperty()
  director: string;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  deletedAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  capitalize() {
    const capitalizedDirector = this.director.replace(/\b\w/g, (match) => match.toUpperCase());
    this.director = capitalizedDirector

  }
}