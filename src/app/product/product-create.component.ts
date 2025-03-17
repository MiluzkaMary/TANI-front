import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '@app/_services/product.service';
import { Product } from '@app/_models/product';

@Component({ templateUrl: 'product-create.component.html' })
export class ProductCreateComponent implements OnInit {
    form!: FormGroup;
    submitting = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private productService: ProductService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            nombre: ['', Validators.required],
            descripcion: ['', Validators.required],
            tipoCalzado: ['', Validators.required],
            imagen: ['', Validators.required],
            precio: [0, [Validators.required, Validators.min(0)]],
            tallas: this.formBuilder.array([])
        });
    }

    get f() { return this.form.controls; }
    get tallas() { return this.f.tallas as FormArray; }

    addTalla() {
        this.tallas.push(this.formBuilder.group({
            talla: ['', Validators.required],
            cantidad: [0, [Validators.required, Validators.min(0)]]
        }));
    }

    removeTalla(index: number) {
        this.tallas.removeAt(index);
    }

    onSubmit() {
        this.submitted = true;

        if (this.form.invalid) {
            return;
        }

        this.submitting = true;
        const product: Product = this.form.value;
        this.productService.create(product)
            .subscribe({
                next: () => {
                    this.router.navigate(['/productos']);
                },
                error: error => {
                    console.error(error);
                    this.submitting = false;
                }
            });
    }
}