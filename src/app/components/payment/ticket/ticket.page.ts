import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { ConsultaState } from 'src/app/state/consulta/consulta.state';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss']
})
export class TicketPage implements OnInit {
  optionsConsulta;
  valorTotal;
  constructor(
    private store: Store
  ) {
    this.optionsConsulta = this.store.selectSnapshot(ConsultaState.all);
    
   }

  ngOnInit(): void {
    
  }
}
