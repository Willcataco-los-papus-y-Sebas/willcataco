import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Forget } from './forget';

describe('Forget', () => {
  let component: Forget;
  let fixture: ComponentFixture<Forget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Forget]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Forget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
