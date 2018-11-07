'use strict';

// ----------------------------- open/close hamburger menu

var hamburger = function () {
    var btn = document.getElementById('btn-nav'),
        menuBtn = document.getElementById('menu-btn'),
        defaultClass = menuBtn.className;

    btn.onclick = function () {
        var menuClass = document.getElementById('menu-btn').className;
    
        if (menuClass == defaultClass) {
            menuBtn.className = defaultClass + ' active';
        } else {
            menuBtn.className = defaultClass;
        }
        return false;
    }
};

// ----------------------------- arrow-down-scroll

var scroll = function () {
    var arrow = document.getElementById('js-arrow-down'),
        sectionToScroll = document.getElementById('js-section-2'),
        distanceToTop = sectionToScroll.offsetTop;

    arrow.onclick = function () {
        window.scrollTo({
            top: distanceToTop,
            behavior: "smooth"
        });
        return false;
    }
};



(function () {
    if (document.getElementById('btn-nav')) {
        hamburger();
    }
    
    if (document.getElementById('js-arrow-down')) {
        scroll();
    }
})();