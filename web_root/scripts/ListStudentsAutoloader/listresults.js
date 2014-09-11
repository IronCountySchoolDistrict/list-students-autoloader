/*global $j,_,require*/
var dataTablesUri = '//cdnjs.cloudflare.com/ajax/libs/datatables/1.9.4/jquery.dataTables.min.js';
require(['underscore', dataTablesUri], function() {
    'use strict';

    var tableElem = $j('table').eq(0);
    tableElem.attr({'class': 'display'});

    if (gridEnabled.trim() === '1') {
        tableElem.attr({'class': 'cell-border'});
    }

    var columnHeaders = tableElem.find('tr').eq(0);
    var headers = columnHeaders.clone();
    columnHeaders.remove();

    tableElem.prepend($j('<thead></thead>'));
    tableElem.find('thead').eq(0).append($j('<tr></tr>'));

    var thHeaders = [];
    _.each(headers.find('td'), function(elem) {
        thHeaders.push($j('<th>' + $j(elem).text() + '</th>'));
    });
    tableElem.find('thead').eq(0).find('tr').append(thHeaders);

    $j(tableElem).dataTable({
        "bPaginate": false,
        "bFilter": true,
        "bJQueryUI": true
    });

    $j('.dataTables_wrapper').css({'display': 'inline-block'});
});
