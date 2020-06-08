import { Md5 } from 'md5-typescript';
import * as AppConst from './app.const';
export function getTimeStamp() {
    return '9';
}
export function getPublicKey() {
    return AppConst.PUBLIC_KEY;
}
export function getHash() {
    return Md5.init('9' + AppConst.PRIVATE_KEY + AppConst.PUBLIC_KEY);
}
export function pageNumber(total, limit, offset) {
    if (total != null && limit != null && offset != null) {
        return offset >= total ? -1 : Math.floor((offset / limit)) + 1;
    }
    else {
        return -1;
    }
}
export function offsetNumber(limit, page) {
    if (limit != null && page != null) {
        const offset = (page * limit);
        if (offset <= 0) {
            return 0;
        }
        else {
            return offset;
        }
    }
    else {
        return null;
    }
}
export function toString(val) {
    if (val != null) {
        return val.toString();
    }
    else {
        return null;
    }
}
export function isNonEmptyString(str) {
    return str && str.length > 0;
}
export function isEmptyString(str) {
    return str == null || str.toString().trim().length === 0;
}
export function isNotNull(value) {
    return value != null;
}
export function computeLimit(limit) {
    if (limit < AppConst.DEFAULT_PAGE_SIZE) {
        return limit = AppConst.DEFAULT_PAGE_SIZE;
    }
    else {
        return limit;
    }
}
//# sourceMappingURL=util.js.map