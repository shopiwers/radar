import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://jsonplaceholder.typicode.com/posts'; // URL de la API externa

  constructor(private http: HttpClient) {}

  // Método para obtener los datos
  getPosts(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
