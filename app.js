class NumFact {
  constructor() {}

  async getFact() {
    const resp = await axios.get("http://numbersapi.com/2");
    console.log(resp.data);
  }

  async multiNumFact() {
    const resp = await axios.get("http://numbersapi.com/2,3,4,20");
    console.log(resp.data);
  }

  async multiReq() {
    const arr = await Promise.all([
      axios.get("http://numbersapi.com/7"),
      axios.get("http://numbersapi.com/7"),
      axios.get("http://numbersapi.com/7"),
      axios.get("http://numbersapi.com/7"),
    ]);
    console.log(arr);
  }
}

//--------------------------------------DECK--------------------------------

let button = document.querySelector("button");
let cards = document.querySelector(".cards");

class Deck {
  constructor() {
    this.deck;
  }

  async newDeck() {
    let resp = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    console.log(resp);
    this.deck = resp.data.deck_id;
    return resp.data.deck_id;
  }

  async shuffle() {}

  async drawCard() {
    let resp = await axios.get(
      `https://deckofcardsapi.com/api/deck/${this.deck}/draw/?count=1`
    );
    // console.log(resp);
    // console.log(
    //   resp.data.cards[0].value,
    //   resp.data.cards[0].suit,
    //   resp.data.cards[0].image
    // );
    return {
      value: resp.data.cards[0].value,
      suit: resp.data.cards[0].suit,
      image: resp.data.cards[0].image,
    };
  }

  async ranCard() {
    let resp = await axios.get(
      "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
    );
    let ranDeckId = resp.data.deck_id;
    let res = await axios.get(
      `https://deckofcardsapi.com/api/deck/${ranDeckId}/draw/?count=2`
    );
    console.log(res.data);
  }

  addImage(url) {
    let card = document.createElement("div");
    let img = document.createElement("img");

    let angle = Math.random() * 90 - 45;
    let randomX = Math.random() * 40 - 20;
    let randomY = Math.random() * 40 - 20;

    img.src = url;
    img.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`;
    card.appendChild(img);
    cards.appendChild(card);
  }
}

async function handleButton(e) {
  console.log(e.target);
  let newDeck = new Deck();
  await newDeck.newDeck();
  let card = await newDeck.drawCard();
  //   console.log(card);
  newDeck.addImage(card["image"]);
}
document.addEventListener("DOMContentLoaded", function () {
  button.style.display = "block";
  button.innerText = "draw card";
  button.addEventListener("click", handleButton);
});
