import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { AuthState } from 'src/app/state/auth/auth.state';
import { SetBoleto, SetPixEstatico } from 'src/app/state/consulta/consulta.action';
import { ConsultaState } from 'src/app/state/consulta/consulta.state';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss']
})
export class PaymentPage implements OnInit {
  line = false;
  checkCrlv = false;
  checkIpva = false;
  checkMulta = false;
  checkLicen = false;
  checkComp = false;
  optionsConsulta;
  options;
  constructor(
    private router: Router, 
    private store: Store,
    private consultaDebitoService: ConsultaDebitoService,
    ) { }

  ngOnInit(): void {
    this.optionsConsulta = this.store.selectSnapshot(ConsultaState.all);
    this.options = this.store.selectSnapshot(AuthState.all);
  }

  takePhoto(){
    this.checkCrlv = true;
    this.checkIpva = true;
    this.checkMulta = true;
    this.checkLicen = true;
    this.checkComp = true;
  }
  goPayment(type){
    const indentifadorFaturamento = this.optionsConsulta.informacoesConsulta.veiculo.identificadorFaturamento;
      const identificadorUsuario = this.options.usuarioDPId;
    if(type == 'card'){
      this.router.navigate(['/payment-card'])
    }; 
    if(type == 'pix'){
      
      this.consultaDebitoService.alterarPixEstatico(indentifadorFaturamento, identificadorUsuario).subscribe((element:any)=>{
        this.consultaDebitoService.gerarPixEstatico(indentifadorFaturamento, identificadorUsuario).subscribe((resp:any)=>{
          this.store.dispatch(new SetPixEstatico(resp));
          this.router.navigate(['/pix'])
        });
        
      });
    }; 
    if(type == 'ticket'){
      this.consultaDebitoService.alterarBoleto(indentifadorFaturamento, identificadorUsuario).subscribe((element:any)=>{
      this.consultaDebitoService.gerarBoleto(indentifadorFaturamento, identificadorUsuario).subscribe((resp:any)=>{
        this.store.dispatch(new SetBoleto(resp.listagem));
        this.router.navigate(['/ticket'])
      })
    });
    }; 
  }
}
