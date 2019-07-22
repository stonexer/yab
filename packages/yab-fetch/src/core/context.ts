import {
  IYabFetchContext,
  YabFetchError,
  ExcutableYabRequestInit
} from '../types/index';

export class YabFetchContext implements IYabFetchContext {
  private _yabRequestInit: ExcutableYabRequestInit;

  private _response?: Response;

  private _error: YabFetchError | undefined;

  public constructor(init: ExcutableYabRequestInit) {
    this._yabRequestInit = init;
  }

  public get yabRequestInit() {
    return this._yabRequestInit;
  }

  public set yabRequestInit(init: ExcutableYabRequestInit) {
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

  public get error() {
    return this._error;
  }

  public set error(error: YabFetchError | undefined) {
    this._error = error;
  }
}
