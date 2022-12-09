import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicketPage } from './ticket.page';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TicketRoutingModule } from './ticket-routing.module';



@NgModule({
  declarations: [TicketPage],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    TicketRoutingModule
  ]
})
export class TicketModule { }
