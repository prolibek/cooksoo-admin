from rest_framework import views, viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser

from django.contrib.auth import get_user_model

from . import serializers
from . import models
from . import permissions


class DishCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.DishCategorySerializer
    queryset = models.DishCategory.objects.all()
    permission_classes = ( permissions.IsManagerOrReadOnly, )

class DishViewSet(viewsets.ModelViewSet):
    parser_classes = [MultiPartParser, FormParser]
    serializer_class = serializers.DishSerializer
    queryset = models.Dish.objects.all()
    permission_classes = ( permissions.IsManagerOrReadOnly, )

class BranchViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.BranchSerializer
    queryset = models.Branch.objects.all()
    permission_classes = ( permissions.IsManagerOrReadOnly, )

class OrderViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.OrderSerializer
    queryset = models.Order.objects.all()
    permission_classes = ( permissions.IsManagerOrReadOnly, )

    def retrieve(self, request, order):
        items = order.orderitem_set.all().values()
        return Response(
            {
                "order": serializers.OrderSerializer(order).data,
                "items": items
            },
            status=status.HTTP_200_OK
        )

class OrderListViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.OrderItemSerializer
    queryset = models.OrderItem.objects.all()
    permission_classes = ( permissions.IsManagerOrReadOnly, )

class PromocodeViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.PromocodeSerializer
    queryset = models.Promocode.objects.all()
    permission_classes = ( permissions.IsManagerOrReadOnly, )

class SetDiscountAPIView(views.APIView):
    def post(self, request):
        code = request.data["code"]

        try:
            promocode = models.Promocode.objects.get(code=code)
        except models.Promocode.DoesNotExist:
            return Response(
                {
                    "detail": "Promocode is invalid."
                },
                status=status.HTTP_403_FORBIDDEN
            )

        user = request.user

        discount = models.AccountDiscount.objects.create(
            account=user,
            discount=promocode.value
        )

        return Response(
            {
                "detail": "Discount was succesfully set.",
            },
            status==status.HTTP_200_OK
        )

User = get_user_model()
class UsersAPIView(views.APIView):
    permission_classes = [permissions.IsManager]

    def get(self, request, *args, **kwargs):
        users = User.objects.filter(role__in=[2, 3])
        serializer = serializers.UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        first_name = request.data.get('first_name')
        last_name = request.data.get('last_name')
        role = request.data.get('role', 'user')

        if not all([username, password]):
            return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create_user(username=username, first_name=first_name, last_name=last_name, role=role)
        user.set_password(password)
        user.save()
        
        return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)

