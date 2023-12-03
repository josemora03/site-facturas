import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi = 'https://api.cafebritt.com/test/functions/api.cfc'

  constructor(private http: HttpClient) { }

  public obtieneFactura(token: string, metodo: string, factura: string): Observable<any>{
    const url = `${this.urlApi}?method=${metodo}&token=${token}&factura=${factura}`;

    return this.http.get(url);
  }

  public buscarProducto(token: string, metodo: string, producto: string): Observable<any>{
    const url = `${this.urlApi}?method=${metodo}&token=${token}&producto=${producto}`;

    return this.http.get(url);
  }


}
