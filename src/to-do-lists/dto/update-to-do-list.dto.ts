import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateToDoListDto } from './create-to-do-list.dto';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class UpdateToDoListDto extends PartialType(CreateToDoListDto) {
  @ApiProperty({ required: true })
  @IsString()
  @MinLength(4)
  @MaxLength(50)
  name: string;

  // When sharing list we need user ID
  userId: string;
}
