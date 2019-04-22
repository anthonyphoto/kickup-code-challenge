//Anthony's debounce function
function debounce(fn, tm){
    let timeout;
    return function() {
        clearTimeout(timeout);  // reset timer when additional call comes
        timeout = setTimeout(() => fn.apply(this, arguments), tm);
    }
}

module.exports = debounce;