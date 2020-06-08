import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import * as AppConst from './app.const';
import UrlBuilder from 'rest-api-url-builder';
import * as Util from './util';
let StoryService = class StoryService {
    constructor(http) {
        this.http = http;
        this.routes = { search: AppConst.API_STORIES_URL, searchById: AppConst.API_STORIES_BY_ID_URL };
    }
    getStories(limit, page, size) {
        limit = Util.computeLimit(limit);
        const urlBuilder = new UrlBuilder(this.routes);
        const searchURL = urlBuilder.build('search')
            .setQueryParameter('limit', Util.toString(limit))
            .setQueryParameter('offset', Util.offsetNumber(limit, page))
            .setQueryParameter('ts', Util.getTimeStamp())
            .setQueryParameter('apikey', Util.getPublicKey())
            .setQueryParameter('hash', Util.getHash())
            .get();
        return this.http.get(searchURL);
    }
    getStoriesById(id) {
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
StoryService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], StoryService);
export { StoryService };
//# sourceMappingURL=story.service.js.map