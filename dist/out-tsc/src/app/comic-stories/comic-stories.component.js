import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as AppConst from '../app.const';
let ComicStoriesComponent = class ComicStoriesComponent {
    constructor(route, comicService, comicStoriesService, location) {
        this.route = route;
        this.comicService = comicService;
        this.comicStoriesService = comicStoriesService;
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
        this.comicStoriesService.getComicsStories(this.itemsPerPage, this.page - 1, this.id).subscribe(response => {
            this.comicStoriesResponseResults = response.data.results;
            this.totalItems = response.data.total;
            this.itemsPerPage = response.data.count;
            this.maxSize = AppConst.DEFAULT_PAGE_SIZE;
        }, e => console.log(e));
        this.comicService.getComicById(this.id).subscribe(response => {
            this.comicResponseResult = response.data.results.pop();
            this.comicName = this.comicResponseResult.title;
        }, e => console.log(e));
    }
    goBack() {
        this.location.back();
    }
};
ComicStoriesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-comic-stories',
        templateUrl: './comic-stories.component.html',
        styleUrls: ['./comic-stories.component.css']
    })
], ComicStoriesComponent);
export { ComicStoriesComponent };
//# sourceMappingURL=comic-stories.component.js.map