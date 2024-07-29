import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRepairWorkComponent } from './list-repair-work.component';

describe('ListRepairWorkComponent', () => {
  let component: ListRepairWorkComponent;
  let fixture: ComponentFixture<ListRepairWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRepairWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRepairWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
