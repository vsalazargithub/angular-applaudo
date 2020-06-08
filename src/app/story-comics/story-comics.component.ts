import { Component, OnInit } from '@angular/core';
import {StoryCharactersResponseResult} from '../story-characters.response';
import {StoryResponseResult} from '../story.response';
import {ActivatedRoute} from '@angular/router';
import {StoryService} from '../story.service';
import {StoryCharactersService} from '../story-characters.service';
import {Location} from '@angular/common';
import * as AppConst from '../app.const';
import {StoryComicsService} from '../story-comics.service';
import {StoryComicsResponseResult} from '../story-comics.response';

@Component({
  selector: 'app-story-comics',
  templateUrl: './story-comics.component.html',
  styleUrls: ['./story-comics.component.css']
})
export class StoryComicsComponent implements OnInit {

  id;
  storyName;
  itemsPerPage;
  totalItems: any;
  page: any;
  previousPage: any;
  maxSize;
  storyComicsResponseResults: StoryComicsResponseResult[];
  storyResponseResult: StoryResponseResult;

  constructor(private route: ActivatedRoute,
              private storyService: StoryService,
              private storyComicsService: StoryComicsService,
              private location: Location
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.itemsPerPage = AppConst.DEFAULT_PAGE_SIZE;
    this.maxSize = AppConst.DEFAULT_PAGE_SIZE;
    this.page = 1;
    this.loadData();
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  loadData() {
    this.storyComicsService.getStoriesComics(this.itemsPerPage, this.page - 1, this.id).subscribe(
      response => {
        this.storyComicsResponseResults = response.data.results;
        this.totalItems = response.data.total;
        this.itemsPerPage = response.data.count;
        this.maxSize = AppConst.DEFAULT_PAGE_SIZE;
      },
      e => console.log(e)
    );
    this.storyService.getStoriesById(this.id).subscribe(
      response => {
        this.storyResponseResult = response.data.results.pop();
        this.storyName = this.storyResponseResult.title;
      },
      e => console.log(e)
    );
  }

  goBack() {
    this.location.back();
  }

}
