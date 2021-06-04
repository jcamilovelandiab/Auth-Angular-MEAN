import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ValidateTokenGuard } from './auth/guards/validate-token.guard';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule )
    // loadChildren: './auth/auth.module.ts#AuthModule'
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./protected/protected.module').then( m => m.ProtectedModule ),
    canActivate: [ ValidateTokenGuard ],
    canLoad: [ ValidateTokenGuard ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
