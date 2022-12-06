import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessInformationPage } from './process-information.page';

describe('ProcessInformationPage', () => {
  let component: ProcessInformationPage;
  let fixture: ComponentFixture<ProcessInformationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProcessInformationPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessInformationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
