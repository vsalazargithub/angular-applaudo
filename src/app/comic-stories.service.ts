import { Injectable } from '@angular/core';
import * as AppConst from './app.const';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as Util from './util';
import UrlBuilder from 'rest-api-url-builder';
import {ComicStoriesResponse} from './comic-stories.response';

@Injectable({
  providedIn: 'root'
})
export class ComicStoriesService {
  routes = {search: AppConst.API_COMICS_STORIES_URL};

  constructor(private http: HttpClient) { }

  getComicsStories(limit: number, page: number, id: string): Observable<ComicStoriesResponse> {
    limit = Util.computeLimit(limit);
    const urlBuilder = new UrlBuilder(this.routes);
    const builder = urlBuilder.build('search')
      .setQueryParameter('limit', Util.toString(limit))
      .setQueryParameter('offset', Util.offsetNumber(limit, page))
      .setQueryParameter('ts', Util.getTimeStamp())
      .setQueryParameter('apikey', Util.getPublicKey())
      .setQueryParameter('hash', Util.getHash())
      .setQueryParameter('orderBy', 'id')
      .setNamedParameter('id', id);
    const searchUrl = builder.get();
    return this.http.get<ComicStoriesResponse>(searchUrl);
  }

}
