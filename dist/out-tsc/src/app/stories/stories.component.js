import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as AppConst from '../app.const';
let StoriesComponent = class StoriesComponent {
    constructor(storyService) {
        this.storyService = storyService;
        this.messageEvent = new EventEmitter();
    }
    ngOnInit() {
        this.itemsStoryPerPage = AppConst.DEFAULT_STORY_PAGE_SIZE;
        this.maxStorySize = 5;
        this.storyPage = 1;
        this.loadStoryData();
    }
    loadStoryPage(page) {
        if (page !== this.previousStoryPage) {
            this.previousStoryPage = page;
            this.loadStoryData();
        }
    }
    loadStoryData() {
        this.storyService.getStories(this.itemsStoryPerPage, this.storyPage - 1, this.maxStorySize).subscribe(response => {
            this.storyResponseResults = response.data.results;
            this.totalStoryItems = response.data.total;
            this.itemsStoryPerPage = response.data.count;
            this.maxStorySize = 5;
        }, e => console.log(e));
    }
    onSelectStory(result) {
        this.messageEvent.emit(result);
        this.modal.close('Close click');
    }
};
tslib_1.__decorate([
    Input()
], StoriesComponent.prototype, "modal", void 0);
tslib_1.__decorate([
    Output()
], StoriesComponent.prototype, "messageEvent", void 0);
StoriesComponent = tslib_1.__decorate([
    Component({
        selector: 'app-stories',
        templateUrl: './stories.component.html',
        styleUrls: ['./stories.component.css']
    })
], StoriesComponent);
export { StoriesComponent };
//# sourceMappingURL=stories.component.js.map