import { ProductSize } from "./productsize";

export class Product {
    nombre?: string;
    descripcion?: string;
    tipoCalzado?: string;
    imagen?: string;
    precio?: number;
    tallas?: ProductSize[];
}