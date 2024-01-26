import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPage } from './login.page';
import { LoginRoutingModule } from './login-routing.module';
import { AuthService } from 'src/app/services/auth/auth.service';



@NgModule({
  
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    LoginRoutingModule
    
  ],
  providers:[
    AuthService
  ],
  declarations: [LoginPage],
})
export class LoginModule { }
