from django.contrib import admin

from .models import Citizen, Passport, Manager, History
# Register your models here.
admin.site.site_header = "Hệ thống Quản lý dữ liệu Công dân"
admin.site.site_title = "Hệ thống Quản lý dữ liệu Công dân"

admin.site.register(Passport)
admin.site.register(Citizen)
admin.site.register(Manager)
admin.site.register(History)