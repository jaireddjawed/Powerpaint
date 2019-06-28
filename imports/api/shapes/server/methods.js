import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Drawings from '../../drawings/drawings';
import Shapes from '../shapes';

Meteor.methods({
  'shapes.insert'(shape) {
    check(shape, {
      drawingId: String,
      isFilled: Boolean,
      type: String,
      color: String,
      startX: Number,
      startY: Number,
      endX: Number,
      endY: Number,
    });

    try {
      const { drawingId } = shape;
      const getDrawing = Drawings.findOne(drawingId);

      if (!getDrawing) {
        throw new Meteor.Error('drawing-not-found', 'The drawing you\'re trying to edit does not exist!');
      }

      // If a drawing is private, the only user that can edit it is the creator
      if (!getDrawing.isPublic && getDrawing.userId !== this.userId) {
        throw new Meteor.Error('not-authorized', 'You\'re not authorized to edit this picture!');
      }

      return Shapes.insert({
        ...shape,
        createdAt: new Date(),
      });
    } catch (exception) {
      throw exception;
    }
  },
  'shapes.undo'(drawingId) {
    check(drawingId, String);

    try {
      const getLastCreatedShape = Shapes.findOne({ drawingId, isDeleted: false }, { sort: { createdAt: -1 } });
      if (getLastCreatedShape) {
        Shapes.update(getLastCreatedShape._id, {
          $set: {
            isDeleted: true,
            deletedAt: new Date(),
          },
        });
      }
    } catch (exception) {
      throw exception;
    }
  },
  'shapes.redo'(drawingId) {
    try {
      const getLastDeletedShape = Shapes.findOne({ drawingId, isDeleted: true }, { sort: { deletedAt: -1 } });

      /*
       * republish the last deleted shape and remove all
       * shapes that were deleted before that shape
       */

      if (getLastDeletedShape) {
        Shapes.update(getLastDeletedShape._id, {
          $set: {
            isDeleted: false,
            deletedAt: new Date(),
          },
        });
      }

      Shapes.remove({ drawingId, isDeleted: true });
    } catch (exception) {
      throw exception;
    }
  },
});
