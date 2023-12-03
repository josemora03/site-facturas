import { Component, Inject} from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Invoice } from '../models/invoice.model';
import { InvoiceDetails } from '../models/invoiceDetails.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';




@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.scss'
})
export class CreateInvoiceComponent {

  constructor(private http: HttpClient, private toastr: ToastrService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateInvoiceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}


  warningMessage: string = '';
  errorMessage: string = '';
  confirmMessage: string = '';
  currentInvoice: Invoice = { numero_factura: '', fecha: new Date() };
  
  validateInvoice() {
    this.warningMessage = '';
    this.errorMessage = '';
    this.confirmMessage = '';

    if (!this.validateForm()) {
      return;
    }

    const apiUrl = `https://api.cafebritt.com/test/functions/api.cfc?method=ObtieneFactura&token=1928306749&numero_factura=${this.currentInvoice.numero_factura}`;

    const headers = new HttpHeaders({ 'Accept': 'application/json' });

    this.http.get(apiUrl, { headers }).subscribe(
      (response: any) => {
        if (response.FACTURA && response.FACTURA.NUMERO_FACTURA) {
          this.errorMessage = 'La factura ya existe';
        } else {
          // Si la factura no existe, procede a crearla
          this.createInvoice();
        }
      },
      (error) => {
        // Captura el error y verifica si es un error 400 (Bad Request)
        if (error.status === 400) {
          // La factura no existe, procede a crearla
          this.createInvoice();
        } else {
          // Otro tipo de error
          this.errorMessage = 'Error al validar la factura';
          console.error('Error al validar la factura:', error);
        }
      }
    );
  }

  createInvoice() {
    this.warningMessage = '';
    this.errorMessage = '';

    const apiUrl = `https://api.cafebritt.com/test/functions/api.cfc?method=CreaFactura&token=1928306749&numero_factura=${this.currentInvoice.numero_factura}&fecha=${this.currentInvoice.fecha}`;
 
    this.http.post(apiUrl, {}).subscribe(
      (response: any) => {
        this.confirmMessage = 'Factura creada'
      },
      (error) => {
        this.errorMessage = 'Error al crear la factura';
        console.error('Error al crear la factura:', error);
      });
  }

  validateForm(): boolean {
    // Verifica si el formulario es válido
    if (!this.currentInvoice.numero_factura || !this.currentInvoice.fecha) {
      this.errorMessage = 'Por favor, complete todos los campos';
      return false;
    }
    return true;
  }

  cerrarVentana() {
    this.dialogRef.close();
  }


}
