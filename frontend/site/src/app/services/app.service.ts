import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

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

  loginUser(body: any): Observable<any> {
    const options: HttpRequestOptions = {
      observe: 'body',
      responseType: 'json'
    };
    return this.http.post(SERVER_API_URL + "/loginUser", body, options);
  }

  addItem(body: any): Observable<any> {
    const options: HttpRequestOptions = {
      observe: 'body',
      responseType: 'json'
    };
    return this.http.post(SERVER_API_URL + "/addItem", body, options);
  }

  getUserData(queryParam: string): Observable<any> {
    return this.http.get(SERVER_API_URL + "/getUserData", { params: { userId: queryParam } });
  }

  getProducts(queryParam?: string): Observable<any> {
    const options = queryParam ? { params: { userId: queryParam } } : {};

    return this.http.get(SERVER_API_URL + "/getProducts", options);
  }

  getVendorName(queryParam?: string): Observable<any> {
    const options = queryParam ? { params: { vendorId: queryParam } } : {};

    return this.http.get(SERVER_API_URL + "/getVendorName", options);
  }

  updateItemStatus(body: any): Observable<any> {
    const options: HttpRequestOptions = {
      observe: 'body',
      responseType: 'json'
    };
    return this.http.post(SERVER_API_URL + "/updateItemStatus", body, options);
  }

  updateDeliveryStatus(body: any): Observable<any> {
    const options: HttpRequestOptions = {
      observe: 'body',
      responseType: 'json'
    };
    return this.http.post(SERVER_API_URL + "/updateDeliveryStatus", body, options);
  }

  createTransaction(body: any): Observable<any> {
    const options: HttpRequestOptions = {
      observe: 'body',
      responseType: 'json'
    };
    return this.http.post(SERVER_API_URL + "/createTransaction", body, options);
  }

  getPurchaseInfo(body: any): Observable<any> {
    const options: HttpRequestOptions = {
      observe: 'body',
      responseType: 'json'
    };
    return this.http.post(SERVER_API_URL + "/getPurchaseInfo", body, options);
  }

  getProductsForNotif(queryParam?: string): Observable<any> {
    const options = queryParam ? { params: { userId: queryParam } } : {};

    return this.http.get(SERVER_API_URL + "/getProductsForNotif", options);
  }
  
  getProductsForBuyer(queryParam?: string): Observable<any> {
    const options = queryParam ? { params: { userId: queryParam } } : {};

    return this.http.get(SERVER_API_URL + "/getProductsForBuyer", options);
  }
}
