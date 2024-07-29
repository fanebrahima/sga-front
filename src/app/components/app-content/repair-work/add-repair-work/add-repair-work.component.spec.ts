import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRepairWorkComponent } from './add-repair-work.component';

describe('AddRepairWorkComponent', () => {
  let component: AddRepairWorkComponent;
  let fixture: ComponentFixture<AddRepairWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRepairWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRepairWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
