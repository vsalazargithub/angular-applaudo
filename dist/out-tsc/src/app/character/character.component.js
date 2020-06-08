import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, debounceTime, tap, finalize } from 'rxjs/operators';
import * as Util from '../util';
import * as AppConst from '../app.const';
import { ImageContainter } from '../image-containter';
let CharacterComponent = CharacterComponent_1 = class CharacterComponent {
    constructor(characterService, comicService, formBuilder, modalService) {
        this.characterService = characterService;
        this.comicService = comicService;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.images = [];
        this.filteredComics = [];
        this.isLoading = false;
    }
    static getSubject() {
        return CharacterComponent_1.subject.asObservable();
    }
    ngOnInit() {
        this.itemsPerPage = AppConst.DEFAULT_PAGE_SIZE;
        this.maxSize = AppConst.DEFAULT_PAGE_SIZE;
        this.page = 1;
        this.loadData();
        this.initAutoCompleteComics();
        this.initSubscriber();
    }
    initSubscriber() {
        CharacterComponent_1.getSubject().subscribe((response) => {
            this.onChangeComic(response);
        });
    }
    loadPage(page) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.loadData();
        }
    }
    loadData() {
        this.characterService.getCharacters(this.itemsPerPage, this.page - 1, this.comic, this.story, this.name).subscribe(response => {
            this.characterResponseResult = response.data.results;
            this.totalItems = response.data.total;
            this.itemsPerPage = response.data.count;
            this.maxSize = AppConst.DEFAULT_PAGE_SIZE;
        }, e => console.log(e));
    }
    initAutoCompleteComics() {
        this.comicForm = this.formBuilder.group({
            comicInput: null
        });
        this.comicForm
            .get('comicInput')
            .valueChanges
            .pipe(debounceTime(300), tap(() => this.isLoading = true), switchMap(value => this.comicService.getComicsTitleStartsWith(value)
            .pipe(finalize(() => this.isLoading = false))))
            .subscribe(response => this.filteredComics = response.results);
    }
    open(content) {
        this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: 'modal-xl' }).result.then((result) => {
        }, (reason) => {
        });
    }
    onDisplayComic(autocompleteResponse) {
        if (autocompleteResponse) {
            CharacterComponent_1.subject.next(Util.toString(autocompleteResponse.id));
            return autocompleteResponse.name;
        }
    }
    onChangeComic(response) {
        if (Util.isNonEmptyString(response)) {
            this.comic = Number(response);
        }
    }
    onChangeStory($event) {
        this.story = $event.id;
        this.storyTitle = $event.title;
    }
    onChangeName($event) {
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
    viewThumbnail(result, thumbnail) {
        this.images = [];
        this.characterService.getCharacterById(result.id.toString()).subscribe(response => {
            const resulti = response.data.results.pop();
            if (resulti && resulti.thumbnail) {
                this.images.push(new ImageContainter(resulti.thumbnail.path + '.' + resulti.thumbnail.extension));
            }
            this.modalService.open(thumbnail, { ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: 'modal-xl' });
        }, e => console.log(e));
    }
};
CharacterComponent.subject = new Subject();
CharacterComponent = CharacterComponent_1 = tslib_1.__decorate([
    Component({
        selector: 'app-character',
        templateUrl: './character.component.html',
        styleUrls: ['./character.component.css']
    })
], CharacterComponent);
export { CharacterComponent };
var CharacterComponent_1;
//# sourceMappingURL=character.component.js.map