import { Meteor } from 'meteor/meteor';
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

Template.canvas.onCreated(function() {
  this.coordinates = new ReactiveDict();
});

Template.canvas.onRendered(function() {
  this.autorun(() => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // drawShape is kept in a function so it can be
    // reused for the current shape being drawn and previous ones
    const drawShape = (shape) => {
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
        circle.setColor(shape.color);
        circle.draw();
      } else if (shape.type === 'Line') {
        const line = new Line(shape.startX, shape.startY, shape.endX, shape.endY);
        line.setContext(ctx);
        line.setColor(shape.color);
        line.draw();
      }
    };

    Shapes.find({}).forEach((shape) => {
      drawShape(shape);
    });

    const { coordinates } = this;
    const startX = coordinates.get('startX');
    const startY = coordinates.get('startY');
    const endX = coordinates.get('endX');
    const endY = coordinates.get('endY');

    // draw the shape the user is currently creating
    drawShape({
      isFilled: Session.get('isFilled'),
      color: Session.get('color'),
      type: Session.get('shape'),
      startX,
      startY,
      endX,
      endY,
    });
  });
});

let isMouseDown = false;

Template.canvas.events({
  'mousedown canvas': (event) => {
    isMouseDown = true;

    const { coordinates } = Template.instance();
    coordinates.set('startX', event.pageX - event.target.offsetLeft);
    coordinates.set('startY', event.pageY - event.target.offsetTop);
  },
  'mousemove canvas': (event) => {
    if (isMouseDown) {
      const { coordinates } = Template.instance();
      coordinates.set('endX', event.pageX - event.target.offsetLeft);
      coordinates.set('endY', event.pageY - event.target.offsetTop);
    }
  },
  'mouseup canvas': async () => {
    try {
      const { coordinates } = Template.instance();

      let drawingId = FlowRouter.getParam('drawingId');
      if (!drawingId) {
        drawingId = await Meteor.promise('drawings.insert');
        FlowRouter.go(`/drawing/${drawingId}`);
      }

      const startX = coordinates.get('startX');
      const startY = coordinates.get('startY');
      const endX = coordinates.get('endX');
      const endY = coordinates.get('endY');

      if (startX && startY && endX && endY) {
        await Meteor.promise('shapes.insert', {
          isFilled: Session.get('isFilled'),
          color: Session.get('color'),
          type: Session.get('shape'),
          drawingId,
          startX,
          startY,
          endX,
          endY,
        });
      }

      isMouseDown = false;
      coordinates.clear();
    } catch (error) {
      Bert.alert(error.reason, 'danger');
    }
  },
  'mouseleave canvas': () => {
    isMouseDown = false;
    Template.instance().coordinates.clear();
  },
});
