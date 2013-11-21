var Record = function(date, mail, present, clook_in, clook_off, overtime, latenight, holiday, subtract) {
    this.date = date;
    this.mail = mail;
    this.present = present;
    this.clook_in = clook_in;
    this.clook_off = clook_off;
    this.overtime = overtime;
    this.latenight = latenight;
    this.holiday = holiday;
    this.subtract = subtract;
};
module.exports = Record;
