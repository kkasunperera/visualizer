function c3_edge(){
var chart = c3.generate({
    data: {
    	 x : 'x',
         columns: [
             ['x', '2005','2006','2007','2008','2009','2010','2011','2012'],
             ['Q1', 0],
             ['Q2', 0],
             ['Q3', 0],
             ['Q4', 0],
             ['Year', 0],
         ],
         groups: [
             ['download', 'loading']
         ],
         type: 'bar'
    },
    bar: {
        width: {
            ratio: 0.5 // this makes bar width 50% of length between ticks
        }
        // or
        //width: 100 // this makes bar width 100px
    },
    axis: {
        x: {
            type: 'category' // this needed to load string x value
        }
    }
    
});
setTimeout(function () {
    chart.load({
        url: 'csv/edges.csv'
    });
}, 50);
 
}//]]> 