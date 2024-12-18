import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  posts: any[] = []; // Almacenar los datos obtenidos

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    // Consumir la API cuando el componente se inicialice
    this.apiService.getPosts().subscribe(
      (data) => {
        this.posts = data; // Guardar los datos en la variable
      },
      (error) => {
        console.error('Error al obtener los datos:', error);
      }
    );
  }
}
