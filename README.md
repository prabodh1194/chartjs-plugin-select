# chartjs-plugin-select  [![npm][npm-image]][npm-url] [![downloads][downloads-image]][downloads-url]

[npm-image]: https://img.shields.io/npm/v/chartjs-plugin-select.svg
[npm-url]: https://npmjs.org/package/chartjs-plugin-select
[downloads-image]: https://img.shields.io/npm/dm/chartjs-plugin-select.svg
[downloads-url]: https://npmjs.org/package/chartjs-plugin-select

A Chartjs plugin to provide drag select event callbacks.

This is inspired mostly from https://github.com/chartjs/Chart.js/issues/5283.

## Usage
In chart options, supply the following:

```
select: {
  events: ['mousedown', 'mouseup'], // this is important!
  selectCallback: (startPoint, endPoint) => {
    /*
      Callback after drag select has completed.
    */
  }
}
```

## Doc

#### selectCallback
This is called after mouse point is released at the end of select.
* startPoint: is the next closest point from where the mouse is pressed.
* endPoint: is the last point where the mouse point in released.
Point is represented by [index of fataset, x-pos of data point, y-pos of data point]

### Advantages of using this plugin
* Limitless... :-)

### Limitations
* I have tested this only on a line chart

Follow this repo for updates.
