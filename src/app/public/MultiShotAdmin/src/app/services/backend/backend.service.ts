import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { HttpRequestOptions } from './http-request-options.interface';
import {CONTENT_TYPE} from "./content-type.constants";

export function SetHeaders(targetClass: any, methodName: string, descriptor: TypedPropertyDescriptor<any>): any {
  return {
    value(url: string, options?: HttpRequestOptions, contentType?: string) {
      if (!options) {
        options = {};
      }
      let headers = new HttpHeaders();
      let params = new HttpParams();
      let body = options.body;

      if (options.params) {
        Object.keys(options.params)
          .filter((key: string) => options.params[key])
          .forEach((key: string) => params = params.append(key, options.params[key]));
      }

      // prepare body and headers if it's necessary
      if (contentType) {
        const type: string = contentType.toUpperCase();
        headers = headers.set('Content-Type', CONTENT_TYPE[type]);

        switch (contentType) {
          case CONTENT_TYPE.JSON_TYPE:
            body = JSON.stringify(body);
            break;
          case CONTENT_TYPE.TEXT_TYPE:
            body = body.toString();
            break;
        }
      }

      options = Object.assign(options, {body, params, headers});

      return descriptor.value.call(this, url, options, contentType);
    }
  };
}

@Injectable()
export class BackendService {
  constructor(@Inject(HttpClient) protected http: HttpClient) {
  }

  private requestHandler(source: Observable<any>, retryDelay: number = 1000): Observable<any> {
    return source;
  }

  // @SetHeaders
  public get<T>(url: string, options?: HttpRequestOptions): Observable<T> {

    const source = this.http.get<T>(url, options);
    return this.requestHandler(source);
  }

  // @SetHeaders
  public post<T>(url: string, options?: HttpRequestOptions, contentType: string = CONTENT_TYPE.JSON_TYPE): Observable<T> {

    const source = this.http.post<T>(url, options.body, options);
    return this.requestHandler(source);
  }

  // @SetHeaders
  public patch<T>(url: string, options?: HttpRequestOptions, contentType: string = CONTENT_TYPE.JSON_TYPE): Observable<T> {

    const source = this.http.patch<T>(url, options.body, options);
    return this.requestHandler(source);
  }

  // @SetHeaders
  public delete<T>(url: string, options?: HttpRequestOptions): Observable<T> {

    const source = this.http.delete<T>(url, options);
    return this.requestHandler(source);
  }
}
