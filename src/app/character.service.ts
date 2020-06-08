import { Injectable } from '@angular/core';
import { CharacterResponse } from './character.response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import * as Util from './util';
import * as AppConst from './app.const';
import UrlBuilder from 'rest-api-url-builder';
import {ComicResponse} from './comic.response';
import {tap} from 'rxjs/operators';
import {AutocompleteResponse} from './autocomplete.response';
@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  routes = {search: AppConst.API_CHARACTERS_URL, searchById: AppConst.API_CHARACTERS_BY_ID_URL};

  constructor(private http: HttpClient) { }

  getCharacters(limit: number, page: number, comic: number, story: number, name: string  ): Observable<CharacterResponse> {
    limit = Util.computeLimit(limit);
    const urlBuilder = new UrlBuilder(this.routes);
    let builder = urlBuilder.build('search')
      .setQueryParameter('limit', Util.toString(limit))
      .setQueryParameter('offset', Util.offsetNumber(limit, page))
      .setQueryParameter('ts', Util.getTimeStamp())
      .setQueryParameter('apikey', Util.getPublicKey())
      .setQueryParameter('hash', Util.getHash())
      .setQueryParameter('orderBy', 'name');
    if (Util.isNotNull(comic)){
      builder = builder.setQueryParameter('comics', Util.toString(comic));
    }
    if (Util.isNotNull(story)){
      builder =  builder.setQueryParameter('stories', Util.toString(story));
    }
    if (Util.isNonEmptyString(name)){
      builder =  builder.setQueryParameter('nameStartsWith', encodeURIComponent(name));
    }
    const searchUrl = builder.get();
    return this.http.get<CharacterResponse>(searchUrl);
  }

  getCharactersTitleStartsWith(name: string): Observable<CharacterResponse> {
    const urlBuilder = new UrlBuilder(this.routes);
    let builder = urlBuilder.build('search')
      .setQueryParameter('limit', Util.toString(AppConst.DEFAULT_AUTO_COMPLETE_SIZE))
      .setQueryParameter('ts', Util.getTimeStamp())
      .setQueryParameter('apikey', Util.getPublicKey())
      .setQueryParameter('hash', Util.getHash());
    if (Util.isNonEmptyString(name)){
      builder =  builder.setQueryParameter('nameStartsWith', encodeURIComponent(name));
    }
    const searchUrl = builder.get();
    return this.http.get<CharacterResponse>(searchUrl).pipe(
      tap((response: CharacterResponse) => {
        response.results = response.data.results.map(user => new AutocompleteResponse(user.id, user.name));
        return response;
      })
    );
  }

  getCharacterById(id: string): Observable<CharacterResponse> {
    const urlBuilder = new UrlBuilder(this.routes);
    const builder = urlBuilder.build('searchById')
       .setQueryParameter('ts', Util.getTimeStamp())
      .setQueryParameter('apikey', Util.getPublicKey())
      .setQueryParameter('hash', Util.getHash())
      .setNamedParameter('id', id);
    const searchUrl = builder.get();
    return this.http.get<CharacterResponse>(searchUrl);
  }

}
