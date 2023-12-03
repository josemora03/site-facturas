import { Component, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/product.model';
import { Invoice } from '../models/invoice.model';
import { InvoiceDetails } from '../models/invoiceDetails.model';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-create-detail',
  templateUrl: './create-detail.component.html',
  styleUrl: './create-detail.component.scss'
})
export class CreateDetailComponent {

  products: Product[] = [];
  productoBusqueda: string = '';
  cantidad: number = 0;
  numero_factura: string = '';
  selectedProducts: any[] = [];


  constructor(private http: HttpClient, private toastr: ToastrService, public dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { numeroFactura: string }) {}


  buscarProducto(): void {
    const apiUrl = `https://api.cafebritt.com/test/functions/api.cfc?method=BuscarProducto&token=1928306749&producto=${this.productoBusqueda}`;

    this.http.get<{ PRODUCTOS: Product[] }>(apiUrl).subscribe(
      (data) => {
        this.products = data.PRODUCTOS;
      },
      (error) => {
        console.error('Error al buscar productos:', error);
      }
    );
  }


  addProductInvoice(producto: any, cantidad: number): void {
    if (!this.isProductSelected(producto)) {
      this.selectedProducts.push(producto);
    }

    const apiUrl = `https://api.cafebritt.com/test/functions/api.cfc?method=AgregaDetalle&token=1928306749&codigo_articulo=${producto.CODIGO_ARTICULO}&cantidad=${cantidad}&numero_factura=${this.data.numeroFactura}`;

    this.http.get(apiUrl).subscribe(
      () => {
        console.log('Productos agregados a la factura exitosamente');
        this.cerrarVentana();
      },
      (error) => {
        console.error('Error al agregar los productos a la factura:', error);
      }
    );
  }

  isProductSelected(producto: any): boolean {
    return this.selectedProducts.some(selectedProduct => selectedProduct.CODIGO_ARTICULO === producto.CODIGO_ARTICULO);
  }

  cerrarVentana() {
    this.dialogRef.close();
  }


}
