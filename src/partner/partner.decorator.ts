import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * retrieve the current partner with a decorator
 * example of a controller method:
 * @Post()
 * someMethod(@Patnr() partner: Partner) {
 *   // do something with the partner
 * }
 */
export const Patnr = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const requestBody = ctx.switchToHttp().getRequest().body;
    return requestBody.partner;
  },
);
