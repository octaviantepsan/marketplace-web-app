import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const SERVER_API_URL = "http://localhost:4200/api";

export interface HttpRequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] },
  context?: HttpContext | undefined;
  observe?: 'body' | 'events' | 'response' | undefined | any,
  params?: HttpParams | { [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean> },
  reportProgress?: boolean,
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text' | any,
  withCredentials?: boolean
}

@Injectable({
  providedIn: 'root'
})

export class AppService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(SERVER_API_URL + "/getUsers");
  }

  postUser(body: any): Observable<any> {
    const options: HttpRequestOptions = {
      observe: 'body',
      responseType: 'json'
    };
    return this.http.post(SERVER_API_URL + "/postUser", body, options);
  }

  registerUser(body: any): Observable<any> {
    const options: HttpRequestOptions = {
      observe: 'body',
      responseType: 'json'
    };
    return this.http.post(SERVER_API_URL + "/registerUser", body, options);
  }
}
