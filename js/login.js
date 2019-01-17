    // Initialize Firebase
    function logout()
    {
        toggleSignIn();
    }
    var config = {
        apiKey: "AIzaSyAOzIIUWqCvEUGxTeHBFpHXk-AL-Am7u4o",
        authDomain: "axis2019-47b13.firebaseapp.com",
        databaseURL: "https://axis2019-47b13.firebaseio.com",
        projectId: "axis2019-47b13",
        storageBucket: "axis2019-47b13.appspot.com",
        messagingSenderId: "282546345277"
    };
    firebase.initializeApp(config);

    var usersRef = firebase.database().ref().child('users');
    function toggleSignIn() {
        if (!firebase.auth().currentUser) {
            // [START createprovider]
            var provider = new firebase.auth.GoogleAuthProvider();
            // [END createprovider]
            // [START addscopes]
            provider.addScope('https://www.googleapis.com/auth/plus.login');
            // [END addscopes]
            // [START signin]
            firebase.auth().signInWithRedirect(provider);
            // [END signin]
        } else {
            // [START signout]

            firebase.auth().signOut();

            // [END signout]
        }

        document.getElementsByClassName("axisLOGIN")[0].style.visibility = 'hidden';
        document.getElementsByClassName("loginBUTTON")[0].style.visibility = 'visible';
        document.getElementsByClassName("myRegistrations")[0].style.visibility = 'visible';        
        
    }
    // [END buttoncallback]

    function initApp() {
        // Result from Redirect auth flow.
        // [START getidptoken]

        // [END getidptoken]
        // Listening for auth state changes.
        // [START authstatelistener]
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.

                
                document.getElementsByClassName("loginBUTTON")[0].style.visibility = 'hidden';
                document.getElementsByClassName("axisLOGIN")[0].style.visibility = 'visible';
                document.getElementsByClassName("myRegistrations")[0].style.visibility = 'visible';

                app(user);
                // [END_EXCLUDE]
            } else {
                // User is signed out.
                // [START_EXCLUDE]
                
                document.getElementsByClassName("loginBUTTON")[0].style.visibility = 'visible';        
                document.getElementsByClassName("axisLOGIN")[0].style.visibility = 'hidden';
                document.getElementsByClassName("myRegistrations")[0].style.visibility = 'hidden'; 
                
                // [END_EXCLUDE]
            }
        });
        // [END authstatelistener]
        //document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);

        document.getElementsByClassName("quickstart-sign-in")[0].addEventListener('click', toggleSignIn, false);

    }

    initApp();
    
    function app(user)
    {

        var emailkey = user.email;
        var key = emailkey.slice(0,emailkey.search('@'));
        key = key.replace(/[^a-zA-Z0-9 ]/g, "") ; 
        
        //document.getElementById("clientName").innerHTML = user.displayName;

        firebase.database().ref('/users/' + key).once('value').then(function(snapshot) {
            // if signing in for the first time we cannot find any related entry in the database
            if (snapshot.val() == null) 
            {    
                var axis_id = generate_axis_id();                                 
                usersRef.child(key).set({
                    username: user.displayName,
                    email: user.email,
                    axisid: axis_id,
                    gender: "null",
                    DOB: "null",
                    college: "null",
                    phone: -1,
                    address: "null",
                    zipcode: -1,
                    country: "null",
                    //set remaining fields as null  
                }).then(function onSuccess(res) {
                     window.location.href = "form.html";
                });
            }
            else if (snapshot.val().phone == -1 && window.location.href !== "form.html")
            {
                window.location.href = "form.html";
            }
            else
            {
                var axisid = (snapshot.val() && snapshot.val().axisid) || null;

                document.getElementsByClassName("clientName")[0].innerHTML = user.displayName;
                document.getElementsByClassName("AXISid")[0].innerHTML = axisid;
                myRegistrations();
            }
        });
    }

    function generate_axis_id()
    {
        var r = Math.floor(Math.random()*1000) + 1;
        var d = new Date();
        var milisec = d.getMilliseconds();
        var day = d.getDate();
        r = Math.pow(r,2); milisec = Math.pow(milisec,2);
        r = (r+milisec)%1000;
        var id = ((r < 100)?'0': ((r<10)?'00':'') )+ r.toString();
        return "AXIS19" + (day < 10 ? '0' : '') + day.toString() + id;
    }
