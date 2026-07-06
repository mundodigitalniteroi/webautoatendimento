import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FotoFacialPage } from './foto-facial.page';



describe('FotoFacialPage', () => {
  let component: FotoFacialPage;
  let fixture: ComponentFixture<FotoFacialPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FotoFacialPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FotoFacialPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
