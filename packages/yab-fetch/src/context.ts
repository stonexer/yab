import { YabRequestInit, IYabFetchContext } from './types/index';

export class YabFetchContext implements IYabFetchContext {
  private _yabRequestInit: YabRequestInit;

  private _response?: Response;

  public constructor(init: YabRequestInit) {
    this._yabRequestInit = init;
  }

  public get yabRequestInit() {
    return this._yabRequestInit;
  }

  public set yabRequestInit(init: YabRequestInit) {
    this._yabRequestInit = init;
  }

  public get response() {
    if (this._response == null) {
      throw new Error('Response is not ready');
    }

    return this._response.clone();
  }

  public set response(response: Response) {
    this._response = response;
  }
}
