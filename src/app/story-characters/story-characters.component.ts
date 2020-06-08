import { Component, OnInit } from '@angular/core';
import {ComicCharactersResponseResult} from '../comic-characters.response';
import {ComicResponseResult} from '../comic.response';
import {ActivatedRoute} from '@angular/router';
import {ComicService} from '../comic.service';
import {ComicCharactersService} from '../comic-characters.service';
import {Location} from '@angular/common';
import * as AppConst from '../app.const';
import {StoryCharactersResponseResult} from '../story-characters.response';
import {StoryResponseResult} from '../story.response';
import {StoryService} from '../story.service';
import {StoryCharactersService} from '../story-characters.service';

@Component({
  selector: 'app-story-characters',
  templateUrl: './story-characters.component.html',
  styleUrls: ['./story-characters.component.css']
})
export class StoryCharactersComponent implements OnInit {

  id;
  storyName;
  itemsPerPage;
  totalItems: any;
  page: any;
  previousPage: any;
  maxSize;
  storyCharactersResponseResults: StoryCharactersResponseResult[];
  storyResponseResult: StoryResponseResult;

  constructor(private route: ActivatedRoute,
              private storyService: StoryService,
              private storyCharactersService: StoryCharactersService,
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
    this.storyCharactersService.getStoriesCharacters(this.itemsPerPage, this.page - 1, this.id).subscribe(
      response => {
        this.storyCharactersResponseResults = response.data.results;
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
