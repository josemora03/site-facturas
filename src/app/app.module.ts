import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateInvoiceComponent } from './create-invoice/create-invoice.component';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateDetailComponent } from './create-detail/create-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateInvoiceComponent,
    CreateDetailComponent,
  ],
  imports: [
    MatDialogModule,
    ToastrModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

