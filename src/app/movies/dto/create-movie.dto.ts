import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumberString, IsString } from "class-validator";

export class CreateMovieDto {

  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @IsString()
  @IsNumberString()
  @ApiProperty()
  releaseYear: string;

  @IsNotEmpty()
   @ApiProperty()
  genre: string;

  @IsNotEmpty()
   @ApiProperty()
  director: string;

}