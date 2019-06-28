import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './ShapesMenu.html';

const shapes = [
  'Rectangle',
  'Circle',
  'Line',
];

Template.ShapesMenu.onRendered(() => {
  const [rectangle] = shapes;
  Session.set('shape', rectangle);
});

Template.ShapesMenu.helpers({
  shapes,
});

Template.ShapesMenu.events({
  'click button': e => {
    // sets the current shape
    Session.set('shape', e.target.name);
  },
});
