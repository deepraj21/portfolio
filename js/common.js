//for header
(function() {
    const toggleHeader = function(direction, curScroll) {
        if (direction === 2 && curScroll > 92) { //replace 92 with the height of your header in px
            header.classList.add('hide');
            prevDirection = direction;
        } else if (direction === 1) {
            header.classList.remove('hide');
            prevDirection = direction;
        }
    };
    let prevScroll = window.scrollY || document.documentElement.scrollTop;
    let curScroll;
    let direction = 0;
    let prevDirection = 0;
    const header = document.getElementById('site-header');
    const bgElement = document.querySelector('.bg');
    const bgHeight = bgElement && bgElement.clientHeight > 494 ? bgElement.clientHeight : 0;
    const checkScroll = function() {
        /*
         ** Find the direction of scroll
         ** 0 - initial, 1 - up, 2 - down
         */
        curScroll = window.scrollY || document.documentElement.scrollTop;
        if (curScroll > prevScroll) {
            //scrolled up
            direction = 2;
        } else if (curScroll < prevScroll) {
            //scrolled down
            direction = 1;
        }

        if (curScroll > bgHeight) {
            header.classList.add('background');
        } else {
            header.classList.remove('background');
        }

        if (direction !== prevDirection) {
            toggleHeader(direction, curScroll);
        }
        prevScroll = curScroll;
    };
    window.addEventListener('scroll', checkScroll);
})();

//for mobile header
function showMobileMenu() {
    const siteHeader = document.getElementById('site-header')
    siteHeader.classList.toggle("header-mobile");
}


