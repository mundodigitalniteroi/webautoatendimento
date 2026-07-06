import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { QueryPage } from './query.page';
import { ConsultaDebitoService } from 'src/app/services/consulta-debito/consulta-debito.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('PublicSearchPage', () => {
  let component: QueryPage;
  let fixture: ComponentFixture<QueryPage>;
  let consultaDebitoService: ConsultaDebitoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QueryPage],
      imports: [RouterTestingModule, ReactiveFormsModule],
      providers: [FormBuilder, ConsultaDebitoService]
    }).compileComponents();

    fixture = TestBed.createComponent(QueryPage);
    component = fixture.componentInstance;
    consultaDebitoService = TestBed.inject(ConsultaDebitoService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.form).toBeDefined();
    expect(component.form.get('campo')?.value).toBe('KZJ5123');
  });

  it('should call consultaDebitoService on consultarDebito', () => {
    spyOn(consultaDebitoService, 'getDebitos').and.returnValue(of('test debit'));
    component.ngOnInit();
    component.consultarDebito();
    expect(consultaDebitoService.getDebitos).toHaveBeenCalled();
  });

  it('should navigate to process-informations on goProcessInformation', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    component.goProcessInformation();
    expect(router.navigate).toHaveBeenCalledWith(['/process-informations']);
  });
});
