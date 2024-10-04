from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views
from api.views import MyTokenObtainPairView, RegisterView, PostListView, PostDetail, RequestDetail, FriendsListView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,

)


urlpatterns = [
    path('register/', views.check_email_is_valid, name='token_obtain_pair'),
    path('change_password/', views.change_password, name='change_password'),
    path('token/obtain/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', views.logout, name='logout'),

    path('chart_data/', views.getChartData, name='logout'),

    path('posts/', PostListView.as_view(), name='posts'),
    path('post/<str:pk>/', PostDetail.as_view(), name='posts'),
    path('post/type/<str:pk>/', views.get_post, name='get post with filter'),
    path('upload/', views.upload, name='get post with filter'),

    path('info/', views.get_user_info, name='get_user_info'),
    path('info/<str:pk>/', views.get_some_user_info, name='get_some_user_info'),
    path('add_info/', views.add_info_for_user, name='add_info_for_user'),

    path("friend-request/", views.sendRequest, name="friends request"),
    path("friend-request/accept/", views.acceptFriendRequest, name="accepting friends request"),
    path("friends/", views.FriendsListView, name="friends"),
    path("friends/delete", views.delete_friend, name="friends"),
    path("get-friends-request/", views.getRequestForUser, name=""),

]

