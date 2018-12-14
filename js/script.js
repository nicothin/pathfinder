document.addEventListener('DOMContentLoaded', function(){

  const pathfinderConfig = {
    gameStarted: false,
    tracks: [],
    messages: {
      default: 'Следы будут показаны на 3 секунды.',
      gameStart: 'Укажите где были следы.',
      done: 'Раунд завершён.',
    }
  };

  const startButton = document.getElementById('start');
  const field = document.getElementById('buttons');
  const messagesArea = document.getElementById('message');
  const fieldPlaces = document.querySelectorAll('#buttons button');

  messagesArea.innerHTML = pathfinderConfig.messages.default;

  startButton.onclick = gameStart;

  field.onclick = function(event) {
    if(pathfinderConfig.gameStarted && pathfinderConfig.tracks.length) {
      const target = event.target;
      const index = [...target.parentNode.children].findIndex(n => n === target);
      // console.log('click: '+index);
      const clicketButtonPos = pathfinderConfig.tracks.indexOf(index);
      if (clicketButtonPos > -1) {
        target.classList.remove('btn-light');
        target.classList.add('btn-success', 'game__field-btn--track');
        pathfinderConfig.tracks.splice(clicketButtonPos, 1);
        // console.log(pathfinderConfig.tracks);
      }
      else {
        target.classList.remove('btn-light');
        target.classList.add('btn-danger');
        gameOver();
      }
      if(!pathfinderConfig.tracks.length) {
        gameOver();
      }
    }
  };

  function cleanTracks() {
    for (var i = 0; i < fieldPlaces.length; ++i) {
      fieldPlaces[i].classList.remove('game__field-btn--track', 'btn-success', 'btn-danger');
      fieldPlaces[i].classList.add('btn-light');
    }
  }

  function gameStart() {
    cleanTracks();
    pathfinderConfig.tracks = getTracks(3, 16);
    // console.log(pathfinderConfig.tracks);
    pathfinderConfig.tracks.forEach(function(item) {
      fieldPlaces[item].classList.add('game__field-btn--track');
    });
    startButton.setAttribute('disabled', true);
    setTimeout(function() {
      cleanTracks();
      messagesArea.innerHTML = pathfinderConfig.messages.gameStart;
      pathfinderConfig.gameStarted = true;
    }, 3000);
  }

  function gameOver() {
    pathfinderConfig.tracks.forEach(function(item) {
      fieldPlaces[item].classList.add('game__field-btn--track');
    });
    pathfinderConfig.gameStarted = false;
    pathfinderConfig.tracks = [];
    startButton.removeAttribute('disabled');
    messagesArea.innerHTML = pathfinderConfig.messages.done;
    setTimeout(function() {
      cleanTracks();
      messagesArea.innerHTML = pathfinderConfig.messages.default;
    }, 2000);
  }

  /**
   * Генератор случайных чисел
   * @param  {number} min От
   * @param  {number} max До
   * @return {number}     Результат генерации
   */
  function randomInt(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  /**
   * Генератор позиций следов на произвольном поле
   * @param  {number} tracksCounter Кол-во следов, которое нужно вернуть
   * @param  {number} all           Длина игрового поля
   * @return {array}                Номера позиций со следами
   */
  function getTracks(tracksCounter, all) {
    const track = [];
    while (track.length < tracksCounter) {
      let num = randomInt(0, (all - 1));
      if (track.indexOf(num) === -1) {
        track.push(num);
      }
    }
    // console.log(track);
    return track;
  }

});
