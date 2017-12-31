
// Board object

let Board = function (){
	this.active_player = 1;
	this.inactive_player = 2;
	this.players = Array.from($('.players'));
	this.boxes_filled = 0;
	this.boxes = $('.box');	

	this.box_is_filled = function($box){

		return ($box.hasClass('box-filled-1') || $box.hasClass('box-filled-2'));
	}

	this.boxes.mouseenter((e)=>{
		let current_box = e.target;
		if(!this.box_is_filled($(current_box))) {
			if(this.active_player == 1){
				current_box.style = 'background-image: url(img/o.svg)';
			} else {
				current_box.style = 'background-image: url(img/x.svg)';
			}
	}
	
	});

	this.boxes.mouseleave((e)=>{
		let current_box = e.target;
		if(!this.box_is_filled($(current_box))) {
			current_box.style = 'background-image: none';
		}
	});

}

// Change the player after a cell is clicked

Board.prototype.toggle_active_player = function(){
	current_player = this.active_player == 1 ? 2 : 1;
	this.set_active_player(current_player);
}

// Once the player changes, set up for the new player.

Board.prototype.set_active_player = function(new_player) {
	this.active_player = new_player;
	this.inactive_player = this.active_player == 1 ? 2 : 1;
	$(this.players[this.active_player-1]).addClass('active');
	$(this.players[this.inactive_player-1]).removeClass('active');
}

// After a cell is clicked see if there is any winning condition.

Board.prototype.is_there_a_winner = function(current_box, box_class){

	col = current_box.dataset.col;
	row = current_box.dataset.row;

	function check_xy(type, number, box_class){
		let boxes_in_line = Array.from($(`[data-${type}=${number}]`));

		return(boxes_in_line.reduce((acc, curr)=>
			{
				let has_class = $(curr).hasClass(box_class) == true;
				return(has_class * acc);

			}, true));
	}

	function check_diagonal(row, col, box_class){

		function check_class(r, c){
			let curr_box = $(`[data-col=${c}][data-row=${r}]`);
			return(curr_box.hasClass(box_class)); 
		}

		if (row == col){
			for(let i = 1; i <=3; i++){
				if(!check_class(i, i)) return false;
			}

		 	return true;
		} else if( (row=='3' && col == '1') || (row=='1' && col == '3')) {
			
			for(let r=1, c=3; r<=3, c>=1; r++,c-- ){
				if(!check_class(r, c)) return false;
			}

			return true;

		} else {
			return false;
		}
	}

	if(check_xy('row', row, box_class) || check_xy('col',col, box_class) || check_diagonal(row, col, box_class)){
		console.log(`We have a winner ${this.active_player}`);
		return 'yes';
	}

	if(this.boxes_filled == 9){
		console.log('Its a draw');
		return 'draw';
	}

	return 'no';
}

// Function to set the screen to start, board or win

function screen(type, winner='screen-win-tie', message) {
	html_content = {
		start:  `<div class="screen screen-start" id="start">
			  		<header>
			    		<h1>Tic Tac Toe</h1> 
			    		<a href="#" class="button">Start game</a>
			  		</header>
				</div>`,

		board: `<div class="board" id="board">
				  <header>
				    <h1>Tic Tac Toe</h1> 
				    <ul>
				      <li class="players" id="player1"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 42 42" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-200.000000, -60.000000)" fill="#000000"><g transform="translate(200.000000, 60.000000)"><path d="M21 36.6L21 36.6C29.6 36.6 36.6 29.6 36.6 21 36.6 12.4 29.6 5.4 21 5.4 12.4 5.4 5.4 12.4 5.4 21 5.4 29.6 12.4 36.6 21 36.6L21 36.6ZM21 42L21 42C9.4 42 0 32.6 0 21 0 9.4 9.4 0 21 0 32.6 0 42 9.4 42 21 42 32.6 32.6 42 21 42L21 42Z"/></g></g></g></svg></li>
				      <li class="players" id="player2"><svg xmlns="http://www.w3.org/2000/svg" width="42" height="43" viewBox="0 0 42 43" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-718.000000, -60.000000)" fill="#000000"><g transform="translate(739.500000, 81.500000) rotate(-45.000000) translate(-739.500000, -81.500000) translate(712.000000, 54.000000)"><path d="M30 30.1L30 52.5C30 53.6 29.1 54.5 28 54.5L25.5 54.5C24.4 54.5 23.5 53.6 23.5 52.5L23.5 30.1 2 30.1C0.9 30.1 0 29.2 0 28.1L0 25.6C0 24.5 0.9 23.6 2 23.6L23.5 23.6 23.5 2.1C23.5 1 24.4 0.1 25.5 0.1L28 0.1C29.1 0.1 30 1 30 2.1L30 23.6 52.4 23.6C53.5 23.6 54.4 24.5 54.4 25.6L54.4 28.1C54.4 29.2 53.5 30.1 52.4 30.1L30 30.1Z"/></g></g></g></svg></li>
				    </ul>
				  </header>
				  <ul class="boxes">
				    <li class="box" data-row='1' data-col='1'></li>
				    <li class="box" data-row='1' data-col='2'></li>
				    <li class="box" data-row='1' data-col='3'></li>
				    <li class="box" data-row='2' data-col='1'></li>
				    <li class="box" data-row='2' data-col='2'></li>
				    <li class="box" data-row='2' data-col='3'></li>
				    <li class="box" data-row='3' data-col='1'></li>
				    <li class="box" data-row='3' data-col='2'></li> 
				    <li class="box" data-row='3' data-col='3'></li>
				  </ul>
				</div>`,

		win: `<div class="screen screen-win ${winner}" id="finish">
				  <header>
				    <h1>Tic Tac Toe</h1>
				    <p class="message">${message}</p>
				    <a href="#" class="button">New game</a>
				  </header>
				</div>`
	}

	$('body').empty();
	$('body').html(this.html_content[type]);
	return(type);
}

// Start a new game 

function new_game(){
	screentype = screen('board');
	board = new Board();
	board.set_active_player(1);

	board.boxes.click((e)=>{
		let current_box = e.target;
		let box_class = '';

		if(!board.box_is_filled($(current_box))) {
			if(board.active_player == 1){
				box_class = 'box-filled-1';

			} else {
				box_class = 'box-filled-2';
			}

			$(current_box).addClass(box_class);
			board.boxes_filled++;
			let result = board.is_there_a_winner(current_box, box_class);

			switch(result) {
				case 'yes': 
					end_game(result);
					break;

				case 'draw':
					end_game(result);
					break;

				case 'no':
					break;
			}

			board.toggle_active_player();
		}
	});
}

// End a game

function end_game(result){

	// check the result after the game has ended and set the win screen accordingly. 

	let message = '';
	if(result == 'yes') {
		winner_class = board.active_player == 1 ? 'screen-win-one' : 'screen-win-two';
		message = 'Winner'
	} else {
		winner_class = 'screen-win-tie';
		message = "It's a draw";
	}

	screen('win', winner_class, message);

	// If the new game button is clicked start a new game.

	$new_game = $('#finish .button');
	screentype = 'win';
	$new_game.click(()=>{
		new_game();

	});
}

// set the screen to start screen

let screentype = 'start';
screen('start');
let $start_button = $('#start .button');

// when a start button is clicked, start a new game.

$start_button.click(()=>{
	new_game();

});
