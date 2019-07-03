import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './DrawMethod.html';

Template.drawMethod.helpers({
  isFilled() {
    if (Session.get('isFilled') === undefined) {
      Session.set('isFilled', true);
    }

    return Session.get('isFilled') ? 'checked' : '';
  },
  isDraw() {
    if (Session.get('isFilled') === undefined) {
      Session.set('isFilled', true);
    }

    return Session.get('isFilled') ? '' : 'checked';
  },
});

Template.drawMethod.events({
  'change input[name="drawMethod"]': (event) => {
    Session.set('isFilled', event.target.value === 'fill');
  },
});
