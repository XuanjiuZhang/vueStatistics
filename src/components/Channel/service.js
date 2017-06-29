const exportCanvasAsPNG = (canvasElement, fileName) => {
  var MIME_TYPE = 'image/png';

  var imgURL = canvasElement.toDataURL(MIME_TYPE);

  var dlLink = document.createElement('a');
  dlLink.download = fileName;
  dlLink.href = imgURL;
  dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

  document.body.appendChild(dlLink);
  dlLink.click();
  document.body.removeChild(dlLink);
}

export { exportCanvasAsPNG }