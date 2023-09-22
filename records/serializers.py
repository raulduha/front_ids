from rest_framework import serializers
from .models import User

class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ("first_name", "last_name", "email", "phone", "role")