import { Component, OnInit, OnDestroy } from '@angular/core';
import { HomeService } from './home.service';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  discount?: number;
}

interface Promotion {
  id: number;
  title: string;
  image: string;
  link: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  featuredProducts: Product[] = [];
  promotions: Promotion[] = [];
  currentSlide = 0;
  private autoSlideInterval: any;

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.featuredProducts = this.homeService.getFeaturedProducts();
    this.promotions = this.homeService.getPromotions();
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  // Método para iniciar el desplazamiento automático
  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000); // Cambiar cada 3 segundos
  }

  // Método para detener el desplazamiento automático
  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  // Método para ir a la siguiente diapositiva
  nextSlide(): void {
    this.currentSlide = (this.currentSlide + 1) % this.promotions.length;
  }

  // Método para ir a la diapositiva anterior
  prevSlide(): void {
    this.currentSlide = (this.currentSlide - 1 + this.promotions.length) % this.promotions.length;
  }

  // Método para ir a una diapositiva específica
  goToSlide(index: number): void {
    this.currentSlide = index;
  }

  // Pausar el desplazamiento automático al pasar el mouse por encima
  pauseAutoSlide(): void {
    this.stopAutoSlide();
  }

  // Reanudar el desplazamiento automático al quitar el mouse
  resumeAutoSlide(): void {
    this.startAutoSlide();
  }
}
