import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'
    // loadChildren: () => import('./home.module').then( m => m.HomePageModule)
  },
  {
    path: 'log',
    loadChildren: () => import('src/app/log/log.module').then( m => m.LogPageModule),
    //redirectTo: 'log',
    pathMatch: 'full'
  },
  {
    path: 'view',
    loadChildren: () => import('src/app/view/view.module').then( m => m.ViewPageModule),
    //redirectTo: 'view',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
