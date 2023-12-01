import {CommonModule} from "@angular/common";
import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";

interface GalleryWork {
  title: string;
  subTitle: string;
  description: string;
  previewSrc: string;
}

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.less',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
export class GalleryComponent {

  works: GalleryWork[] = [
    { title: 'effect.ts', subTitle: 'p5.js', previewSrc: '', description: new Array(20).fill('TEST').join(' ') },
    { title: 'effect.ts', subTitle: 'vanilla', previewSrc: '', description: new Array(30).fill('TEST').join(' ') },
    { title: 'effect.ts', subTitle: 'p5.js', previewSrc: '', description: new Array(40).fill('TEST').join(' ') },
  ];

  constructor() {
  }
}
