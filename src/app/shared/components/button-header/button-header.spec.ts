import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonHeader } from './button-header';

describe('ButtonHeader', () => {
  let component: ButtonHeader;
  let fixture: ComponentFixture<ButtonHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(ButtonHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
