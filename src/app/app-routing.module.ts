import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './adminApp/admin/admin.component';
import { DashboardComponent } from './adminApp/dashboard/dashboard.component';
import { ViewOrderComponent } from './adminApp/view-order/view-order.component';
import { StoreComponent } from './adminApp/store/store.component';
import { SettingComponent } from './adminApp/setting/setting.component';
import { AddProductComponent } from './adminApp/add-product/add-product.component';

const routes: Routes = [
  { path: 'Admin', component: AdminComponent },
  { path: 'Dashboard', component: DashboardComponent },
  { path: 'ViewOrder/:id', component: ViewOrderComponent },
  { path: 'Store', component: StoreComponent },
  { path: 'Setting', component: SettingComponent },
  { path: 'AddProduct', component: AddProductComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
