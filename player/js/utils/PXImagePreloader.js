/* global createTag, createNS, isSafari */
/* exported ImagePreloader */

var PXImagePreloader = (function () {

  function imageLoaded() {
    if (this.loadedAssets === this.totalImages) {
      if (this.imagesLoadedCb) {
        this.imagesLoadedCb(null);
      }
    }
  }

  function getAssetsPath(assetData, assetsPath, originalPath) {
    var path = '';
    if (assetData.e) {
      path = assetData.p;
    } else if (assetsPath) {
      var imagePath = assetData.p;
      if (imagePath.indexOf('images/') !== -1) {
        imagePath = imagePath.split('/')[1];
      }
      path = assetsPath + imagePath;
    } else {
      path = originalPath;
      path += assetData.u ? assetData.u : '';
      path += assetData.p;
    }
    return path;
  }

  function loadAssets(assets, cb) {
    var loader = new PIXI.Loader();
    this.imagesLoadedCb = cb;
    var i,
      len = assets.length;
    for (i = 0; i < len; i += 1) {
      if (!assets[i].layers) {
        this.totalImages += 1;
        var assetItem = assets[i];
        var path = getAssetsPath(assetItem, this.assetsPath, this.path);
        loader.add(assetItem.id, path);
      }
    }

    loader.load((loader, resources) => {
      for (i = 0; i < len; i += 1) {
        if (!assets[i].layers) {
          var assetItem = assets[i];
          this.images.push({
            img: resources[assetItem.id].texture,
            assetData: assetItem,
          });
          this.loadedAssets += 1;
        }
      }
    });

    loader.onComplete.add(imageLoaded.bind(this));
  }

  function setPath(path) {
    this.path = path || '';
  }

  function setAssetsPath(path) {
    this.assetsPath = path || '';
  }

  function getImage(assetData) {
    var i = 0;
    var len = this.images.length;
    while (i < len) {
      if (this.images[i].assetData === assetData) {
        return this.images[i].img;
      }
      i += 1;
    }
    return null;
  }

  function destroy() {
    this.imagesLoadedCb = null;
    this.images.length = 0;
  }

  function loaded() {
    return this.totalImages === this.loadedAssets;
  }

  function ImagePreloaderFactory() {
    this._imageLoaded = imageLoaded.bind(this);
    this.assetsPath = '';
    this.path = '';
    this.totalImages = 0;
    this.loadedAssets = 0;
    this.imagesLoadedCb = null;
    this.images = [];
  }

  ImagePreloaderFactory.prototype = {
    loadAssets: loadAssets,
    setAssetsPath: setAssetsPath,
    setPath: setPath,
    loaded: loaded,
    destroy: destroy,
    getImage: getImage,
    imageLoaded: imageLoaded,
  };

  return ImagePreloaderFactory;
}());
