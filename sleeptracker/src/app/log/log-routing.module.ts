import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LogPage } from './log.page';

const routes: Routes = [
  {
    path: '',
    component: LogPage
  },
  {
    path: 'home',
    loadChildren: () => import('src/app/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'log',
    loadChildren: () => import('./log.module').then( m => m.LogPageModule)
  },
  {
    path: 'view',
    loadChildren: () => import('src/app/view/view.module').then( m => m.ViewPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LogPageRoutingModule {}
