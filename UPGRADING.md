# ivy-videojs Upgrade Guide

## 0.6.0

### Removal of `ivy-videojs-source`

0.6.0 does away with `ivy-videojs-source`, in favor of setting a `src` property directly on the `ivy-videojs` component.

If your template previously had only a single source, like this:

```handlebars
{{#ivy-videojs}}
  {{ivy-videojs-source src="video.mp4" type="video/mp4"}}
{{/ivy-videojs}}
```

Then you can simply set this source directly on `ivy-videojs` instead:

```handlebars
{{ivy-videojs src="video.mp4"}}
```

This gets slightly more complex if you have multiple sources, like this:

```handlebars
{{#ivy-videojs}}
  {{ivy-videojs-source src="video.mp4" type="video/mp4"}}
  {{ivy-videojs-source src="video.webm" type="video/webm"}}
{{/ivy-videojs}}
```

In this case, you'll need to set up a property to bind to the `src` property of the `ivy-videojs` component:

```handlebars
{{ivy-videojs src=videoSources}}
```

Then open up the class of whichever context is responsible for rendering the component. In most cases this will be the controller, but it could also be a component if you're wrapping `ivy-videojs` with another component. Here's an example of a controller:

```js
import Ember from 'ember';

export default Ember.Controller.extend({
  videoSources: [
    { src: 'video.mp4', type: 'video/mp4' },
    { src: 'video.webm', type: 'video/webm' }
  ]
});
```
