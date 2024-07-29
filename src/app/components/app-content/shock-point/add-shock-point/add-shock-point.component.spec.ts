import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShockPointComponent } from './add-shock-point.component';

describe('AddShockPointComponent', () => {
  let component: AddShockPointComponent;
  let fixture: ComponentFixture<AddShockPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShockPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShockPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
