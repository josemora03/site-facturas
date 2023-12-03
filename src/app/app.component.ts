import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Product } from './models/product.model';
import { Invoice } from './models/invoice.model';
import { InvoiceDetails, LineaDetalle } from './models/invoiceDetails.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { CreateDetailComponent } from './create-detail/create-detail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private http: HttpClient, private toastr: ToastrService, public dialog: MatDialog) { }

  title = 'SiteFacturas';
  products: Product = { CODIGO_ARTICULO: '', DESCRIPCION: '', PRECIO: 0 }
  productos: Product | null = null;
  currentInvoice: Invoice = { numero_factura: '', fecha: new Date() };
  currentInvoiceDetails: InvoiceDetails = { DETALLES: [], FACTURA: { TOTAL: 0, FECHA: '', NUMERO_FACTURA: 0, USUARIO: '' }, ALERTA: '' };
  warningMessage: string = '';
  errorMessage: string = '';
  numeroFactura: string = '';
  facturaData: InvoiceDetails | null = null;
  consultaExistente: boolean = true;
  mensajeError: string = '';
  cantidad: number = 0;


  validateForm(): boolean {
    // Verifica si el formulario es válido
    if (!this.currentInvoice.numero_factura || !this.currentInvoice.fecha) {
      this.errorMessage = 'Por favor, complete todos los campos';
      return false;
    }

    return true;
  }

  openCreaFacturaDialog(): void {
    const dialogRef = this.dialog.open(CreateInvoiceComponent, {
      width: '400px',
      data: this.currentInvoice
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Ventana emergente cerrada');
    });
  }


  buscarFactura(): void {
    if (this.numeroFactura) {
      const apiUrl = `https://api.cafebritt.com/test/functions/api.cfc?method=ObtieneFactura&token=1928306749&numero_factura=${this.numeroFactura}`;

      this.http.get(apiUrl).subscribe(
        (data: any) => {
          this.facturaData = data as InvoiceDetails;
          this.consultaExistente = true;
        },
        (error) => {
          this.mensajeError = 'No se encontro la factura'
          this.consultaExistente = false;
          this.facturaData = null;
          this.ocultarMensaje();
        }
      );
    }
  }


  borrarDetalle(detalle: LineaDetalle): void {
    const apiUrl = `https://api.cafebritt.com/test/functions/api.cfc?method=BorrarDetalle&token=1928306749&linea=${detalle.LINEA}&numero_factura=${this.numeroFactura}`;

    this.http.get(apiUrl).subscribe(
      () => {
        // Eliminación exitosa, actualiza los detalles de la factura
        this.buscarFactura();
      },
      (error) => {
        console.error('Error al borrar detalle:', error);
        // Maneja el error según sea necesario
      }
    );
  }

  openAddProductDialog(): void {
    if (this.facturaData !== null) {
      const dialogRef = this.dialog.open(CreateDetailComponent, {
        width: '800px',
        data: { numeroFactura: this.numeroFactura },
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('Ventana emergente cerrada');
        this.buscarFactura();
      });
    } else {
      this.mensajeError = 'Debe buscar una factura primero'
      this.consultaExistente = false;
      this.ocultarMensaje();
    }
  }


  ocultarMensaje() {
    setTimeout(() => {
      this.consultaExistente = true;
    }, 3000); //Oculta el mensaje luego de 3 segundos
  }

}
