import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewallticketsComponent } from './viewalltickets.component';

describe('ViewallticketsComponent', () => {
  let component: ViewallticketsComponent;
  let fixture: ComponentFixture<ViewallticketsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewallticketsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewallticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
