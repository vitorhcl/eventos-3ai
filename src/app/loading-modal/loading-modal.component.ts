import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-modal',
  templateUrl: './loading-modal.component.html',
  styleUrls: ['./loading-modal.component.css']
})
export class LoadingModalComponent {
  mostrar: boolean = true;

  toggle () {
    this.mostrar = !this.mostrar;
  }
}
