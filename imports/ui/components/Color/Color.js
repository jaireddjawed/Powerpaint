import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './Color.html';

Template.color.events({
  'change input[name="color"]': (event) => {
    Session.set('color', event.target.value);
  },
});

Template.color.helpers({
  color() {
    if (!Session.get('color')) {
      Session.set('color', '#000');
    }

    return Session.get('color');
  },
});
