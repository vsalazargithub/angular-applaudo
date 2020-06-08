import { TestBed } from '@angular/core/testing';

import { ComicStoriesService } from './comic-stories.service';

describe('ComicStoriesService', () => {
  let service: ComicStoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComicStoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
