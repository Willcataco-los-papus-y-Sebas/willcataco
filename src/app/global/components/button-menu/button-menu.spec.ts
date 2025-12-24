import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonMenu } from './button-menu';

describe('ButtonMenu', () => {
  let component: ButtonMenu;
  let fixture: ComponentFixture<ButtonMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonMenu);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
