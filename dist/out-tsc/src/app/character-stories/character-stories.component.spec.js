import { async, TestBed } from '@angular/core/testing';
import { CharacterStoriesComponent } from './character-stories.component';
describe('CharacterStoriesComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CharacterStoriesComponent]
        })
            .compileComponents();
    }));
    beforeEach(() => {
        fixture = TestBed.createComponent(CharacterStoriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=character-stories.component.spec.js.map