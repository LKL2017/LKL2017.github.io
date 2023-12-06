import {CommonModule} from "@angular/common";
import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule]
})
export class ContactComponent {

}
