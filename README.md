# ivy-videojs

[![Build Status](https://travis-ci.org/IvyApp/ivy-videojs.svg?branch=master)](https://travis-ci.org/IvyApp/ivy-videojs)

An [Ember](http://emberjs.com/) component for the [video.js](http://www.videojs.com/) HTML5 video player.

**NOTE:** Currently only the HTML5 video tech is supported. The Flash player is broken due to the fact that video.js removes the (Ember-managed) `<video>` element from the DOM when using anything other than the native HTML5 video tech.

## Installation

From the root of your [ember-cli](http://www.ember-cli.com/) application:

```sh
ember install:addon ivy-videojs
```

## Usage

Use the `ivy-videojs` component as you would a `video` tag, either by passing in the src as a string:

```handlebars
{{ivy-videojs src="/path/to/video.mp4"}}
```

or binding the src to an object:

```handlebars
{{ivy-videojs src=src}}
```

```js
// in your controller...

import Ember from 'ember';

export default Ember.Controller.extend({
  src: { src: '/path/to/video.mp4', type: 'video/mp4' }
});
```

or even to an array:

```js
// in your controller...

import Ember from 'ember';

export default Ember.Controller.extend({
  src: [
    { src: '/path/to/video.mp4', type: 'video/mp4' },
    { src: '/path/to/video.webm', type: 'video/webm' }
  ]
});
```

The src can be anything supported by video.js. See the [Player API docs](http://docs.videojs.com/docs/api/player.html#Methodssrc) for examples.

### Responsive Videos

As of video.js 5.0, there is now native support for responsive videos. To use this, set the `fluid` property to true:

```handlebars
{{ivy-videojs fluid=true src="/path/to/video.mp4"}}
```

See the [Player API docs](http://docs.videojs.com/docs/api/player.html#Methodsfluid) for more details.

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
