function registerController(name, controller) {
    angular.module('pineapple').controllerProvider.register(name, controller);
}

function resizeModuleContent() {
    var offset = 50;
    var height = ((window.innerHeight > 0) ? window.innerHeight : screen.height) - 1;
    height = height - offset;
    if (height < 1) height = 1;
    if (height > offset) {
        $(".module-content").css("min-height", (height) + "px");
    }
}

function collapseNavBar() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    if (width < 768) {
        $('div.navbar-collapse').removeClass('in');
    } else {
        $('div.navbar-collapse').addClass('in');
    }
}

function convertMACAddress(mac) {
    var pattern = /([-: ])/igm;
    return mac.replace(pattern, ":");
}

function locallyAssigned(mac) {
    return (parseInt('0x' + mac.split(':')[0]) & 0x02) !== 0;
}

function annotateMacs() {
    var mac_rows = $('td, .autoselect').filter(
        function() {
            return /^[0-9a-f]{1,2}([.:-])[0-9a-f]{1,2}(?:\1[0-9a-f]{1,2}){4}$/i.test(this.textContent.trim());
        });
    mac_rows.filter(function() {
            return locallyAssigned(this.textContent.trim());
        }).prop('title', '该MAC地址可能是本地分配的，并非由硬件厂商分配。可能是MAC随机化、欺骗或未向IEEE注册机构注册。').css('color', '#31708f');
    mac_rows.filter(function() {
            return !locallyAssigned(this.textContent.trim());
        }).prop('title', '该MAC地址可能由硬件厂商全球唯一分配，可能没有被随机化以保护隐私。');
}

function utcDate(timestampStr) {
    var a = timestampStr.split(' ');
    var ymd = a[0].split('-');
    var hms = a[1].split(':');
    /*
        In javascript, days and years are zero based but months are 1 based
        Go figure
    */
    return new Date(Date.UTC(ymd[0], ymd[1] - 1, ymd[2], hms[0], hms[1], hms[2]));
}

function selectElement(elem) {
    var selectRange = document.createRange();
    selectRange.selectNodeContents(elem);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(selectRange);
}

$('html').click(function(e){
    var elem = e.toElement;
    if (elem !== undefined && elem.classList.contains('autoselect')) {
        selectElement(elem);
    }
});

$(window).resize(function() {
    resizeModuleContent();
});

setInterval(annotateMacs, 1500);
