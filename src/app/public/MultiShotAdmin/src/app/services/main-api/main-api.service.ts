import { Injectable } from '@angular/core';
import { BackendService } from "../backend/backend.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class MainApiService {

  public static MAIN_APIs: Function = () => {
    return {
      URL: '/api/iploc'
    }
  };

  constructor(
    private backendService: BackendService,
  ) { }

  public fetchMachineUrl(): Observable<string> {
    return this.backendService.get(MainApiService.MAIN_APIs().URL);
  }
}
