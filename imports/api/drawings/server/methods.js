import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import Drawings from '../drawings';

Meteor.methods({
  'drawings.insert'(name) {
    check(name, Match.Optional(String));

    try {
      const drawing = Drawings.insert({
        name,
        userId: this.userId,
        isPublic: !this.userId,
      });

      return drawing;
    } catch (exception) {
      throw exception;
    }
  },
  'drawings.remove'() {

  },
});
