import { IsNotEmpty } from "class-validator";

export class UpdateMovieDto {
  
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  releaseYear: string;

  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  director: string;

}