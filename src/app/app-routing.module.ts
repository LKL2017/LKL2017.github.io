import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { AboutComponent } from "./content/about/about.component";
import { GalleryComponent } from "./content/gallery/gallery.component";
import { ContactComponent} from "./content/contact/contact.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'about'},
  { path: 'about', component: AboutComponent, data: { animation: 'AboutPage'}},
  { path: 'gallery', component: GalleryComponent, data: { animation: 'GalleryPage'} },
  { path: 'contact', component: ContactComponent, data: { animation: 'ContactPage'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class AppRoutingModule { }
