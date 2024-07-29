import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRepairerComponent } from './list-repairer.component';

describe('ListRepairerComponent', () => {
  let component: ListRepairerComponent;
  let fixture: ComponentFixture<ListRepairerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRepairerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRepairerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
