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
  'drawings.toggleLock'(drawingId) {
    check(drawingId, String);

    try {
      const drawing = Drawings.findOne(drawingId);

      if (drawing && this.userId !== null && drawing.userId !== this.userId) {
        throw new Meteor.Error('You cannot set this drawing to public/private!');
      }

      Drawings.update(drawingId, {
        $set: {
          isPublic: !drawing.isPublic,
        },
      });
    } catch (exception) {
      throw exception;
    }
  },
  'drawings.remove'(drawingId) {
    check(drawingId, String);

    try {
      const drawing = Drawings.findOne(drawingId);

      if (drawing && this.userId !== null && drawing.userId !== this.userId) {
        throw new Meteor.Error('You cannot remove a drawing someone else created!');
      }

      Drawings.remove(drawingId);
    } catch (exception) {
      throw exception;
    }
  },
});
