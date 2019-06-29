import { Template } from 'meteor/templating';
import './Navigation.html';

Template.navigation.events({
  'click .download': () => {
    const [download] = document.getElementsByClassName('download');
    const image = document.getElementById('canvas')
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    download.setAttribute('href', image);
  },
});
