import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrensentationComponent } from './prensentation.component';

describe('PrensentationComponent', () => {
  let component: PrensentationComponent;
  let fixture: ComponentFixture<PrensentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrensentationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrensentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
