import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import './File.html';

Template.File.events({
  'click button[name="undo"]': async () => {
    try {
      await Meteor.promise('shapes.undo', FlowRouter.getParam('drawingId'));
    } catch (error) {
      Bert.alert({
        type: 'danger',
        icon: 'fa fa-bell',
        style: 'growl-top-right',
        message: error.reason,
      });
    }
  },
  'click button[name="redo"]': () => {
    try {
      await Meteor.promise('shapes.redo', FlowRouter.getParam('drawingId'));
    } catch (error) {
      Bert.alert({
        type: 'danger',
        icon: 'fa fa-bell',
        style: 'growl-top-right',
        message: error.reason,
      });
    }
  },
});
