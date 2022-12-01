import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessInformationsPage } from './process-informations.page';

describe('ProcessInformationsPage', () => {
  let component: ProcessInformationsPage;
  let fixture: ComponentFixture<ProcessInformationsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessInformationsPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessInformationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
