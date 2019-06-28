import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';
import './Main.html';

Template.main.events({
  'click .toggle': () => {
    $('.sidebar, .content').toggleClass('slide');
  },
});
