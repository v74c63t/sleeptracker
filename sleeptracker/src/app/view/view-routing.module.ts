import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPage } from './view.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPage
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'log',
    loadChildren: () => import('src/app/log/log.module').then( m => m.LogPageModule)
  },
  {
    path: 'view',
    loadChildren: () => import('./view.module').then( m => m.ViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPageRoutingModule {}
