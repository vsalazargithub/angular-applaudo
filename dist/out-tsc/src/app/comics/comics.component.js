import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as AppConst from '../app.const';
import { ImageContainter } from '../image-containter';
let ComicsComponent = class ComicsComponent {
    constructor(comicService, modalService) {
        this.comicService = comicService;
        this.modalService = modalService;
        this.images = [];
    }
    ngOnInit() {
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
        this.comicService.getComics(this.itemsPerPage, this.page - 1, this.title, this.format, this.issueNumber).subscribe(response => {
            this.comicsResponseResults = response.data.results;
            this.totalItems = response.data.total;
            this.itemsPerPage = response.data.count;
            this.maxSize = AppConst.DEFAULT_PAGE_SIZE;
        }, e => console.log(e));
    }
    search() {
        this.loadData();
    }
    clear() {
        this.title = null;
        this.format = null;
        this.issueNumber = null;
        this.loadData();
    }
    viewImages(result, content) {
        this.images = [];
        this.comicService.getComicById(result.id.toString()).subscribe(response => {
            const resulti = response.data.results.pop();
            if (resulti && resulti.images && resulti.images.length > 0) {
                resulti.images.forEach((element) => {
                    console.log(element.path + '.' + element.extension);
                    this.images.push(new ImageContainter(element.path + '.' + element.extension));
                });
            }
            this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: 'modal-xl' });
        }, e => console.log(e));
    }
    viewThumbnail(result, thumbnail) {
        this.images = [];
        this.comicService.getComicById(result.id.toString()).subscribe(response => {
            const resulti = response.data.results.pop();
            if (resulti && resulti.thumbnail) {
                this.images.push(new ImageContainter(resulti.thumbnail.path + '.' + resulti.thumbnail.extension));
            }
            this.modalService.open(thumbnail, { ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: 'modal-xl' });
        }, e => console.log(e));
    }
};
ComicsComponent = tslib_1.__decorate([
    Component({
        selector: 'app-comics',
        templateUrl: './comics.component.html',
        styleUrls: ['./comics.component.css']
    })
], ComicsComponent);
export { ComicsComponent };
//# sourceMappingURL=comics.component.js.map