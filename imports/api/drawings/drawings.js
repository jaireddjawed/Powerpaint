import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export default Drawings = new Mongo.Collection('drawings');

Drawings.schema = new SimpleSchema({
  userId: {
    type: String,
    optional: true,
    label: 'The userID the drawing belongs to.',
  },
  isPublic: {
    type: Boolean,
    label: 'Determines whether anyone can edit a drawing.',
  },
  name: {
    type: String,
    defaultValue: 'Untitled',
    label: 'The name of the drawing.',
  },
  createdAt: {
    type: Date,
    defaultValue: new Date(),
  },
});

Drawings.attachSchema(Drawings.schema);
