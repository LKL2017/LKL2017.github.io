import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildsRoutingModule } from './childs-routing.module';
import { Child1Component } from './child1/child1.component';
import { Child2Component } from './child2/child2.component';


@NgModule({
  declarations: [
    Child1Component,
    Child2Component
  ],
  imports: [
    CommonModule,
    ChildsRoutingModule
  ]
})
export class ChildsModule { }
