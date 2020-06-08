import {AutocompleteResponse} from './autocomplete.response';

export interface ComicResponse {
      code: number;
      status: string;
      data: ComicResponseData;
      results: AutocompleteResponse[];
}
export interface ComicResponseData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ComicResponseResult[];

}
export interface ComicResponseResult {
  id: number;
  title: string;
  format: string;
  issueNumber: number;
  modified: string;
  isbn: string;
  description: string;
  upc: string;
  diamondCode: string;
  images: ComicImagesResponseResult[];
  thumbnail: ComicImagesResponseResult;
}
export interface ComicImagesResponseResult {
  path: string;
  extension: string;
}
