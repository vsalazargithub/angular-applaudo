export interface ComicStoriesResponse {
      code: number;
      status: string;
      data: ComicStoriesResponseData;
}
export interface ComicStoriesResponseData {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: ComicStoriesResponseResult[];

}
export interface ComicStoriesResponseResult{
  id: number;
  title: string;
  description: string;
}

