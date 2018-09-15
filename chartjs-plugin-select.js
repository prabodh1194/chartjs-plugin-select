/*jslint browser:true, devel:true, white:true, vars:true */
/*global require*/
Chart = window.Chart;

function _binarySearch(array, value) {
    var i;
    var min = 0;
    var max = array.length - 1;

    while(min <= max) {
        i = Math.floor((min + max) /2);
        if(array[i-1][1] <= value && value <= array[i][1])
            return i;
        else if(array[i][1] < value)
            min = i;
        else
            max = i;
    }

    return -1;
}

function _getIdxInfo(chart) {
    return chart
        .getDatasetMeta(0)
        .data
        .map(el => [+el._index, +el._model.x, +el._model.y])
        .sort((a, b) => (a[0]- b[0]));
}

var select;

// Chartjs Select Plugin
var selectPlugin = {
    afterInit: (chart) => {
        select = chart.options.select;
    },
    beforeEvent: (chart, evt) => {
        if (evt.type !== 'mousedown' && evt.type !== 'mouseup') {
            return;
        }
    },
    afterEvent: (chart, evt) => {
        if (evt.type !== 'mousedown' && evt.type !== 'mouseup') {
            return;
        }

        var i = _binarySearch(_getIdxInfo(chart), evt.x);

        if (evt.type === 'mousedown') {
            this.mouseup = null;
            this.mousedown = null;
        }

        if (evt.type === 'mouseup') {
            i -= 1;
        }

        this[evt.type] = _getIdxInfo(chart)[i];

        if (evt.type === 'mouseup') {
            select.selectCallback(this.mousedown, this.mouseup);
        }
    }
};

module.exports = selectPlugin;
Chart.pluginService.register(selectPlugin);
