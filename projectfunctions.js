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

module.exports = {
    writtenDate
}