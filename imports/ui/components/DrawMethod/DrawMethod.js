import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import './DrawMethod.html';

Template.DrawMethod.onRendered(() => {
  Session.set('isFilled', true);
});

Template.DrawMethod.events({
  'change input[name="drawMethod"]': e => {
    Session.set('isFilled', e.target.value === 'fill');
  },
});
