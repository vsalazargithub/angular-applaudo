import { TestBed } from '@angular/core/testing';

import { CharacterStoriesService } from './character-stories.service';

describe('CharacterStoriesService', () => {
  let service: CharacterStoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterStoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
