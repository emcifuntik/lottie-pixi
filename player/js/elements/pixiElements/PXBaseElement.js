/* global */

function PXBaseElement() {
}

PXBaseElement.prototype = {
  createElements: function () {},
  initRendererElement: function () {},
  createContainerElements: function () {},
  createContent: function () {},
  setBlendMode: function () {},
  createRenderableComponents: function () {
    this.maskManager = new PXMaskElement(this.data, this);
  },
  hideElement: function () {
    if (!this.hidden && (!this.isInRange || this.isTransparent)) {
      this.hidden = true;
      this.hideInnerContent();
    }
  },
  showElement: function () {
    if (this.isInRange && !this.isTransparent) {
      this.hidden = false;
      this._isFirstFrame = true;
      this.maskManager._isFirstFrame = true;
      this.showInnerContent();
    }
  },
  renderFrame: function () {
    if (this.hidden || this.data.hd) {
      return;
    }
    this.renderTransform();
    this.renderRenderable();
    this.setBlendMode();
    this.renderInnerContent();
  },
  destroy: function () {},
  mHelper: new Matrix(),
};
PXBaseElement.prototype.hide = PXBaseElement.prototype.hideElement;
PXBaseElement.prototype.show = PXBaseElement.prototype.showElement;
