//nav bar animation 
/* For mobile support, delet the 'mobile' */
$(document).ready(function(){
	AOS.init({ disable: '' });
});

//jQuery Form signup
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches

$(".next").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	next_fs = $(this).parent().next();
	
	//activate next step on progressbar using the index of next_fs
	$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");
	
	//show the next fieldset
	next_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale current_fs down to 80%
			scale = 1 - (1 - now) * 0.2;
			//2. bring next_fs from the right(50%)
			left = (now * 50)+"%";
			//3. increase opacity of next_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({
        'transform': 'scale('+scale+')',
        'position': 'absolute'
      });
			next_fs.css({'left': left, 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

$(".submit").click(function(){
	return false;
})//ENDS jQuery Form-signup


// MODAL CHAT
// var modal = document.getElementById('myModal');

// // Get the button that opens the modal
// var btn = document.getElementById("myBtn");

// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks the button, open the modal 
// btn.onclick = function() {
//     modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//     modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// }

//CREDIT CARD VALIDATION WITH 
$(function() {
	var owner = $('#owner');
	var cardNumber = $('#cardNumber');
	var cardNumberField = $('#card-number-field');
	var CVV = $("#cvv");
	var mastercard = $("#mastercard");
	var confirmButton = $('#confirm-purchase');
	var visa = $("#visa");
	var amex = $("#amex");

	//calling Payform.js library to format and validate the payment fields.
	cardNumber.payform('formatCardNumber');
	CVV.payform('formatCardCVC');

	//Check if the card is either Visa, MasterCard
//check for every time a new character is typed in with jQuery keyup() event listener.

	cardNumber.keyup(function() {

			amex.removeClass('transparent');
			visa.removeClass('transparent');
			mastercard.removeClass('transparent');

			if ($.payform.validateCardNumber(cardNumber.val()) == false) {
					cardNumberField.addClass('has-error');
			} else {
					cardNumberField.removeClass('has-error');
					cardNumberField.addClass('has-success');
			}

			if ($.payform.parseCardType(cardNumber.val()) == 'visa') {
					mastercard.addClass('transparent');
					amex.addClass('transparent');
			} else if ($.payform.parseCardType(cardNumber.val()) == 'amex') {
					mastercard.addClass('transparent');
					visa.addClass('transparent');
			} else if ($.payform.parseCardType(cardNumber.val()) == 'mastercard') {
					amex.addClass('transparent');
					visa.addClass('transparent');
			}
	});
//check that input name is at least 5 characters long
	confirmButton.click(function(e) {

			e.preventDefault();

			var isCardValid = $.payform.validateCardNumber(cardNumber.val());
			var isCvvValid = $.payform.validateCardCVC(CVV.val());

			if(owner.val().length < 5){
					alert("Wrong owner name");
			} else if (!isCardValid) {
					alert("Wrong card number");
			} else if (!isCvvValid) {
					alert("Wrong CVV");
			} else {
					// Everything is correct. Add your form submission code here.
					alert("Everything is correct");
			}
	});
});

