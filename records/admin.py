from django.contrib import admin
from .models import User, Machine, Product, Shift, ShiftAssignment, Production, Storage

class ProductionAdmin(admin.ModelAdmin):
    list_display = ('prod_id', 'shiftAssignment_id', 'product_id', 'amount', 'date_created', 'time_created', 'date_modified', 'time_modified', 'modified_by')
    list_filter = ('shiftAssignment_id', 'product_id', 'date_created', 'date_modified')
    search_fields = ('prod_id', 'shiftAssignment_id__shift_name', 'product_id__brand', 'date_created', 'date_modified')

# Register your models here.
admin.site.register(User)
admin.site.register(Machine)
admin.site.register(Product)
admin.site.register(Shift)
admin.site.register(ShiftAssignment)
admin.site.register(Production, ProductionAdmin)
admin.site.register(Storage)
