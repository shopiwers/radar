import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tiny-url',
  templateUrl: './tiny-url.component.html',
  styleUrls: ['./tiny-url.component.scss'],
})
export class TinyUrlComponent implements OnInit {
  form: FormGroup;
  shortenedUrl: string = '';
  originalUrl: string = '';
  showOriginal: boolean = false;
  errorMessage: string = '';
  Message: string = '';
  readonly apiToken: string =
    '3vBkgC8bxEhQ0hFSTB1kYVuJ1NJn5XMDO4NW0SYrpVe7VXH2cnZEYeUB39H2';
  readonly apiEndpoint: string = 'https://api.tinyurl.com/create';

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.form = this.fb.group({
      url: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(250),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  encode(): void {
    this.errorMessage = '';
    const longUrl = this.form.get('url')?.value;

    if (!this.isValidUrl(longUrl)) {
      this.errorMessage = 'La URL proporcionada no es válida.';
      return;
    }

    const payload = {
      url: longUrl,
      domain: 'tinyurl.com',
    };

    this.http
      .post<{ data: { tiny_url: string } }>(this.apiEndpoint, payload, {
        headers: { Authorization: `Bearer ${this.apiToken}` },
      })
      .subscribe(
        (response) => {
          this.shortenedUrl = response.data.tiny_url;
          this.originalUrl = longUrl; // Guardamos la URL original al generar la acortada
        },
        (error) => {
          this.errorMessage = 'Error al acortar la URL.';
        }
      );
  }

  decode(): void {
    const shortUrl = this.form.get('url')?.value;

    this.showOriginal = true;
    this.originalUrl = this.originalUrl;

    // Verificamos si la URL ingresada es la misma que la acortada previamente
    // if (shortUrl === this.shortenedUrl) {
    //   this.showOriginal = true;
    //   this.originalUrl = this.originalUrl; // Mostramos la URL original
    // } else {
    //   this.errorMessage = 'No se pudo decodificar la URL.';
    // }
  }
}
