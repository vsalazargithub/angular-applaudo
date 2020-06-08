import { Injectable } from '@angular/core';
import * as AppConst from './app.const';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ComicResponse} from './comic.response';
import UrlBuilder from 'rest-api-url-builder';
import * as Util from './util';
import {tap} from 'rxjs/operators';
import {AutocompleteResponse} from './autocomplete.response';
import {CharacterResponse} from './character.response';
import {StoryResponse} from './story.response';

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  routes = {search: AppConst.API_STORIES_URL, searchById: AppConst.API_STORIES_BY_ID_URL};

  constructor(private http: HttpClient) { }

  getStories(limit: number, page: number, size: number): Observable<StoryResponse> {
    limit = Util.computeLimit(limit);
    const urlBuilder = new UrlBuilder(this.routes);
    const searchURL = urlBuilder.build('search')
      .setQueryParameter('limit', Util.toString(limit))
      .setQueryParameter('offset', Util.offsetNumber(limit, page))
      .setQueryParameter('ts', Util.getTimeStamp())
      .setQueryParameter('apikey', Util.getPublicKey())
      .setQueryParameter('hash', Util.getHash())
      .get();
    return this.http.get<StoryResponse>(searchURL);
  }

  getStoriesByCharacters(limit: number, page: number, size: number, characters: number): Observable<StoryResponse> {
    limit = Util.computeLimitModal(limit);
    const urlBuilder = new UrlBuilder(this.routes);
    let builder = urlBuilder.build('search')
      .setQueryParameter('limit', Util.toString(limit))
      .setQueryParameter('offset', Util.offsetNumber(limit, page))
      .setQueryParameter('ts', Util.getTimeStamp())
      .setQueryParameter('apikey', Util.getPublicKey())
      .setQueryParameter('hash', Util.getHash());

    if (Util.isNotNull(characters)){
      builder =  builder.setQueryParameter('characters', Util.toString(characters));
    }
    const searchUrl = builder.get();
    return this.http.get<StoryResponse>(searchUrl);
  }

  getStoriesById(id: string): Observable<StoryResponse> {
    const urlBuilder = new UrlBuilder(this.routes);
    const builder = urlBuilder.build('searchById')
      .setQueryParameter('ts', Util.getTimeStamp())
      .setQueryParameter('apikey', Util.getPublicKey())
      .setQueryParameter('hash', Util.getHash())
      .setNamedParameter('id', id);
    const searchUrl = builder.get();
    return this.http.get<StoryResponse>(searchUrl);
  }

}
