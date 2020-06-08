import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as Util from './util';
import * as AppConst from './app.const';
import UrlBuilder from 'rest-api-url-builder';
let CharacterComicsService = class CharacterComicsService {
    constructor(http) {
        this.http = http;
        this.routes = { search: AppConst.API_CHARACTER_COMICS_URL };
    }
    getCharacterComics(limit, page, id) {
        limit = Util.computeLimit(limit);
        const urlBuilder = new UrlBuilder(this.routes);
        const builder = urlBuilder.build('search')
            .setQueryParameter('limit', Util.toString(limit))
            .setQueryParameter('offset', Util.offsetNumber(limit, page))
            .setQueryParameter('ts', Util.getTimeStamp())
            .setQueryParameter('apikey', Util.getPublicKey())
            .setQueryParameter('hash', Util.getHash())
            .setQueryParameter('orderBy', 'title')
            .setNamedParameter('id', id);
        const searchUrl = builder.get();
        return this.http.get(searchUrl);
    }
};
CharacterComicsService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CharacterComicsService);
export { CharacterComicsService };
//# sourceMappingURL=character-comics.service.js.map