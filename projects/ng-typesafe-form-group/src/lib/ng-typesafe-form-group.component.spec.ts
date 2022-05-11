import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgTypesafeFormGroupComponent } from './ng-typesafe-form-group.component';

describe('NgTypesafeFormGroupComponent', () => {
  let component: NgTypesafeFormGroupComponent;
  let fixture: ComponentFixture<NgTypesafeFormGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgTypesafeFormGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgTypesafeFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
