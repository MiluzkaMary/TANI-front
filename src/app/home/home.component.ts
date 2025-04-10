
import { Component, OnInit } from '@angular/core';
import { ProductService } from '@app/_services/product.service';
import { Product } from '@app/_models/product';
import { AccountService } from '@app/_services/account.service';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent implements OnInit {
    account = this.accountService.accountValue;
    products: Product[] = []; // Lista de productos

    constructor(
        private accountService: AccountService,
        private productService: ProductService
    ) { }

        ngOnInit() {
        // Datos quemados para probar la funcionalidad
        this.products = [
            {
                registroProductoDTO: {
                    nombre: 'Zapato Deportivo',
                    descripcion: 'Zapato cómodo para correr',
                    tipoCalzado: 'ZAPATO',
                    imagen: 'https://via.placeholder.com/150',
                    precio: 59.99
                },
                tallas: [
                    { talla: '40', cantidad: 10 },
                    { talla: '41', cantidad: 15 }
                ]
            },
            {
                registroProductoDTO: {
                    nombre: 'Sandalias de Playa',
                    descripcion: 'Sandalias ligeras y cómodas',
                    tipoCalzado: 'SANDALIA',
                    imagen: 'https://via.placeholder.com/150',
                    precio: 29.99
                },
                tallas: [
                    { talla: '38', cantidad: 5 },
                    { talla: '39', cantidad: 8 }
                ]
            },
            {
                registroProductoDTO: {
                    nombre: 'Botas de Montaña',
                    descripcion: 'Botas resistentes para terrenos difíciles',
                    tipoCalzado: 'BOTA',
                    imagen: 'https://via.placeholder.com/150',
                    precio: 89.99
                },
                tallas: [
                    { talla: '42', cantidad: 7 },
                    { talla: '43', cantidad: 12 }
                ]
            },
            {
                registroProductoDTO: {
                    nombre: 'Zapatillas Casual',
                    descripcion: 'Zapatillas cómodas para el día a día',
                    tipoCalzado: 'ZAPATILLA',
                    imagen: 'https://via.placeholder.com/150',
                    precio: 49.99
                },
                tallas: [
                    { talla: '39', cantidad: 20 },
                    { talla: '40', cantidad: 18 }
                ]
            },
            {
                registroProductoDTO: {
                    nombre: 'Mocasines Elegantes',
                    descripcion: 'Mocasines de cuero para ocasiones formales',
                    tipoCalzado: 'MOCASIN',
                    imagen: 'https://via.placeholder.com/150',
                    precio: 69.99
                },
                tallas: [
                    { talla: '41', cantidad: 10 },
                    { talla: '42', cantidad: 8 }
                ]
            },
            {
                registroProductoDTO: {
                    nombre: 'Zapatos de Tacón',
                    descripcion: 'Zapatos elegantes con tacón alto',
                    tipoCalzado: 'TACON',
                    imagen: 'https://via.placeholder.com/150',
                    precio: 79.99
                },
                tallas: [
                    { talla: '37', cantidad: 6 },
                    { talla: '38', cantidad: 9 }
                ]
            },
            {
                registroProductoDTO: {
                    nombre: 'Botines de Invierno',
                    descripcion: 'Botines cálidos para el invierno',
                    tipoCalzado: 'BOTIN',
                    imagen: 'https://via.placeholder.com/150',
                    precio: 99.99
                },
                tallas: [
                    { talla: '40', cantidad: 5 },
                    { talla: '41', cantidad: 7 }
                ]
            },
            {
                registroProductoDTO: {
                    nombre: 'Zapatillas de Skate',
                    descripcion: 'Zapatillas resistentes para practicar skate',
                    tipoCalzado: 'ZAPATILLA',
                    imagen: 'https://via.placeholder.com/150',
                    precio: 39.99
                },
                tallas: [
                    { talla: '42', cantidad: 15 },
                    { talla: '43', cantidad: 10 }
                ]
            },
            {
                registroProductoDTO: {
                    nombre: 'Chanclas de Verano',
                    descripcion: 'Chanclas ligeras para la playa',
                    tipoCalzado: 'CHANCLA',
                    imagen: 'https://via.placeholder.com/150',
                    precio: 19.99
                },
                tallas: [
                    { talla: '38', cantidad: 25 },
                    { talla: '39', cantidad: 30 }
                ]
            },
            {
                registroProductoDTO: {
                    nombre: 'Zapatos de Seguridad',
                    descripcion: 'Zapatos reforzados para trabajos pesados',
                    tipoCalzado: 'SEGURIDAD',
                    imagen: 'https://via.placeholder.com/150',
                    precio: 109.99
                },
                tallas: [
                    { talla: '41', cantidad: 8 },
                    { talla: '42', cantidad: 10 }
                ]
            }
        ];
    }

        loadProducts() {
        this.productService.getAll().subscribe({
            next: (products) => {
                this.products = products;
            },
            error: (error) => {
                console.error('Error al cargar los productos:', error);
            }
        });
    }
}