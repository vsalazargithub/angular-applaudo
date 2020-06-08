import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as AppConst from '../app.const';
let StoryComicsComponent = class StoryComicsComponent {
    constructor(route, storyService, storyComicsService, location) {
        this.route = route;
        this.storyService = storyService;
        this.storyComicsService = storyComicsService;
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
        this.storyComicsService.getStoriesComics(this.itemsPerPage, this.page - 1, this.id).subscribe(response => {
            this.storyComicsResponseResults = response.data.results;
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
StoryComicsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-story-comics',
        templateUrl: './story-comics.component.html',
        styleUrls: ['./story-comics.component.css']
    })
], StoryComicsComponent);
export { StoryComicsComponent };
//# sourceMappingURL=story-comics.component.js.map