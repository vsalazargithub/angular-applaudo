import * as tslib_1 from "tslib";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CharacterComponent } from './character/character.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoriesComponent } from './stories/stories.component';
import { CharacterComicsComponent } from './character-comics/character-comics.component';
import { CharacterStoriesComponent } from './character-stories/character-stories.component';
import { ComicsComponent } from './comics/comics.component';
import { MatSelectModule } from '@angular/material/select';
import { ComicCharactersComponent } from './comic-characters/comic-characters.component';
import { ComicStoriesComponent } from './comic-stories/comic-stories.component';
import { StoryComponent } from './story/story.component';
import { StoryCharactersComponent } from './story-characters/story-characters.component';
import { StoryComicsComponent } from './story-comics/story-comics.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
let AppModule = class AppModule {
};
AppModule = tslib_1.__decorate([
    NgModule({
        declarations: [
            AppComponent,
            CharacterComponent,
            StoriesComponent,
            CharacterComicsComponent,
            CharacterStoriesComponent,
            ComicsComponent,
            ComicCharactersComponent,
            ComicStoriesComponent,
            StoryComponent,
            StoryCharactersComponent,
            StoryComicsComponent,
            ImageViewerComponent
        ],
        imports: [
            BrowserModule,
            NgbModule,
            NgbPaginationModule,
            NgbAlertModule,
            HttpClientModule,
            AppRoutingModule,
            FormsModule,
            BrowserAnimationsModule,
            ReactiveFormsModule,
            MatFormFieldModule,
            MatInputModule,
            MatAutocompleteModule,
            MatProgressSpinnerModule,
            MatSelectModule
        ],
        providers: [],
        bootstrap: [AppComponent]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map