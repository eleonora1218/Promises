// Part 1: Number Facts
// Part 1: Number Facts
// Part 1: Number Facts

// // ASYNC/AWAIT
// let favNumber = 5;
// let baseURL = "http://numbersapi.com";

// // 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.
// async function part1() {
//   let data = await $.getJSON(`${baseURL}/${favNumber}?json`);
//   console.log(data);
// }
// part1();

// // 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
// const favNumbers = [7, 11, 22];
// async function part2() {
//   let data = await $.getJSON(`${baseURL}/${favNumbers}?json`);
//   console.log(data);
// }
// part2();

// // 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
// async function part3() {
//   let facts = await Promise.all(
//     Array.from({ length: 4 }, () => $.getJSON(`${baseURL}/${favNumber}?json`))
//   );
//   facts.forEach(data => {
//     $('body').append(`<p>${data.text}</p>`);
//   });
// }
// part3();


// PROMISES
let favNumber = 18;
let URL = "http://numbersapi.com";

// 1. Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API. Details.
$.getJSON(`${URL}/${favNumber}?json`).then(data => {
  console.log(data);
});

// 2. Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.
let favNumbers = [7, 11, 22];
$.getJSON(`${URL}/${favNumbers}?json`).then(data => {
  console.log(data);
});

// 3. Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.
Promise.all(
  Array.from({ length: 4 }, () => {
    return $.getJSON(`${URL}/${favNumber}?json`);
  })
).then(facts => {
  facts.forEach(data => $("span").append(`<p>${data.text}</p>`));
});




// Part 2: Deck of Cards
// Part 2: Deck of Cards
// Part 2: Deck of Cards

// // ASYNC/AWAIT
// $(function() {
//     let baseURL = 'https://deckofcardsapi.com/api/deck';
  
//     // 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
//     async function part1() {
//       let data = await $.getJSON(`${baseURL}/new/draw/`);
//       let { suit, value } = data.cards[0];
//       console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
//     }
  
//     // 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck. Once you have both cards, console.log the values and suits of both cards.
//     async function part2() {
//       let firstCardData = await $.getJSON(`${baseURL}/new/draw/`);
//       let deckId = firstCardData.deck_id;
//       let secondCardData = await $.getJSON(`${baseURL}/${deckId}/draw/`);
//       [firstCardData, secondCardData].forEach(card => {
//         let { suit, value } = card.cards[0];
//         console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
//       });
//     }
  
//     // 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
//     async function setup() {
//       let $btn = $('button');
//       let $cardArea = $('#card-area');
  
//       let deckData = await $.getJSON(`${baseURL}/new/shuffle/`);
//       $btn.show().on('click', async function() {
//         let cardData = await $.getJSON(`${baseURL}/${deckData.deck_id}/draw/`);
//         let cardSrc = cardData.cards[0].image;
//         let angle = Math.random() * 90 - 45;
//         let randomX = Math.random() * 40 - 20;
//         let randomY = Math.random() * 40 - 20;
//         $cardArea.append(
//           $('<img>', {
//             src: cardSrc,
//             css: {
//               transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
//             }
//           })
//         );
//         if (cardData.remaining === 0) $btn.remove();
//       });
//     }
//     setup();
//   });



// Promises 
$(function() {
    let baseURL = 'https://deckofcardsapi.com/api/deck';
  
    // 1. Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).
    $.getJSON(`${baseURL}/new/draw/`).then(data => {
      let { suit, value } = data.cards[0];
      console.log(`${value.toLowerCase()} of ${suit.toLowerCase()}`);
    });
  
    // 2. Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the same deck. Once you have both cards, console.log the values and suits of both cards.
    let firstCard = null;
    $.getJSON(`${baseURL}/new/draw/`)
      .then(data => {
        firstCard = data.cards[0];
        let deckId = data.deck_id;
        return $.getJSON(`${baseURL}/${deckId}/draw/`);
      })
      .then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card) {
          console.log(
            `${card.value.toLowerCase()} of ${card.suit.toLowerCase()}`
          );
        });
      });
  
    // 3. Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.
    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');
  
    $.getJSON(`${baseURL}/new/shuffle/`).then(data => {
      deckId = data.deck_id;
      $btn.show();
    });
  
    $btn.on('click', function() {
      $.getJSON(`${baseURL}/${deckId}/draw/`).then(data => {
        let cardSrc = data.cards[0].image;
        let angle = Math.random() * 90 - 45;
        let randomX = Math.random() * 40 - 20;
        let randomY = Math.random() * 40 - 20;
        $cardArea.append(
          $('<img>', {
            src: cardSrc,
            css: {
              transform: `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
            }
          })
        );
        if (data.remaining === 0) $btn.remove();
      });
    });
  });