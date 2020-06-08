export interface CharacterComicsResponse {
      code: number;
      status: string;
      data: CharacterComicsResponseData;
}
export interface CharacterComicsResponseData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: CharacterComicsResponseResult[];

}
export interface CharacterComicsResponseResult{
  id: number;
  title: string;
  description: string;
}

