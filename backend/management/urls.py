from django.urls import path, include 

from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()

router.register(r'dish_categories', views.DishCategoryViewSet)
router.register(r'dishes', views.DishViewSet)
router.register(r'branches', views.BranchViewSet)
router.register(r'orders', views.OrderViewSet)
router.register(r'promocodes', views.PromocodeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('set_discount/', views.SetDiscountAPIView.as_view(), name="set_discount")
]