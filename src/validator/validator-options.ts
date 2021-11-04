import { ValidationPipeOptions } from '@nestjs/common';

// export interface ValidationPipeOptions extends ValidatorOptions {
//   transform?: boolean;
//   disableErrorMessages?: boolean;
//   exceptionFactory?: (errors: ValidationError[]) => any;
// }

export const validationOptions: ValidationPipeOptions = {
  exceptionFactory: (errors) => {
    return {
      errors,
    };
  },
  errorHttpStatusCode: 400,
};
