import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import Drawings from '../../../api/drawings/drawings';
import './Home.html';

Template.home.onCreated(function() {
  this.autorun(() => {
    const drawingId = FlowRouter.getParam('drawingId');
    this.subscribe('shapes', drawingId);
  });
});

Template.home.helpers({
  drawingExists() {
    // If the user is on the homepage, then they're getting started with creating a drawing
    // no drawing will need to exist at the moment
    if (FlowRouter.getRouteName() === 'Home') return true;
    return FlowRouter.getRouteName() === 'Drawing' && Drawings.findOne();
  },
});
