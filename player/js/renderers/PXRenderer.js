/* global  */

function PXRenderer(animationItem, config) {
  this.animationItem = animationItem;
  this.layers = null;

  this.renderConfig = {
    dpr: (config && config.dpr) || window.devicePixelRatio || 1,
    progressiveLoad: (config && config.progressiveLoad) || false,
  };

  this.renderedFrame = -1;
  this.globalData = {
    frameNum: -1,
    _mdf: false,
    renderConfig: this.renderConfig,
    currentGlobalAlpha: -1,
  };
  this.elements = [];
  this.pendingElements = [];
  this.transformMat = new Matrix();
  this.completeLayers = false;
  this.rendererType = 'pixi';
}

extendPrototype([BaseRenderer], PXRenderer);

PXRenderer.prototype.createNull = function (data) {
};

PXRenderer.prototype.createShape = function (data) {
};

PXRenderer.prototype.createText = function (data) {
};

PXRenderer.prototype.createImage = function (data) {
  return new PXImageElement(data, this.globalData, this);
};

PXRenderer.prototype.createComp = function (data) {
};

PXRenderer.prototype.createSolid = function (data) {
};

PXRenderer.prototype.configAnimation = function (animData) {
  this.data = animData;
  this.layers = animData.layers;

  this.pixiApp = new PIXI.Application({
    width: animData.w, 
    height: animData.h,
    transparent: true, // 背景透明
    resolution: this.renderConfig.dpr,
  });
  this.animationItem.wrapper.appendChild(this.pixiApp.view);

  this.setupGlobalData(animData, document.body);
  this.globalData.pixiApp = this.pixiApp;
  this.globalData.progressiveLoad = this.renderConfig.progressiveLoad;

  this.elements = createSizedArray(animData.layers.length);
};

PXRenderer.prototype.destroy = function () {
};

PXRenderer.prototype.updateContainerSize = function () {
};

PXRenderer.prototype.buildItem = function (pos) {
  var elements = this.elements;
  if (elements[pos] || this.layers[pos].ty === 99) {
    return;
  }
  var element = this.createItem(this.layers[pos], this, this.globalData);
  elements[pos] = element;
  element.initExpressions();
};

PXRenderer.prototype.checkPendingElements = function () {
};

PXRenderer.prototype.renderFrame = function (num) {
  if ((this.renderedFrame === num && this.renderConfig.clearCanvas === true && !forceRender) || this.destroyed || num === -1) {
    return;
  }
  this.renderedFrame = num;
  this.globalData.frameNum = num - this.animationItem._isFirstFrame;
  this.globalData.frameId += 1;
  this.globalData._mdf = !this.renderConfig.clearCanvas || forceRender;
  this.globalData.projectInterface.currentFrame = num;

  // console.log('--------');
  // console.log('NEW: ',num);
  var i;
  var len = this.layers.length;
  if (!this.completeLayers) {
    this.checkLayers(num);
  }

  for (i = 0; i < len; i += 1) {
    if (this.completeLayers || this.elements[i]) {
      this.elements[i].prepareFrame(num - this.layers[i].st);
    }
  }
  if (this.globalData._mdf) {
    for (i = len - 1; i >= 0; i -= 1) {
      if (this.completeLayers || this.elements[i]) {
        this.elements[i].renderFrame();
      }
    }
  }
};

PXRenderer.prototype.appendElementInPos = function (element, pos) {
};

PXRenderer.prototype.hide = function () {
};

PXRenderer.prototype.show = function () {
};
