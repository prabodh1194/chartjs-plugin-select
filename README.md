# chartjs-plugin-select
A Chartjs plugin to provide drag select event callbacks.

This is inspired mostly from https://github.com/chartjs/Chart.js/issues/5283.

## Usage
In chart options, supply the following:

```
select: {
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
Limitless... :-)

### Limitations
* I have tested this only on a line chart
* You can only go in positive x direction
* No error handling yet!!

Follow this repo for updates.
