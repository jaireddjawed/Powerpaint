import { Template } from 'meteor/templating';
import { $ } from 'meteor/jquery';

import '../../components/Canvas/Canvas';
import '../../components/Sidebar/Sidebar';
import '../../components/ShapesMenu/ShapesMenu';
import '../../components/Color/Color';
import '../../components/DrawMethod/DrawMethod';
import '../../components/File/File';
import '../../components/Navigation/Navigation';
import './Main.html';

Template.main.events({
  'click .toggle': () => {
    $('.sidebar, .content').toggleClass('slide');
  },
});
