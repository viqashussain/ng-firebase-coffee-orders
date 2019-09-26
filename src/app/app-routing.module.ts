import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: 'coffee-orders', loadChildren: './coffee-orders/coffee-orders.module#CoffeeOrdersModule', canActivate: [AuthGuard] },
  { path: '', redirectTo: 'coffee-orders', pathMatch: 'full' },
  { path: '**', redirectTo: 'coffee-orders' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
