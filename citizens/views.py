from django.shortcuts import render
from django.http import HttpResponseBadRequest, HttpResponseRedirect, Http404
from django.urls import reverse

from .models import Citizen, Passport, History

# Create your views here.
def index(request):
    return render(request, "citizens/index.html", {
        "citizens": Citizen.objects.all()
    })

def citizen(request, citizen_id):
    try:
        citizen = Citizen.objects.get(code=citizen_id)
    except Citizen.DoesNotExist:
        raise Http404("Citizen not found")
    return render(request, "citizens/citizen.html", {
        "citizen": citizen,
        "passport": citizen.sID,
        "history": citizen.hID, 
    })



