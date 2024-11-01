from django.contrib.auth.base_user import BaseUserManager
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.core.validators import RegexValidator


phone_regex = RegexValidator(regex=r'^\+?1?\d{9,15}$', message="Phone number must be entered in the format: '+999999999'. Up to 15 digits allowed.")


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(self, email, password, **extra_fields):
        """
        Create and save a User with the given email and password.
        """
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    username = models.CharField(blank=False,default="username", max_length=70, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    bio = models.TextField(max_length=1000, blank=True,null=True)
    job = models.CharField(blank=False, max_length=80, null=True,default='')
    phone_number = models.CharField(validators=[phone_regex], max_length=17, blank=True)  # The max_length is adjusted to accommodate the regex
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=50)
    country = models.CharField(default="blank",max_length=50)
    region = models.CharField(default="blank",max_length=50)
    city = models.CharField(default="blank",max_length=50)
    Neighborhood  = models.CharField(default="blank", max_length=80)
    pastCollaboration = models.IntegerField(default=0)
    User_image = models.ImageField(blank=False,default="How-to-Setup-ReactJS-with-Django_Jf3oK5G.png",null=False)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.username


class ChartData(models.Model):
    user = models.ForeignKey(CustomUser,blank='false',default='username' , on_delete=models.CASCADE)
    month = models.DateField(auto_now=False,blank='true', null='true' ,auto_now_add=False)
    value = models.FloatField(default=0)


class Post(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    username = models.CharField(blank=False,default="username", max_length=70, unique=False)
    description = models.TextField(max_length=1000, blank=True,null=True)
    userDescription = models.TextField(max_length=1000, blank=True,null=True)
    type = models.CharField(blank=True,null=True, max_length=50)
    pastCollaboration = models.IntegerField(default=0)
    price = models.IntegerField(default=0)
    Post_image = models.ImageField(blank=False,default="How-to-Setup-ReactJS-with-Django_Jf3oK5G.png",null=False, upload_to='media/')
    User_image = models.ImageField(blank=False,default="How-to-Setup-ReactJS-with-Django_Jf3oK5G.png",null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)



class Friend_request(models.Model):
    sender_id =models.ForeignKey(CustomUser, related_name=_("requestSenderId+"), on_delete=models.CASCADE)
    receiver_id =models.ForeignKey(CustomUser, related_name=_(" requestRecciverId+"), on_delete=models.CASCADE)
    status = models.IntegerField(default=0) # 0 = no request 1= pending 2=accepted


class Friends(models.Model):
    user_id =models.ForeignKey(CustomUser, related_name=_("userId+"), on_delete=models.CASCADE)
    friends_id =models.ForeignKey(CustomUser, related_name=_(" friendOfUserId+"), on_delete=models.CASCADE)
