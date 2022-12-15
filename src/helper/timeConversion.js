Array.prototype.timeDifference = function () {
    if(this.length > 0){
        if(this.length === 0 ){
            return(String(this));
        } else {
           return((new Date((new Date(this[0]).getTime()) - (new Date(this[1]).getTime()))).toString());
        }
    }
    return("")
}

String.prototype.strftime = function (timeFormat: string) {
    if (this.length > 0) {
        const mL = ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const mS = ['','Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
        const { hour, minute, second, month, day, year, hour12, meridian } = convertedStringToTime(this, timeFormat.includes("%UTC"));
        let convertedTime = timeFormat;
        convertedTime = convertedTime.replace(/%UTC/g, '');
        convertedTime = convertedTime.replace(/%d/g, twoDigit(day));
        convertedTime = convertedTime.replace(/%e/g, day);
        convertedTime = convertedTime.replace(/%p/g, meridian.toLowerCase());
        convertedTime = convertedTime.replace(/%P/g, meridian.toUpperCase());
        convertedTime = convertedTime.replace(/%Y/g, year);

        convertedTime = convertedTime.replace(/%m/g, twoDigit(month));
        convertedTime = convertedTime.replace(/%B/g, mL[month]);
        convertedTime = convertedTime.replace(/%b/g, mS[month]);

        convertedTime = convertedTime.replace(/%H/g, twoDigit(hour));
        convertedTime = convertedTime.replace(/%h/g, twoDigit(hour12));
        convertedTime = convertedTime.replace(/%M/g, twoDigit(minute));
        convertedTime = convertedTime.replace(/%S/g, twoDigit(second));
        convertedTime = convertedTime.replace(/%s/g, twoDigit(second));

        return(convertedTime);
    } else {
        return ("")
    }
}

function twoDigit(value: number | string) {
    let newValue = parseInt(value);
    return (`${newValue < 10 ? '0' : ''}${value}`)
}

function convertedStringToTime(time: string, utc: false) {
    let date =  new Date(time);
    if((parseInt(time).toString()) === time){
        date = new Date(time);
    }
    if(utc){
        const day = date.getUTCDate();
        const month = date.getUTCMonth() + 1;
        const year = date.getUTCFullYear();
        const hour = date.getUTCHours();
        const minute = date.getUTCMinutes();
        const second = date.getUTCSeconds();
        const hour12 = (hour%12) === 0 ? 12 : (hour%12);
        const meridian = hour >= 12 ? 'pm' : 'am';
        return ({hour, minute, second, month, day, year, hour12, meridian})
    }
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const hour12 = (hour%12) === 0 ? 12 : (hour%12);
    const meridian = hour >= 12 ? 'pm' : 'am';
    return ({hour, minute, second, month, day, year, hour12, meridian})
}