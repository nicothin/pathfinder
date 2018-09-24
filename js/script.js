document.addEventListener('DOMContentLoaded', function(){

  start.onclick = function() {

    cleanTracks();

    var tracks = getTracks(3, 16);
    console.log(tracks);
    var buttons = document.querySelectorAll('#buttons button');
    tracks.forEach(function(item) {
      buttons[item].classList.add('game__field-btn--track');
    });

  }

  // Очистка игрового поля
  function cleanTracks() {
    var buttons = document.querySelectorAll('#buttons button');
    buttons.forEach(function(item, i) {
      buttons[i].classList.remove('game__field-btn--track');
    });
  }

  // Генератор случайных чисел
  function randomInt(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  // Генератор позиций следов на произвольном поле
  function getTracks(tracksCounter, all) {
    var track = [];
    while (track.length < tracksCounter) {
      var num = randomInt(0, (all - 1));
      if (track.indexOf(num) === -1) {
        track.push(num);
      }
    }
    return track;
  }

});
