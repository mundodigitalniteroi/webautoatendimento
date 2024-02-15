import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/state/auth/auth.state';

@Component({
  selector: 'app-term-acception',
  templateUrl: './term-acception.page.html',
  styleUrls: ['./term-acception.page.scss'],
})
export class TermAcceptionPage implements OnInit {
  value: false;
  termos;
  constructor(private store: Store, private _sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.store.select(AuthState.all).subscribe((state: any) => {
      this.termos = this._sanitizer.bypassSecurityTrustHtml(state.termos);
    });
  }
}
