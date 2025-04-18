import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Product } from '@app/_models/product';

const baseUrl = `${environment.apiUrl}/api/productos`;

@Injectable({ providedIn: 'root' })
export class ProductService {
    constructor(private http: HttpClient) { }

    create(formData: FormData) {
        return this.http.post(`${baseUrl}/crear-producto`, formData);
    }

    getAll() {
        return this.http.get<Product[]>(baseUrl);
    }
    


}