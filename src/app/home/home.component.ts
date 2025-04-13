import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '@app/_services/product.service';
import { Product } from '@app/_models/product';
import { AccountService } from '@app/_services/account.service';

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
    private productService: ProductService
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
      },
      error: (error) => {
        console.error('Error al cargar los productos:', error);
      }
    });
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
}