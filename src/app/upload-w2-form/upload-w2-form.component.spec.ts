import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadW2FormComponent } from './upload-w2-form.component';

describe('UploadW2FormComponent', () => {
  let component: UploadW2FormComponent;
  let fixture: ComponentFixture<UploadW2FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UploadW2FormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UploadW2FormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
