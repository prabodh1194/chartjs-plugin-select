Chart = window.Chart;

// returns a point immediately after the selection point
function _binarySearch(array, value) {
    var i;
    var min = 0;
    var max = array.length - 1;

    while(min <= max) {
        i = Math.floor((min + max) /2);
        if(array[i-1].x <= value && value <= array[i].x)
            return i;
        else if(array[i].x < value)
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
        .map(el => ({idx: +el._index, x: +el._model.x, y: +el._model.y}))
        .sort((a, b) => (a.x - b.x));
}

function _getDirection(start, end) {
    if (start === end) {
        return 0;
    } else if (start < end) {
        return 1;
    } else if (start > end) {
        return -1;
    }
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

        if (evt.type === 'mousedown') {
            this.init = {};
            this.selection = {};
        }

        this.init[evt.type] = evt.x;
    },
    afterEvent: (chart, evt) => {
        if (evt.type !== 'mousedown' && evt.type !== 'mouseup') {
            return;
        }

        var i = _binarySearch(_getIdxInfo(chart), evt.x);

        this.selection[evt.type] = i;

        if (evt.type === 'mouseup') {
            var start, end;
            var direction = _getDirection(this.init.mousedown, this.init.mouseup);

            if (direction === 1) {
                start = _getIdxInfo(chart)[this.selection.mousedown];
                end = _getIdxInfo(chart)[this.selection.mouseup - 1];
            } else if (direction === -1) {
                start = _getIdxInfo(chart)[this.selection.mousedown - 1];
                end = _getIdxInfo(chart)[this.selection.mouseup];
            } else {
                start = end = null;
            }

            if (direction === 0 || ((end.idx - start.idx) * (direction) === -1)) {
                start = end = null;
            }

            select.selectCallback(start, end);
        }
    }
};

module.exports = selectPlugin;
Chart.pluginService.register(selectPlugin);
