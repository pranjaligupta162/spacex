import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilterCompComponent } from './filter-comp/filter-comp.component';

const routes: Routes = [
	{path:'',component:FilterCompComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const comps=[FilterCompComponent];
