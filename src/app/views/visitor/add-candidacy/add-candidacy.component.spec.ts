import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCandidacyComponent } from './add-candidacy.component';

describe('AddCandidacyComponent', () => {
  let component: AddCandidacyComponent;
  let fixture: ComponentFixture<AddCandidacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCandidacyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCandidacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
