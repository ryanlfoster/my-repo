//==============================================================================================//
//	Settings file - contains settings such as swipe sensitivity.
//==============================================================================================//
window.addEventListener("bridgeInitializeStart", function(evnt) {
    //	Swipe settings for touch input on mobile devices
    $.event.special.swipe.scrollSupressionThreshold = 30;  // (default: 10) (pixels) – More than this horizontal displacement, and we will suppress scrolling.
    $.event.special.swipe.horizontalDistanceThreshold = 200; // (default: 30) (pixels) – Swipe horizontal displacement must be less than this.
    $.event.special.swipe.verticalDistanceThreshold = 150; // (default: 75) (pixels) – Swipe vertical displacement must be less than this.
    $.event.special.swipe.durationThreshold = 300; // (default: 1000) (milliseconds) – More time than this, and it isn't a swipe.
});
