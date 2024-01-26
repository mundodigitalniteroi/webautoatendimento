import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthState } from 'src/app/state/auth/auth.state';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  options;
  constructor(
    private router: Router,
    private store: Store,
    ) { }

  ngOnInit(): void {
    this.options = this.store.selectSnapshot(AuthState.all);
    console.log(this.options)
  }
  goPublicSearch(){
    this.router.navigate(['/term-acception'])
  }
  goQuery(){
    this.router.navigate(['/query'])
  }
}
