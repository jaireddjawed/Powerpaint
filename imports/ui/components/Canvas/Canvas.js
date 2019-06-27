import { Template } from 'meteor/templating';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Session } from 'meteor/session';
import { Bert } from 'meteor/themeteorchef:bert';

import Shapes from '../../../api/shapes/shapes';
import Rectangle from '../../shapes/Rectangle';
import Circle from '../../shapes/Circle';
import Line from '../../shapes/Line';

import './Canvas.html';

Template.Canvas.onCreated(function() {
  this.coordinates = new ReactiveDict();
  this.autorun(() => {
    const drawingId = FlowRouter.getParam('drawingId');
    this.subscribe('shapes', drawingId);
  });
});

Template.Canvas.onRendered(function() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');

  this.autorun(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    Shapes.find({}).forEach(shape => {
      if (shape.type === 'Rectangle') {
        const rectangle = new Rectangle(shape.startX, shape.startY, shape.endX, shape.endY);
        rectangle.setContext(ctx);
        rectangle.setStrokeOrFilled(shape.isFilled);
        rectangle.setColor(shape.color);
        rectangle.draw();
      } else if (shape.type === 'Circle') {
        const circle = new Circle(shape.startX, shape.startY, shape.endX, shape.endY);
        circle.setContext(ctx);
        circle.setStrokeOrFill(shape.isFilled);
        circle.setColor(shape.color)
        circle.draw()
      } else if (shape.type === 'Line') {
        const line = new Line(shape.startX, shape.startY, shape.endX, shape.endY);
        line.setContext(ctx);
        line.setColor(shape.color);
        line.draw();
      }
    });
  });
});

let isMouseDown = false;

Template.Canvas.events({
  'mousedown canvas': e => {
    isMouseDown = true;

    const coordinates = Template.instance().coordinates;
    coordinates.set('startX', e.pageX - e.target.offsetLeft);
    coordinates.set('startY', e.pageY - e.target.offsetTop);
  },
  'mousemove canvas': e => {
    if (isMouseDown) {
      const coordinates = Template.instance().coordinates;
      coordinates.set('endX', e.pageX - e.target.offsetLeft);
      coordinates.set('endY', e.pageY - e.target.offsetTop);
    }
  },
  'mouseup canvas': async () => {
    try {
      const coordinates = Template.instance().coordinates;

      let drawingId = FlowRouter.getParam('drawingId');
      if (!drawingId) {
        drawingId = await Meteor.promise('drawings.insert');
        FlowRouter.go(`/drawing/${drawingId}`);
      }

      await Meteor.promise('shapes.insert', {
        drawingId,
        type: Session.get('shape'),
        color: Session.get('color'),
        isFilled: Session.get('isFilled'),
        startX: coordinates.get('startX'),
        startY: coordinates.get('startY'),
        endX: coordinates.get('endX'),
        endY: coordinates.get('endY'),
      });

      isMouseDown = false;
      coordinates.clear();
    } catch (error) {
      Bert.alert({
        type: 'danger',
        icon: 'fa fa-bell',
        style: 'growl-top-right',
        message: error.reason,
      });
    }
  },
  'mouseleave canvas': () => {
    isMouseDown = false;
    Template.instance().coordinates.clear();
  },
});
