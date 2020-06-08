import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as AppConst from '../app.const';
import { ImageContainter } from '../image-containter';
let StoryComponent = class StoryComponent {
    constructor(storyService, modalService) {
        this.storyService = storyService;
        this.modalService = modalService;
        this.images = [];
    }
    ngOnInit() {
        this.itemsStoryPerPage = AppConst.DEFAULT_PAGE_SIZE;
        this.maxStorySize = AppConst.DEFAULT_PAGE_SIZE;
        this.storyPage = 1;
        this.loadData();
    }
    loadPage(page) {
        if (page !== this.previousStoryPage) {
            this.previousStoryPage = page;
            this.loadData();
        }
    }
    loadData() {
        this.storyService.getStories(this.itemsStoryPerPage, this.storyPage - 1, this.maxStorySize).subscribe(response => {
            this.storyResponseResults = response.data.results;
            this.totalStoryItems = response.data.total;
            this.itemsStoryPerPage = response.data.count;
            this.maxStorySize = AppConst.DEFAULT_PAGE_SIZE;
        }, e => console.log(e));
    }
    viewThumbnail(result, thumbnail) {
        this.images = [];
        this.storyService.getStoriesById(result.id.toString()).subscribe(response => {
            const resulti = response.data.results.pop();
            if (resulti && resulti.thumbnail) {
                this.images.push(new ImageContainter(resulti.thumbnail.path + '.' + resulti.thumbnail.extension));
            }
            this.modalService.open(thumbnail, { ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: 'modal-xl' });
        }, e => console.log(e));
    }
};
StoryComponent = tslib_1.__decorate([
    Component({
        selector: 'app-story',
        templateUrl: './story.component.html',
        styleUrls: ['./story.component.css']
    })
], StoryComponent);
export { StoryComponent };
//# sourceMappingURL=story.component.js.map