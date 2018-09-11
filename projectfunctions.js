const writtenDate = function(date) {

    let string = date.toString();

    let year = string.slice(0, 4);
    let month = string.slice(5, 7);
    let day = string.slice(8, 10);

    let writtenMonth;
    let writtenDay;

    if (month == 01) {
        writtenMonth = "January";
    }

    else if (month == 02) {
        writtenMonth = "February";
    }

    else if (month == 03) {
        writtenMonth = "March";
    }

    else if (month == 04) {
        writtenMonth = "April";
    }

    else if (month == 05) {
        writtenMonth = "May";
    }

    else if (month == 06) {
        writtenMonth = "June";
    }

    else if (month == 07) {
        writtenMonth = "July";
    }

    else if (month == 08) {
        writtenMonth = "August";
    }

    else if (month == 09) {
        writtenMonth = "September";
    }

    else if (month == 10) {
        writtenMonth = "October";
    }

    else if (month == 11) {
        writtenMonth = "November";
    }

    else if (month == 12) {
        writtenMonth = "December";
    }


    if (day.charAt(0) == 1) {
        writtenDay = `${day}th`;
    }

    else if (day.charAt(1) == 1) {
        writtenDay = `${day}st`;
    }

    else if (day.charAt(1) == 2) {
        writtenDay = `${day}nd`;
    }

    else if (day.charAt(1) == 3) {
        writtenDay = `${day}rd`;
    }

    else {
        writtenDay = `${day}th`;
    }

    let finalDate = `${writtenMonth} ${writtenDay}, ${year}`;
    return finalDate;

};

function sortTable(n) {
    let table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
    table = document.getElementById("stats");
    switching = true;
    // Set the sorting direction to ascending:
    dir = "asc"; 
    /* Make a loop that will continue until
    no switching has been done: */
    while (switching) {
      // Start by saying: no switching is done:
      switching = false;
      rows = table.rows;
      /* Loop through all table rows (except the
      first, which contains table headers): */
      for (i = 1; i < (rows.length - 1); i++) {
        // Start by saying there should be no switching:
        shouldSwitch = false;
        /* Get the two elements you want to compare,
        one from current row and one from the next: */
        x = rows[i].getElementsByTagName("TD")[n];
        y = rows[i + 1].getElementsByTagName("TD")[n];
        /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
        if (dir == "asc") {
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        } else if (dir == "desc") {
          if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
            // If so, mark as a switch and break the loop:
            shouldSwitch = true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
        // Each time a switch is done, increase this count by 1:
        switchcount ++; 
      } else {
        /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }

module.exports = {
    writtenDate, sortTable
}