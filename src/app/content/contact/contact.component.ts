import {CommonModule} from "@angular/common";
import { Component } from '@angular/core';
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.less',
  standalone: true,
  imports: [CommonModule, MatIconModule]
})
export class ContactComponent {

}
