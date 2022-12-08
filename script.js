const instructionsButton =  document.getElementById('instructionsButton');
const exitButton =  document.getElementById('exitButton');
const closeinfo =  document.getElementById('close');

// Instructions Button
instructionsButton.addEventListener('click', instructions);
function instructions() {
	modal.style.display = 'block';
};

//Exit Button
exitButton.addEventListener('click', exit);
function exit() {
    location.href = 'https://www.w3schools.com/';
};

// Close button after reading instructions
closeinfo.addEventListener('click', close);
function close() {
    document.getElementById('modal').style.display = 'none';
};

// Choices display
function intToChar(n) {
	return String.fromCharCode(n);
}

// When pressing new game button
function newgame(){
    document.getElementById('levelContainer').style.display='';
	document.getElementById('container').style.display='none';
	 
}

// When pressing return button
function returnback(){
    document.getElementById('levelContainer').style.display='none';
	document.getElementById('container').style.display='';
	
}

// Getting random letters in display choices
function rand(min, max) {
	return Math.floor(Math.random() * (max - min) ) + min;
}
  
// Shuffling of random letters with answers in choices display
function shuffleArray(array) {
	let length = array.length,
		currentIndex;
	  	for (currentIndex = length - 1; currentIndex > 0; currentIndex--) {
		let randIndex = Math.floor(Math.random() * (currentIndex + 1) );
		let temp = array[currentIndex];
		array[currentIndex] = array[randIndex];
		array[randIndex] = temp;
		}
}
  
  	let correct= 0;
  	let currentSelectedAnswer = [];
  	let cl = 0;
  
  	let images = [
  		['image1.jpg', 'image2.jpg', 'image3.jpg', 'image4.jpg'],
  		['boolean1.png', 'boolean2.png', 'boolean3.png', 'boolean4.jpg'],
  		['lang1.jpg', 'lang2.jpg', 'lang3.png', 'lang4.jpg'],
  		['emmet1.jpg', 'emmet2.png', 'emmet3.jpg', 'emmet4.jpg'],
		['prog1.png', 'prog2.png', 'prog3.jpg', 'prog4.jpg'],
		['fram1.png', 'fram2.png', 'fram3.png', 'fram4.png']
  	];

	// Array of answers
  	let answers = [
		'CODING',
		'BOOLEAN',
	  	'LANGUAGE',
	  	'EMMET',
		'PROGRAM',
		'FRAMEWORK'
  	];
  
  	updateAnswer(1);
  	updateChoices(1);

// Update answer as you pass the level
function updateAnswer(newLevel){
	if(newLevel == 1){
		correct = 0;
  		if(cl > 5)
  		cl= 0;
		newlifebar();
		currentSelectedAnswer = Array(answers[cl].length).fill(1);
	
		let answerspace=document.getElementById('answerspace');	 
			answerspace.textContent = '';
			for(let i = 0; i < answers[cl].length; i++){
				let ans =  document.createElement('input');
				ans.readOnly=true;
				ans.style.width = '40px';
				ans.style.height = '40px'; 	
				ans.style.textAlign = 'center';
				ans.style.margin = '3px';
				ans.setAttribute('id', 'char_'+i);
				answerspace.append(ans);         
			}
		document.getElementById('level1-img1').src = 'assets/images/level'+(cl+1)+'/'+images[cl][0];
		document.getElementById('level1-img2').src = 'assets/images/level'+(cl+1)+'/'+images[cl][1];
		document.getElementById('level1-img3').src = 'assets/images/level'+(cl+1)+'/'+images[cl][2];
		document.getElementById('level1-img4').src = 'assets/images/level'+(cl+1)+'/'+images[cl][3];
	}
}
  
// Lists of random letters to appear on choices
function updateChoices(newLevel){
	let choicesTopick = Array(20).fill('A');
	
	for(let i=0; i < choicesTopick.length; i++){
		if(answers[cl].length > i)
			choicesTopick[i] = answers[cl][i];
		else
		choicesTopick[i] = intToChar(rand(65,90))+'';
  	}

	shuffleArray(choicesTopick);
		let choicespace = document.getElementById('choicespace');	 
		choicespace.textContent = '';
		for(let i = 0; i < 20; i++){
			let choice = document.createElement('input');
			choice.readOnly= true;	
			choice.style.width = '40px';
			choice.style.height = '40px'; 	
			choice.style.textAlign = 'center';
			choice.style.margin = '3px';
			choice.style.caretColor= 'transparent';
			choice.setAttribute('id', 'choice_'+i);
			choice.style.cursor = 'pointer';
			choice.value=choicesTopick[i];  
			choicespace.append(choice);

			// Check if clicked choice is equal to answers
			choice.addEventListener('click', function handleClick(event) {
				var elementclicked = document.getElementById(this.id);   
				var bgelement = window.getComputedStyle( elementclicked, null).getPropertyValue('background-color');
				if(bgelement=='rgb(255, 255, 255)'){  
					var chkif= false; 
  					let val = document.getElementById(this.id).value;
	   					for(let u = 0; u < answers[cl].length; u++){
			   			if(currentSelectedAnswer[u] == 1 && val == answers[cl][u])
					{
						chkif= true;
						currentSelectedAnswer[u]= 0;
		  				document.getElementById('char_'+u).value=val; correct++; 
						document.getElementById(this.id).style.background='green';
		  				document.getElementById(this.id).readOnly=true; break;
					}
						}

					if(!chkif) {
						elementclicked.style.background='red';
						mistake();
					}
                  		
					if(correct==answers[cl].length){
						cl++;
  						updateChoices(0);
						alert('GREAT!');
						updateAnswer(1);
  					}

		
				}
			});
	
			// Insert choices to the right place
			choicespace.append(choice);
  				if(i==9){
	  			let space = document.createElement('p');
	  			choicespace.append(space)
			}	
 	 	}
}

// Display of lifebar on top
var lifecount=3;

function newlifebar(){
	lifecount= 3;
	document.getElementById('lifebar').style.display='';
	document.getElementById('hbar1').style.display='';
	document.getElementById('hbar2').style.display='';
	document.getElementById('hbar3').style.display='';
}

function mistake(){
	if(lifecount==3)
	document.getElementById('hbar1').style.display='none';
	if(lifecount==2)
	document.getElementById('hbar2').style.display='none';
	if(lifecount==1)
	document.getElementById('hbar3').style.display='none';
	lifecount--;

	if(lifecount==0){
		updateChoices(0);
    	updateAnswer(1);
		alert('GAMEOVER! Try Again! :)');
	}
}

function hidelifebar(){
	document.getElementById('lifebar').style.display='none';
}