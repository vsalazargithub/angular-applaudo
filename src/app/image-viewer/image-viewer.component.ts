import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {ImageContainter} from '../image-containter';
import {ComicImagesResponseResult} from '../comic.response';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ImageViewerComponent implements OnInit {
  @Input() modal: any;
  @Input() images: ImageContainter[] = [];
  constructor() { }

  ngOnInit(): void {
    console.log('ImageViewerComponent');
    if (this.images && this.images && this.images.length > 0){
      this.images.forEach( (element) => {
        console.log('image-->' + element.getPath());
      });
    }
  }

}
