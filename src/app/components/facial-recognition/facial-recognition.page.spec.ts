import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacialRecognitionPage } from './facial-recognition.page';

describe('FacialRecognitionPage', () => {
  let component: FacialRecognitionPage;
  let fixture: ComponentFixture<FacialRecognitionPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacialRecognitionPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FacialRecognitionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
