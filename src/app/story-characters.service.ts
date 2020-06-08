import { Injectable } from '@angular/core';
import * as AppConst from './app.const';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ComicCharactersResponse} from './comic-characters.response';
import * as Util from './util';
import UrlBuilder from 'rest-api-url-builder';

@Injectable({
  providedIn: 'root'
})
export class StoryCharactersService {

  routes = {search: AppConst.API_STORIES_CHARACTERS_URL};

  constructor(private http: HttpClient) {
  }

  getStoriesCharacters(limit: number, page: number, id: string): Observable<ComicCharactersResponse> {
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
    return this.http.get<ComicCharactersResponse>(searchUrl);
  }
}
