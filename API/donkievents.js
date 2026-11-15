/* FLR, SME, ENLIL, ICME, HSS */
/* Data scanned from October 16, 2026 to November 15, 2026 for the game start window */
const flrdates = ['10/19/2026', '11/5/2026','11/7/2026','11/8/2026','11/11/2026']
const cmedates = ['10/17/2026', '10/20/2026','10/22/2026','10/23/2026','10/24/2026', '10/26/2026', '11/1/2026', '11/6/2026', '11/9/2026', '11/14/2026', '11/15/2026']
const enlildates = ['10/20/2026', '10/25/2026','10/27/2026','10/30/2026','10/31/2026','11/4/2026','11/7/2026','11/13/2026']
const icmedates = ['10/20/2026', '10/25/2026']
const hssdates = ['10/21/2026', '10/26/2026','10/31/2026','11/4/2026','11/5/2026','11/6/2026','11/11/2026']

const flrCategory = []

let flrDate = flrdates[0]
let cmeDate = cmedates[0]
let enlilDate = enlildates[0]
let icmeDate = icmedates[0]
let hssDate = hssdates[0]

let flrCat = "M1.6"
let cmeCat = "C"
let enlilCat = "S"

let icmeImpact = "EARTH"

let cmeSpeed = 552
let enlilSpeed = 247
let hssSpeed = 535




const DONKI_Data = [
    { event: 'FLR', date: flrDate, category: flrCat, impact: 'ALL', speed: 'NT' },
    { event: 'CME', date: cmeDate, category: cmeCat, impact: 'ALL', speed: cmeSpeed + 'km/s' },
    { event: 'ENLIL', date: enlilDate, category: enlilCat, impact: 'ALL', speed: + enlilSpeed + 'km/s' },
    { event: 'ICME', date: icmeDate, category: 'NT', impact: icmeImpact, speed: 'NT' },
    { event: 'HSS', date: hssDate, category: 'NT', impact: 'ALL', speed: hssSpeed + 'km/s' }/* Characterized by an increase in solar wind speeds (approx. 370 km/s to 525 km/s) in association with a decrease in density and an increase in temperature. This signature is likely combined with the arrival of CME: 2026-10-16T12:38Z which was observed at 2026-10-20T11:23Z. */

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