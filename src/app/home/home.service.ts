import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  constructor() { }

  getFeaturedProducts() {
    // In a real app, this would come from an API
    return [
      {
        id: 1,
        name: 'Nike Air Max 270',
        price: 149.99,
        image: 'assets/images/products/nike-air-max.png',
        discount: 15
      },
      {
        id: 2,
        name: 'Adidas Ultraboost 22',
        price: 179.99,
        image: 'assets/images/products/adidas-ultraboost.png'
      },
      {
        id: 3,
        name: 'Puma RS-X',
        price: 119.99,
        image: 'assets/images/products/puma-rsx.png',
        discount: 10
      },
      {
        id: 4,
        name: 'New Balance 574',
        price: 89.99,
        image: 'assets/images/products/new-balance-574.png'
      },
      {
        id: 5,
        name: 'Converse Chuck Taylor',
        price: 59.99,
        image: 'assets/images/products/converse-chuck.png'
      },
      {
        id: 6,
        name: 'Vans Old Skool',
        price: 69.99,
        image: 'assets/images/products/vans-old-skool.png',
        discount: 5
      }
    ];
  }

  getPromotions() {
    return [
      {
        id: 1,
        title: 'Summer Collection 2025',
        image: 'assets/images/banners/summer-collection.png',
        link: '/collections/summer'
      },
      {
        id: 2,
        title: 'New Arrivals - 20% Off',
        image: 'assets/images/banners/new-arrivals.png',
        link: '/collections/new'
      },
      {
        id: 3,
        title: 'Limited Edition Sneakers',
        image: 'assets/images/banners/limited-edition.png',
        link: '/collections/limited'
      }
    ];
  }
}
