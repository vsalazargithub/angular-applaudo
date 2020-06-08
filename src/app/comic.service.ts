import { Injectable } from '@angular/core';
import {ComicResponse, ComicResponseData} from './comic.response';
import { AutocompleteResponse } from './autocomplete.response';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import * as Util from './util';
import * as AppConst from './app.const';
import UrlBuilder from 'rest-api-url-builder';
import {CharacterResponse} from './character.response';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  routes = {search: AppConst.API_COMICS_URL, searchById: AppConst.API_COMICS_BY_ID_URL};

  constructor(private http: HttpClient) { }

  getComics(limit: number, page: number, title: string, format: string, issueNumber: number): Observable<ComicResponse> {
    limit = Util.computeLimit(limit);
    const urlBuilder = new UrlBuilder(this.routes);
    let builder = urlBuilder.build('search')
      .setQueryParameter('limit', Util.toString(limit))
      .setQueryParameter('offset', Util.offsetNumber(limit, page))
      .setQueryParameter('ts', Util.getTimeStamp())
      .setQueryParameter('apikey', Util.getPublicKey())
      .setQueryParameter('hash', Util.getHash())
      .setQueryParameter('orderBy', 'issueNumber');
    if (Util.isNonEmptyString(format)){
      builder = builder.setQueryParameter('format', format);
    }
    if (Util.isNonEmptyString(title)){
      builder =  builder.setQueryParameter('titleStartsWith', encodeURIComponent(title));
    }
    if (Util.isNotNull(issueNumber)){
      builder = builder.setQueryParameter('issueNumber', Util.toString(issueNumber));
    }
    const searchUrl = builder.get();
    console.log('getComics');
    console.log(searchUrl);
    console.log('apikey');
    console.log(Util.getPublicKey());
    return this.http.get<ComicResponse>(searchUrl);
  }

  getComicsTitleStartsWith(title: string): Observable<ComicResponse> {
    const urlBuilder = new UrlBuilder(this.routes);
    let builder = urlBuilder.build('search')
      .setQueryParameter('limit', Util.toString(AppConst.DEFAULT_AUTO_COMPLETE_SIZE))
      .setQueryParameter('ts', Util.getTimeStamp())
      .setQueryParameter('apikey', Util.getPublicKey())
      .setQueryParameter('hash', Util.getHash());
    if (Util.isNonEmptyString(title)){
      builder =  builder.setQueryParameter('titleStartsWith', encodeURIComponent(title));
    }
    const searchUrl = builder.get();
    return this.http.get<ComicResponse>(searchUrl).pipe(
      tap((response: ComicResponse) => {
        response.results = response.data.results.map(user => new AutocompleteResponse(user.id, user.title));
        return response;
      })
    );
  }

  getComicById(id: string  ): Observable<ComicResponse> {
    const urlBuilder = new UrlBuilder(this.routes);
    const builder = urlBuilder.build('searchById')
      .setQueryParameter('ts', Util.getTimeStamp())
      .setQueryParameter('apikey', Util.getPublicKey())
      .setQueryParameter('hash', Util.getHash())
      .setNamedParameter('id', id);
    const searchUrl = builder.get();
    return this.http.get<ComicResponse>(searchUrl);
  }


}
