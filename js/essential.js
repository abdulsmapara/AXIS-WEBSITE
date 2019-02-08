//required only in baker_home.html
// Initialize Firebase

    var event_baker = firebase.database().ref().child('Baker_Street');
    var init_attempted = 0;
function getData(key,current_question_number){
	firebase.database().ref('/Baker_Street/' + key).once('value').then(function(snapshot) {
			if(snapshot.val() == null){
				event_baker.child(key).set({
					started: true,
					attempted : init_attempted,
					last_attempted_time : "-1",
					time_when_last_attempted: "-1",
				}).then(function onSuccess(res){
					alert('The event begins now !');
					window.location.href = 'question1.html';
				});
			}else{

				var last_attempted = snapshot.val().attempted;
				if(window.location.href.includes("baker_home.html") && snapshot.val().started == true){
					window.location.href = "question" + (Number(last_attempted) + 1) + ".html";
				}else{
					event_baker.child(key).set({
						started : true,
						attempted : Number(current_question_number) - 1,
						last_attempted_time : new Date().toString(),
						time_when_last_attempted : new Date().getTime(),
					}).then(function onSuccess(res){

						if(Number(last_attempted) + 2 == Number(current_question_number)){
							window.location.href="question" + current_question_number + ".html";
						}
					});
				}
			}
		});
	
}

function check_login(current_question_number){
	//check if the user is logged in and registered for the event

	firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            	
            	//alert('You are Logged in');
            	var emailkey = user.email;

            var key = emailkey.slice(0,emailkey.search('@'));
            key = key.replace(/[^a-zA-Z0-9 ]/g, "") ;
            registered("221B",key,current_question_number);
            
            
        }else{
        	alert('Please log in before proceeding and attempting');
        	window.location.href = 'baker_home.html';
        }

            
    });

}
function registered(contest,key,current_question_number){



			firebase.database().ref('/eventRegistration/' + contest + '/' + key).once('value').then(function(snapshot){
				if(snapshot.val() != null){
					//alert('Congrats ! You have already registered for the event !');
					getData(key,current_question_number);
					return true;
				}else{
					alert('Please register for 221B baker street');
					return false;
				}
			});
		
	
}
function start(current_question_number){


	current_question_number = Number(current_question_number);
	var email = check_login(current_question_number);
}

function check_data(key,current_question_number){
	firebase.database().ref('/Baker_Street/' + key).once('value').then(function(snapshot) {
			if(snapshot.val() == null){
				window.location.href = 'baker_home.html';

			}else{
				if(Number(snapshot.val().attempted) + 1 == Number(current_question_number)){
					
				;
				}else{
					window.location.href = "question" + (Number(snapshot.val().attempted) + 1) + ".html";
				}
			}
		});
	
}

function check_reg(key,current_question_number,contest){
	firebase.database().ref('/eventRegistration/' + contest + '/' + key).once('value').then(function(snapshot){
				if(snapshot.val() != null){
					//alert('Congrats ! You have already registered for the event !');
					
					check_data(key,current_question_number);	
					return true;
				}else{
					alert('Please register for 221B baker street');
					window.location.href = 'baker_home.html';
					return false;
				}
			});
}
function check_validity(current_question_number){
		firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
            var emailkey = user.email;

            var key = emailkey.slice(0,emailkey.search('@'));
            key = key.replace(/[^a-zA-Z0-9 ]/g, "") ;
            check_reg(key,current_question_number,"221B");
            
        }else{
        	window.location.href = 'baker_home.html';        
        }

            
    });
}