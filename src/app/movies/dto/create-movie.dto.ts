import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateMovieDto {

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  releaseYear: string;

  @IsNotEmpty()
  genre: string;

  @IsNotEmpty()
  director: string;

}