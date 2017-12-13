let moment = require('moment');
require('moment-timezone');

export function formatDate(time, format = 'lll', EDT) {
    /*

     http://momentjs.com/

     moment().format('LT');   // 1:14 PM
     moment().format('LTS');  // 1:14:13 PM
     moment().format('L');    // 04/13/2017
     moment().format('l');    // 4/13/2017
     moment().format('LL');   // April 13, 2017
     moment().format('ll');   // Apr 13, 2017
     moment().format('LLL');  // April 13, 2017 1:14 PM
     moment().format('lll');  // Apr 13, 2017 1:14 PM
     moment().format('LLLL'); // Thursday, April 13, 2017 1:14 PM
     moment().format('llll'); // Thu, Apr 13, 2017 1:14 PM

     or look at http://momentjs.com/docs/#/displaying/format/

     */
    if (time) {
        if (EDT) {
            return formatByEDT(time);
        } else {
            return moment(time).utcOffset(time, true).format(format);
        }
    }
}

export function formatByEDT(date) {
    /*
     moment.tz([2012, 0], 'America/New_York').format('z');    // EST
     moment.tz([2012, 5], 'America/New_York').format('z');    // EDT
     moment.tz([2012, 0], 'America/Los_Angeles').format('z'); // PST
     moment.tz([2012, 5], 'America/Los_Angeles').format('z'); // PDT

     var a = moment.tz("2013-11-18 11:55", "America/Toronto");
     var b = moment.tz("May 12th 2014 8PM", "MMM Do YYYY hA", "America/Toronto");
     var c = moment.tz(1403454068850, "America/Toronto");
     a.format(); // 2013-11-18T11:55:00-05:00
     b.format(); // 2014-05-12T20:00:00-04:00
     c.format(); // 2014-06-22T12:21:08-04:00
     */

    return moment.tz(date, 'America/New_York').format('lll');
}
