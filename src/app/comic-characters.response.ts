export interface ComicCharactersResponse {
      code: number;
      status: string;
      data: ComicCharactersResponseData;
}
export interface ComicCharactersResponseData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ComicCharactersResponseResult[];

}
export interface ComicCharactersResponseResult{
  id: number;
  name: string;
  description: string;
}

