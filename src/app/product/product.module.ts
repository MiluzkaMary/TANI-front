import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { LayoutComponent } from './layout.component';
import { ProductCreateComponent } from './product-create.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ProductRoutingModule
    ],
    declarations: [
        LayoutComponent,
        ProductCreateComponent
    ]
})
export class ProductModule { }