import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as AppConst from '../app.const';
let StoryCharactersComponent = class StoryCharactersComponent {
    constructor(route, storyService, storyCharactersService, location) {
        this.route = route;
        this.storyService = storyService;
        this.storyCharactersService = storyCharactersService;
        this.location = location;
    }
    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.itemsPerPage = AppConst.DEFAULT_PAGE_SIZE;
        this.maxSize = AppConst.DEFAULT_PAGE_SIZE;
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
        this.storyCharactersService.getStoriesCharacters(this.itemsPerPage, this.page - 1, this.id).subscribe(response => {
            this.storyCharactersResponseResults = response.data.results;
            this.totalItems = response.data.total;
            this.itemsPerPage = response.data.count;
            this.maxSize = AppConst.DEFAULT_PAGE_SIZE;
        }, e => console.log(e));
        this.storyService.getStoriesById(this.id).subscribe(response => {
            this.storyResponseResult = response.data.results.pop();
            this.storyName = this.storyResponseResult.title;
        }, e => console.log(e));
    }
    goBack() {
        this.location.back();
    }
};
StoryCharactersComponent = tslib_1.__decorate([
    Component({
        selector: 'app-story-characters',
        templateUrl: './story-characters.component.html',
        styleUrls: ['./story-characters.component.css']
    })
], StoryCharactersComponent);
export { StoryCharactersComponent };
//# sourceMappingURL=story-characters.component.js.map