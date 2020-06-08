import { Injectable } from '@angular/core';
import * as AppConst from './app.const';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {StoryCharactersResponse} from './story-characters.response';
import * as Util from './util';
import UrlBuilder from 'rest-api-url-builder';
import {StoryComicsResponse} from './story-comics.response';

@Injectable({
  providedIn: 'root'
})
export class StoryComicsService {
  routes = {search: AppConst.API_STORIES_COMICS_URL};

  constructor(private http: HttpClient) { }

  getStoriesComics(limit: number, page: number, id: string): Observable<StoryComicsResponse> {
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
    return this.http.get<StoryComicsResponse>(searchUrl);
  }
}
