import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/Main/Main';
import '../../ui/pages/Home/Home';
import '../../ui/pages/Drawings/Drawings';

FlowRouter.route('/', {
  name: 'Home',
  action: () => {
    BlazeLayout.render('main', { content: 'home' });
  },
});

FlowRouter.route('/drawing/:drawingId', {
  name: 'Drawing',
  action: () => {
    BlazeLayout.render('main', { content: 'home' });
  },
});

FlowRouter.route('/drawings', {
  name: 'Drawings',
  triggersEnter: () => {
    if (!Meteor.loggingIn() && !Meteor.userId()) {
      FlowRouter.go('Home');
    }
  },
  action: () => {
    BlazeLayout.render('main', { content: 'drawings' });
  },
});
