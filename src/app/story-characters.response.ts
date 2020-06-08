export interface StoryCharactersResponse {
      code: number;
      status: string;
      data: StoryCharactersResponseData;
}
export interface StoryCharactersResponseData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: StoryCharactersResponseResult[];

}
export interface StoryCharactersResponseResult{
  id: number;
  name: string;
  description: string;
}

