import { Component, OnInit } from '@angular/core';
import {CharacterComicsResponseResult} from '../character-comics.response';
import {CharacterResponseResult} from '../character.response';
import {ActivatedRoute} from '@angular/router';
import {CharacterService} from '../character.service';
import {CharacterComicsService} from '../character-comics.service';
import {Location} from '@angular/common';
import * as AppConst from '../app.const';
import {ComicCharactersResponse, ComicCharactersResponseResult} from '../comic-characters.response';
import {ComicResponseData, ComicResponseResult} from '../comic.response';
import {ComicService} from '../comic.service';
import {ComicCharactersService} from '../comic-characters.service';

@Component({
  selector: 'app-comic-characters',
  templateUrl: './comic-characters.component.html',
  styleUrls: ['./comic-characters.component.css']
})
export class ComicCharactersComponent implements OnInit {

  id;
  comicName;
  itemsPerPage;
  totalItems: any;
  page: any;
  previousPage: any;
  maxSize;
  comicCharactersResponseResults: ComicCharactersResponseResult[];
  comicResponseResult: ComicResponseResult;

  constructor(private route: ActivatedRoute,
              private comicService: ComicService,
              private comicCharactersService: ComicCharactersService,
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
    this.comicCharactersService.getComicsCharacters(this.itemsPerPage, this.page - 1, this.id).subscribe(
      response => {
        this.comicCharactersResponseResults = response.data.results;
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
