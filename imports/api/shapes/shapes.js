import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export default Shapes = new Mongo.Collection('shapes');

Shapes.schema = new SimpleSchema({
  drawingId: {
    type: String,
    label: 'The ID of the drawing the shape belongs to.',
  },
  startX: {
    type: Number,
    label: 'The starting x coordinate of the shape.',
  },
  startY: {
    type: Number,
    label: 'The starting y coordinate of the shape.',
  },
  endX: {
    type: Number,
    label: 'The ending x coordinate of the shape.',
  },
  endY: {
    type: Number,
    label: 'The ending y coordinate of the shape.',
  },
  color: {
    type: String,
    label: 'The color of the shape.',
  },
  type: {
    type: String,
    allowedValues: ['Line', 'Rectangle', 'Circle'],
    label: 'The type of shape.',
  },
  isFilled: {
    type: Boolean,
    label: 'Determines whether to stroke or fill a shape.',
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
    label: 'The unix epoch of the time the shape was created.',
  },
  isDeleted: {
    type: Boolean,
    defaultValue: false,
    label: 'Prevents a shape from being published if the user deletes it when clicking undo.',
  },
  deletedAt: {
    type: Date,
    optional: true,
    label: 'The date the shape was deleted.',
  },
});

Shapes.attachSchema(Shapes.schema);
