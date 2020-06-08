import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as AppConst from '../app.const';
let CharacterStoriesComponent = class CharacterStoriesComponent {
    constructor(route, characterService, characterStoriesService, location) {
        this.route = route;
        this.characterService = characterService;
        this.characterStoriesService = characterStoriesService;
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
        this.characterStoriesService.getCharacterStories(this.itemsPerPage, this.page - 1, this.id).subscribe(response => {
            this.characterStoriesResponseResults = response.data.results;
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
CharacterStoriesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-character-stories',
        templateUrl: './character-stories.component.html',
        styleUrls: ['./character-stories.component.css']
    })
], CharacterStoriesComponent);
export { CharacterStoriesComponent };
//# sourceMappingURL=character-stories.component.js.map