import { Component, OnInit } from '@angular/core';
import {ComicCharactersResponseResult} from '../comic-characters.response';
import {ComicResponseResult} from '../comic.response';
import {ActivatedRoute} from '@angular/router';
import {ComicService} from '../comic.service';
import {ComicCharactersService} from '../comic-characters.service';
import {Location} from '@angular/common';
import * as AppConst from '../app.const';
import {ComicStoriesService} from '../comic-stories.service';
import {ComicStoriesResponseResult} from '../comic-stories.response';

@Component({
  selector: 'app-comic-stories',
  templateUrl: './comic-stories.component.html',
  styleUrls: ['./comic-stories.component.css']
})
export class ComicStoriesComponent implements OnInit {

  id;
  comicName;
  itemsPerPage;
  totalItems: any;
  page: any;
  previousPage: any;
  maxSize;
  comicStoriesResponseResults: ComicStoriesResponseResult[];
  comicResponseResult: ComicResponseResult;

  constructor(private route: ActivatedRoute,
              private comicService: ComicService,
              private comicStoriesService: ComicStoriesService,
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
    this.comicStoriesService.getComicsStories(this.itemsPerPage, this.page - 1, this.id).subscribe(
      response => {
        this.comicStoriesResponseResults = response.data.results;
        this.totalItems = response.data.total;
        this.itemsPerPage = response.data.count;
        this.maxSize = AppConst.DEFAULT_PAGE_SIZE;
      },
      e => console.log(e)
    );
    this.comicService.getComicById(this.id).subscribe(
      response => {
        this.comicResponseResult = response.data.results.pop();
        this.comicName = this.comicResponseResult.title;
      },
      e => console.log(e)
    );
  }

  goBack() {
    this.location.back();
  }

}
