import resolver from './helpers/resolver';
import {
  setResolver
} from 'ember-qunit';

setResolver(resolver);

import TechFaker from 'ivy-videojs/tech-faker';
import videojs from 'videojs';

videojs.registerComponent('TechFaker', TechFaker);
