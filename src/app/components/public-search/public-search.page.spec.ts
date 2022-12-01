import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicSearchPage } from './public-search.page';

describe('PublicSearchPage', () => {
  let component: PublicSearchPage;
  let fixture: ComponentFixture<PublicSearchPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicSearchPage ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
