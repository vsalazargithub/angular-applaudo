import {Md5} from 'md5-typescript';
import * as AppConst from './app.const';

export function getTimeStamp(): string {
  return '9';
}

export function getPublicKey(): string {
  return AppConst.PUBLIC_KEY;
}

export function getHash(): string {
  return Md5.init('9' + AppConst.PRIVATE_KEY + AppConst.PUBLIC_KEY);
}

export function pageNumber(total: number, limit: number, offset: number){
  if (total != null && limit != null && offset != null){
    return offset >= total ? -1 : Math.floor((offset / limit)) + 1;
  }else{
    return -1;
  }
}

export function offsetNumber(limit: number, page: number){
  if (limit != null && page != null){
    const offset =  (page * limit );
    if (offset <= 0){
      return 0;
    }else{
      return offset;
    }
  }else{
    return null;
  }
}

export function toString(val: number){
  if (val != null) {
    return val.toString();
  } else {
    return null;
  }
}

type nonEmptyString = never;
export function isNonEmptyString(str: string): str is nonEmptyString {
  return str && str.length > 0;
}
export function isEmptyString(str: string): str is nonEmptyString {
  return str == null || str.toString().trim().length === 0;
}

export function isNotNull(value){
  return value != null;
}

export function computeLimit(limit){
  if (limit < AppConst.DEFAULT_PAGE_SIZE){
     return limit = AppConst.DEFAULT_PAGE_SIZE;
  }else{
     return limit;
  }
}

export function computeLimitModal(limit){
  if (limit < AppConst.DEFAULT_STORY_PAGE_SIZE){
    return limit = AppConst.DEFAULT_STORY_PAGE_SIZE;
  }else{
    return limit;
  }
}


