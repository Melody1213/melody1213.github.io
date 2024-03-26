var ismobile = navigator.userAgent.match(/(iPhone)|(iPod)|(android)|(webOS)|(BlackBerry)/i);
var scroll_x = $(window).width() / 2;
var floor_x = 0;
var mario_x = 0;
var mario_y = 100; 
var isJumping = false;
var direction = false;
var music_play = false;
var interval_left = false;
var interval_right = false;



if (ismobile) scroll_x -= 170;
else scroll_x -= 240;

$('#scroll').css('left', scroll_x + 'px');

// $('.tweet').click(function () {
//     window.open('https://twitter.com/intent/tweet?text=' + document.title + '&tw_p=tweetbutton&url=' + document.location.href);
//     return false;
// });

function moveTo(pos) {

    diff = ismobile ? 10 : 15;

    if (pos == 'left') {

        if (!direction) {
            direction = 'left';
            $('#mario').css('-webkit-transform', 'scaleX(-1)');
        }
        floor_x += diff;
        scroll_x += diff;
        mario_x -= 65;
        if (mario_x == -195) mario_x = 0;

    } else if (pos == 'right') {

        if (!direction) {
            direction = 'right';
            $('#mario').css('-webkit-transform', 'scaleX(1)');
        }
        floor_x -= diff;
        scroll_x -= diff;
        mario_x -= 65;
        if (mario_x == -195) mario_x = 0;

    } else {
        direction = false;
    }


    // reach end
    if (scroll_x < (parseInt($('#scroll').css('width')) * -1)) {
        scroll_x = $(window).width();


        // reach start
    } else if (scroll_x > $(window).width()) {
        scroll_x = parseInt($('#scroll').css('width')) * -1;
    }

    $('#scroll').css('left', scroll_x + 'px');
    $('#floor').css('background-position-x', floor_x + 'px');
    $('#mario').css('background-position-x', mario_x + 'px');
}


function playMusic() {
    if (!music_play) {
        document.getElementById("bg_music").play();
        music_play = true;
    }
}

function moveLeft() {
    playMusic();

    direction = false;
    if (!interval_left) {
        interval_left = setInterval(function () {
            moveTo('left');
        }, 100);
    }
}

function moveRight() {
    playMusic();

    direction = false;
    if (!interval_right) {
        interval_right = setInterval(function () {
            moveTo('right');
        }, 100);
    }
}

function stopMove() {
    clearInterval(interval_left);
    clearInterval(interval_right);
    interval_left = false;
    interval_right = false;
}

function moveUp() {
   
    if (!isJumping) {
        isJumping = true;
        var jumpHeight = 150; // Height of the jump
        var originalY = mario_y;

        // Move Mario up
        var upInterval = setInterval(function () {
            if (mario_y < originalY +  jumpHeight) {
                
                
                mario_y += 5; // Move up by 5 pixels each interval
                $('#mario').css('bottom', mario_y + 'px');
                checkCollision();
                
                
            } else {
                clearInterval(upInterval);
                // Start moving Mario down immediately after reaching jump height
                moveDown(originalY);
            }
        }, 10);
          
    }
    
}
function moveDown(originalY) {
    var downInterval = setInterval(function () {
        if (mario_y > originalY) {
            mario_y -= 5; // Decrease to move down
            $('#mario').css('bottom', mario_y + 'px');
            checkCollision();
        } else {
            clearInterval(downInterval);
            isJumping = false;
        }
    }, 10);
}
function checkCollision() {
    var mario = $('#mario');
    var video = $('.media video');
    
    var marioPosition = mario.offset();
    var videoPosition = video.offset();

    // Assuming Mario's size - adjust as necessary
    var marioHeight = 129; // height of Mario
    var marioWidth = 65; // width of Mario

    // Checking for overlap
    if (marioPosition.top + marioHeight > videoPosition.top &&
        marioPosition.left + marioWidth > videoPosition.left &&
        marioPosition.left < videoPosition.left + video.width()) {
        
        // Play the video if Mario is under it
        video.get(0).play();
    }
    
}




$(function () {

    $("body, #scroll").click(function () {
        playMusic();
    });

    $("body").keydown(function (e) {
        if (e.keyCode == 37) {
            moveLeft();
        } else if (e.keyCode == 39) {
            moveRight();
        } else if (e.keyCode == 38) { // Up arrow
            moveUp();
        }
    });

    $("body").keyup(function (e) {
        stopMove();
    });

    $('#btn_left').on('mousedown touchstart', function () {
        moveLeft();
    });

    $('#btn_right').on('mousedown touchstart', function () {
        moveRight();
    });

    $('#btn_left, #btn_right').on('mouseup touchend', function (event) {
        stopMove();
    });

});


let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("demo");
  let captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
} 