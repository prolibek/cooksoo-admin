from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

class UserCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ('id', 'username', 'password', 'first_name', 'last_name', 'email')

    def validate(self, attrs):
        attrs['role'] = User.CLIENT
        return super().validate(attrs)