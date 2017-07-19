;(function() {

    var addLoadedClass = function(elmId) {
        var elm = document.getElementById(elmId);
        if (!elm) {
            window.addEventListener('DOMContentLoaded', function() {
                var elm = document.getElementById(elmId);
                elm.classList.add('is-loaded');
            });
        } else {
            elm.classList.add('is-loaded');
        }
    }
    addLoadedClass('script-2-status');

    console.log('script-2-small.js finished executing');

})();
