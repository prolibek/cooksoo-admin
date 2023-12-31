from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsManagerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        if request.user.is_authenticated:
            return (request.user.is_superuser or request.user.is_staff or request.user.role == 2)

        return False

class IsManager(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return (request.user.is_superuser or request.user.is_staff or request.user.role == 2)

        return False