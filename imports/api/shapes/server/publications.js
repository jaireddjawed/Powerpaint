import { Meteor } from 'meteor/meteor';
import { check, Match } from 'meteor/check';

import Drawings from '../../drawings/drawings';
import Shapes from '../shapes';

Meteor.publish('shapes', function(drawingId) {
  check(drawingId, Match.OneOf(String, null));

  // const currentDrawing = Drawings.findOne({ _id: drawingId, userId: this.userId });

    return Shapes.find({ drawingId, isDeleted: false });

  return this.ready();
});
