import {Component, Input} from '@angular/core';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-picture-title-pair',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './picture-title-pair.component.html',
  styleUrl: './picture-title-pair.component.css'
})
export class PictureTitlePairComponent {
  @Input() image: any = undefined;
  @Input() title: string = '';
  @Input() subtitle: string = '';
}
