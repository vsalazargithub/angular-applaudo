import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { CharacterComicsService } from '../character-comics.service';
import { CharacterService } from '../character.service';
import {CharacterResponseResult} from '../character.response';
import {CharacterComicsResponse, CharacterComicsResponseResult} from '../character-comics.response';
import * as AppConst from '../app.const';
import {Location} from '@angular/common';
@Component({
  selector: 'app-character-comics',
  templateUrl: './character-comics.component.html',
  styleUrls: ['./character-comics.component.css']
})
export class CharacterComicsComponent implements OnInit {

  id;
  characterName;
  itemsPerPage;
  totalItems: any;
  page: any;
  previousPage: any;
  maxSize;
  characterComicsResponseResults: CharacterComicsResponseResult[];
  characterResponseResult: CharacterResponseResult;

  constructor(private route: ActivatedRoute,
              private characterService: CharacterService,
              private characterComicsService: CharacterComicsService,
              private location: Location
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.itemsPerPage = AppConst.DEFAULT_PAGE_SIZE;
    this.maxSize = 10;
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
    this.characterComicsService.getCharacterComics(this.itemsPerPage, this.page - 1, this.id).subscribe(
      response => {
        this.characterComicsResponseResults = response.data.results;
        this.totalItems = response.data.total;
        this.itemsPerPage = response.data.count;
        this.maxSize = 10;
      },
      e => console.log(e)
    );
    this.characterService.getCharacterById(this.id).subscribe(
      response => {
        this.characterResponseResult = response.data.results.pop();
        this.characterName = this.characterResponseResult.name;
      },
      e => console.log(e)
    );
  }

  goBack() {
    this.location.back();
  }

}
