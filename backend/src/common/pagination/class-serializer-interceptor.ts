import { ClassSerializerInterceptor, PlainLiteralObject } from '@nestjs/common';
import { ClassTransformOptions } from '@nestjs/common/interfaces/external/class-transform-options.interface';

import { isObject } from 'class-validator';

export class ClassSerializerInterceptorWithPagination extends ClassSerializerInterceptor {
  serialize(
    response: PlainLiteralObject | Array<PlainLiteralObject>,
    options: ClassTransformOptions,
  ): PlainLiteralObject | PlainLiteralObject[] {
    if (
      isObject(response) &&
      (response as PlainLiteralObject).data &&
      (response as PlainLiteralObject).count
    ) {
      return {
        data: super.serialize((response as PlainLiteralObject).data, options),
        count: (response as PlainLiteralObject).count,
      };
    }

    return super.serialize(response, options);
  }
}
