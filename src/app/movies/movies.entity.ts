import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'movies' })
export class MoviesEntity {

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column({ name: "release_year" })
  releaseYear: string;

  @Column()
  director: string;

  @CreateDateColumn({ name: 'created_at' }) 
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })  
  deletedAt: string;

  @BeforeInsert()
  @BeforeUpdate()
  capitalize() {
    const capitalizedDirector = this.director.replace(/\b\w/g, (match) => match.toUpperCase());
    this.director = capitalizedDirector
    
}
}