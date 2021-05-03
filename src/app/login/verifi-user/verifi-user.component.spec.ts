import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifiUserComponent } from './verifi-user.component';

describe('VerifiUserComponent', () => {
  let component: VerifiUserComponent;
  let fixture: ComponentFixture<VerifiUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifiUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifiUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
