/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

// -- escape for possible script injection

  function escape(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  const timeChanger = (min) => {
    if (min <= 1) {
      return `${min} minute ago`;
    } else if (min < 60) {
      return `${min} minutes ago`;
    } else if (min < 1440) {
      return `${Math.floor(min / 60)} hours ago`;
    } else if (min < (360 * 24)) {
      return `${Math.floor(min / 60 / 24)} days ago`;
    } else {
      return `${Math.floor(min / 60 / 24 / 365)} years ago`;
    }
  }

// --- Displays error message for incorrect input, sends new tweet to database, retreives it and appends to tweet list

  $(function() {
    const $button = $('.new-tweet input');
    $button.on('click', function () {
      event.preventDefault();
      $(this).parent().siblings('.error').hide(500);
      if ($(this).siblings('.counter').text() == 140) {
        $(this).parent().siblings('.error').text("Cannot submit empty tweet");
        $(this).parent().siblings('.error').show(500);
      } else if ($(this).siblings('.counter').text() < 0) {
        $(this).parent().siblings('.error').text("Message is too long!");
        $(this).parent().siblings('.error').show(500);
      } else {
        $.ajax({
          type : "POST",
          url : "/tweets/",
          data : $('#newTweet').serialize()
        })
        .then(function() {
          $('#newTweet').trigger("reset");
          $('#newTweet .counter').text('140');
          loadTweets('n');
        });
      }
    });
  });

// --- Makes compose button open and focus new tweet form

  $(function() {
    var $compose = $('#nav-bar .composer');
      $compose.on('click', function () {
        $('.new-tweet').slideToggle('fast');
        $('.new-tweet textarea').focus();
      });
  });

// --- Functions for creation of new tweets

  const loadTweets = function (last) {
    if (last === 'n') {
      $.getJSON('/tweets/new', function(data) {
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
    let daysPast = Math.floor((currentDate - data.created_at) /1000 /60);
    let $test =
      `<article class='tweet'>
        <header>
          <img class="avatar" src="${data.user.avatars.small}">
          <h2>${data.user.name}</h2>
          <span class="handle">${data.user.handle}</span>
        </header>
          <span class="contents"> ${escape(data.content.text)}</span>
        <footer>
          <span class="age"> ${timeChanger(daysPast)} </span>
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

// --- Initial load of tweets

loadTweets();


});