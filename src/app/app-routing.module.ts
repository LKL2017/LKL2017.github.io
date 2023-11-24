import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {Child1Component} from "./childs/child1/child1.component";
import {Child2Component} from "./childs/child2/child2.component";

const routes: Routes = [
  { path: 'first', component: Child1Component },
  { path: 'second', component: Child2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
