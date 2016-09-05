
(function(){
  
  var Memory = {

    init: function(cards){
      this.$game = $(".game");
      this.$modal = $(".modal");
      this.$overlay = $(".modal-overlay");
      this.$restartButton = $("button.restart");
      this.cardsArray = $.merge(cards, cards);
      this.shuffleCards(this.cardsArray);
      this.setup();
    },

    shuffleCards: function(cardsArray){
      this.$cards = $(this.shuffle(this.cardsArray));
    },

    setup: function(){
      this.html = this.buildHTML();
      this.$game.html(this.html);
      this.$memoryCards = $(".card");
      this.binding();
      this.paused = false;
      this.guess = null;
      this.counter = 0;
    },

    binding: function(){
      this.$memoryCards.on("click", this.cardClicked);
      this.$restartButton.on("click", $.proxy(this.reset, this));
    },
    // kinda messy but hey
    cardClicked: function(){
      Memory.counter++    
      var _ = Memory;
      var $card = $(this);
      var score = Math.round(Memory.counter/2)
      console.log(score)
      $('.score').html('you took' + score + 'goes')


      if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
        $card.find(".inside").addClass("picked");
        if(!_.guess){
          _.guess = $(this).attr("data-id");

        } else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
          $(".picked").addClass("matched");
          console.log('matched')
          // $('.score').html(Memory.counter /2)

          _.guess = null;

        } else {

          _.guess = null;
          _.paused = true;
          setTimeout(function(){
            $(".picked").removeClass("picked");
            Memory.paused = false;
          }, 600);
        }
        if($(".matched").length == $(".card").length){
          // $('.score').html(Memory.counter /2).round()
          _.win();
        }
      }
    },

    win: function(){
      this.paused = true;
      setTimeout(function(){
        Memory.showModal();
        Memory.$game.fadeOut();
      }, 1000);
    },

    showModal: function(){
      this.$overlay.show();
      this.$modal.fadeIn("slow");
    },

    hideModal: function(){
      this.$overlay.hide();
      this.$modal.hide();
    },

    reset: function(){
      this.hideModal();
      this.shuffleCards(this.cardsArray);
      this.setup();
      this.$game.show("slow");
    },

    // Fisher--Yates Algorithm -- http://bost.ocks.org/mike/shuffle/
    shuffle: function(array){
      var counter = array.length, temp, index;
      // While there are elements in the array
      while (counter > 0) {
          // Pick a random index
          index = Math.floor(Math.random() * counter);
          // Decrease counter by 1
          counter--;
          // And swap the last element with it
          temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
        }
        return array;
    },

    buildHTML: function(){
      var frag = '';
      this.$cards.each(function(k, v){
        frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
        <div class="front"><img src="'+ v.img +'"\
        alt="'+ v.name +'" /></div>\
        <div class="back"><img src="img/molly5.jpg"\
        alt="Satham" /></div></div>\
        </div>';
      });
      return frag;
    }
  };

  var cards = [
    {
      name: "molly1",
      img: "/img/molly1.jpg",
      id: 1,
    },
    {
      name: "molly2",
      img: "/img/molly2.jpg",
      id: 2
    },
    {
      name: "molly3",
      img: "/img/molly3.jpg",
      id: 3
    },
    {
      name: "molly4",
      img: "/img/molly4.jpg",
      id: 4
    }, 
    {
      name: "molly5",
      img: "/img/molly13.jpg",
      id: 5
    },
    {
      name: "molly6",
      img: "/img/molly6.jpg",
      id: 6
    },
    {
      name: "molly7",
      img: "/img/molly7.jpg",
      id: 7
    },
    {
      name: "molly8",
      img: "/img/molly8.jpg",
      id: 8
    },
    {
      name: "molly9",
      img: "/img/molly9.jpg",
      id: 9
    },
    {
      name: "molly10",
      img: "/img/molly10.jpg",
      id: 10
    },
    {
      name: "molly11",
      img: "/img/molly11.jpg",
      id: 11
    },
    {
      name: "molly12",
      img: "/img/molly12.jpg",
      id: 12
    },
  ];
    
  Memory.init(cards);


})();