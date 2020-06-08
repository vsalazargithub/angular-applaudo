export interface StoryComicsResponse {
      code: number;
      status: string;
      data: StoryComicsResponseData;
}
export interface StoryComicsResponseData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: StoryComicsResponseResult[];

}
export interface StoryComicsResponseResult{
  id: number;
  title: string;
  description: string;
}

