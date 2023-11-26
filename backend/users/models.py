from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    CLIENT = 1
    MANAGER = 2
    COURIER = 3
    role_choices = (
        (CLIENT, 'Client'),
        (MANAGER, 'Manager'),
        (COURIER, 'Courier')
    )

    role = models.SmallIntegerField(
        choices=role_choices,
        default=1
    )

    first_name = models.CharField(max_length=55)
    last_name = models.CharField(max_length=55)
