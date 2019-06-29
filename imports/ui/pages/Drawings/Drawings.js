/* eslint-disable no-alert */
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { Bert } from 'meteor/themeteorchef:bert';
import Moment from 'moment';

import Drawings from '../../../api/drawings/drawings';
import './Drawings.html';

Template.drawings.onCreated(function() {
  this.autorun(() => {
    this.subscribe('drawings');
  });
});

Template.drawings.helpers({
  drawings() {
    return Drawings.find({}, { sort: { createdAt: -1 } });
  },
  formatDate(date) {
    return Moment(date).format('MMMM DD, YYYY hh:ss');
  },
});

Template.drawings.events({
  'click #new-drawing': async () => {
    try {
      const drawingName = prompt('Give your new drawing a name.');
      if (drawingName) {
        const drawingId = await Meteor.promise('drawings.insert', drawingName);
        FlowRouter.go(`/drawing/${drawingId}`);
      }
    } catch (error) {
      Bert.alert(error.reason, 'danger');
    }
  },
  'click .toggle-lock': async (event) => {
    try {
      await Meteor.promise('drawings.toggleLock', event.target.value);
    } catch (error) {
      Bert.alert(error.reason, 'danger');
    }
  },
  'click .remove': async (event) => {
    try {
      await Meteor.promise('drawings.remove', event.target.value);
    } catch (error) {
      Bert.alert(error.reason, 'danger');
    }
  },
});
