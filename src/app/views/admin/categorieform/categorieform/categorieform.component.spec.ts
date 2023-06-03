import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieformComponent } from './categorieform.component';

describe('CategorieformComponent', () => {
  let component: CategorieformComponent;
  let fixture: ComponentFixture<CategorieformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorieformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
