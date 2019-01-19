
function eventRegistration(eventName, teamName, key)
{

    var oldRef = firebase.database().ref().child('/users/'+ key);
    var newRef = firebase.database().ref().child('eventRegistration/'+ eventName + '/' + teamName + '/' + key);

     oldRef.once('value', function(snap)  {

        var info = {

            username : snap.val().username,
            email : snap.val().email,
            phone : snap.val().phone,
            college : snap.val().college,
            axisid : snap.val().axisid
        };
          newRef.set( info, function(error) {
               if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
          oldRef.child('Competitions/'+eventName).set("Registered");
     });
}

function lectureRegistration(lecturer,key)
{

    var oldRef = firebase.database().ref().child('/users/'+ key);
    var newRef = firebase.database().ref().child('GUEST LECTURES/' + lecturer + '/' + 'Registration' + '/' + key);

     oldRef.once('value', function(snap)  {
        var info = {
            username : snap.val().username,
            email : snap.val().email,
            phone : snap.val().phone,
            college : snap.val().college,
            axisid : snap.val().axisid
        };
          newRef.set( info, function(error) {
               if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
          oldRef.child('GUEST LECTURES/'+lecturer).set("Registered");
          alert("You have successfully registered for guest lecture of " + lecturer + " !");
     });
}
function checkEntry(name,id,email,contact,college) {

    if(name!="" || id!="" || email!="" || contact!="" || college !="" )
    {
        if(name!="" && id!="" && email!="" && contact!="" && college !="")
        {
            if(contact.length != 10)
            {
                alert("Enter valid contact number of " + name);
                return 2;   // invalid entry
            }
            else
            {
                return 1; // all correct   
            }
        }
        else
        {
            alert("Please fill all the details of member");
            return 2; // invalid entry
        }
    }
    else
    {    
        return 0;   // empty field
    }
}

function register(){

    var eventName = document.forms["myForm"]["eventName"].value;
    var teamName = document.forms["myForm"]["teamName"].value;

    var name1 = document.forms["myForm"]["name1"].value;
    var id1 = document.forms["myForm"]["id1"].value;
    var email1 = document.forms["myForm"]["email1"].value;
    var contact1 = document.forms["myForm"]["contact1"].value;
    var college1 = document.forms["myForm"]["college1"].value;

    var name2 = document.forms["myForm"]["name2"].value;
    var id2 = document.forms["myForm"]["id2"].value;
    var email2 = document.forms["myForm"]["email2"].value;
    var contact2 = document.forms["myForm"]["contact2"].value;
    var college2 = document.forms["myForm"]["college2"].value;

    var name3 = document.forms["myForm"]["name3"].value;
    var id3 = document.forms["myForm"]["id3"].value;
    var email3 = document.forms["myForm"]["email3"].value;
    var contact3 = document.forms["myForm"]["contact3"].value;
    var college3 = document.forms["myForm"]["college3"].value;

    var name4 = document.forms["myForm"]["name4"].value;
    var id4 = document.forms["myForm"]["id4"].value;
    var email4 = document.forms["myForm"]["email4"].value;
    var contact4 = document.forms["myForm"]["contact4"].value;
    var college4 = document.forms["myForm"]["college4"].value;
    
    var name5 = document.forms["myForm"]["name5"].value;
    var id5 = document.forms["myForm"]["id5"].value;
    var email5 = document.forms["myForm"]["email5"].value;
    var contact5 = document.forms["myForm"]["contact5"].value;
    var college5 = document.forms["myForm"]["college5"].value;
    
    var name6 = document.forms["myForm"]["name6"].value;
    var id6 = document.forms["myForm"]["id6"].value;
    var email6 = document.forms["myForm"]["email6"].value;
    var contact6 = document.forms["myForm"]["contact6"].value;   
    var college6 = document.forms["myForm"]["college6"].value;

    var name = [];
    var id = [];
    var email = [];
    var contact = [];
    var college = [];
    var key = [];
    
    if (teamName == -1) {
        var key1 = email1.slice(0,email1.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        teamName = key1;
    }

    var allEntriesValid = true;
    var status ;

    status = checkEntry(name1,id1,email1,contact1,college1); 
    if( status == 1)
    {
        name.push(name1);
        id.push(id1);
        email.push(email1);

        var key1 = email1.slice(0,email1.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
        contact.push(contact1);
        college.push(college1);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }
    
    status = checkEntry(name2,id2,email2,contact2,college2);
    if(status == 1)
    {
        name.push(name2);
        id.push(id2);
        email.push(email2);

        var key1 = email2.slice(0,email2.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
        contact.push(contact2);
        college.push(college2);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }

    status = checkEntry(name3,id3,email3,contact3,college3);
    if( status == 1)
    {

        name.push(name3);
        id.push(id3);
        email.push(email3);
        var key1 = email3.slice(0,email3.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
        contact.push(contact3);
        college.push(college3);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }


    status = checkEntry(name4,id4,email4,contact4,college4); 
    if(status == 1)
    {
        name.push(name4);
        id.push(id4);
        email.push(email4);

        var key1 = email4.slice(0,email4.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
        contact.push(contact4);
        college.push(college4);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }

    status = checkEntry(name5,id5,email5,contact5,college5);
    if(status == 1)
    {
        name.push(name5);
        id.push(id5);
        email.push(email5);

        var key1 = email5.slice(0,email5.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
        contact.push(contact5);
        college.push(college5);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }

    status = checkEntry(name6,id6,email6,contact6,college6);
    if( status == 1)
    {
        name.push(name6);
        id.push(id6);
        email.push(email6);

        var key1 = email6.slice(0,email6.search('@'));
        key1 = key1.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        key.push(key1);
        contact.push(contact6);
        college.push(college6);
    }
    else if(status == 2)
    {
        allEntriesValid = false;
    }

    if(allEntriesValid && key.length > 0)
    {
        isTeamNameValid(eventName,teamName,key,id,contact,college,name);    
    }

    return false;
}

function checkUsers(eventName , teamName , key, id, name, i, len)
{
    var isValidEmail = false;
    var flag = false;
    firebase.database().ref('/users/' + key[i]).once('value').then(function(snapshot) {
            if (snapshot.val() == null)
            {
                isValidEmail = false;
                alert( name[i] + " you have not Sign up . Please sign up in www.axisvnit.org and get the Axis ID !" );
            }
            else if( snapshot.val().axisid != id[i] )
            {
                flag = false;
                alert(  name[i] + " your ID not valid . You can check your axis id by login in www.axisvnit.org " );
            }
            else if( snapshot.val().phone == -1 )
            {
                alert(name[i] + " Please Complete your registration in www.axisvnit.org ");
            }
            else
            {
                flag = true;
                isValidEmail = true;

            } 
        }).then(function onSuccess(res) {
            i++;
            if(i == len && isValidEmail && flag)
            {
                for (j = 0; j < len; j++) {
                  eventRegistration(eventName, teamName , key[j]);
                } 
                alert("Successfully Registered !");   
            }
            else if(isValidEmail && flag)
            {
                checkUsers(eventName , teamName , key, id, name, i, len);
            }
        });
    
}

function isTeamNameValid(eventName, teamName, key , id , contact , college , name)
{
    firebase.database().ref('/eventRegistration/' + eventName + '/' + teamName).once('value').then(function(snapshot) {

        if (snapshot.exists()) {
            alert("team name already exists . Please take another team name.");
        }
        else
        {
            var len = key.length;
            var flag = true;
            var isValidEmail = true;
            checkUsers(eventName , teamName , key,id, name, 0, len);    
        }
    });
}

function guestLecturesRegister(lecturer){

    var user = firebase.auth().currentUser;
    if (user) {
        var emailkey = user.email;
        var key = emailkey.slice(0,emailkey.search('@'));
        key = key.replace(/[^a-zA-Z0-9 ]/g, "") ; 

        firebase.database().ref('/users/' + key).once('value').then(function(snapshot) {
            // if signing in for the first time we cannot find any related entry in the database
            if (snapshot.val() == null) 
            {    
               
            }
            else if (snapshot.val().phone == -1 && window.location.href !== "form.html")
            {
                alert("Sign Up first");
            }
            else
            {
                lectureRegistration(lecturer,key);    
            }
        });
    } 
    else  
    {
        alert("Please Sign up before Registration ");
    }
}
function submitQuery(lecturer,key,query){

    var oldRef = firebase.database().ref().child('/users/'+ key);
    var newRef = firebase.database().ref().child('GUEST LECTURES/' + lecturer + '/' + 'Queries' + '/' + query + '/' + key);

     oldRef.once('value', function(snap)  {
        var info = {
            username : snap.val().username,
            email : snap.val().email,
            phone : snap.val().phone,
            college : snap.val().college,
            axisid : snap.val().axisid
        };
          newRef.set( info, function(error) {
               if( error && typeof(console) !== 'undefined' && console.error ) {  console.error(error); }
          });
          alert("Query submited successfully !");
     });
}

function AskQuery(lecturer){


    var query = document.forms["myForm"]["query"].value;

    var user = firebase.auth().currentUser;
    if (user) {
        var emailkey = user.email;
        var key = emailkey.slice(0,emailkey.search('@'));
        key = key.replace(/[^a-zA-Z0-9 ]/g, "") ; 

        firebase.database().ref('/users/' + key).once('value').then(function(snapshot) {
            // if signing in for the first time we cannot find any related entry in the database
            if (snapshot.val() == null) 
            {    
               
            }
            else if (snapshot.val().phone == -1 && window.location.href !== "form.html")
            {
                alert("Sign Up first");
            }
            else
            {
                submitQuery(lecturer,key,query);    
            }
        });
    } 
    else  
    {
        alert("Please Sign up for asking any Queries ");
    }
    return false;
}

function myRegistrations(){
    
    var user = firebase.auth().currentUser;
    if(user)
    {
        var emailkey = user.email;
        var key = emailkey.slice(0,emailkey.search('@'));
        key = key.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        

        firebase.database().ref('/users/' + key).once('value').then(function(snapshot) {
            document.getElementById("name").innerHTML = snapshot.val().username;
            document.getElementById("id").innerHTML = snapshot.val().axisid;
            document.getElementById("email").innerHTML = snapshot.val().email; 
        });

        var CompetitionRef = firebase.database().ref().child('/users/'+ key + '/Competitions');
        var GuestLecRef = firebase.database().ref().child('/users/'+ key+ '/GUEST LECTURES');
        var workshopRef = firebase.database().ref().child('/users/'+ key+ '/WORKSHOPS');

        var retval = "";
        var count = 0;
        CompetitionRef.once('value').then(function(snapshot) {
            retval = retval + "<div class='heading'> EVENTS </div><div class='eventsName'><ul>" ; 
            snapshot.forEach(function (element)
            {
                retval =  retval + "<li>" + element.key + "</li>" ;
                count = count + 1;
            });
            retval = retval + "</ul></div>";
            
        }).then(function onSuccess(res) {
            if(count > 0)
            {
                document.getElementById("myEvent").innerHTML = retval;                
            }
        });

        var guestLecture = "";    
        count2 = 0;
        GuestLecRef.once('value').then(function(snapshot) {
            guestLecture = guestLecture + "<div class='heading'> GUEST LECTURES </div><div class='eventsName'><ul>" ; 
            snapshot.forEach(function (element)
            {
                guestLecture = guestLecture + "<li>" + element.key + "</li>" ;
                count2 = count2 + 1;
            });
            guestLecture = guestLecture + "</ul></div>";
            
        }).then(function onSuccess(res) {
            if( count2 > 0 )
            {
                document.getElementById("myLect").innerHTML = guestLecture;
            }
        });

        var workshop = "";    
        count3 = 0;
        workshopRef.once('value').then(function(snapshot) {
            workshop = workshop + "<div class='heading'> WORKSHOPS </div><div class='eventsName'><ul>" ; 
            snapshot.forEach(function (element)
            {
                workshop = workshop + "<li>" + element.key + "</li>" ;
                count3 = count3 + 1;
            });
            workshop = workshop + "</ul></div>";
            
        }).then(function onSuccess(res) {
            if( count3 > 0 )
            {
                document.getElementById("workshop").innerHTML = workshop;
            }
        });

      
    }
    
}
function showMyRegistrations(path){
    var user = firebase.auth().currentUser;
    if(user)
    {
        window.location.href = path;        
    }
}