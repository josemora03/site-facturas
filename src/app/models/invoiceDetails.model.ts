export interface InvoiceDetails {
    DETALLES: LineaDetalle[];
    FACTURA: DetalleFactura;
    ALERTA: string;
  }
  
  export interface LineaDetalle {
    PRECIO: number;
    CODIGO_ARTICULO: string;
    LINEA: number;
    ARTICULO: string;
    CANTIDAD: number;
    TOTAL_LINEA: number;
  }
  
  export interface DetalleFactura {
    TOTAL: number;
    FECHA: string;
    NUMERO_FACTURA: number;
    USUARIO: string;
  }
  