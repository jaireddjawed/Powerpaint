import { Meteor } from 'meteor/meteor';
import Drawings from '../drawings';

Meteor.publish('drawings', function() {
  if (this.userId) {
    return Drawings.find({ userId: this.userId });
  }

  return this.ready();
});
