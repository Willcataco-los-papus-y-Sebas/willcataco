import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewMembers } from './new-members';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewMembers', () => {
  let component: NewMembers;
  let fixture: ComponentFixture<NewMembers>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMembers, HttpClientTestingModule, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(NewMembers);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});