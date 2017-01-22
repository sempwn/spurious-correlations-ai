Array.prototype.clean = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

function poissonRandomNumber(lambda) {
    var L = Math.exp(-lambda),
        k = 0,
        p = 1;

    do {
        k = k + 1;
        p = p * Math.random();
    } while (p > L);

    return k - 1;
}

maskData = function(rows,cond,column){
  var arr = rows.map(function(row){
    if (row['CTAS Group']==cond){          // set the x-data
      return row[column];
    }
  });
  return arr.clean(undefined).map(function(a){ return Number(a)});
}

lastElement = function(arr){
  return arr[arr.length - 1];
}

Plotly.d3.csv('./data/FHA_FinalData_ER.csv', function(rows){
  values = [];
  values.push(lastElement(maskData(rows,'1 and 2','ER Visits')));
  values.push(lastElement(maskData(rows,'3 only','ER Visits')));
  values.push(lastElement(maskData(rows,'4 and 5','ER Visits')));
  var data = [{
    values: values,
    labels: ['1 and 2', '3 only', '4 and 5'],
    type: 'pie'

  }];

  var layout = {
    showlegend: false
  };

  Plotly.newPlot('pieDiv', data, layout);
});

Plotly.d3.csv('./data/FHA_FinalData_ER.csv', function(rows){
  //1 and 2, 3 only, 4 and 5
    var trace = {
      type: 'scatter',                    // set the chart type
      mode: 'lines',                      // connect points with lines
      x: maskData(rows,'3 only','DateID'),
      y: maskData(rows,'3 only','ER Visits'),
      line: {                             // set the width of the line.
        width: 1
      },
      name: '3 only'
    };

    var trace1 = {
      type: 'scatter',                    // set the chart type
      mode: 'lines',                      // connect points with lines
      x: maskData(rows,'1 and 2','DateID'),
      y: maskData(rows,'1 and 2','ER Visits'),
      line: {                             // set the width of the line.
        width: 1
      },
      name: '1 and 2'
    };

    var trace2 = {
      type: 'scatter',                    // set the chart type
      mode: 'lines',                      // connect points with lines
      x: maskData(rows,'4 and 5','DateID'),
      y: maskData(rows,'4 and 5','ER Visits'),
      line: {                             // set the width of the line.
        width: 1
      },
      name: '4 and 5'
    };

    var layout = {
      yaxis: {title: "ER Visits"},       // set the y axis title
      xaxis: {
        showgrid: true                  // remove the x-axis grid lines
        //tickformat: "%B, %Y"              // customize the date format to "month, day"
      },
      margin: {                           // update the left, bottom, right, top margin
        l: 40, b: 40, r: 10, t: 20
      }
    };

    Plotly.plot($('#er-visits')[0], [trace,trace1,trace2], layout, {showLink: false});
});

var map = L.map('mapid').setView([49.1044, -122.8011], 9);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

Plotly.d3.csv('./data/healthlinkbchospitals.csv', function(rows){
  rows.map(function(row){
    console.log(row);
    if (row['RG_NAME']=='Fraser Health Authority'){
      L.marker([row['LATITUDE'], row['LONGITUDE']]).addTo(map)
          .bindPopup(row['SV_NAME'] +'<br>' + row['SV_DESCRIPTION'] +'<br>' + 'Visits : ' + poissonRandomNumber(200));
        }
    });
  });
