from rest_framework import serializers
from .models import User, Machine, Product, Shift, ShiftAssignment, Production

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "first_name", "last_name", "email", "phone", "role", "password")
        extra_kwargs = {
            'password': {'write_only': True}, 
        }

class MachineSerializer(serializers.ModelSerializer):
    class Meta:
        model = Machine
        fields = ("machine_id", "name")

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ("product_id", "brand", "type", "format", "price")
    
class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shift
        fields = ("shift_id", "shift_name", "start_time", "end_time")

class ShiftAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShiftAssignment
        fields = ("assignment_id", "user_id", "shift_id", "machine_id", "assignment_date", "created_at", "modified_at", "modified_by")

class ProductionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Production
        fields = ("prod_id", "shiftAssignment_id", "product_id")
        