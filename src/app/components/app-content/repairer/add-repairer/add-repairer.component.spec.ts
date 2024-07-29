import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepairerComponent } from './add-repairer.component';

describe('AddRepairerComponent', () => {
  let component: AddRepairerComponent;
  let fixture: ComponentFixture<AddRepairerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRepairerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRepairerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
