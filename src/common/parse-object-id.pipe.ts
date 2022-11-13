import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId, Types } from 'mongoose';

@Injectable()
export class ParseObjectIdPipe
  implements PipeTransform<string, Types.ObjectId>
{
  transform(value: string) {
    if (!isValidObjectId(value)) {
      throw new BadRequestException(
        'Validation failed (numeric string is expected)',
      );
    }
    return new Types.ObjectId(value);
  }
}
