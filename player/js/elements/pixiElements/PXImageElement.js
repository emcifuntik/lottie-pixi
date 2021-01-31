/* global extendPrototype, BaseElement, TransformElement, CVBaseElement,HierarchyElement, FrameElement,
RenderableElement, SVGShapeElement, IImageElement, createTag */

function PXImageElement(data, globalData, comp) {
  this.assetData = globalData.getAssetData(data.refId);
  this.img = new PIXI.Sprite(globalData.imageLoader.getImage(this.assetData))
  this.initElement(data, globalData, comp);
}
extendPrototype([BaseElement, TransformElement, PXBaseElement, HierarchyElement, FrameElement, RenderableElement], PXImageElement);

PXImageElement.prototype.initElement = SVGShapeElement.prototype.initElement;
PXImageElement.prototype.prepareFrame = IImageElement.prototype.prepareFrame;

PXImageElement.prototype.createContent = function () {
};

PXImageElement.prototype.renderInnerContent = function () {
  const matProps = this.finalTransform.mat.props
  const matrix = new PIXI.Matrix(matProps[0], matProps[1], matProps[4], matProps[5], matProps[12], matProps[13]);
  this.img.transform.setFromMatrix(matrix);
};

PXImageElement.prototype.showInnerContent = function(){
  this.globalData.pixiApp.stage.addChild(this.img)
}

PXImageElement.prototype.hideInnerContent = function(){
  this.globalData.pixiApp.stage.addChild(this.img)
}

PXImageElement.prototype.destroy = function () {
  this.img = null;
};
