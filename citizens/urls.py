from django.urls import path

from . import views

app_name = 'citizens'
urlpatterns = [
    path("", views.index, name="index", ),
    path("<int:citizen_id>", views.citizen, name="citizen"),
    

]
    