import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * retrieve the current client with a decorator
 * example of a controller method:
 * @Post()
 * someMethod(@Clt() client: Client) {
 *   // do something with the client
 * }
 */
export const Clt = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const requestBody = ctx.switchToHttp().getRequest().body;
    return requestBody.client;
  },
);
