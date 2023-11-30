from rest_framework.serializers import ModelSerializer
from . import models

from django.contrib.auth import get_user_model

class DishCategorySerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = models.DishCategory

class DishSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = models.Dish

class BranchSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = models.Branch

class OrderSerializer(ModelSerializer):
    branch = BranchSerializer()

    class Meta:
        fields = '__all__'
        model = models.Order

class OrderItemSerializer(ModelSerializer):
    dish = DishSerializer()

    class Meta:
        fields = '__all__'
        model = models.OrderItem

class AccountDiscountSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = models.AccountDiscount

class PromocodeSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = models.Promocode

class UserSerializer(ModelSerializer):
    class Meta:
        fields = '__all__'
        model = get_user_model()