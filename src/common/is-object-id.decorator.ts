import { applyDecorators, BadRequestException } from '@nestjs/common';
import { Transform } from 'class-transformer';
import { isValidObjectId, Types } from 'mongoose';

export const IsObjectId = () => {
  const resolvedOptions = {
    each: false,
    toClassOnly: true,
  };
  const message = (key: string) => key + ' must be a mongodb id';
  const validate = (value: string) => isValidObjectId(value);
  const cast = (value: string) => new Types.ObjectId(value);

  return applyDecorators(
    Transform(({ key, value }) => {
      const isValid = resolvedOptions.each
        ? (value as string[]).every(validate)
        : validate(value as string);
      if (!isValid) throw new BadRequestException({ message: [message(key)] });
      return cast(value as string);
    }, resolvedOptions),
  );
};
