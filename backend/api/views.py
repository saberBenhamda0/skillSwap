from django.contrib.auth import get_user_model
from rest_framework.status import HTTP_201_CREATED, HTTP_400_BAD_REQUEST, HTTP_200_OK, HTTP_404_NOT_FOUND
from rest_framework.views import APIView
from .models import Post, CustomUser ,Friends, Friend_request, ChartData
from rest_framework.response import Response

from .serializers import PostSerializer, friend_requestSerializer

from rest_framework import generics

from api.serializers import UserSerializer, ChartDataSerializer

from django.contrib.auth.hashers import make_password

from rest_framework.decorators import api_view, permission_classes, throttle_classes
from rest_framework.permissions import IsAuthenticated

from rest_framework.throttling import UserRateThrottle, AnonRateThrottle

from api.throttles import SignUpAndLoginThrottle

from rest_framework import status
import datetime

from django.contrib.auth import login, authenticate

from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404
from django.http import Http404

from rest_framework_simplejwt.views import TokenObtainPairView
from api.serializers import MyTokenObtainPairSerializer
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from django.db.models import F

class RegisterView(APIView):
    http_method_names = ['post']

    def post(self, *args, **kwargs):
        serializer = UserSerializer(data=self.request.data)
        if serializer.is_valid():
            get_user_model().objects.create_user(**serializer.validated_data)
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST, data={'errors': serializer.errors})


@throttle_classes([SignUpAndLoginThrottle])
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@permission_classes([IsAuthenticated])
class PostListView(generics.ListCreateAPIView): # create a post list posts
    queryset = Post.objects.all()
    serializer_class = PostSerializer

@permission_classes([IsAuthenticated])
class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

@api_view(["GET"])
def getChartData(request):
    user = request.user
    chart_data = ChartData.objects.filter(user=user).order_by("-month")
    serializer = ChartDataSerializer(chart_data, many=True)
    return Response(serializer.data)
@permission_classes([IsAuthenticated])
class RequestDetail(generics.ListCreateAPIView):
    queryset = Friend_request.objects.all()
    serializer_class = friend_requestSerializer

#-------------------------------------------------------------------------------------------------------------------------------------
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def acceptFriendRequest(request):
    user = request.user
    request_id = request.data.get("request_id")
    request_instant = Friend_request.objects.get(id = request_id)
    status = request.data.get("status")
    if status == 2  :
        Friend_request(id = request_id).delete()
        ChartData.objects.filter(user=user, month=datetime.datetime.now().strftime("%Y-%m-%d")).update(value=F('value') + 1)
        ChartData.objects.filter(user=request_instant.sender_id, month=datetime.datetime.now().strftime("%Y-%m-%d")).update(value=F('value') + 1)
        friend = Friends(user_id = user, friends_id=request_instant.sender_id)
        if Friends.objects.filter(user_id = user, friends_id=request_instant.sender_id).exists():
            return Response({"response" : "you are already friends"})
        friend.save()

        return Response({"response" : "friend added with success"})

    if status == 3 : 
        Friend_request(id = request_id).delete()
        return Response({"response" : "request has been rejected with success"})


#-------------------------------------------------------------------------------------------------------------------------------------


@permission_classes([IsAuthenticated])
@api_view(['POST'])
def delete_friend(request):
    user = request.user
    friends_id_payload = request.data.get("friends_id")

    try:
        friend = get_object_or_404(CustomUser, id=friends_id_payload)
        Friends.objects.get(friends_id=friend, user_id=user).delete()
        return Response({"response": "The friend was deleted successfully"})
    except Http404:
        return Response({"error": "Friend not found"}, status=404)
    except Friends.DoesNotExist:
        return Response({"error": "Friend relationship not found"}, status=404)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def FriendsListView(request):
    user = request.user
    # Assuming `Friends` has a foreign key `friends_id` that relates to `CustomUser`
    friends = Friends.objects.filter(user_id=user).select_related('friends_id')
    friends_list = [friend.friends_id for friend in friends]
    serializer = UserSerializer(friends_list, many=True)
    return Response(serializer.data)
#-------------------------------------------------------------------------------------------------------------------------------------
@throttle_classes([SignUpAndLoginThrottle])
@api_view(['POST'])
def check_email_is_valid(request):
    email = request.data.get("email")
    password = request.data.get("password")
    username = request.data.get("username")

    # Check if the email already exists
    try:
        user = get_user_model().objects.get(email=email)
        if user.is_active:

            return Response({"response": "This email is taken, please try another one",}, status=HTTP_400_BAD_REQUEST)
    except ObjectDoesNotExist:
        # Create a new user if the email doesn't exist
        created_user = get_user_model().objects.create_user(email=email, username=username,password=password)
        refresh = RefreshToken.for_user(user=created_user)
        access = AccessToken.for_user(user=created_user)
        return Response({"response": "The email is valid and user was created",
                         "access": str(access),
                         "refresh": str(refresh),
                         }, status=HTTP_200_OK)

    # Handle other potential errors
    return Response({"response": "Something went wrong, please try again later"}, status=HTTP_404_NOT_FOUND)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def sendRequest(request): # this is for sending a friend request
    user = request.user
    sender_id = CustomUser.objects.get(username=user)

    receiver_id_payload = request.data.get("receiver_id")
    receiver_id = CustomUser.objects.get(username=receiver_id_payload)

    status = request.data.get("status")
    print(sender_id)
    if status == 1 :


        if Friend_request.objects.filter(sender_id=sender_id, receiver_id=receiver_id, status=1).exists():
            return Response({"response" : "the friend request allready exist"})
        request = Friend_request(sender_id=sender_id, receiver_id=receiver_id, status=1)
        request.save()
        return Response({"response" : "friend request sent with success"})

    return Response({"response" : "heello some probkeme happend with status"})


#-------------------------------------------------------------------------------------------------------------------------------------
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def getRequestForUser(request): # get specefic request for a specefic user
    user = request.user
    requests = Friend_request.objects.filter(receiver_id=user)
    senders = []
    requests_id = []
    for request in requests :
        if request.status == 1 :
            sender_detail = CustomUser.objects.get(username = request.sender_id)
            requests_id.append(request.id)
            senders.append(sender_detail)
    serializer = UserSerializer(senders, many=True)

    return Response(
        {
                'data': serializer.data,
                'request_id': requests_id
        }
)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def upload(request):
    user = request.user
    try:
        file = request.data.get("file")
    except KeyError:
         Response('Request has no resource file attached')
    file = request.data.get("file")
    product = Post.objects.create(Post_image=file, user_id = user.id)

    return Response({"response": "success"})
#-------------------------------------------------------------------------------------------------------------------------------------

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def logout(request):
    try:
        refresh_token = request.data.get("refresh_token")
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(status=status.HTTP_205_RESET_CONTENT)

    except Exception as e:
        return Response(status=status.HTTP_400_BAD_REQUEST)

#-------------------------------------------------------------------------------------------------------------------------------------

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_user_info(request):
    try:
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data)
    except get_user_model().DoesNotExist:
        return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_some_user_info(request, pk):
    try:
        user = request.user
        user_info = CustomUser.objects.get(pk=pk)
        serializer = UserSerializer(user_info)
        return Response(serializer.data)
    except get_user_model().DoesNotExist:
        return Response({"error": "User does not exist"}, status=status.HTTP_404_NOT_FOUND)

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def add_info_for_user(request):
    user = request.user
    first_name = request.data.get("first_name")
    second_name = request.data.get("second_name")
    bio = request.data.get("bio")
    phone_number = request.data.get("phone_number")
    country = request.data.get("country")
    region = request.data.get("region")
    city = request.data.get("city")
    Neighborhood = request.data.get("Neighborhood")
    print(user)
    try:
        # Get the user object
        user_object = CustomUser.objects.get(username=user.username)
        user_object.first_name = first_name
        user_object.second_name = second_name
        user_object.bio = bio
        user_object.phone_number = phone_number
        user_object.country = country
        user_object.region = region
        user_object.city = city
        user_object.Neighborhood = Neighborhood

        user_object.save()

        return Response({"response" : "all the information has beem added with success"},HTTP_200_OK )

    except CustomUser.DoesNotExist:
        return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

@permission_classes([IsAuthenticated])
@api_view(['GET'])
def get_post(request, pk):
    user = request.user
    posts = Post.objects.filter(type=pk)
    serializer = PostSerializer(posts, many=True, context={'request': request})
    return Response(serializer.data)


@throttle_classes([SignUpAndLoginThrottle])
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def change_password(request):
    try:
        user = request.user
        old_password = request.data.get("old_password")
        password1 = request.data.get("password1")
        password2 = request.data.get("password2")

        if not user.check_password(old_password):
            return Response({"error": "Old password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

        if password1 == password2:
            user.password = make_password(password1)
            user.save()
            return Response({"response": "password have been changed with success"})

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"error": "An unknown error occurred"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
