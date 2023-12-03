from django.db import models

from django.contrib.auth import get_user_model

class DishCategory(models.Model):
    name = models.CharField(max_length=55)
    description = models.TextField()

class Dish(models.Model):
    name = models.CharField(max_length=55)
    description = models.TextField()
    image = models.ImageField(null=True)
    price = models.IntegerField(default=0)
    category = models.ForeignKey(DishCategory, on_delete=models.DO_NOTHING, null=True)

class Branch(models.Model):
    name = models.CharField(max_length=55)
    address = models.CharField(max_length=500)
    lon = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    lat = models.DecimalField(max_digits=9, decimal_places=6, null=True)
    description = models.TextField()

class Order(models.Model):
    client = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='client')
    created_ad = models.DateTimeField(auto_now_add=True)
    branch = models.ForeignKey(Branch, on_delete=models.DO_NOTHING)
    courier = models.ForeignKey(
        get_user_model(), 
        null=True, 
        on_delete=models.DO_NOTHING,
        related_name='courier'
        )
    status_choices = (
        (1, "Pending"),
        (2, "Accepted"),
        (3, "Cooked"),
        (4, "Being delivered"),
        (5, "Delivered")
    )
    status = models.SmallIntegerField(
        choices=status_choices, 
        default=status_choices[0]
        )

class OrderItem(models.Model):
    order = models.ForeignKey(Order, on_delete=models.DO_NOTHING)
    dish = models.ForeignKey(Dish, on_delete=models.DO_NOTHING)

class AccountDiscount(models.Model):
    account = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    discount = models.FloatField()

class Promocode(models.Model):
    code = models.CharField(max_length=8)
    value = models.FloatField()
    