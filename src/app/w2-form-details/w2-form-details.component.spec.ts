import { ComponentFixture, TestBed } from '@angular/core/testing';

import { W2FormDetailsComponent } from './w2-form-details.component';

describe('W2FormDetailsComponent', () => {
  let component: W2FormDetailsComponent;
  let fixture: ComponentFixture<W2FormDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [W2FormDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(W2FormDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
