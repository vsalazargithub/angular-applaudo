import { TestBed } from '@angular/core/testing';

import { StoryCharactersService } from './story-characters.service';

describe('StoryCharactersService', () => {
  let service: StoryCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoryCharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
