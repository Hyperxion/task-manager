import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({ required: true })
  @IsString()
  username: string;

  @ApiProperty()
  @ApiProperty({ required: true })
  @IsString()
  password: string;
}
