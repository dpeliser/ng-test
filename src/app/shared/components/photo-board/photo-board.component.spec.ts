import { SimpleChange, SimpleChanges } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoBoardComponent } from './photo-board.component';
import { PhotoBoardModule } from './photo-board.module';
import { buildPhotosList } from './test/build-photo-list';

describe(PhotoBoardComponent.name, () => {
  let fixture: ComponentFixture<PhotoBoardComponent> = null;
  let component: PhotoBoardComponent = null;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhotoBoardModule],
    });

    fixture = TestBed.createComponent(PhotoBoardComponent);
    component = fixture.componentInstance;
  });

  it('should display rows and columns when (@Input photos) has value', () => {
    fixture.detectChanges();
    const changes: SimpleChanges = {
      photos: new SimpleChange([], buildPhotosList(), true),
    };
    component.ngOnChanges(changes);

    expect(component.rows.length).withContext('Number of rows').toBe(2);
    expect(component.rows[0].length)
      .withContext('Number of columns from first row')
      .toBe(4);
    expect(component.rows[1].length)
      .withContext('Number of columns from second row')
      .toBe(4);
  });
});
