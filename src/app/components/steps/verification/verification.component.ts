import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RegistroState } from 'src/app/state/registro/registro.state';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {
  options;

  constructor(private store: Store,) {
    this.options = this.store.selectSnapshot(RegistroState.all);
    // // console.log(this.options)
   }

  ngOnInit(): void {
  }

}
