import { TestBed } from '@angular/core/testing';

import { FirstPhotoBlogService } from '../first-photo-blog.service';

describe('FirstPhotoBlogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FirstPhotoBlogService = TestBed.get(FirstPhotoBlogService);
    expect(service).toBeTruthy();
  });
});
