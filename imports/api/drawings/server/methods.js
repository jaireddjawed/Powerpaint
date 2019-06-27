import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';
import Drawings from '../drawings';

Meteor.methods({
  'drawings.insert'(name) {
    check(name, Match.Optional(String));

    return Drawings.insert({
      name,
      userId: this.userId,
      isPublic: !!this.userId,
    });
  },
  'drawings.update'() {

  },
  'drawings.setToPublic'() {

  },
  'drawings.remove'() {

  },
});
