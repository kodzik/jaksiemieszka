import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenmapTestComponent } from './openmap-test.component';

describe('OpenmapTestComponent', () => {
  let component: OpenmapTestComponent;
  let fixture: ComponentFixture<OpenmapTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpenmapTestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenmapTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
