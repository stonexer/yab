import { YabRequestInit, IYabFetchContext } from '../types';

export function validateResponseStatus(response: Response) {
  return response.ok;
}

export function resolveData(ctx: IYabFetchContext) {
  const { yabRequestInit } = ctx;

  switch (yabRequestInit.responseType) {
    case 'json': {
      return ctx.json;
    }
    case 'text': {
      return ctx.text;
    }
    case 'blob': {
      return ctx.blob;
    }
    case 'arrayBuffer': {
      return ctx.arrayBuffer;
    }
    case 'formData': {
      return ctx.formData;
    }
    case 'auto':
    default: {
      return ctx;
    }
  }
}

export const DEFAULT_INIT: YabRequestInit = {
  responseType: 'auto',

  resolveData,
  validateResponseStatus
};
