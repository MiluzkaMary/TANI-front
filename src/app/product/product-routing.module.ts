import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { LayoutComponent } from './layout.component';
import { ProductCreateComponent } from './product-create.component';

const routes: Routes = [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: 'crear', component: ProductCreateComponent },
            // otras rutas relacionadas con productos si es necesario
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductRoutingModule { }