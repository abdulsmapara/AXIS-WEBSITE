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

            //document.getElementById("clientName").innerHTML = null;
            //document.getElementById("AXISid").innerHTML = null;
            firebase.auth().signOut();

            // [END signout]
        }
        // [START_EXCLUDE]
        //document.getElementById('quickstart-sign-in').disabled = true;
        
        //document.getElementsByClassName("quickstart-sign-in")[0].disabled = true;
        //document.getElementsByClassName("quickstart-sign-in")[1].disabled = true;

        document.getElementsByClassName("axisLOGIN")[0].style.visibility = 'hidden';
        document.getElementsByClassName("axisLOGIN")[1].style.visibility = 'hidden';

        document.getElementsByClassName("loginBUTTON")[0].style.visibility = 'visible';
        document.getElementsByClassName("loginBUTTON")[1].style.visibility = 'visible';
                
        // [END_EXCLUDE]
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

                //document.getElementById('quickstart-sign-in').textContent = 'Sign out';
                //document.getElementById('quickstart-sign-in-status').textContent = 'Signed in';
                //document.getElementsByClassName("quickstart-sign-in")[0].textContent = 'Sign out';
                //document.getElementsByClassName("quickstart-sign-in")[1].textContent = 'Sign out';
                
                //document.getElementsByClassName("quickstart-sign-in")[0].textContent = 'Sign out';
                //document.getElementsByClassName("quickstart-sign-in")[1].textContent = 'Sign out';
                
                document.getElementsByClassName("loginBUTTON")[0].style.visibility = 'hidden';
                document.getElementsByClassName("loginBUTTON")[1].style.visibility = 'hidden';
                        
                //document.getElementsByClassName("quickstart-sign-in")[0].style.display = 'none';
                //document.getElementsByClassName("quickstart-sign-in")[1].style.display = 'none';
                
                document.getElementsByClassName("axisLOGIN")[0].style.visibility = 'visible';
                document.getElementsByClassName("axisLOGIN")[1].style.visibility = 'visible';

                app(user);
                // [END_EXCLUDE]
            } else {
                // User is signed out.
                // [START_EXCLUDE]
                //document.getElementById('quickstart-sign-in-status').textContent = 'Signed out';
                //document.getElementById('quickstart-sign-in').textContent = 'Sign in';

                //document.getElementsByClassName("quickstart-sign-in")[0].textContent = 'Login';
                //document.getElementsByClassName("quickstart-sign-in")[1].textContent = 'Login';

                document.getElementsByClassName("loginBUTTON")[0].style.visibility = 'visible';
                document.getElementsByClassName("loginBUTTON")[1].style.visibility = 'visible';
                        
                document.getElementsByClassName("axisLOGIN")[0].style.visibility = 'hidden';
                document.getElementsByClassName("axisLOGIN")[1].style.visibility = 'hidden';
                
                // [END_EXCLUDE]
            }
            // [START_EXCLUDE]
            //document.getElementById('quickstart-sign-in').disabled = false;
            //document.getElementsByClassName("quickstart-sign-in")[0].disabled = false;
            //document.getElementsByClassName("quickstart-sign-in")[1].disabled = false;
            // [END_EXCLUDE]
        });
        // [END authstatelistener]
        //document.getElementById('quickstart-sign-in').addEventListener('click', toggleSignIn, false);

        document.getElementsByClassName("quickstart-sign-in")[0].addEventListener('click', toggleSignIn, false);
        document.getElementsByClassName("quickstart-sign-in")[1].addEventListener('click', toggleSignIn, false);
    }
    window.onload = function() {
        initApp();
    };

    var globalName = "NULL";
    var globalID = "NULL";
    var globalEmail = "NULL";

    function app(user)
    {

        var key = user.displayName;
        //document.getElementById("clientName").innerHTML = user.displayName;
        firebase.database().ref('/users/' + key).once('value').then(function(snapshot) {
            if (snapshot.val() == null) {

                var axis_id = generate_axis_id();

                window.location.href = "form.html";
                
                usersRef.child(key).set({
                    username: user.displayName,
                    email: user.email,
                    axisid: axis_id,
                    //set remaining fields as null  
                }).then(function onSuccess(res) {
                    firebase.database().ref('/users/' + key).once('value').then(function (snapshot) {
                        var axisid = (snapshot.val() && snapshot.val().axisid) || null;

                        document.getElementsByClassName("clientName")[0].innerHTML = user.displayName;
                        document.getElementsByClassName("clientName")[1].innerHTML = user.displayName;
                        document.getElementsByClassName("AXISid")[0].innerHTML = axisid;
                        document.getElementsByClassName("AXISid")[1].innerHTML = axisid;

                        //document.getElementById("clientName").innerHTML = user.displayName;
                        //document.getElementById("AXISid").innerHTML = axisid;
                    });
                });
            }
            else
            {
                var axisid = (snapshot.val() && snapshot.val().axisid) || null;

            
                document.getElementsByClassName("clientName")[0].innerHTML = user.displayName;
                document.getElementsByClassName("clientName")[1].innerHTML = user.displayName;
                document.getElementsByClassName("AXISid")[0].innerHTML = axisid;
                document.getElementsByClassName("AXISid")[1].innerHTML = axisid;

                //document.getElementById("clientName").innerHTML = user.displayName;
                //document.getElementById("AXISid").innerHTML = axisid;
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