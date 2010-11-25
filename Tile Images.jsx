// Photoshop Script to Resize & Tile Images
//
// WARNING!!! This script will overwrite (delete perminently) files in the
// selected output folder in the rare case that there are name collisions.
// Therefore, to be safe, it's best to choose an empty output folder.
//
// Copyright (c) 2010 Matt Di Pasquale
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.
//
// Install - Save Tile Images.jsx to:
//   Win: C:\Program Files\Adobe\Adobe Utilities\ExtendScript Toolkit CS5\SDK
//   Mac: /Applications/Utilities/Adobe Utilities/ExtendScript Toolkit CS5/SDK
// * Restart Photoshop.
//
// Update:
// * Just modify & save, no need to resart Photoshop once it's installed.
//
// Run:
// * With Photoshop open, select File > Scripts > Tile Images
// * When prompted, select the input folder where your JPEGs are; click Choose.
// * Then, do the same for the ouput folder, where the tiles will be saved.
// * To stop the script, close the active document, i.e., click the "x" in the
//   upper left hand corner of the active window, and it should error out.
//
// Adobe Photoshop JavaScript Reference
// http://www.adobe.com/devnet/photoshop/scripting.html


// Turn debugger on. 0 is off.
// $.level = 1;

// Ask the user for the input and output folders.
var inputFolder = Folder.selectDialog("Select a folder for the input files.");
if (inputFolder !== null) { // clicking "Cancel" returns null
  var outputFolder = Folder.selectDialog("Select a folder for the output files.");
  if (outputFolder !== null) {
    var inputFiles = inputFolder.getFiles("*.jpg");
    var initialPrefs = app.preferences.rulerUnits;  // will restore at end
    app.preferences.rulerUnits = Units.PIXELS;      // use pixels

    // Save the outputs as JPEGs using Save for Web.
    var sfw = new ExportOptionsSaveForWeb();
    sfw.format = SaveDocumentType.JPEG;
    sfw.quality = 100;

    // Construct Tiler object to store variables.
    var Tiler = function (width, height, tileSize, levels) {
      this.width = width;
      this.height = height;
      this.tileSize = (typeof tileSize === "undefined") ? 256 : tileSize;
      this.levels = (typeof levels === "undefined") ? 2 : levels;
      this.cols = Math.ceil(width/this.tileSize);
      this.rows = Math.ceil(height/this.tileSize);
    };
    var tiler = new Tiler(1024, 1536);

    // Resize each input file to initial size, save as tiles, and close.
    var f, l, r, c;        // loop counters: file, level, row, column
    var doc, docName;      // activeDocument & its name
    var resizedImage;      // historyState after image has been resized
    var x1, y1, x2, y2;    // cropping bounds
    var scale, cols, rows; // scale values

    for (f = 0; f < inputFiles.length; f++) {
      doc = open(inputFiles[f]);
      doc.info = null;                                 // delete metadata
      docName = doc.name.slice(0, -4);                 // strip .jpg from name
      scale = 1; cols = tiler.cols; rows = tiler.rows; // reset scale

      for (l = 0; l < tiler.levels; l++) {
        doc.resizeImage(tiler.width/scale, tiler.height/scale,
                        326, ResampleMethod.BICUBICSHARPER);
        resizedImage = doc.activeHistoryState; // save for undo

        y1 = 0; y2 = tiler.tileSize; // start with top row
        for (r = 0; r < rows; r++) {
          x1 = 0; x2 = tiler.tileSize; // reset to left on new row
          for (c = 0; c < cols; c++) {
            doc.crop([x1, y1, x2, y2]);
            doc.exportDocument(new File(outputFolder+"/"+docName+"_"+
              1000/scale+"_"+c+"_"+r+".jpg"), ExportType.SAVEFORWEB, sfw);
            doc.activeHistoryState = resizedImage; // undo crop
            x1 += tiler.tileSize; x2 += tiler.tileSize;
          }
          y1 += tiler.tileSize; y2 += tiler.tileSize; // go down to next row
          x1 = 0; x2 = tiler.tileSize; // reset to left on new row
        }
        // Scale down for the next level.
        scale = scale * 2; cols = Math.ceil(cols/2); rows = Math.ceil(rows/2);
      }
      doc.close(SaveOptions.DONOTSAVECHANGES);
    }
    app.preferences.rulerUnits = initialPrefs; // restore prefs
  }
}
