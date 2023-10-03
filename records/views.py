from django.http import JsonResponse
from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .serializers import UserSerializer, MachineSerializer, ProductSerializer, ShiftSerializer, ShiftAssignmentSerializer, ProductionSerializer
from .models import User, Machine, Product, Shift, ShiftAssignment, Production

#create your views here
class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(detail=False, methods=['post'])
    def login(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(request, username=email, password=password)

        if user is not None:
            login(request, user)
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Credenciales incorrectas'}, status=status.HTTP_401_UNAUTHORIZED)
    
    @action(detail=False, methods=['post'])
    def signup(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.validated_data
            user = User.objects.create(
                email=data['email'],  
                first_name=data['first_name'],
                last_name=data['last_name'],
                phone=data['phone'],
                role=data['role']
            )
            user.set_password(data['password'])
            user.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class MachineView(viewsets.ModelViewSet):
    serializer_class = MachineSerializer
    queryset = Machine.objects.all()

class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class ShiftView(viewsets.ModelViewSet):
    serializer_class = ShiftSerializer
    queryset = Shift.objects.all()

class ShiftAssignmentView(viewsets.ModelViewSet):
    serializer_class = ShiftAssignmentSerializer
    queryset = ShiftAssignment.objects.all()

class ProductionView(viewsets.ModelViewSet):
    serializer_class = ProductionSerializer
    queryset = Production.objects.all()
