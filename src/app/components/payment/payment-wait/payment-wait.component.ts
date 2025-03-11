import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlanoParcelamento } from 'src/app/interfaces/consulta.interface';

@Component({
  selector: 'app-payment-wait',
  templateUrl: './payment-wait.component.html',
  styleUrls: ['./payment-wait.component.scss'],
})
export class PaymentWaitComponent implements OnInit {
  parcelaSelecionada: PlanoParcelamento;
  tipoPagamento: string;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.parcelaSelecionada = navigation.extras.state['parcelaSelecionada'];
      this.tipoPagamento = navigation.extras.state['tipoPagamento'];
    }
  }

  ngOnInit() {}

  goToHome() {
    this.router.navigate(['/home']);
  }
}
