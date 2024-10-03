import {Component, OnInit} from '@angular/core';
import {StoreService} from "../store.service";
import {FunctionsService} from "../functions.service";
import {DatePipe, NgIf} from "@angular/common";
import {NodeModel} from "../interfaces/node.model";

@Component({
  selector: 'app-estate-preview',
  standalone: true,
  imports: [
    NgIf,
    DatePipe
  ],
  templateUrl: './estate-preview.component.html',
  styleUrl: './estate-preview.component.css'
})
export class EstatePreviewComponent {

  constructor(
    public storeService: StoreService,
    public functionsService: FunctionsService
  ) {
    this.data = this.storeService.getLastProperty()
    this.noFutureViewings = true;
  }

  public data: NodeModel;
  public noFutureViewings: boolean;

  goToViewing() {
    this.storeService.setCurrentlyFocussedDate(new Date(this.data.date));
  }

  testFunc(inp: any) {
    console.log(inp);
  }
}
