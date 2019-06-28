import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './Color.html';

Template.color.onRendered(() => {
  Session.set('color', '#000000');
});

Template.color.events({
  'change input[name="color"]': e => {
    Session.set('color', e.target.value);
  },
});

Template.color.helpers({
  color() {
    return Session.get('color');
  },
});
