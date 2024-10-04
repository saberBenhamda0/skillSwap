from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer as JwtTokenObtainPairSerializer
from .models import CustomUser ,ChartData ,Post, CustomUser,Friends, Friend_request


from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.conf import settings

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['pastCollaboration'] = user.pastCollaboration
        token['userDescription'] = user.bio
        if user.User_image:
            token['User_image'] = f"{user.User_image.url}"
        else:
            token['User_image'] = None
        return token

class TokenObtainPairSerializer(JwtTokenObtainPairSerializer):
    username_field = get_user_model().USERNAME_FIELD


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ["username", "phone_number" ,"email", "first_name", "bio", "last_name", "country", "region", "city", "Neighborhood", "pastCollaboration", "User_image", "id"]


class ChartDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChartData
        fields = "__all__"

class FriendsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friends
        fields = '__all__'

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class friend_requestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend_request
        fields = '__all__'