import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CharacterComponent } from './character/character.component';
import {CharacterComicsComponent} from './character-comics/character-comics.component';
import {CharacterStoriesComponent} from './character-stories/character-stories.component';
import {ComicsComponent} from './comics/comics.component';
import {ComicCharactersComponent} from './comic-characters/comic-characters.component';
import {ComicStoriesComponent} from './comic-stories/comic-stories.component';
import {StoryComponent} from './story/story.component';
import {StoryCharactersComponent} from './story-characters/story-characters.component';
import {StoryComicsComponent} from './story-comics/story-comics.component';

const routes: Routes = [
  { path: 'character', component: CharacterComponent },
  { path: 'comics', component: ComicsComponent },
  { path: 'story', component: StoryComponent },
  { path: 'character-comic/:id', component: CharacterComicsComponent },
  { path: 'character-story/:id', component: CharacterStoriesComponent },
  { path: 'comic-character/:id', component: ComicCharactersComponent },
  { path: 'comic-story/:id', component: ComicStoriesComponent },
  { path: 'story-character/:id', component: StoryCharactersComponent },
  { path: 'story-comic/:id', component: StoryComicsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
