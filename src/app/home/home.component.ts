import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/_services/product.service';
import { Product } from '@app/_models/product';
import { AccountService } from '@app/_services/account.service';

@Component({
    templateUrl: 'home.component.html',
    standalone: false
})
export class HomeComponent implements OnInit {
    account = this.accountService.accountValue;
    products: Product[] = []; // Lista de productos

    constructor(
        private accountService: AccountService,
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.loadProducts(); // Cargar los productos desde el backend
    }

    loadProducts() {
        this.productService.getAll().subscribe({
            next: (products) => {
                this.products = products; // Asignar los productos obtenidos del backend
            },
            error: (error) => {
                console.error('Error al cargar los productos:', error);
            }
        });
    }
    
}