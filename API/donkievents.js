/* FLR, SME, ENLIL, ICME, HSS */
/* https://ccmc.gsfc.nasa.gov/DONKI/events/?start=2026-10-16+17%3A22%3A28&end=2026-11-15+17%3A22%3A23&view=tables */
/* ^^^Data we are using; it is a scan of all incidents from 30 days ago (October 16) to today (November 15): The game will start on October 16 */

var DONKI_Data = [
    {event: 'FLR', date: 'October 19, 2026, at 9:03 AM UTC', category: ' M1.6', impact: 'ALL', speed: 'NT'},
    {event: 'SME', date: 'October 19, 2026, at 9:03 AM UTC', category: ' M1.6', impact: 'ALL', speed: 'NT'},
    {event: 'ENLIL', date: 'October 19, 2026, at 9:03 AM UTC', category: ' M1.6', impact: 'ALL', speed: 'NT'},
    {event: 'ICME', date: 'October 19, 2026, at 9:03 AM UTC', category: ' M1.6', impact: 'ALL', speed: 'NT'},
    {event: 'HSS', date: 'October 19, 2026, at 9:03 AM UTC', category: ' M1.6', impact: 'ALL', speed: 'NT'},
]

buildTable(DONKI_Data);

function buildTable(data) {
    var table = document.getElementById('DONKI_Table');

    for (var i = 0; i < data.length; i++) {
        var row = <tr>
            <td>${data[i].event}</td>
            <td>${data[i].date}</td>
            <td>${data[i].category}</td>
            <td>${data[i].impact}</td>
            <td>${data[i].speed}</td>
        </tr>

        table.innerHTML += row
    }
}
