import { YabRequestInit } from '../types/index';
import * as defaultResolvers from './default';

export function getPickUpResolver(yabRequestInit: YabRequestInit) {
  if (yabRequestInit.resolveData) {
    return yabRequestInit.resolveData;
  }

  switch (yabRequestInit.contentType) {
    case 'json': {
      return defaultResolvers.defaultJSONResolver;
    }
    case 'text': {
      return defaultResolvers.defaultTextResolver;
    }
    default: {
      throw new Error(
        `Unknown contentType '${yabRequestInit}' on yabRequestInit`
      );
    }
  }
}
