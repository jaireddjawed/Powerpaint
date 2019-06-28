import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './Color.html';

Template.Color.onRendered(() => {
  Session.set('color', '#000000');
});

Template.Color.events({
  'change input[name="color"]': e => {
    Session.set('color', e.target.value);
  },
});

Template.Color.helpers({
  color() {
    return Session.get('color');
  },
});
