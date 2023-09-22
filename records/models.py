from django.db import models

# Create your models here.
class User(models.Model):
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
    role = models.IntegerField(choices=ROLES)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'