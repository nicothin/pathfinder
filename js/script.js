document.addEventListener('DOMContentLoaded', function(){

  const pathfinderConfig = {
    gameStarted: false,
    fieldSize: 16,
    traces: 3,
    tracks: [],
    message: {
      default: 'Следы будут показаны на 3 секунды.',
      start: 'Укажите где были следы.',
      error: 'Ошибка, начните заново.',
      done: 'Раунд завершён.',
    },
    selector: {
      start: '.game__start',
      message: '.game__message',
      fields: '.game__field',
      place: '.game__place',
      fieldTrack: '.game__place--track',
      fieldSuccess: '.game__place--success',
      fieldError: '.game__place--error',
    },
    placeHTML: '<button class="game__place"></button>',
    placeWidth: 46,
  };

  const fields = document.querySelector(pathfinderConfig.selector.fields);
  const startButton = document.querySelector(pathfinderConfig.selector.start);
  const messagesArea = document.querySelector(pathfinderConfig.selector.message);

  messagesArea.innerHTML = pathfinderConfig.message.default;
  startButton.classList.remove('hidden');

  drawField();

  startButton.addEventListener('click', gameStart);

  fields.addEventListener('click', function(event) {
    if(pathfinderConfig.gameStarted) {
      const target = event.target;
      const index = [...target.parentNode.children].findIndex(n => n === target);
      const clicketButtonPos = pathfinderConfig.tracks.indexOf(index);
      if (clicketButtonPos > -1) {
        // console.log('yes');
        target.classList.add(pathfinderConfig.selector.fieldSuccess.slice(1));
        pathfinderConfig.tracks.splice(clicketButtonPos, 1);
        console.log(pathfinderConfig.tracks);
        if(!pathfinderConfig.tracks.length) {
          console.log(pathfinderConfig.message.done);
          gameOver(pathfinderConfig.message.done);
        }
      }
      else {
        console.log(pathfinderConfig.message.error);
        target.classList.add(pathfinderConfig.selector.fieldError.slice(1));
        gameOver(pathfinderConfig.message.error);
      }
    }
  });

  function gameStart() {
    cleanField();
    pathfinderConfig.tracks = getTracks(pathfinderConfig.traces, pathfinderConfig.fieldSize);
    // console.log(pathfinderConfig.tracks);
    drawField();
    showTracks();
    startButton.setAttribute('disabled', true);
    setTimeout(function() {
      hideTracks();
      messagesArea.innerHTML = pathfinderConfig.message.start;
      pathfinderConfig.gameStarted = true;
    }, 3000);
  }

  function gameOver(message) {
    pathfinderConfig.gameStarted = false;
    pathfinderConfig.tracks = [];
    startButton.removeAttribute('disabled');
    messagesArea.innerHTML = message;
    pathfinderConfig.tracks.forEach(function(item) {
      fieldPlaces[item].classList.add(pathfinderConfig.selector.fieldTrack.slice(1));
    });
    setTimeout(function() {
      cleanTracks();
      messagesArea.innerHTML = pathfinderConfig.message.default;
    }, 2000);
  }

  function cleanField() {
    fields.innerHTML = '';
  }

  function getFieldHTML(fieldSize, fieldHTML) {
    let html = '';
    for (let i = 0; i < fieldSize; i++) {
      html += fieldHTML;
    }
    return html;
  }

  function drawField() {
    fields.innerHTML = getFieldHTML(pathfinderConfig.fieldSize, pathfinderConfig.placeHTML);
    fields.style.width = Math.sqrt(pathfinderConfig.fieldSize) * pathfinderConfig.placeWidth + 'px';
  }

  function showTracks() {
    const places = document.querySelectorAll(pathfinderConfig.selector.place);
    pathfinderConfig.tracks.forEach(function(item) {
      places[item].classList.add(pathfinderConfig.selector.fieldTrack.slice(1));
    });
  }

  function hideTracks() {
    const places = Array.from(document.querySelectorAll(pathfinderConfig.selector.place));
    places.forEach(function(item) {
      item.classList.remove(pathfinderConfig.selector.fieldTrack.slice(1));
    });
  }

  function cleanTracks() {
    const places = Array.from(document.querySelectorAll(pathfinderConfig.selector.fieldTrack));
    places.forEach(function(item) {
      item.classList
        .remove(pathfinderConfig.selector.fieldTrack.slice(1))
        .remove(pathfinderConfig.selector.fieldSuccess.slice(1))
        .remove(pathfinderConfig.selector.fieldError.slice(1));
    });
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
