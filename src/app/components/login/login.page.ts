import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Login } from 'src/app/state/auth/auth.action';

@Component({
  selector: 'app-home',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit {
  codigo:string = 'M7W2JT';
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store,
    ) { }

  ngOnInit(): void {
  }
  goHome(){
    this.router.navigate(['/home'])
  }

  login(){
    this.authService.login(this.codigo).subscribe( (info: any) => {
      console.log(info);
      this.store.dispatch(new Login(info.data));
      this.router.navigate(['/home']);
    })
  }
}
