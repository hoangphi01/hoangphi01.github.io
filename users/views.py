
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.http import HttpResponseBadRequest, HttpResponseRedirect, Http404
from django.urls import reverse



# Create your views here.
def index(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    return render(request, "users/user.html")    

def login_view(request):
    if request.method == "POST":
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("users:index"))
        else:
            return render(request, "users/login.html", {
                "message": "Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại."
            }) 
    else:
        return render(request, "users/login.html")        

def logout_view(request):
    logout(request)
    return render(request, "users/login.html", {
        "message": "Đã đăng xuất."
    })


#return render(request, "users/user.html")     