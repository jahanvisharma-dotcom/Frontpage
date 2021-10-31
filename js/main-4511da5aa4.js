/********************
header
********************/
$(".header .header__bars").on('click', function () {

    var selector = $(".header .header__nav")

    if (selector.hasClass('shown')) {
        selector.css('right', "100%");
        selector.removeClass('shown');
    } else {
        selector.css('right', "0");
        selector.addClass('shown');
    }
});

$(".header .header__nav span").on('click', function () {

    var selector = $(".header .header__nav")

    if (selector.hasClass('shown')) {
        selector.css('right', "100%");
        selector.removeClass('shown');
    } else {
        selector.css('right', "0");
        selector.addClass('shown');
    }
});



// Contact form
function onEmailSuccess(data, textStatus, jqXR) {
    console.log("Success")
    $('#contact-feedback').css("color", "green").html("Success! Your message has been sent. We will get back to you as soon as possible!")
    $('#contact-form').css("display","none")
    $('.contact-heading').css("display","none")
  }
  
  function onEmailError(jqXHR, textStatus, errorThrown) {
    console.log("Error")
    $('#contact-feedback').css("color", "red").html("Uh Oh! There was a problem with your request.")
  }
  
  $('#contact-button').click(function() {
    var name=$('#contact-name').val()
    var email=$('#contact-email').val()
    var message=$('#contact-message').val()
    var subject=$('#contact-subject').val()
    var data= JSON.stringify({
      name: name,
      email: email,
      message: message,
      subject: subject,
    })
  
    if (name === "" || email === "" || message === "" || subject === "") {
      $('#contact-feedback').css("color", "red").html("Uh Oh! You need to fill in all fields.")
    } else {
      $.ajax({
          type: "POST",
          url: 'https://api.red.wemesh.ca/contact',
        dataType   : 'json',
        contentType: 'application/json; charset=UTF-8',
          data: data,
          success: onEmailSuccess,
        error: onEmailError,
        });
    }
  });

  $(document).ready(init);

  let videosStarting = false

  // Starts the videos in the phone elements
  function videoStart($android, $iphone, $mac, $desktop) {
    if (!videosStarting) {
      videosStarting = true
      const startTime = 0
      $iphone.get(0).currentTime = startTime;
      $android.get(0).currentTime = startTime;
      $mac.get(0).currentTime = startTime;
      $desktop.get(0).currentTime = startTime;
      
      setTimeout(function () {
        videosStarting = false

        // $iphone.get(0).play();
        // $android.get(0).play();
        // $mac.get(0).play();
        // $desktop.get(0).play();
      }, 1000);
    }
  }

  const translations = {
    ar: {
      "watch-together": "شاهدوا معاً",
    },
    en: {
      "watch-together": "Watch Together",
    },
    es: {
      "watch-together": "¡Véanlo juntos!",
    },
    fr: {
      "watch-together": "Regardez ensemble",
    },
    it: {
      "watch-together": "Guardare Insieme",
    },
    pt: {
      "watch-together": "Assita com amigos",
    },
    ru: {
      "watch-together": "смотрите вместе",
    },
  }

  async function doTranslate() {
    var translates = document.querySelectorAll('[data-translate-key]')
    const language = navigator.languages?.[0].split("-")[0].toLowerCase()
    console.log(`translates `, translates, navigator.languages, language, translations[language])

    if ( language && translations[language] ) {

      translates.forEach(translateElement => {
        const translationKey = translateElement.dataset?.translateKey 
        console.log(`translateElement `, translationKey)

        if ( translationKey && translations[language][translationKey] ) {
            
          console.log(`replacing with`, translations[language][translationKey])
          translateElement.textContent = translations[language][translationKey]
        }
      })

    }
  }
  
  function isIphone() {
    return false
    return /iPad|iPhone|iPod/.test(navigator.platform);
  }
  
  function init() {
    /*
      Phone Video Sync Management
     */
    var $android = $("#android video"),
      $iphone = $("#iphone video"),
      $mac = $("#mac video"),
      $desktop = $("#desktop video"),
    
      elemsReady = 0,
      needReady = 4;

    doTranslate()
 
    // If the video is in the cache of the browser,
    // the 'canplaythrough' event might have been triggered
    // before we registered the event handler.
    if ($android.get(0).readyState > 3 ) {
      elemsReady++;
    } else {
      $android.one('canplay', function () {
        elemsReady++;
  
        if (elemsReady == needReady) {
          elemsReady = 0;
          videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
        }
      });
    }
    
    if ($iphone.get(0).readyState > 3 ) {
      elemsReady++;
    } else {
      $iphone.one('canplay', function () {
        elemsReady++;
  
        if (elemsReady == needReady) {
          elemsReady = 0;
          videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
        }
      });
    }
    
    if ($mac.get(0).readyState > 3 ) {
      elemsReady++;
    } else {
      $mac.one('canplay', function () {
        elemsReady++;
  
        if (elemsReady == needReady) {
          elemsReady = 0;
          videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
        }
      });
    }
    
    if ($desktop.get(0).readyState > 3 ) {
      elemsReady++;
    } else {
      $desktop.one('canplay', function () {
        elemsReady++;
  
        if (elemsReady == needReady) {
          elemsReady = 0;
          videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
        }
      });
    }

    if (elemsReady == needReady) {
      elemsReady = 0;
      videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
    }
  
    // $bgvid.on('canplay', function () {
    //   $bgvid.get(0).play();
    // });
  
    // $bgvid.on('ended', function () {
    //   $bgvid.get(0).play();
    // });
  
    // $djvid.on('canplay', function () {
    // $djvid.get(0).play();
    // });
  
    // $djvid.on('ended', function () {
    // $djvid.get(0).play();
    // });
  
    // These event listeners are used to sync video looping.
    $android.on('timeupdate', function (event) {
      if ( !videosStarting && event.target.currentTime < 0.5 ) {
        videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
      }
    });

    $iphone.on('timeupdate', function (event) {
      if ( !videosStarting && event.target.currentTime < 0.5 ) {
        console.log(`iphone start!`)
        videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
      }
    });

    $mac.on('timeupdate', function (event) {
      if ( !videosStarting && event.target.currentTime < 0.5 ) {
        console.log(`mac start!`)
        videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
      }
    });

    $desktop.on('timeupdate', function (event) {
      if ( !videosStarting && event.target.currentTime < 0.5 ) {
        console.log(`desktop start!`)
        videoStart($android, $iphone, $mac, $desktop/*, $vrvid*/);
      }
    });
  
  }


































