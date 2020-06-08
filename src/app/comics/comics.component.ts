import { Component, OnInit } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {AutocompleteResponse} from '../autocomplete.response';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CharacterService} from '../character.service';
import {ComicService} from '../comic.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as AppConst from '../app.const';
import {debounceTime, finalize, switchMap, tap} from 'rxjs/operators';
import * as Util from '../util';
import {CharacterComicsResponseResult} from '../character-comics.response';
import {ComicImagesResponseResult, ComicResponseResult} from '../comic.response';
import {ImageContainter} from '../image-containter';
@Component({
  selector: 'app-comics',
  templateUrl: './comics.component.html',
  styleUrls: ['./comics.component.css']
})
export class ComicsComponent implements OnInit {
  comicsResponseResults: ComicResponseResult[];
  itemsPerPage;
  totalItems: any;
  page: any;
  previousPage: any;
  maxSize;
  title: string;
  format: string;
  issueNumber: number;
  images: ImageContainter[] = [];

  constructor(private comicService: ComicService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.itemsPerPage = AppConst.DEFAULT_PAGE_SIZE;
    this.maxSize = AppConst.DEFAULT_PAGE_SIZE;
    this.page = 1;
    this.loadData();
  }

 loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.loadData();
    }
  }

  loadData() {
    this.comicService.getComics(this.itemsPerPage, this.page - 1, this.title, this.format, this.issueNumber).subscribe(
      response => {
        this.comicsResponseResults = response.data.results;
        this.totalItems = response.data.total;
        this.itemsPerPage = response.data.count;
        this.maxSize = AppConst.DEFAULT_PAGE_SIZE;
      },
      e => console.log(e)
    );
  }

  search() {
    this.loadData();
  }

  clear() {
    this.title = null;
    this.format = null;
    this.issueNumber = null;
    this.loadData();
  }

  viewImages(result: ComicResponseResult, content){
    this.images = [];
    this.comicService.getComicById(result.id.toString()).subscribe(
      response => {
        const resulti = response.data.results.pop();
        if (resulti && resulti.images && resulti.images.length > 0){
          resulti.images.forEach( (element) => {
            console.log(element.path + '.' + element.extension);
            this.images.push(new ImageContainter(element.path + '.' + element.extension));
          });
         }
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: 'modal-xl'});
      },
      e => console.log(e)
    );
  }

  viewThumbnail(result: ComicResponseResult, thumbnail) {
    this.images = [];
    this.comicService.getComicById(result.id.toString()).subscribe(
      response => {
        const resulti = response.data.results.pop();
        if (resulti && resulti.thumbnail){
          this.images.push(new ImageContainter(resulti.thumbnail.path + '.' + resulti.thumbnail.extension));
        }
        this.modalService.open(thumbnail, {ariaLabelledBy: 'modal-basic-title', size: 'lg', windowClass: 'modal-xl'});
      },
      e => console.log(e)
    );
  }
}
