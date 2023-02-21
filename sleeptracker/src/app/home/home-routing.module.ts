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
    loadChildren: () => import('./home.module').then( m => m.HomePageModule)
  },
  {
    path: 'log',
    loadChildren: () => import('src/app/log/log.module').then( m => m.LogPageModule)
  },
  {
    path: 'view',
    loadChildren: () => import('src/app/view/view.module').then( m => m.ViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
