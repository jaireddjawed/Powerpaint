import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/Main/Main';
import '../../ui/pages/Home/Home';

FlowRouter.route('/', {
  name: 'Home',
  action: () => {
    BlazeLayout.render('Main', { content: 'Home' });
  },
});

FlowRouter.route('/drawing/:drawingId', {
  name: 'Drawing',
  action: () => {
    BlazeLayout.render('Main', { content: 'Home' });
  },
});
