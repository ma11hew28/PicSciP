PicSciP
=======

<!-- This doesn't show on GitHub...
<object width="512" height="512" type="application/x-shockwave-flash" data="http://content.screencast.com/users/mattdipasquale/folders/Jing/media/7d0d010f-f4fd-44b2-95fb-818a982c2c36/jingswfplayer.swf">
  <param name="movie" value="http://content.screencast.com/users/mattdipasquale/folders/Jing/media/7d0d010f-f4fd-44b2-95fb-818a982c2c36/jingswfplayer.swf" />
  <param name="quality" value="high" />
  <param name="bgcolor" value="#F8F8F8" />
  <param name="flashVars" value="containerwidth=512&containerheight=512&thumb=http://content.screencast.com/users/mattdipasquale/folders/Jing/media/7d0d010f-f4fd-44b2-95fb-818a982c2c36/FirstFrame.jpg&content=http://content.screencast.com/users/mattdipasquale/folders/Jing/media/7d0d010f-f4fd-44b2-95fb-818a982c2c36/00000002.swf&blurover=false" />
  <param name="allowFullScreen" value="true" />
  <param name="scale" value="showall" />
  <param name="allowScriptAccess" value="always" />
  <param name="base" value="http://content.screencast.com/users/mattdipasquale/folders/Jing/media/7d0d010f-f4fd-44b2-95fb-818a982c2c36/" />
</object> -->

This app is a fork of the [sample Xcode project PhotoScroller][PhotoScroller]:

"'PhotoScroller' demonstrates the use of embedded UIScrollViews and CATiledLayer
to create a rich user experience for displaying and paginating photos that can
be individually panned and zoomed. CATiledLayer is used to increase the
performance of paging, panning, and zooming with high-resolution images or large
sets of photos."


Screenshot & Demo Video
-----------------------

To see a demo video, click the screenshot (right). =>
<a style="float:right" href="http://screencast.com/t/FlWlTPS8XKrI" target="_blank">
  <img alt="PicSciP Demo Video" src="https://github.com/mattdipasquale/PicSciP/raw/master/screenshot.png" width="276" height="537" />
</a>


Changes
-------

* I added a Welcome UIAlertView that shows app usage instructions upon initial
  app launch.

* I removed the ImageData.plist file since I wanted all of my images to be the
  same size, 1024x1536 px, and have the same naming pattern `page_i`.

* I added two very useful & time-saving Photoshop scripts: One for resizing &
  tiling/slicing/cropping images, and one for creating all icon versions from
  the iTunesArtwork, 512x512-px image.

* I made some other small changes, like style changes, changing the
  `tiledLayer.levelsOfDetail` from `4` to `2`, moving the photos to their own
  directory called `Photos`, and perhaps other small changes. I recommend doing
  a `diff -r` to compare PicSciP with PhotoScroller.


Autorotation-Padding Bug
------------------------

After rotating the device from portrait to landscape and back again, the padding
is displayed on screen, but it shouldn't be. Setting `PADDING` to `1` to
ameliorate this issue causes the page navigation to break after rotating the
device from portrait to landscape and back again. Setting `PADDING` to `2` is
the working compromise I chose. I wrote Apple about this. Please send me a pull
request if you fix this issue. Thanks!


Contributors
------------

* [Matt Di Pasquale][]


Photo Credits
-------------

Each of the three photos in this app was:

* downloaded, on **November 24, 2010**, from [Flickr][] & licensed under the
  [Attribution 2.0 Generic Creative Commons license][by].
* provided by [julien haler (titlap) on Flickr][titlap].
* cropped and/or resized from its original.

The photos are listed below in the same order they appear in the app. The app
icon is a derivative of the first photo.

1. ![FeuArtificeLevallois-37][1t] "[FeuArtificeLevallois-37][1p]."
2. ![Solidays2009_-21][2t] "[Solidays2009_-21][2p]."
3. ![Oeuvre d'art à Central Park][3t] "[Oeuvre d'art à Central Park][3p]."


[PhotoScroller]: http://developer.apple.com/library/ios/#samplecode/PhotoScroller/
[Matt Di Pasquale]: http://www.mattdipasquale.com/
[Flickr]: http://www.flickr.com/
[by]: http://creativecommons.org/licenses/by/2.0/
[titlap]: http://www.flickr.com/people/titlap/
[1p]: http://www.flickr.com/photos/titlap/4794809520/
[1t]: http://farm5.static.flickr.com/4101/4794809520_39c74bca03_s.jpg
[2p]: http://www.flickr.com/photos/titlap/3680096512/
[2t]: http://farm3.static.flickr.com/2584/3680096512_c8778c7cfe_s.jpg
[3p]: http://www.flickr.com/photos/titlap/4582702246/
[3t]: http://farm5.static.flickr.com/4065/4582702246_0df366f436_s.jpg
