import { Component, OnInit } from '@angular/core';
import {Md5} from 'md5-typescript';
import * as AppConst from './app.const';
import { CharacterResponse } from './character.response';
import { CharacterService } from './character.service';
import * as Util from './util';
import {Router} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(private router: Router) { }
  title = 'Applaudo';

  ngOnInit() {
  }
}
