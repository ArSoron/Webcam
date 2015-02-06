(function () {
    var timer;

    var _elements = {
        prev: document.getElementById("prev"),
        next: document.getElementById("next"),
        curTime: document.getElementById("curTime"),
        realTime: document.getElementById("realTime"),
        nowPic: document.getElementById("nowPic"),
        navSlider: document.getElementById("navSlider")
    };

    
    $(function() {
        $(_elements.navSlider).slider({
            min: new Date().getTime() - 86400000,
            max: new Date().getTime(),
            value: new Date().getTime(),
            slide: function( event, ui ) {
                showImg(ui.value);
            }
        });
    });
     
    window.onload = function () {
        setCurTime();
        setNavLinks(new Date());

        _elements.prev.onclick = function () {
            showImg(this.getAttribute("goto"));
        };
        _elements.next.onclick = function () {
            showImg(this.getAttribute("goto"));
        };
        _elements.curTime.onclick = function () {
            setCurTime();
            showImg();
        };
        _elements.realTime.onclick = function (cb) {
            if (cb.currentTarget.checked) {
                realTimeStart();
            } else {
                realTimeStop();
            }
        };
    }

    function setCurTime() {
        var ldNow = new Date();
        _elements.curTime.innerHTML = getReadableTime(ldNow);
    }

    /* adds 0 before the number, untill it has correct length*/
    function getFullNum(shortNum, length) {

        if (!length) length = 2;
        var lcFullNum = Array(length + 1).join("0") + shortNum;
        return lcFullNum.substring(lcFullNum.length - length);
    }

    function getReadableTime(time) {
        time = new Date(+time);
        return getFullNum(time.getHours()) + "-" + getFullNum(time.getMinutes());
    }

    function getRelativeImagePath(time) {
        time = new Date(+time);
        return time.getFullYear() + "-" + getFullNum(time.getMonth() + 1) + "-" + getFullNum(time.getDate()) + "/" + getReadableTime(time) + ".jpg";
    }

    function setNavLinks(currTime) {

        currTime = new Date(+currTime);

        var prevMin = new Date(currTime);
        var prev = prevMin.setMinutes(prevMin.getMinutes() - 1);
        var nextMin = new Date(currTime);
        var next = nextMin.setMinutes(nextMin.getMinutes() + 1);

        if (new Date(+next).getTime() > new Date().getTime()) {
            _elements.next.style.display = "none";
        }
        else {
            _elements.next.style.display = "";
            _elements.next.setAttribute("goto", next);
        }

        _elements.prev.setAttribute("goto", prev);
        _elements.curTime.innerHTML = getReadableTime(currTime);
    }

    function showImg(time) {
        if (!!time && new Date(+time).getTime() > new Date().getTime())
            return;
        var imgUrl = "data/";
        imgUrl = imgUrl + (!!time ? getRelativeImagePath(time) : "image.jpg?" + new Date().getTime());
        setNavLinks(!!time ? time : new Date());
        _elements.nowPic.setAttribute("src", imgUrl);
    }

    function realTimeStop() {
        if (!!timer) {
            clearInterval(timer);
            timer = undefined;
        }
    }
    function realTimeStart() {
        timer = setInterval(function () {
            setCurTime();
            showImg();
        }, 30000);
    }
})();
