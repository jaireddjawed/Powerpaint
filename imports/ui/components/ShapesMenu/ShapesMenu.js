import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './ShapesMenu.html';

const shapes = [
  'Rectangle',
  'Circle',
  'Line',
];

Template.shapesMenu.onRendered(() => {
  const [rectangle] = shapes;
  Session.set('shape', rectangle);
});

Template.shapesMenu.helpers({
  shapes,
});

Template.shapesMenu.events({
  'click button': (event) => {
    // sets the current shape
    Session.set('shape', event.target.name);
  },
});
