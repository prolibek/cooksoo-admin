from rest_framework import views, viewsets
from rest_framework.response import Response
from rest_framework import status

from . import serializers
from . import models
from . import permissions

class DishCategoryViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.DishCategorySerializer
    queryset = models.DishCategory.objects.all()
    permission_classes = ( permissions.IsManagerOrReadOnly, )

class DishViewSet(viewsets.ModelViewSet):
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

