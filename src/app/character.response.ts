import {AutocompleteResponse} from './autocomplete.response';

export interface CharacterResponse {
      code: number;
      status: string;
      data: CharacterResponseData;
      results: AutocompleteResponse[];
}
export interface CharacterResponseData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: CharacterResponseResult[];

}
export interface CharacterResponseResult{
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: CharacterResponseThumbnail;
}

export interface CharacterResponseThumbnail {
  path: string;
  extension: string;
}
