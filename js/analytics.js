Plotly.d3.csv('./data/prediction_full.csv', function(rows){
  var trace = {
    type: 'scatter',                    // set the chart type
    mode: 'lines',                      // connect points with lines
    x: rows.map(function(row){return row['datetime']}),
    y: rows.map(function(row){return row['predicted']}),
    line: {                             // set the width of the line.
      width: 1
    },
    name: 'predicted'
  };

  var trace1 = {
    type: 'scatter',                    // set the chart type
    mode: 'lines',                      // connect points with lines
    x: rows.map(function(row){return row['datetime']}),
    y: rows.map(function(row){return row['true']}),
    line: {                             // set the width of the line.
      width: 1
    },
    name: 'true'
  };



  var layout = {
    yaxis: {title: "ER Visits Prediction"},       // set the y axis title
    xaxis: {
      showgrid: true                  // remove the x-axis grid lines
      //tickformat: "%B, %Y"              // customize the date format to "month, day"
    },
    margin: {                           // update the left, bottom, right, top margin
      l: 40, b: 40, r: 10, t: 20
    }
  };

  Plotly.plot($('#predictionFull')[0], [trace,trace1], layout, {showLink: false});
});


Plotly.d3.csv('./data/prediction_test.csv', function(rows){
  var trace = {
    type: 'scatter',                    // set the chart type
    mode: 'lines',                      // connect points with lines
    x: rows.map(function(row){return row['datetime']}),
    y: rows.map(function(row){return row['predicted']}),
    line: {                             // set the width of the line.
      width: 1
    },
    name: 'predicted'
  };

  var trace1 = {
    type: 'scatter',                    // set the chart type
    mode: 'lines',                      // connect points with lines
    x: rows.map(function(row){return row['datetime']}),
    y: rows.map(function(row){return row['true']}),
    line: {                             // set the width of the line.
      width: 1
    },
    name: 'true'
  };



  var layout = {
    yaxis: {title: "ER Visits Prediction"},       // set the y axis title
    xaxis: {
      showgrid: true                  // remove the x-axis grid lines
      //tickformat: "%B, %Y"              // customize the date format to "month, day"
    },
    margin: {                           // update the left, bottom, right, top margin
      l: 40, b: 40, r: 10, t: 20
    }
  };

  Plotly.plot($('#prediction-test')[0], [trace,trace1], layout, {showLink: false});
});
