# Collision Detection and Response

[Prev]() [Next]()

## Collision Detection

In GB BASIC, collision detection between advanced objects is handled by [Actor Controllers](page-not-found.html). Their behaviour encompasses collisions between actors and the scene map, between actors themselves, between the player actor and triggers, and between actors and projectiles. The specifics will be detailed in the following sections: [Event Binding](event-binding.html) and [Actor Behaviours](page-not-found.html).

This section introduces prerequisite concepts such as collision grouping and object typing.

## Collision Grouping

In GB BASIC, whether objects (including actors, triggers, and projectiles) collide and how they respond to collisions depends on their collision group and the specific [Actor Controllers](page-not-found.html).

### Grouping Rules

Actors and projectiles have a collision group property. Generally, for the built-in [Actor Behaviours](page-not-found.html), if two objects both have the same bit set to 1, they are enabled in the same collision group for that bit.

Triggers do not have collision groups. For the built-in [Actor Behaviours](page-not-found.html), triggers only collide with actors that perform player controllers.

### Response Rules

For the built-in [Actor Behaviours](page-not-found.html), only actors and triggers can have collision handlers.

When a player enters or leaves a trigger, its collision handler callback is invoked to process collisions between the player and the trigger. This can be used for operations such as scene switching or trap damage handling.

In the collision handler callbacks between two actors, collisions between a player and a NPC or enemy can be processed. For example, to handle dialogue or damage interactions.

In the collision handler callbacks between an actor and a projectile, collisions involving a player and a projectile, or a NPC/enemy and a projectile, can be processed. This enables operations like damage handling. These projectiles can represent bullets, arrows, swords, and similar objects.

### Assigning Actor/Projectile Collision Group in Editor

Set a bit to 1 in the collision group field of the actor's properties to assign the actor to the specific collision group, and set a bit to 0 to remove the actor from the specific collision group.

<img src="imgs/editor-actor-collision-group.png" class="diagram-image diagram-screenshot">

<div class="small-note">Assigning actor collision group</div>

### Assigning Actor/Projectile Collision Group in Code

To assign an actor or a projectile's collision group in code, use the `set actor property(id, COLLISION_GROUP_PROP) = val` and `def projectile property(type, COLLISION_GROUP_PROP) = val` statements.

## Object Typing

In collision handlers, it's often necessary to distinguish between different types of objects using the `is` operator.

* `obj is type`: gets whether an object is an instance of the specific type, this operator is used to distinguish between [actor](https://paladin-t.github.io/kits/gbb/manual.html#actor) and [projectile](https://paladin-t.github.io/kits/gbb/manual.html#projectile); in particular, in an actor's `hits` callback
  * `obj`: the object to determine
  * `type`: can be one of `actor` or `projectile`
  * returns `true` if the given object is an instance of the specific type, otherwise `false`

**See also:** _[Cheat Sheet of Objects](https://paladin-t.github.io/kits/gbb/manual.html#cheat-sheet-of-objects)._

<div class="content-highlight" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    <strong>See also</strong>: <a href="page-not-found.html" class="nav-link">Actor Behaviours</a>, and <a href="page-not-found.html" class="nav-link">Hits</a>.
  </span>
</div>

<!-- gem -->
