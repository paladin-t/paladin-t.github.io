# Scene and Object System

[Prev]() [Next]()

In the previous chapters, we have learned the essential basics for developing games with GB BASIC. Next, we will learn about the scene and object system in GB BASIC. Through this chapter, we will learn how to use advanced objects like scenes, triggers, and actors to make our games richer and more interesting.

<div class="content-gray" style="min-height: 48px;">
  <img src="imgs/logo-nokbd.png" class="logo-tip">
  <span class="content-text">
    It is recommended to do not skip the content of this chapter, especially on <a href="scene.html" class="nav-link">Scene</a>, <a href="trigger.html" class="nav-link">Trigger</a>, <a href="actor.html" class="nav-link">Actor</a>, and <a href="object-interaction.html" class="nav-link">Object Interaction</a>, which are important.
  </span>
</div>

Among the objects and operations introduced in this chapter, some can be performed in the editors, while others require coding. See the table below for details.

<table>
  <thead>
    <tr>
      <th>Categories</th>
      <th>Types</th>
      <th>Actions</th>
      <th>In editor</th>
      <th>In code</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">Scene</td>
      <td rowspan="2">Scene</td>
      <td><a href="scene-layers.html" class="nav-link">Defining scenes' data and properties</a></td>
      <td>Yes</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="scene-definition-and-loading.html" class="nav-link">Loading scenes into memory</a></td>
      <td></td>
      <td>Yes</td>
    </tr>
    <tr>
      <td rowspan="10">Objects</td>
      <td rowspan="3">Trigger</td>
      <td><a href="trigger.html" class="nav-link">Defining triggers</a></td>
      <td>Yes (in scene editor)</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><a href="trigger.html" class="nav-link">Loading triggers</a></td>
      <td>Yes (in scene editor)</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><a href="trigger.html" class="nav-link">Binding event handlers for triggers</a></td>
      <td>Yes (in scene editor)</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td rowspan="3">Actor</td>
      <td><a href="actor.html" class="nav-link">Defining actors</a></td>
      <td>Yes (in actor editor)</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="actor.html" class="nav-link">Loading actors</a></td>
      <td>Yes (in scene editor)</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><a href="actor.html" class="nav-link">Binding event handlers for actors</a></td>
      <td>Yes (in actor or scene editors)</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td rowspan="2">Projectile</td>
      <td><a href="projectile.html" class="nav-link">Defining projectiles</a></td>
      <td>Yes (in actor/projectile editor)</td>
      <td></td>
    </tr>
    <tr>
      <td><a href="projectile.html" class="nav-link">Loading projectiles</a></td>
      <td></td>
      <td>Yes</td>
    </tr>
    <tr>
      <td rowspan="2">Emote</td>
      <td><a href="emote.html" class="nav-link">Defining emotes</a></td>
      <td>Yes (in tiles editor)</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><a href="emote.html" class="nav-link">Loading emotes</a></td>
      <td></td>
      <td>Yes</td>
    </tr>
    <tr>
      <td rowspan="6">Colored features</td>
      <td rowspan="3">Palette</td>
      <td><a href="palette.html" class="nav-link">Setting palette colors</a></td>
      <td>Yes (in palette editor)</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><a href="palette.html" class="nav-link">Assigning palettes for maps or scenes</a></td>
      <td>Yes (in map or scene editors)</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><a href="palette.html" class="nav-link">Assigning palettes for actors</a></td>
      <td>Yes (in actor editor)</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td rowspan="3">VRAM banking</td>
      <td><a href="vram-banking.html" class="nav-link">Loading assets to different VRAM banks<a></td>
      <td></td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><a href="vram-banking.html" class="nav-link">Specifying VRAM bank for maps or scenes</a></td>
      <td>Yes (in map or scene editors)</td>
      <td>Yes</td>
    </tr>
    <tr>
      <td><a href="vram-banking.html" class="nav-link">Specifying VRAM bank for actors</a></td>
      <td>Yes (in actor editor)</td>
      <td></td>
    </tr>
  </tbody>
</table>
