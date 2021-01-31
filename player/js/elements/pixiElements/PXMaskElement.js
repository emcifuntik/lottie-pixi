/* global */

function PXMaskElement(data, element) {
  this.data = data;
  this.element = element;
}

PXMaskElement.prototype.renderFrame = function () {
  if (!this.hasMasks) {
    return;
  }
};

PXMaskElement.prototype.getMaskProperty = MaskElement.prototype.getMaskProperty;

PXMaskElement.prototype.destroy = function () {
};
