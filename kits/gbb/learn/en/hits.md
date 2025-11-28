# Hits

[Prev]() [Next]()

These collision functions tell whether a shape collides with another in GB BASIC. However, consider the "hits" handling methods in the actor, projectile and trigger related modules for regular cases.

* `=hits(rect(x0, y0, x1, y1), rect(x2, y2, x3, y3))`: checks whether the two specific rectangles collide with each other
  * `x0`: the x position in pixels of the first point of the first rectangle
  * `y0`: the y position in pixels of the first point of the first rectangle
  * `x1`: the x position in pixels of the second point of the first rectangle
  * `y1`: the y position in pixels of the second point of the first rectangle
  * `x2`: the x position in pixels of the first point of the second rectangle
  * `y2`: the y position in pixels of the first point of the second rectangle
  * `x3`: the x position in pixels of the second point of the second rectangle
  * `y3`: the y position in pixels of the second point of the second rectangle
  * returns `true` for collision, otherwise `false`
* `=hits(rect(x0, y0, x1, y1), point(x, y))`: checks whether the specific rectangle and point collide with each other
  * `x0`: the x position in pixels of the first point
  * `y0`: the y position in pixels of the first point
  * `x1`: the x position in pixels of the second point
  * `y1`: the y position in pixels of the second point
  * `x`: the x position in pixels of the point
  * `y`: the y position in pixels of the point
  * returns `true` for collision, otherwise `false`
* `=hits(point(x, y), rect(x0, y0, x1, y1))`: checks whether the specific point and rectangle collide with each other
  * `x`: the x position in pixels of the point
  * `y`: the y position in pixels of the point
  * `x0`: the x position in pixels of the first point
  * `y0`: the y position in pixels of the first point
  * `x1`: the x position in pixels of the second point
  * `y1`: the y position in pixels of the second point
  * returns `true` for collision, otherwise `false`

// TODO
