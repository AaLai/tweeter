/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  $(function() {
    var $button = $('.new-tweet input');
    $button.on('click', function () {
      event.preventDefault();
      $(this).parent().siblings('.error').hide(500);
      if ($(this).siblings('.counter').text() == 140) {
        $(this).parent().siblings('.error').text("Cannot submit empty tweet")
        $(this).parent().siblings('.error').show(500);
      } else if ($(this).siblings('.counter').text() < 0) {
        $(this).parent().siblings('.error').text("Message is too long!")
        $(this).parent().siblings('.error').show(500);
      } else {
      // console.log($('#newTweet'));
      // console.log('Button clicked, performing ajax call...');
      $.ajax({
        type : "POST",
        url : "/tweets/",
        data : $('#newTweet').serialize()
      });
      .complete(function() {
        $('#newTweet').trigger("reset");
        loadTweets('n');
      });
    }
  });
});

  $(function() {
    var $compose = $('#nav-bar .composer');
      $compose.on('click', function () {
        $('.new-tweet').slideToggle('fast');
        $('.new-tweet textarea').focus();
      });
  });

  const loadTweets = function (last) {
    if (last === 'n') {
      $.getJSON('/tweets/new', function(data) {
        console.log(data);
        $('section.old-tweet').prepend(createTweetElement(data[0]));
      });
    } else {
      $.getJSON('/tweets/', function(data) {
        $('section.old-tweet').append(renderTweet(data));
      });
    }
  }


  const createTweetElement = function (data) {
    let currentDate = new Date().getTime();
    let daysPast = Math.floor((currentDate - data.created_at) /1000 /60 /60 /24);
    const yearChanger = (date) => {
      if (date < 365) {
        return `${date} days ago`;
      } else {
        return `${Math.floor(date / 365)} years ago`;
      }
    }
    let $test =
      `<article class='tweet'>
        <header>
          <img class="avatar" src="${data.user.avatars.small}">
          <h2>${data.user.name}</h2>
          <span class="handle">${data.user.handle}</span>
        </header>
          <span class="contents"> ${escape(data.content.text)}</span>
        <footer>
          <span class="age"> ${yearChanger(daysPast)} </span>
          <button class="flag">🏴</button>
          <button class="reTweet">🔄</button>
          <button class="likes">❤️</button>
        </footer>
      </article>`;
    return $test;
  }

  const renderTweet = function (tweetArr) {
    tweetArr.forEach((element) => {
      $('.old-tweet').append(createTweetElement(element));
    });
  }

  // renderTweet(data);
  // $('.old-tweet').append($tweet);

loadTweets();



});

 // <article class='tweet'>
 //          <header>
 //            <img class="avatar" src="/images/cow.png">
 //            <h2> Cow of Duty </h2>
 //            <span class='handle'> @moo </span>
 //          </header>
 //            <span class="contents"> This is something! </span>
 //          <footer class="age">
 //          10 yrs ago
 //          </footer>
 //        </article>

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd" },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];
