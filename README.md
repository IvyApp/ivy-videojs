# ivy-videojs

[![Build Status](https://travis-ci.org/IvyApp/ivy-videojs.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-videojs)

A set of [Ember](http://emberjs.com/) components for the [video.js](http://www.videojs.com/) HTML5 video player.

## Installation

From the root of your [ember-cli](http://www.ember-cli.com/) application:

```sh
ember install:addon ivy-videojs
```

## Usage

Use the `ivy-videojs` component as you would a `video` tag, and the `ivy-videojs-source` component as you would a `source` tag:

```handlebars
{{#ivy-videojs poster="/path/to/poster.jpg"}}
  {{ivy-videojs-source src="/path/to/video.mp4" type="video/mp4"}}
  {{ivy-videojs-source src="/path/to/video.webm" type="video/webm"}}
  {{ivy-videojs-source src="/path/to/video.ogv" type="video/ogg"}}
{{/ivy-videojs}}
```

The following video.js properties can be bound to the `ivy-videojs` component:

* `autoplay`
* `controls`
* `currentTime`
* `duration`
* `height` (as `currentHeight`)
* `loop`
* `muted`
* `playbackRate`
* `poster`
* `preload`
* `volume`
* `width` (as `currentWidth`)

For example usage, take a look at the dummy app's [index.hbs template](tests/dummy/app/templates/index.hbs).

### Responsive Videos

If you want your video to automatically fill its container, set `naturalHeight` and `naturalWidth` to the dimensions of the video. These are used for calculating an aspect ratio, so you can just make up some values if you don't know the exact size of the video beforehand.

Once you've specified dimensions, simply set the `autoresize` property to true. The video will now resize to fill its container, and will automatically resize itself when the window size changes.

Example:

```handlebars
{{#ivy-videojs autoresize=true naturalWidth=1280 naturalHeight=720}}
  ...
{{/ivy-videojs}}
```

## Development

### Installation

* `git clone` this repository
* `npm install`
* `bower install`

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
