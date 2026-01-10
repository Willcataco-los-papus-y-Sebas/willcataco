import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ICarruselItem } from '@models/carrusel/carrusel.item.types';
@Component({
  selector: 'app-carrusel',
  imports: [CommonModule],
  templateUrl: './carrusel.html',
  styleUrl: './carrusel.css',
})
export class Carrusel {
  @Input() items: ICarruselItem[] = [];
  @Input() colorItem = 'bg-background';

  public currentPosition = 0;

  OnInit() {
    this.items.forEach((i, index) => {
      i.id = index;
      i.marginLeft = 0;
    });
  }

  setCurrentPosition(position: number) {
    this.currentPosition = position;
    if (this.items.length > 0) {
      this.items[0].marginLeft = -100 * position;
    }
  }

  setNext() {
    let finalPercentage = 0;
    let nextPosition = this.currentPosition + 1;
    if (nextPosition < this.items.length) {
      finalPercentage = -100 * nextPosition;
    } else {
      nextPosition = 0;
    }
    this.items[0].marginLeft = finalPercentage;
    this.currentPosition = nextPosition;
  }
  setBack() {
    let finalPercentage = 0;
    let backPosition = this.currentPosition - 1;
    if (backPosition >= 0) {
      finalPercentage = -100 * backPosition;
    } else {
      backPosition = this.items.length - 1;
      finalPercentage = -100 * backPosition;
    }
    this.items[0].marginLeft = finalPercentage;
    this.currentPosition = backPosition;
  }
}
