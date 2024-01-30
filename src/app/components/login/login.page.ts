import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
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
  loading = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store,
    private toastController: ToastController,
    ) { }

  ngOnInit(): void {
  }
  goHome(){
    this.router.navigate(['/home'])
  }

  login(){
    this.loading = true;
    this.authService.login(this.codigo).subscribe( (info: any) => {
      // console.log(info);
      this.loading = false;
      if(info.data){
        this.store.dispatch(new Login(info.data));
        this.router.navigate(['/home']);
      }else{
        this.toast('Error: Não foi possível efetuar o login com este código');
      }
    },
    (error)=> {
      this.loading = false;
      this.toast('Error: Não foi possível efetuar o login com este código');
    }
    )
  }
  async toast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}