import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class CreateToDoListDto {
  @ApiProperty()
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;

  userId: string;
}
