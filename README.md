# ivy-videojs

[![Latest NPM release][npm-badge]][npm-badge-url]
[![TravisCI Build Status][travis-badge]][travis-badge-url]

[npm-badge-url]: https://www.npmjs.com/package/ivy-videojs
[npm-badge]: https://img.shields.io/npm/v/ivy-videojs.svg
[travis-badge-url]: https://travis-ci.org/IvyApp/ivy-videojs
[travis-badge]: https://travis-ci.org/IvyApp/ivy-videojs.svg?branch=master

Simple [Ember](http://emberjs.com/) integration for the [video.js](http://www.videojs.com/) HTML5 video player.

**NOTE:** Currently only the HTML5 video tech is supported. The Flash player is broken due to the fact that video.js removes the (Ember-managed) `<video>` element from the DOM when using anything other than the native HTML5 video tech.

## Installation

<<<<<<< HEAD
From the root of your [ember-cli](http://www.ember-cli.com/) application:

```sh
ember install ivy-videojs
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
import Ember from 'ember';

export default Ember.Controller.extend({
  src: { src: '/path/to/video.mp4', type: 'video/mp4' }
});
```

or even to an array:

```js
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

### Advanced Usage

If you need more control over the video player, there's also an `ivy-videojs-player` component that exposes a lower-level interface to the video.js player. This can be useful if, for instance, you're using video.js plugins and need to change the way your application interacts with the video.js player. In fact, the `ivy-videojs` component is actually just a thin wrapper around the `ivy-videojs-player` component.

The `ivy-videojs-player` does not bind any properties, but it does set up event handlers for the following:

  * `abort`
  * `canplay`
  * `canplaythrough`
  * `durationchange`
  * `emptied`
  * `ended`
  * `error`
  * `loadeddata`
  * `loadedmetadata`
  * `loadstart`
  * `pause`
  * `play`
  * `playing`
  * `progress`
  * `ratechange`
  * `resize`
  * `seeked`
  * `seeking`
  * `stalled`
  * `suspend`
  * `timeupdate`
  * `useractive`
  * `userinactive`
  * `volumechange`
  * `waiting`

Generally if you're using `ivy-videojs-player`, you'll set up a handler for the "ready" action, and then use that time to configure the player and set up any custom events or property bindings.

#### The `setup` Property

If, for some reason, you need to pass in arguments to the initial `videojs` initialization call, you can do so through a `setup` property. For instance, if you wanted to enable the playback rate menu, you could pass in `setup` in your template:

```handlebars
{{ivy-videojs setup=setup}}
```

And then in your controller, define setup like so:

```js
import Ember from 'ember';

export default Ember.Controller.extend({
  setup: {
    playbackRates: [0.5, 1, 1.5, 2]
  }
});
```

This is exactly what the [demo app](http://ivyapp.github.io/ivy-videojs/) does.

#### Binding Properties

Here's a basic example that binds the "src" attribute:

```handlebars
{{ivy-videojs-player ready="ready" src=src}}
```

```js
import Ember from 'ember';

export default Ember.Controller.extend({
  src: 'http://vjs.zencdn.net/v/oceans.mp4',

  actions: {
    ready(player, component) {
      // This is pretty much the minimum required for a useful video player.
      component.bindPropertyToPlayer(player, 'src');
    }
  }
});
```

The above just tells `ivy-videojs-player` that its "src" property should be bound to the player's "src" property. This is fine if the component property and the player property have the same name, but what if they're different? Not to worry, that's what the optional third argument is for:

```handlebars
{{ivy-videojs-player ready="ready" sources=sources}}
```

```js
import Ember from 'ember';

export default Ember.Controller.extend({
  sources: 'http://vjs.zencdn.net/v/oceans.mp4',

  actions: {
    ready(player, component) {
      // This will set the player's "src" property based on the component's "sources" property.
      component.bindPropertyToPlayer(player, 'sources', 'src');
    }
  }
});
```

So in the above example, the "sources" property of the component is bound to the "src" property of the player. You can think of this as essentially calling the following whenever the component's "sources" property changes:

```js
player.src(this.get('sources'));
```

#### Handling Events

Much like properties, you can also handle custom player events. To do this, call the component's `sendActionOnPlayerEvent` method inside your "ready" action handler:

```handlebars
{{ivy-videojs-player ready="ready" tada="tada"}}
```

```js
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    ready(player, component) {
      // When a "tada" event is triggered on the player, a corresponding "tada"
      // action will be sent.
      component.sendActionOnPlayerEvent(player, 'tada');
    },

    tada(/* player, component */) {
      // Action handlers are given any arguments passed on from video.js, but
      // the first two arguments are always the video.js player and the
      // component.
    }
  }
});
```

As above, if the action name differs from the name of the player event, you can pass a third argument to indicate what the event name is:

```js
import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    ready(player, component) {
      // Now, if a "someevent" event is triggered on the player, a "tada"
      // action will be sent.
      component.sendActionOnPlayerEvent(player, 'tada', 'someevent');
    }
  }
```

## Upgrading

See [UPGRADING.md](https://github.com/IvyApp/ivy-videojs/blob/master/UPGRADING.md)

## Development

### Installation

* `git clone` this repository
* `yarn`
* `yarn run bower install`
=======
* `git clone <repository-url>` this repository
* `cd my-addon`
* `npm install`
>>>>>>> bc11baa... diff

### Running

* `ember server`
* Visit your app at http://localhost:4200.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
