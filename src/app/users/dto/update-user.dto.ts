import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDto {

  @IsNotEmpty()
   @ApiProperty()
  firstName: string;

  @IsNotEmpty()
   @ApiProperty()
  lastName: string;

}