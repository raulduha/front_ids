from rest_framework import serializers
from .models import User, Machine, Product, Shift, ShiftAssignment, Production, Storage

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
        fields = ("assignment_id", "user_id", "shift_id", "machine_id", "assignment_date")

class ProductionSerializer(serializers.ModelSerializer):
    date_created = serializers.DateField(source='date_created', read_only=True)
    time_created = serializers.TimeField(source='time_created', read_only=True)
    date_modified = serializers.DateField(source='date_modified', read_only=True)
    time_modified = serializers.TimeField(source='time_modified', read_only=True)

    class Meta:
        model = Production
        fields = ("prod_id", "shiftAssignment_id", "product_id", "amount", "date_created", "time_created", "date_modified", "time_modified", "modified_by")

class StorageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Storage
        fields = ("storage_id", "storage_user_id", "production_assigned","amount")