$(function() {
$(window).load(function() {
  // вешает обработчик событий на документ
  document.addEventListener('click', EvtListener);
});
});

// обработчик событий на документе
function EvtListener(e) {
  const $item = $(e.target);
  
  if (e.target.tagName == 'TD') {
    tdClick($item);
  }
}

// обрабатывает события клика на <td>
function tdClick($item) {
  const $td = $('td');
  const stringPosition = $item.attr('id');
  const stringPositions = searchMoves(stringPosition);
  
  $td.removeClass('tdGreen').removeClass('tdBlue');
  $('#' + stringPosition).addClass('tdBlue');
  stringPositions.forEach(function(value) {
    if (value[0] !== false) {
      let pos = value[0] + value[1];
      $('#' + pos).addClass('tdGreen');
    }
  });
}

// определяет все возможные ходы коня
function searchMoves(stringPosition) {
  let numberPosition = stringPositionToNumber(stringPosition);
  let numberPositions = [];
  let stringPositions = [];

  numberPositions[0] = [numberPosition[0]-1, numberPosition[1]+2];
  numberPositions[1] = [numberPosition[0]-1, numberPosition[1]-2];
  numberPositions[2] = [numberPosition[0]+1, numberPosition[1]+2];
  numberPositions[3] = [numberPosition[0]+1, numberPosition[1]-2];
  numberPositions[4] = [numberPosition[0]-2, numberPosition[1]+1];
  numberPositions[5] = [numberPosition[0]-2, numberPosition[1]-1];
  numberPositions[6] = [numberPosition[0]+2, numberPosition[1]+1];
  numberPositions[7] = [numberPosition[0]+2, numberPosition[1]-1];
  
  stringPositions = numberPositionsToString(numberPositions);
  return stringPositions;
}

// переводит позицию 'a1' в массив чисел [1,1]
function stringPositionToNumber(stringPosition) {
  let numberPosition = [];
  
  if ( 
    stringPosition.length === 2 
	&& isNaN( Number( stringPosition[0] ) ) 
	&& !isNaN( Number( stringPosition[1] ) ) 
  ) {
    switch( stringPosition[0].toUpperCase() ) {
      case 'A':
        numberPosition[0] = 1;
        break;
      case 'B':
        numberPosition[0] = 2;
        break;
      case 'C':
        numberPosition[0] = 3;
        break;
      case 'D':
        numberPosition[0] = 4;
        break;
      case 'E':
        numberPosition[0] = 5;
        break;
      case 'F':
        numberPosition[0] = 6;
        break;
      case 'G':
        numberPosition[0] = 7;
        break;
      case 'H':
        numberPosition[0] = 8;
        break;
      default: 
        numberPosition[0] = 0;
        break;
    }
	
    numberPosition[1] = Number( stringPosition[1] );
	
    if ( 
	  numberPosition[0] > 0 
	  && numberPosition[0] < 9 
	  && numberPosition[1] > 0 
	  && numberPosition[1] < 9 
	) {
    } else {
      alert( 'введены некорректные значения!' );
      return;
    }
  } else {
    alert( 'введены некорректные значения!' );
    return;
  }
  
  return numberPosition;
}

// переводит возможные и невозможные ходы формата: [ [1, 1], [0, 3], ... ] в возможные ходы формата: [ [A, 1], [false, false], ... ]
function numberPositionsToString( numberPositions ) {
  let stringPositions = [];
  
  numberPositions.forEach(function(value, index) {
    stringPositions[index] = [];
    if ( 
	  value[0] > 0 
	  && value[0] < 9 
	  && value[1] > 0 
	  && value[1] < 9 
	) {
      switch(value[0]) {
        case 1:
          stringPositions[index][0] = 'A';
          break;
        case 2:
          stringPositions[index][0] = 'B';
          break;
        case 3:
          stringPositions[index][0] = 'C';
          break;
        case 4:
          stringPositions[index][0] = 'D';
          break;
        case 5:
          stringPositions[index][0] = 'E';
          break;
        case 6:
          stringPositions[index][0] = 'F';
          break;
        case 7:
          stringPositions[index][0] = 'G';
          break;
        case 8:
          stringPositions[index][0] = 'H';
          break;
      }
	  
      stringPositions[index][1] = value[1];
    } else {
      stringPositions[index] = [false, false];
    }
  });
  
  return stringPositions;
}
