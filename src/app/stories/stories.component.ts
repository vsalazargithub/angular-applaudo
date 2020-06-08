import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {StoryResponseResult} from '../story.response';
import {StoryService} from '../story.service';
import * as AppConst from '../app.const';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AutocompleteResponse} from '../autocomplete.response';
import * as Util from '../util';
import {Observable, Subject} from 'rxjs';
import {debounceTime, finalize, switchMap, tap} from 'rxjs/operators';
import {CharacterService} from '../character.service';

@Component({
  selector: 'app-stories',
  templateUrl: './stories.component.html',
  styleUrls: ['./stories.component.css']
})
export class StoriesComponent implements OnInit  {
  private static subject = new Subject<string>();
  @Input() modal: any;
  storyResponseResults: StoryResponseResult[];
  itemsStoryPerPage;
  totalStoryItems: any;
  storyPage: any;
  previousStoryPage: any;
  maxStorySize;
  character: number;
  characterForm: FormGroup;
  filteredCharacters: AutocompleteResponse[] = [];
  isLoading = false;
  @Output() messageEvent = new EventEmitter();
  flag: any;

  constructor(private storyService: StoryService, private characterService: CharacterService, private formBuilder: FormBuilder) { }

  public static getSubject(): Observable<string> {
    return StoriesComponent.subject.asObservable();
  }

  ngOnInit(): void {
    this.itemsStoryPerPage = AppConst.DEFAULT_STORY_PAGE_SIZE;
    this.maxStorySize = 5;
    this.storyPage = 1;
    this.loadStoryData();
    this.initAutoCompleteCharacters();
    this.initSubscriber();
  }

  initSubscriber(){
    StoriesComponent.getSubject().subscribe((response) => {
      this.onChangeCharacter(response);
    });
  }

  initAutoCompleteCharacters() {
    this.characterForm = this.formBuilder.group({
      characterInput: null
    });
    this.characterForm
      .get('characterInput')
      .valueChanges
      .pipe(
        debounceTime(300),
        tap(() => this.isLoading = true),
        switchMap(value => this.characterService.getCharactersTitleStartsWith(value)
          .pipe(
            finalize(() => this.isLoading = false),
          )
        )
      )
      .subscribe(response => this.filteredCharacters = response.results);
  }

  loadStoryPage(page: number) {
    if (page !== this.previousStoryPage) {
      this.previousStoryPage = page;
      this.loadStoryData();
    }
  }

  loadStoryData() {
    this.storyService.getStoriesByCharacters(this.itemsStoryPerPage, this.storyPage - 1, this.maxStorySize, this.character).subscribe(
      response => {
        this.storyResponseResults = response.data.results;
        this.totalStoryItems = response.data.total;
        this.itemsStoryPerPage = response.data.count;
        this.maxStorySize = 5;
      },
      e => console.log(e)
    );
  }

  onSelectStory(result: any) {
    this.messageEvent.emit(result);
    this.modal.close('Close click');
  }

  onDisplayCharacter(autocompleteResponse: AutocompleteResponse) {
    if (autocompleteResponse){
      StoriesComponent.subject.next(Util.toString(autocompleteResponse.id));
      return autocompleteResponse.name;
    }
  }

  private onChangeCharacter(response: string) {
    if (Util.isNonEmptyString(response)){
      this.character = Number(response);
    }
  }

  search() {
    console.log('character-->' + this.character);
    this.loadStoryData();
  }

  clear() {
    this.character = null;
    this.characterForm.reset('');
    this.loadStoryData();
  }
}
