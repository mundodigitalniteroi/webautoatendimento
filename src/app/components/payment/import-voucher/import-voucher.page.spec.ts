import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportVoucherPage } from './import-voucher.page';

describe('ImportVoucherPage', () => {
  let component: ImportVoucherPage;
  let fixture: ComponentFixture<ImportVoucherPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportVoucherPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportVoucherPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
