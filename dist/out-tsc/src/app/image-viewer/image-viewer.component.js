import * as tslib_1 from "tslib";
import { Component, Input, ViewEncapsulation } from '@angular/core';
let ImageViewerComponent = class ImageViewerComponent {
    constructor() {
        this.images = [];
    }
    ngOnInit() {
        console.log('ImageViewerComponent');
        if (this.images && this.images && this.images.length > 0) {
            this.images.forEach((element) => {
                console.log('image-->' + element.getPath());
            });
        }
    }
};
tslib_1.__decorate([
    Input()
], ImageViewerComponent.prototype, "modal", void 0);
tslib_1.__decorate([
    Input()
], ImageViewerComponent.prototype, "images", void 0);
ImageViewerComponent = tslib_1.__decorate([
    Component({
        selector: 'app-image-viewer',
        templateUrl: './image-viewer.component.html',
        styleUrls: ['./image-viewer.component.css'],
        encapsulation: ViewEncapsulation.None
    })
], ImageViewerComponent);
export { ImageViewerComponent };
//# sourceMappingURL=image-viewer.component.js.map