import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MemberCardComponent } from './member-card';

describe('MemberCardComponent', () => {
    let component: MemberCardComponent;
    let fixture: ComponentFixture<MemberCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MemberCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(MemberCardComponent);
        component = fixture.componentInstance;

        component.member = {
            id: 1,
            user_id: 1,
            name: 'John',
            last_name: 'Doe',
            ci: '123456',
            phone: '555-5555',
            email: 'test@test.com',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
        };

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
