import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateMovieDto {

  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  releaseYear: string;

  @IsNotEmpty()
  @ApiProperty()
  genre: string;

  @IsNotEmpty()
  @ApiProperty()
  director: string;

}