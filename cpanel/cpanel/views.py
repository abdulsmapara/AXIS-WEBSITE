from django.shortcuts import render
import pyrebase
from django.contrib import auth
config={
    #change this
    'apiKey': "AIzaSyCGmaiTnJv7I9LtIpnOzcunnFCkd9ueFIo",
    'authDomain': "my-project-1540805698774.firebaseapp.com",
    'databaseURL': "https://my-project-1540805698774.firebaseio.com",
    'projectId': "my-project-1540805698774",
    'storageBucket': "my-project-1540805698774.appspot.com",
    'messagingSenderId': "949077275818"
  };
firebase = pyrebase.initialize_app(config)

authe = firebase.auth()

database = firebase.database()

def signIn(request):
    return render(request, "ca_signin.html")
def postsignin(request):
    email = request.POST.get('email')
    passw = request.POST.get('pass')
    try:
        user = authe.sign_in_with_email_and_password(email, passw)
    except:
        message = "Invalid Credentials !"
        return render(request, "ca_signin.html", {"message":message})
    print(user['idToken'])
    session_id = user['idToken']
    request.session['uid']=str(session_id)
    return render(request, "welcome.html", {'email':email})

def logOut(request):
    auth.logout(request)
    return render(request, "ca_signin.html")
def signUp(request):
    return render(request, "signup.html")
def postsignup(request):
    name = request.POST.get("name")
    email = request.POST.get("email")
    passw = request.POST.get("pass")
    try:
        user = authe.create_user_with_email_and_password(email, passw)
        uid = user['localId']
        data = {"name": name, "status": "1"}
        database.child("users").child(uid).child("details").set(data)
    except:
        message = "Problem: Unable to create account"
        return render(request, "signup.html", {"message": message})
    return render(request, "ca_signin.html")
def capage(request):
    return render(request,"campus_ambassador.html")
