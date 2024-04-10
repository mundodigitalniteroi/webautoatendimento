import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { AtendimentoService } from 'src/app/services/atendimento/atendimento.service';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { AuthState } from 'src/app/state/auth/auth.state';
import { ConsultaState } from 'src/app/state/consulta/consulta.state';

@Component({
  selector: 'app-pix',
  templateUrl: './pix.page.html',
  styleUrls: ['./pix.page.scss'],
})
export class PixPage implements OnInit {
  optionsConsulta;
  valorTotal;
  tempo;
  segundos = 120;
  interval;
  options;
  intervalConsultaPix;

  constructor(
    private store: Store,
    private consultaDebitoService: ConsultaDebitoService,
    private router: Router,
    private atendimentoService: AtendimentoService
  ) {
    this.optionsConsulta = this.store.selectSnapshot(ConsultaState.all);
    this.options = this.store.selectSnapshot(AuthState.all);
    this.valorTotal = this.optionsConsulta?.informacaoPixEstatico?.valorOriginal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    this.interval = setInterval(() => {
      this.tempo = this.formatarTempo(this.segundos);
      this.segundos--;

      if (this.segundos < 0) {
        clearInterval(this.interval);
      }
    }, 1000);

    this.intervalConsultaPix = setInterval(() => {
      this.confirmarPagamento();
    }, 5000);
  }

  ngOnInit(): void {}

  formatarTempo(segundos) {
    segundos %= 3600;
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;

    return `${String(minutos).padStart(2, '0')}:${String(segundosRestantes).padStart(2, '0')}`;
  }

  confirmarPagamento() {
    const indentifadorFaturamento = this.optionsConsulta.informacoesConsulta.veiculo.identificadorFaturamento;
    const identificadorUsuario = this.options.usuarioDPId;

    this.consultaDebitoService.confirmarPagamento(indentifadorFaturamento, identificadorUsuario).subscribe((resp: any) => {
      if (resp.faturamento.status == 'P') {
        clearInterval(this.intervalConsultaPix);

        const atendimentoId = this.optionsConsulta.informacoesConsulta.atendimentoId;
        this.atendimentoService.confirmarPagamento(atendimentoId).subscribe(() => {
          this.router.navigate(['/payment-confirmed']);
        });
      }
    });
  }
}
