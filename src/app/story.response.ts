import {AutocompleteResponse} from './autocomplete.response';

export interface StoryResponse {
      code: number;
      status: string;
      data: StoryResponseData;
      results: AutocompleteResponse[];
}
export interface StoryResponseData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: StoryResponseResult[];

}
export interface StoryResponseResult {
  id: number;
  title: string;
  description: string;
  type: string;
  modified: string;
  thumbnail: StoryResponseThumbnail;
}
export interface StoryResponseThumbnail {
  path: string;
  extension: string;
}


