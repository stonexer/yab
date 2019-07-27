// eslint-disable-next-line import/no-extraneous-dependencies
import { IYabFetchContext, YabFetchMiddleware } from 'yab-fetch';
import { Options } from './type';

export const createLogger = (options?: Options): YabFetchMiddleware => {
  const { collapsed = true } = options || {};

  const { log, error, groupCollapsed, group, groupEnd } = console;

  const logger = {
    log,
    group: collapsed ? groupCollapsed : group,
    groupEnd,
    error,
  };

  return async (ctx: IYabFetchContext, next: () => Promise<unknown>) => {
    const {
      yabRequestInit,
      yabRequestInit: { url, method },
    } = ctx;

    logger.group(
      `📖 yab: %c${method} %c${url} %c@ ${new Date()}`,
      'color: #6f42c1;font-size: 14px;',
      'color: #005cc5;font-size: 14px;',
      'color: #666'
    );
    logger.group('%cbefore fetch', 'color: #33b9f9');
    logger.log('yabRequestInit:', yabRequestInit);
    logger.groupEnd();
    try {
      await next();
      const { _response } = ctx;
      logger.group('%cafter fetch', 'color:#61bb64');
      logger.log('_response:', _response);
      logger.groupEnd();
    } catch (e) {
      logger.error(`Something wrong with fetch: ${e}`);
    } finally {
      logger.groupEnd();
    }
  };
};
