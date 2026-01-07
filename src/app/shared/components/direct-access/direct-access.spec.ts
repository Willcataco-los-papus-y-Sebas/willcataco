import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectAccessComponent } from './direct-access';

describe('DirectAccess', () => {
  let component: DirectAccessComponent;
  let fixture: ComponentFixture<DirectAccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DirectAccessComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DirectAccessComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
