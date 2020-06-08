import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AutocompleteResponse } from './autocomplete.response';
import { tap } from 'rxjs/operators';
import * as Util from './util';
import * as AppConst from './app.const';
import UrlBuilder from 'rest-api-url-builder';
let ComicService = class ComicService {
    constructor(http) {
        this.http = http;
        this.routes = { search: AppConst.API_COMICS_URL, searchById: AppConst.API_COMICS_BY_ID_URL };
    }
    getComics(limit, page, title, format, issueNumber) {
        limit = Util.computeLimit(limit);
        const urlBuilder = new UrlBuilder(this.routes);
        let builder = urlBuilder.build('search')
            .setQueryParameter('limit', Util.toString(limit))
            .setQueryParameter('offset', Util.offsetNumber(limit, page))
            .setQueryParameter('ts', Util.getTimeStamp())
            .setQueryParameter('apikey', Util.getPublicKey())
            .setQueryParameter('hash', Util.getHash())
            .setQueryParameter('orderBy', 'issueNumber');
        if (Util.isNonEmptyString(format)) {
            builder = builder.setQueryParameter('format', format);
        }
        if (Util.isNonEmptyString(title)) {
            builder = builder.setQueryParameter('titleStartsWith', encodeURIComponent(title));
        }
        if (Util.isNotNull(issueNumber)) {
            builder = builder.setQueryParameter('issueNumber', Util.toString(issueNumber));
        }
        const searchUrl = builder.get();
        console.log('getComics');
        console.log(searchUrl);
        console.log('apikey');
        console.log(Util.getPublicKey());
        return this.http.get(searchUrl);
    }
    getComicsTitleStartsWith(title) {
        const urlBuilder = new UrlBuilder(this.routes);
        let builder = urlBuilder.build('search')
            .setQueryParameter('limit', Util.toString(AppConst.DEFAULT_AUTO_COMPLETE_SIZE))
            .setQueryParameter('ts', Util.getTimeStamp())
            .setQueryParameter('apikey', Util.getPublicKey())
            .setQueryParameter('hash', Util.getHash());
        if (Util.isNonEmptyString(name)) {
            builder = builder.setQueryParameter('titleStartsWith', encodeURIComponent(title));
        }
        const searchUrl = builder.get();
        return this.http.get(searchUrl).pipe(tap((response) => {
            response.results = response.data.results.map(user => new AutocompleteResponse(user.id, user.title));
            return response;
        }));
    }
    getComicById(id) {
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
ComicService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], ComicService);
export { ComicService };
//# sourceMappingURL=comic.service.js.map