from django.db import models
from datetime import datetime
import datetime

# Create your models here.
class Manager(models.Model):
    mName = models.CharField(max_length=64)
    mCode = models.CharField(max_length=3)

    def __str__(self):
        return f"{self.mName} ({self.mCode})"


class Passport(models.Model):
    Number = models.CharField(max_length=8, default=1)
    pType = models.CharField(max_length=1)
    validTime = models.DateField()
    pLocation = models.ForeignKey(Manager, on_delete=models.CASCADE, 
        null=True, default=None, related_name="passport",
        )

    def __str__(self):
        return f"{self.Number} ({self.pType})" 

class History(models.Model):
    code = models.ForeignKey(
        Passport, on_delete=models.CASCADE, 
        primary_key=True, default=1,
    )
    origin = models.CharField(max_length=64)
    originTime = models.DateField()
    destination = models.CharField(max_length=64)
    destinationTime = models.DateField()

    def __str__(self):
        return f"{self.code}"

class Citizen(models.Model):
    sID = models.OneToOneField(
        Passport, on_delete=models.CASCADE, 
        default=1,
    )
    name = models.CharField(max_length=64)
    sex = models.CharField(max_length=1)
    year = models.DateField()
    code = models.BigAutoField(primary_key=True, default=None)
    hID = models.OneToOneField(
        History, on_delete=models.CASCADE, 
        default=1,
    )
    def __str__(self):
        return f"{self.name} ({self.sex})"

