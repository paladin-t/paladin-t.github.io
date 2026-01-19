# Using the Music Editor

[Prev]() [Next]()

The music editor can produce music assets, press **Ctrl+7/Cmd+7** in edit mode to switch to the music tab. GB BASIC allows importing external formats (exported by hUGETracker, etc.) as music, besides creating from scratch.

Like other assets, you can click the "+"/"-" buttons at the top to add or remove a music asset. Clicking the buttons in the status bar below allows you to import, export, preview or perform other operations on the current music.

The music editor is divided into three main views: tracker, piano, and waves. Switch to the tracker view to simultaneously inspect and edit the four channels of the music. In the main view, you can edit the note, instrument, and effect+parameter for a specific line within an order. The toolbar on the right allows you to edit and assign the music's orders and edit the music's properties.

<img src="imgs/editor-music-tracker-view.png" class="diagram-image diagram-screenshot">

<div class="small-note">Music editor - tracker view</div>

The piano view is essentially similar to the tracker, but this view focuses on displaying a single channel out of the four, allowing for more detailed fine-tuning of an individual track. The toolbar on the right provides the same tools as the tracker view, plus a component for switching the currently edited channel.

<img src="imgs/editor-music-piano-view.png" class="diagram-image diagram-screenshot">

<div class="small-note">Music editor - piano view</div>

The waves view is used to edit waveforms that can be used for the wave channel.

<img src="imgs/editor-music-waves-view.png" class="diagram-image diagram-screenshot">

<div class="small-note">Music editor - waves view</div>

The music editor accepts the following shortcuts to input notes. Press the literal keys for the upper blue notes, and **Alt**+keys for the lower red ones.

<img src="imgs/editor-music-shortcuts.png" class="diagram-image diagram-screenshot">

<div class="small-note">Music editor shortcuts</div>

Try clicking the "EDIT" button below and interact with the music editor.

![edit, run, style="width: 640px;"](imgs/editor-music-entry.png)
<!-- prg
!edit, run, index="MUSIC:0", title="Music editor", style=""
url://prgs/music-1.txt
-->
