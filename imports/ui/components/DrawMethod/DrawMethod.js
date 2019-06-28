import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './DrawMethod.html';

Template.drawMethod.onRendered(() => {
  Session.set('isFilled', true);
});

Template.drawMethod.events({
  'change input[name="drawMethod"]': (event) => {
    Session.set('isFilled', event.target.value === 'fill');
  },
});
