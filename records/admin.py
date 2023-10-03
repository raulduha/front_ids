from django.contrib import admin
from .models import User, Machine, Product, Shift, ShiftAssignment, Production


# Register your models here.
admin.site.register(User)
admin.site.register(Machine)
admin.site.register(Product)
admin.site.register(Shift)
admin.site.register(ShiftAssignment)
admin.site.register(Production)
