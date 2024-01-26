import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { AuthState } from 'src/app/state/auth/auth.state';
import { SetInformations } from 'src/app/state/registro/registro.action';

@Component({
  selector: 'app-public-search',
  templateUrl: './public-search.page.html',
  styleUrls: ['./public-search.page.scss']
})
export class PublicSearchPage implements OnInit {
  form: FormGroup;
  informations;
  error = false;
  options;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private consultaDebitoService: ConsultaDebitoService,
    private store: Store,
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      campo: ['KUM3752', Validators.required],
    });
    this.options = this.store.selectSnapshot(AuthState.all);
    console.log(this.options)
  }

  consultarDebito(){
  
    this.error = false;
    
    const payload = {
      codigoProduto: "DEP",
      // identificadorCliente: this.options.clienteId,
      // identificadorDeposito: this.options.depositoId,
      // identificadorUsuario: this.options.usuarioDPId,
      identificadorCliente: 1,
      identificadorDeposito: 1,
      identificadorUsuario: 1,
      placa: this.form.value.campo,
    } 
    this.consultaDebitoService.consultaVeiculo(payload).subscribe(
      deb => {
      const payload = {
        informacaoConsulta:deb
      }
      this.error = false;
      this.store.dispatch(new SetInformations(payload));
      this.router.navigate(['/process-informations'])
    },
      (erro) => {
        this.error = true;
      },
    )
  }

  goProcessInformation(){
    this.router.navigate(['/process-informations'])
  }
 
}
