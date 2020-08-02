import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminComponent } from './adminApp/admin/admin.component';
import { DashboardComponent } from './adminApp/dashboard/dashboard.component';
import { DemoMaterialModule } from './material-module';
import { ViewOrderComponent } from './adminApp/view-order/view-order.component';
import { CancelConfirmationDialogComponent } from './adminApp/dialog/cancel-confirmation-dialog/cancel-confirmation-dialog.component';
import { DeliveryConfirmationDialogComponent } from './adminApp/dialog/delivery-confirmation-dialog/delivery-confirmation-dialog.component';
import { HeaderAdminComponent } from './common/headerAdmin/header.admin.component';
import { FooterComponent } from './common/footer/footer.component';
import { StoreComponent } from './adminApp/store/store.component';
import { SettingComponent } from './adminApp/setting/setting.component';
import { DeleteProductDialogComponent } from './adminApp/dialog/delete-product-dialog/delete-product-dialog.component';
import { AddProductComponent } from './adminApp/add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    DashboardComponent,
    ViewOrderComponent,
    CancelConfirmationDialogComponent,
    DeliveryConfirmationDialogComponent,
    HeaderAdminComponent,
    FooterComponent,
    StoreComponent,
    SettingComponent,
    DeleteProductDialogComponent,
    AddProductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  entryComponents: [CancelConfirmationDialogComponent, DeliveryConfirmationDialogComponent, DeleteProductDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
