const padSingleDigits = (n) => {
    return ('0' + n).slice(-2);
}
export const calcTimePlayed = (startedAt) => {
    const date = new Date();
    const diff = new Date(date - startedAt);
    const hours = padSingleDigits(diff.getUTCHours());
    const minutes = padSingleDigits(diff.getUTCMinutes());
    const seconds = padSingleDigits(diff.getUTCSeconds());
    return `${hours}:${minutes}:${seconds}`
};

export const calcDifferenceInSeconds = (startedAt) => {
    const date = new Date();
    const diff = new Date(date - startedAt);
    let diffInSeconds = diff.getTime()/1000;
    return Math.floor(diffInSeconds);
};

export const convertSecondsToHMS = (seconds) => {
    let totalSeconds = seconds;
    hours = padSingleDigits(Math.floor(totalSeconds / 3600));
    totalSeconds %= 3600;
    minutes = padSingleDigits(Math.floor(totalSeconds / 60));
    seconds = padSingleDigits(totalSeconds % 60);

    return `${hours}:${minutes}:${seconds}`;
};