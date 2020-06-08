import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CharacterStoriesResponseResult} from '../character-stories.response';
import {CharacterResponseResult} from '../character.response';
import {CharacterService} from '../character.service';
import * as AppConst from '../app.const';
import {CharacterStoriesService} from '../character-stories.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-character-stories',
  templateUrl: './character-stories.component.html',
  styleUrls: ['./character-stories.component.css']
})
export class CharacterStoriesComponent implements OnInit {

  id;
  characterName;
  itemsPerPage;
  totalItems: any;
  page: any;
  previousPage: any;
  maxSize;
  characterStoriesResponseResults: CharacterStoriesResponseResult[];
  characterResponseResult: CharacterResponseResult;

  constructor(private route: ActivatedRoute,
              private characterService: CharacterService,
              private characterStoriesService: CharacterStoriesService,
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
    this.characterStoriesService.getCharacterStories(this.itemsPerPage, this.page - 1, this.id).subscribe(
      response => {
        this.characterStoriesResponseResults = response.data.results;
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
