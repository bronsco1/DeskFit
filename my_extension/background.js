'use strict';


window.onLoad = check();

function check() 
{
    chrome.storage.local.get('defaultLoad', function (x) 
    {
        if (x.defaultLoad == undefined) 
        {
            chrome.storage.local.set({'defaultLoad': '0'}, function() 
            {
                console.log('default');
            });
            defaultLoad();
        }
    });
}

function defaultLoad() {
    chrome.storage.local.set({'style': 'auto'}, function() 
    {
        console.log('style default');
    });
    chrome.storage.local.set({'timeLeft': '15000'}, function() 
    {
        console.log('timeleft default');
    });
}

chrome.alarms.onAlarm.addListener(function() 
{
    chrome.browserAction.setBadgeText({text: ''});
    chrome.notifications.create({
        type:     'basic',
        iconUrl:   chrome.extension.getURL('icon/icon128.png'),
        title:    'Time for your daily deskercise',
        // message:  '',
        buttons: [
        {title: 'Keep it Movin.'}
        ],
        priority: 0});
});

chrome.notifications.onButtonClicked.addListener(function() 
{
    chrome.storage.local.get(['minutes'], function(x) {
        chrome.browserAction.setBadgeText({text: 'ON'});
        chrome.alarms.create({delayInMinutes: x.minutes});
    });
});

chrome.storage.onChanged.addListener(function() 
{
    window.location.reload(true);
});

function load()
{
    chrome.storage.local.get(['style', 'timeLeft'], function (x) 
    {
        var workoutStyle = document.getElementById('workoutStyle');

    $('#workoutStyle').text(x.style);
    if (x.style == 'auto')
    {
        // alert('auto');
        $('#timer').text(x.timeLeft);
        document.getElementById('myCarousel').setAttribute('data-ride', 'carousel');
        alert(parseInt(x.timeLeft));
        
        //document.getElementById('myCarousel').setAttribute('data-interval', parseInt(x.timeLeft) * 1000);
          document.getElementById('myCarousel').setAttribute('data-interval', 15000);
                    // hide controls
                    document.getElementById('leftNav').style.cssText = "visibility : hidden";
                    document.getElementById('rightNav').style.cssText = "visibility : hidden";


                } else if (x.style == 'manual')
                {
                    $('#timer').text("");
                    document.getElementById('myCarousel').setAttribute('data-interval', 'false');
                    document.getElementById('myCarousel').setAttribute('data-ride', 'false');
                }

                var $this;
                var replay = document.getElementById("replay");
                $this = $("#myCarousel");
                if ($("#myCarousel .carousel-inner .item:last").hasClass("active")) 
                {
            // display replay button
            replay.style.display = 'block';

            // call log function to log the data and store in local storage
            // log();
        } else
        {
            replay.style.display = 'none';
        }
    });
}


function log()
{
    alert('log');
            // chrome.storage.local.set({'duration': '0'}, function() 
            // {
        // alert('style default');
        // targetSlide = $(this).attr('data-to') - 1;
 //this one doesn't work $('#my-carousel').carousel(targetSlide); 
//  $('#myCarousel').carousel('next');
// });

}


function replay()
{
    $('#myCarousel').carousel(0);
}

  // $(window).load(function() {
  //     load();
  //  });

  document.getElementById('replay').addEventListener('click', replay);
  document.addEventListener('DOMContentLoaded', load);

  // $(document).on('reset', function(){
  //   reset();
  // });
