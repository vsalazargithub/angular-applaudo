import { Component, ViewChild, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {Observable, Subject} from 'rxjs';
import { mergeMap, map, toArray, switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import * as Util from '../util';
import * as AppConst from '../app.const';
import {CharacterResponse, CharacterResponseData, CharacterResponseResult} from '../character.response';
import {AutocompleteResponse} from '../autocomplete.response';
import { CharacterService } from '../character.service';
import { ComicService } from '../comic.service';
import { StoryService } from '../story.service';
import {StoryResponseResult} from '../story.response';
import {StoriesComponent} from '../stories/stories.component';
import {ImageContainter} from '../image-containter';
@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit{
  private static subject = new Subject<string>();
  images: ImageContainter[] = [];
  characterResponseResult: CharacterResponseResult[];
  itemsPerPage;
  totalItems: any;
  page: any;
  previousPage: any;
  maxSize;
  name: string;
  story: number;
  comic: number;
  storyTitle: string;
  filteredComics: AutocompleteResponse[] = [];
  comicForm: FormGroup;
  isLoading = false;
  comicText: string;

  public static getSubject(): Observable<string> {
    return CharacterComponent.subject.asObservable();
  }

  constructor(private characterService: CharacterService,
              private comicService: ComicService,
              private formBuilder: FormBuilder,
              private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.itemsPerPage = AppConst.DEFAULT_PAGE_SIZE;
    this.maxSize = AppConst.DEFAULT_PAGE_SIZE;
    this.page = 1;
    this.loadData();
    this.initAutoCompleteComics();
    this.initSubscriber();
  }

  initSubscriber(){
    CharacterComponent.getSubject().subscribe((response) => {
      this.onChangeComic(response);
    });
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  loadData() {
    this.characterService.getCharacters(this.itemsPerPage, this.page - 1, this.comic, this.story, this.name).subscribe(
      response => {
        this.characterResponseResult = response.data.results;
        this.totalItems = response.data.total;
        this.itemsPerPage = response.data.count;
        this.maxSize = AppConst.DEFAULT_PAGE_SIZE;
      },
      e => console.log(e)
    );
  }

  initAutoCompleteComics() {
    this.comicForm = this.formBuilder.group({
      comicInput: null
    });
    this.comicForm
      .get('comicInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.comicService.getComicsTitleStartsWith(value)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(response => this.filteredComics = response.results);
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: 'modal-xl'}).result.then((result) => {
    }, (reason) => {
    });
  }

  onDisplayComic(autocompleteResponse: AutocompleteResponse) {
    if (autocompleteResponse){
      CharacterComponent.subject.next(Util.toString(autocompleteResponse.id));
      return autocompleteResponse.name;
    }
  }

  onChangeComic(response): void {
    if (Util.isNonEmptyString(response)){
      this.comic = Number(response);
    }
  }

  onChangeStory($event) {
    this.story = $event.id;
    this.storyTitle = $event.title;

  }

  onChangeName($event: Event) {

  }

  search() {
    this.loadData();
  }

  clear() {
    this.comic = null;
    this.story = null;
    this.name = null;
    this.storyTitle = null;
    this.comicForm.reset('');
    this.loadData();
  }

  viewThumbnail(result: CharacterResponseResult, thumbnail) {
    this.images = [];
    this.characterService.getCharacterById(result.id.toString()).subscribe(
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
