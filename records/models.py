from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager
from datetime import datetime

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('El campo Email es obligatorio')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('El superusuario debe tener is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('El superusuario debe tener is_superuser=True.')

        return self.create_user(email, password, **extra_fields)

class User(AbstractBaseUser):
    ROLES = (
        (0, 'Machine worker'),
        (1, 'Warehouse worker'),
        (2, 'Supervisor'),
        (3, 'Manager'),
        (4, 'Admin')
    )

    id = models.AutoField(primary_key=True)
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    role = models.IntegerField(choices=ROLES, default=0)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return f'{self.first_name} {self.last_name}'
    
    def has_perm(self, perm, obj=None):
        return True
    
    def has_module_perms(self, app_label):
        if self.is_superuser:
            return True
        return False

class Machine(models.Model):
    machine_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    brand = models.CharField(max_length=50)
    type = models.CharField(max_length=50)
    format = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return str(self.product_id)
    
class Shift(models.Model):
    shift_id = models.AutoField(primary_key=True)
    shift_name = models.CharField(max_length=50)
    start_time = models.TimeField()
    end_time = models.TimeField()

    def __str__(self):
        return self.shift_name

class ShiftAssignment(models.Model):
    assignment_id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.CASCADE, related_name='shift_assignments')
    shift_id = models.ForeignKey(Shift, on_delete=models.CASCADE)
    machine_id = models.ForeignKey(Machine, on_delete=models.CASCADE)
    assignment_date = models.DateField()

    def __str__(self):
        return str(self.assignment_id)
    
class Production(models.Model):
    prod_id = models.AutoField(primary_key=True)
    shiftAssignment_id = models.ForeignKey(ShiftAssignment, on_delete=models.CASCADE)
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount = models.IntegerField()
    created_at = models.DateTimeField(default=datetime.now, editable=False)
    modified_at = models.DateTimeField(auto_now=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='modified_shift_assignments')

    date_created = models.DateField(blank=True, null=True)  
    time_created = models.TimeField(blank=True, null=True)  
    date_modified = models.DateField(blank=True, null=True)  
    time_modified = models.TimeField(blank=True, null=True)  

    def save(self, *args, **kwargs):
        if self.created_at:
            self.date_created = self.created_at.date()
            self.time_created = self.created_at.time()

        if self.modified_at:
            self.date_modified = self.modified_at.date()
            self.time_modified = self.modified_at.time()

        super(Production, self).save(*args, **kwargs)

    def __str__(self):
        return str(self.prod_id)

class Storage(models.Model):
    storage_id = models.AutoField(primary_key=True)
    storage_user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    amount = models.IntegerField()
    product_id = models.ForeignKey(Product, on_delete=models.CASCADE)

    created_at = models.DateTimeField(default=datetime.now, editable=False)
    modified_at = models.DateTimeField(auto_now=True)
    modified_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='modified_storage_units')

    def __str__(self):
        return str(self.storage_id)
