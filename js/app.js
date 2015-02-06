(function () {
    var timer;
    window.onload = function () {
        setCurTime();
        setNavLinks(new Date());

        document.getElementById('prev').onclick = function () {
            showImg(this.getAttribute('goto'));
        };
        document.getElementById('next').onclick = function () {
            showImg(this.getAttribute('goto'));
        };
        document.getElementById('curTime').onclick = function () {
            setCurTime();
            showImg();
        };
        document.getElementById('realTime').onclick = function (cb) {
            if (cb.currentTarget.checked) {
                realTimeStart();
            } else {
                realTimeStop();
            }
        };
    }

    function setCurTime() {
        var ldNow = new Date();
        document.getElementById('curTime').innerHTML = getReadableTime(ldNow);
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
            document.getElementById('next').style.display = "none";
        }
        else {
            document.getElementById('next').style.display = "";
            document.getElementById('next').setAttribute('goto', next);
        }

        document.getElementById('prev').setAttribute('goto', prev);
        document.getElementById('curImg').innerHTML = getReadableTime(currTime);
    }

    function showImg(time) {
        if (!!time && new Date(+time).getTime() > new Date().getTime())
            return;
        var imgUrl = "data/";
        imgUrl = imgUrl + (!!time ? getRelativeImagePath(time) : "image.jpg?" + new Date().getTime());
        setNavLinks(!!time ? time : new Date());
        document.getElementById('nowPic').setAttribute('src', imgUrl);
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