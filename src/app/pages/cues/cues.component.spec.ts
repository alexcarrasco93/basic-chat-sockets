import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CuesComponent } from './cues.component';

describe('CuesComponent', () => {
  let component: CuesComponent;
  let fixture: ComponentFixture<CuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ CuesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
