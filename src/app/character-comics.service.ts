import { Injectable } from '@angular/core';
import { CharacterStoriesResponse } from './character-stories.response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as Util from './util';
import * as AppConst from './app.const';
import UrlBuilder from 'rest-api-url-builder';
import {CharacterResponse} from './character.response';
@Injectable({
  providedIn: 'root'
})
export class CharacterComicsService {

  routes = {search: AppConst.API_CHARACTER_COMICS_URL};

  constructor(private http: HttpClient) { }

  getCharacterComics(limit: number, page: number, id: string): Observable<CharacterStoriesResponse> {
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
    return this.http.get<CharacterStoriesResponse>(searchUrl);
  }

}
