import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsUUID } from 'class-validator';

// When sharing list we need user ID
export class ShareListDto {
  @IsUUID()
  toDoListId: string;

  @IsUUID()
  @IsArray()
  userIds: string[];
}
