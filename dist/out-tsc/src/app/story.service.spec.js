import { TestBed } from '@angular/core/testing';
import { StoryService } from './story.service';
describe('StoriesService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StoryService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=story.service.spec.js.map