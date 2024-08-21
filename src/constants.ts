import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

export namespace Constants {
  export enum TaskStatus {
    Active = '5aa5924d-e9e0-4054-884c-af20e1ccaeca',
    Finished = '789bb232-d29e-4d0b-b958-8558add71b86',
    Cancelled = '0db108e4-4549-4cef-b8dc-8ca738d812f5',
  }
}

export const processError = (error, entityName: string) => {
  if (error.message === '404') {
    throw new NotFoundException(`${entityName} not found`);
  } else if (error.code === '23505') {
    throw new ConflictException(`${entityName} name already exists`);
  } else {
    throw new InternalServerErrorException();
  }
};
