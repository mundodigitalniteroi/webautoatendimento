import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { SetInformations } from 'src/app/state/registro/registro.action';

@Component({
  selector: 'app-query',
  templateUrl: './query.page.html',
  styleUrls: ['./query.page.scss']
})
export class QueryPage implements OnInit {
  form: FormGroup;
  informations;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private consultaDebitoService: ConsultaDebitoService,
    private store: Store,
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      campo: ['914201819', Validators.required],
    });
  }

  consultarDebito(){
    // // console.log(this.consultaDebitoService.getDebitos(this.form.value.campo))
    // this.consultaDebitoService.consultaVeiculo().subscribe(deb => {
    
    //     // console.log(deb)
    //   const payload = {
    //     informacaoConsulta:deb
    //   }


    // })
  }

  goProcessInformation(){
    // this.router.navigate(['/process-informations'])
  }
 
}
