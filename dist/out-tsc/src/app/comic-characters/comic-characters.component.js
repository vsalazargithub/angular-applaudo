import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import * as AppConst from '../app.const';
let ComicCharactersComponent = class ComicCharactersComponent {
    constructor(route, comicService, comicCharactersService, location) {
        this.route = route;
        this.comicService = comicService;
        this.comicCharactersService = comicCharactersService;
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
        this.comicCharactersService.getComicsCharacters(this.itemsPerPage, this.page - 1, this.id).subscribe(response => {
            this.comicCharactersResponseResults = response.data.results;
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
ComicCharactersComponent = tslib_1.__decorate([
    Component({
        selector: 'app-comic-characters',
        templateUrl: './comic-characters.component.html',
        styleUrls: ['./comic-characters.component.css']
    })
], ComicCharactersComponent);
export { ComicCharactersComponent };
//# sourceMappingURL=comic-characters.component.js.map