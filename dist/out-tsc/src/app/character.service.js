import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as Util from './util';
import * as AppConst from './app.const';
import UrlBuilder from 'rest-api-url-builder';
let CharacterService = class CharacterService {
    constructor(http) {
        this.http = http;
        this.routes = { search: AppConst.API_CHARACTERS_URL, searchById: AppConst.API_CHARACTERS_BY_ID_URL };
    }
    getCharacters(limit, page, comic, story, name) {
        limit = Util.computeLimit(limit);
        const urlBuilder = new UrlBuilder(this.routes);
        let builder = urlBuilder.build('search')
            .setQueryParameter('limit', Util.toString(limit))
            .setQueryParameter('offset', Util.offsetNumber(limit, page))
            .setQueryParameter('ts', Util.getTimeStamp())
            .setQueryParameter('apikey', Util.getPublicKey())
            .setQueryParameter('hash', Util.getHash())
            .setQueryParameter('orderBy', 'name');
        if (Util.isNotNull(comic)) {
            builder = builder.setQueryParameter('comics', Util.toString(comic));
        }
        if (Util.isNotNull(story)) {
            builder = builder.setQueryParameter('stories', Util.toString(story));
        }
        if (Util.isNonEmptyString(name)) {
            builder = builder.setQueryParameter('nameStartsWith', encodeURIComponent(name));
        }
        const searchUrl = builder.get();
        return this.http.get(searchUrl);
    }
    getCharacterById(id) {
        const urlBuilder = new UrlBuilder(this.routes);
        const builder = urlBuilder.build('searchById')
            .setQueryParameter('ts', Util.getTimeStamp())
            .setQueryParameter('apikey', Util.getPublicKey())
            .setQueryParameter('hash', Util.getHash())
            .setNamedParameter('id', id);
        const searchUrl = builder.get();
        return this.http.get(searchUrl);
    }
};
CharacterService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], CharacterService);
export { CharacterService };
//# sourceMappingURL=character.service.js.map