import { TestBed } from '@angular/core/testing';

import { ToolMenuService } from './tool-menu.service';

describe('ToolMenuService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ToolMenuService = TestBed.get(ToolMenuService);
    expect(service).toBeTruthy();
  });
});
