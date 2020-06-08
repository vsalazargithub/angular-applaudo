import { TestBed } from '@angular/core/testing';
import { StoryComicsService } from './story-comics.service';
describe('StoryComicsService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StoryComicsService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=story-comics.service.spec.js.map