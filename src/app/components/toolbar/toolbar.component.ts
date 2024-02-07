import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { StateClear } from 'ngxs-reset-plugin';
import { AuthState } from 'src/app/state/auth/auth.state';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  constructor(private store: Store, private router: Router) {}

  ngOnInit(): void {}

  cancel() {
    this.store.dispatch(new StateClear(AuthState));
    this.router.navigate(['/home']);
  }
}
