import { NotFoundException } from '@nestjs/common';

export class TaskTitleNotFoundException extends NotFoundException {
  constructor(title: string) {
    super(`Tasks with title ${title} not found`);
  }
}
