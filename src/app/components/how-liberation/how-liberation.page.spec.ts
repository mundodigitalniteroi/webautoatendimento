import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HowLiberationPage } from './how-liberation.page';

describe('HowLiberationPage', () => {
  let component: HowLiberationPage;
  let fixture: ComponentFixture<HowLiberationPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HowLiberationPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HowLiberationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
