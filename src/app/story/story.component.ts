import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {StoryResponseResult} from '../story.response';
import {StoryService} from '../story.service';
import * as AppConst from '../app.const';
import {ImageContainter} from '../image-containter';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {
  images: ImageContainter[] = [];
  storyResponseResults: StoryResponseResult[];
  itemsStoryPerPage;
  totalStoryItems: any;
  storyPage: any;
  previousStoryPage: any;
  maxStorySize;
  constructor(private storyService: StoryService,
              private modalService: NgbModal) { }

  ngOnInit(): void {
    this.itemsStoryPerPage = AppConst.DEFAULT_PAGE_SIZE;
    this.maxStorySize = AppConst.DEFAULT_PAGE_SIZE;
    this.storyPage = 1;
    this.loadData();
  }

  loadPage(page: number) {
    if (page !== this.previousStoryPage) {
      this.previousStoryPage = page;
      this.loadData();
    }
  }

  loadData() {
    this.storyService.getStories(this.itemsStoryPerPage, this.storyPage - 1, this.maxStorySize).subscribe(
      response => {
        this.storyResponseResults = response.data.results;
        this.totalStoryItems = response.data.total;
        this.itemsStoryPerPage = response.data.count;
        this.maxStorySize = AppConst.DEFAULT_PAGE_SIZE;
      },
      e => console.log(e)
    );
  }


  viewThumbnail(result: StoryResponseResult, thumbnail) {
    this.images = [];
    this.storyService.getStoriesById(result.id.toString()).subscribe(
      response => {
        const resulti = response.data.results.pop();
        if (resulti && resulti.thumbnail){
          this.images.push(new ImageContainter(resulti.thumbnail.path + '.' + resulti.thumbnail.extension));
        }
        this.modalService.open(thumbnail, {ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: 'modal-xl'});
      },
      e => console.log(e)
    );
  }
}
