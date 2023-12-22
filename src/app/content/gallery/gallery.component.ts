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
  styleUrl: './gallery.component.scss',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule]
})
export class GalleryComponent {

  works: GalleryWork[] = [
    { title: 'Harmonic Motion', subTitle: 'p5.js', previewSrc: 'assets/images/harmonic-preview.png', description: 'Lines, dots wave obey the sine and cosine function, or combined with multi functions.' },
    { title: 'Gravity', subTitle: 'p5.js', previewSrc: 'assets/images/gravity-preview.png', description: 'Simulate the gravity, and it blows my mind to see universe or microscopic particles.' },
    { title: 'Pixels', subTitle: 'p5.js', previewSrc: 'assets/images/image-preview.png', description: 'Split the image into many pixels!' },
  ];

  constructor() {
  }
}
