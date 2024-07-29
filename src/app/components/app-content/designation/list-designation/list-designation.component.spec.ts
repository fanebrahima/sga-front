import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDesignationComponent } from './list-designation.component';

describe('ListDesignationComponent', () => {
  let component: ListDesignationComponent;
  let fixture: ComponentFixture<ListDesignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDesignationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDesignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
