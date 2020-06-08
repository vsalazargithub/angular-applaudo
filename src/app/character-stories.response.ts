export interface CharacterStoriesResponse {
      code: number;
      status: string;
      data: CharacterStoriesDataResponse;
}
export interface CharacterStoriesDataResponse {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: CharacterStoriesResponseResult[];

}
export interface CharacterStoriesResponseResult{
  id: number;
  title: string;
  description: string;
}

