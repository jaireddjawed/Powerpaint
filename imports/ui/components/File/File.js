import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Bert } from 'meteor/themeteorchef:bert';
import './File.html';

Template.file.events({
  'click button[name="undo"]': async () => {
    try {
      await Meteor.promise('shapes.undo', FlowRouter.getParam('drawingId'));
    } catch (error) {
      Bert.alert(error.reason, 'danger');
    }
  },
  'click button[name="redo"]': async () => {
    try {
      await Meteor.promise('shapes.redo', FlowRouter.getParam('drawingId'));
    } catch (error) {
      Bert.alert(error.reason, 'danger');
    }
  },
});
