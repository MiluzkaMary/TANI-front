﻿import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '@app/_services/product.service';
import { Product } from '@app/_models/product';
import { PedidoService } from '@app/_services/pedido.service';
import { AccountService } from '@app/_services/account.service';
import { DetallePedido } from '@app/_models/detallepedido'; // Ensure this path is correct
import { Pedido } from '@app/_models/pedido';
import { RegistroPedidoDTO } from '@app/_models/registroPedido'; // Ensure this path is correct
import { RegistroDetallePedidoDTO } from '@app/_models/registroDetallePedido'; // Ensure this path is correct



interface Promotion {
  id: number;
  title: string;
  image: string;
  link: string;
}

@Component({
  templateUrl: 'home.component.html',
  styleUrls: ['home.component.css'],
  standalone: false
})
export class HomeComponent implements OnInit, OnDestroy {
  account = this.accountService.accountValue;
  products: Product[] = [];
  promotions: Promotion[] = [];
  currentSlide = 0;
  private autoSlideInterval: any;

  constructor(
    private accountService: AccountService,
    private productService: ProductService,
    private pedidoService: PedidoService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadPromotions();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

    loadProducts(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products = products;
  
        // Inicializa la talla seleccionada con la primera talla disponible para cada producto
        this.products.forEach((product) => {
          if (product.tallas && product.tallas.length > 0) {
            product.selectedSize = product.tallas[0].talla; // Selecciona la primera talla por defecto
          }
        });
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      }
    });
  }
  
  addToCart(product: Product): void {
    const selectedSize = product.selectedSize; // Usa la talla seleccionada del producto
    if (selectedSize) {
        // Construir el detalle del pedido
        const detallePedido: RegistroDetallePedidoDTO = {
            
            cantidad: 1, // Por defecto, 1 unidad
            precioUnitario: product.registroProductoDTO?.precio || 0,
            subtotal: product.registroProductoDTO?.precio || 0,
            idProductoTalla: product.tallas?.find(t => t.talla === selectedSize)?.productoTallaId || '',
            idPedido: '', // Este campo se asignará en el backend
        };

        // Construir el pedido
        const pedido: RegistroPedidoDTO = {
            
            idUsuario: this.account?.id || '', // ID del usuario actual
            fechaPedido: new Date().toISOString(), // Fecha actual en formato ISO
            estado: 'PENDIENTE', // Estado inicial del pedido
            detalles: [detallePedido] // Lista de detalles (en este caso, solo uno)
        };

        // Enviar el pedido al backend
        this.pedidoService.crearPedido(pedido).subscribe({
            next: (response) => {
                console.log('Pedido creado exitosamente:', response);
            },
            error: (error) => {
                console.error('Error al crear el pedido:', error);
            }
        });
    } else {
        console.error('No hay talla seleccionada para este producto');
    }
}



  loadPromotions(): void {
    this.promotions = [
      {
        id: 1,
        title: 'Summer Collection 2025',
        image: 'assets/images/summer-collection.png',
        link: '/collections/summer'
      },
      {
        id: 2,
        title: 'New Arrivals - 20% Off',
        image: 'assets/images/new-arrivals.png',
        link: '/collections/new'
      },
      {
        id: 3,
        title: 'Limited Edition Sneakers',
        image: 'assets/images/limited-edition.png',
        link: '/collections/limited'
      }
    ];
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  pauseAutoSlide(): void {
    this.stopAutoSlide();
  }

  resumeAutoSlide(): void {
    this.startAutoSlide();
  }

  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.promotions.length;
  }

  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.promotions.length) % this.promotions.length;
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  logAccountId(): void {
    //if (this.account?.id) {
      //window.alert(`Account ID: ${this.account.id}`);
    //}
  }
}