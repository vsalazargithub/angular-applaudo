import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as AppConst from '../app.const';
let CharacterComicsComponent = class CharacterComicsComponent {
    constructor(route, characterService, characterComicsService, location) {
        this.route = route;
        this.characterService = characterService;
        this.characterComicsService = characterComicsService;
        this.location = location;
    }
    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.itemsPerPage = AppConst.DEFAULT_PAGE_SIZE;
        this.maxSize = 10;
        this.page = 1;
        this.loadData();
    }
    loadPage(page) {
        if (page !== this.previousPage) {
            this.previousPage = page;
            this.loadData();
        }
    }
    loadData() {
        this.characterComicsService.getCharacterComics(this.itemsPerPage, this.page - 1, this.id).subscribe(response => {
            this.characterComicsResponseResults = response.data.results;
            this.totalItems = response.data.total;
            this.itemsPerPage = response.data.count;
            this.maxSize = 10;
        }, e => console.log(e));
        this.characterService.getCharacterById(this.id).subscribe(response => {
            this.characterResponseResult = response.data.results.pop();
            this.characterName = this.characterResponseResult.name;
        }, e => console.log(e));
    }
    goBack() {
        this.location.back();
    }
};
CharacterComicsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-character-comics',
        templateUrl: './character-comics.component.html',
        styleUrls: ['./character-comics.component.css']
    })
], CharacterComicsComponent);
export { CharacterComicsComponent };
//# sourceMappingURL=character-comics.component.js.map