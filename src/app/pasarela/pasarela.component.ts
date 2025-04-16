import { Component, OnInit } from '@angular/core';
import { PedidoCarrito } from '@app/_models/pedidoCarrito';
import { PedidoService } from '@app/_services/pedido.service';
import { AccountService } from '@app/_services/account.service';
import { Account } from '@app/_models/account'; // Asegúrate de importar el modelo de Account

@Component({
  selector: 'app-pasarela',
  templateUrl: 'pasarela.component.html',
  styleUrls: ['pasarela.component.css'],
  standalone: false
})
export class PasarelaComponent implements OnInit {
  pedido: PedidoCarrito = new PedidoCarrito(); // Pedido completo
  total: number = 0; // Total del pedido
  nombreCompleto: string = ''; // Nombre completo del usuario
  email: string = ''; // Email del usuario
  account = this.accountService.accountValue;

  constructor(
    private pedidoService: PedidoService,
    private accountService: AccountService
  ) {}

  

  ngOnInit(): void {
    // Obtener los datos del usuario desde AccountService
    //const account = this.accountService.accountValue;
    if (this.account) {
      this.nombreCompleto = `${this.account.nombre}`;
      this.email = this.account.correo || '';
    }

    // Obtener el carrito del usuario
    const usuarioId = this.account?.id;
    if (usuarioId) {
      this.pedidoService.obtenerCarrito(usuarioId).subscribe({
        next: (pedido: PedidoCarrito) => {
          if (pedido && pedido.detalles) {
            this.pedido = pedido;
            this.calcularTotal();
          }
        },
        error: (error) => {
          console.error('Error al obtener el pedido:', error);
        }
      });
    }
  }

  calcularTotal(): void {
    this.total = parseFloat(
      this.pedido.detalles
        .reduce((sum, detalle) => sum + detalle.subtotal, 0)
        .toFixed(2)
    );
  }

  procesarPago(): void {
    console.log('Procesando el pago...');
    // Aquí puedes agregar la lógica para enviar los datos al backend
  }

  logAccountId(): void {
    if (this.account?.id) {
      window.alert(`Account ID: ${this.account.id}`);
    }
  }
}