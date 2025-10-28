# Camera

[Prev]() [Next]()

* `camera x, y`: puts the camera to the specific position that counts for putting maps and sprites
  * `x`: the x position in pixels
  * `y`: the y position in pixels
* `viewport x, y`: gets the viewport position that is calculated with both map and camera offsets
  * `x`: passed by reference; a variable to store the x position in pixels
  * `y`: passed by reference; a variable to store the y position in pixels

The following constants are used for the [camera_shake](native-functions.html) function.

| Camera shake directions | Note                                                                                       |
|-------------------------|--------------------------------------------------------------------------------------------|
| `CAMERA_SHAKE_X`        | For the [camera_shake](native-functions.html) function |
| `CAMERA_SHAKE_Y`        | For the [camera_shake](native-functions.html) function |

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="camera-and-viewport.html" class="nav-link">Camera and Viewport</a>.
  </span>
</div>
