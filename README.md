# ivy-videojs

[![Build Status](https://travis-ci.org/IvyApp/ivy-videojs.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-videojs)

A set of [Ember](http://emberjs.com/) components for the
[video.js](http://www.videojs.com/) HTML5 video player.

## Installation

From the root of your [ember-cli](http://www.ember-cli.com/) application:

```sh
ember install:addon ivy-videojs
```

## Usage

Use the `ivy-videojs` component as you would a `video` tag, and the
`ivy-videojs-source` component as you would a `source` tag:

```handlebars
{{#ivy-videojs poster="/path/to/poster.jpg"}}
  {{ivy-video-source src="/path/to/video.mp4" type="video/mp4"}}
  {{ivy-video-source src="/path/to/video.webm" type="video/webm"}}
  {{ivy-video-source src="/path/to/video.ogv" type="video/ogg"}}
{{/ivy-videojs}}
```

The following values can be bound to the `ivy-videojs` component:

* `autoplay`
* `controls`
* `currentTime`
* `duration`
* `height`
* `loop`
* `muted`
* `playbackRate`
* `poster`
* `preload`
* `volume`
* `width`

For example usage, take a look at the dummy app's
[index.hbs template](tests/dummy/app/templates/index.hbs).

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
