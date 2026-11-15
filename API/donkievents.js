/* FLR, SME, ENLIL, ICME, HSS */
/* Data scanned from October 16, 2026 to November 15, 2026 for the game start window */

const DONKI_Data = [
    { event: 'FLR', date: 'October 19, 2026, at 9:03 AM UTC', category: 'M1.6', impact: 'ALL', speed: 'NT' },
    { event: 'SME', date: 'October 19, 2026, at 9:03 AM UTC', category: 'M1.6', impact: 'ALL', speed: 'NT' },
    { event: 'ENLIL', date: 'October 19, 2026, at 9:03 AM UTC', category: 'M1.6', impact: 'ALL', speed: 'NT' },
    { event: 'ICME', date: 'October 19, 2026, at 9:03 AM UTC', category: 'M1.6', impact: 'ALL', speed: 'NT' },
    { event: 'HSS', date: 'October 19, 2026, at 9:03 AM UTC', category: 'M1.6', impact: 'ALL', speed: 'NT' }
];

function buildTable(data) {
    var table = document.getElementById('DONKI_Table');
    table.innerHTML = ''; // Clears out any placeholder rows

    for (var i = 0; i < data.length; i++) {
        var row = `<tr>
            <td>${data[i].event}</td>
            <td>${data[i].date}</td>
            <td>${data[i].category}</td>
            <td>${data[i].impact}</td>
            <td>${data[i].speed}</td>
        </tr>`;

        table.innerHTML += row;
    }
}

// Automatically build the table when the script runs
buildTable(DONKI_Data);