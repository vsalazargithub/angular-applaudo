import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as AppConst from './app.const';
import * as Util from './util';
import UrlBuilder from 'rest-api-url-builder';
let StoryCharactersService = class StoryCharactersService {
    constructor(http) {
        this.http = http;
        this.routes = { search: AppConst.API_STORIES_CHARACTERS_URL };
    }
    getStoriesCharacters(limit, page, id) {
        limit = Util.computeLimit(limit);
        const urlBuilder = new UrlBuilder(this.routes);
        const builder = urlBuilder.build('search')
            .setQueryParameter('limit', Util.toString(limit))
            .setQueryParameter('offset', Util.offsetNumber(limit, page))
            .setQueryParameter('ts', Util.getTimeStamp())
            .setQueryParameter('apikey', Util.getPublicKey())
            .setQueryParameter('hash', Util.getHash())
            .setQueryParameter('orderBy', 'name')
            .setNamedParameter('id', id);
        const searchUrl = builder.get();
        return this.http.get(searchUrl);
    }
};
StoryCharactersService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], StoryCharactersService);
export { StoryCharactersService };
//# sourceMappingURL=story-characters.service.js.map