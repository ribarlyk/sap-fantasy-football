export function debouncer(func, timer) {
    let timerId = null;

    return function (...event) {
        clearTimeout(timerId);
        timerId = setTimeout(func, timer, ...event);
    };
}
