import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListShockPointComponent } from './list-shock-point.component';

describe('ListShockPointComponent', () => {
  let component: ListShockPointComponent;
  let fixture: ComponentFixture<ListShockPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListShockPointComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListShockPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
