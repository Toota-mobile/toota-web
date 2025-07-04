from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.db import models
from django.utils.translation import gettext_lazy as _
from django.utils import timezone
import uuid
from phonenumber_field.modelfields import PhoneNumberField  # Requires django-phonenumber-field
from cloudinary.models import CloudinaryField
from django.db.models import Sum, Count


###############################################################################
# Base Manager: Shared logic for creating users
###############################################################################
class BaseCustomUserManager(BaseUserManager):
    """
    Base manager for custom user models. It centralizes user creation logic,
    ensuring email normalization, password setting, and common validations.
    """
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_("The Email field must be set"))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_active', False)  # Require verification by default
        return self._create_user(email=email, password=password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        if extra_fields.get('is_staff') is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))
        return self._create_user(email=email, password=password, **extra_fields)

###############################################################################
# Abstract Base Model: Common fields for all user types
###############################################################################
class AbstractCustomUser(AbstractBaseUser, PermissionsMixin):
    """
    Abstract user model that holds fields and methods common to both clients and drivers.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False, unique=True)
    email = models.EmailField(unique=True, max_length=255)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    # profile_pic = CloudinaryField('image', blank=True, null=True)
    phone_number = PhoneNumberField(blank=True, null=True)
    physical_address = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        abstract = True

###############################################################################
# User Model
###############################################################################
class User(AbstractCustomUser):
    """
    User model that extends the abstract custom user with client-specific fields.
    """
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='users',
        blank=True,
        help_text=_('The groups this user belongs to.'),
        verbose_name=_('groups')
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='user_permissions',
        blank=True,
        help_text=_('Specific permissions for this user.'),
        verbose_name=_('user permissions')
    )

    objects = BaseCustomUserManager()

    def __str__(self):
        return self.email

###############################################################################
# Driver Model (updated for optional KYC fields)
###############################################################################
class Driver(AbstractCustomUser):
    """
    Driver model that extends the abstract custom user with driver-specific fields.
    For driver signup, only email and password are required. Other fields are optional.
    """
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    rating_count = models.PositiveIntegerField(default=0)
    
    VEHICLE_CHOICES = [
        ('motorBike', 'MotorBike'),
        ('1 ton truck', '1 ton Truck'),
        ('1.5 ton truck', '1.5 ton Truck'),
        ('2 ton truck', '2 ton Truck'),
        ('4 ton truck', '4 ton Truck'),
        ('bakkie', 'Bakkie'),
        ('car', 'car'),
        ('scooter', 'scooter'),
        ('8 ton truck', '8 ton Truck'),
    ]
    # Added load capacity choices
    LOAD_CAPACITY_CHOICES = [
        ('0.5', '0.5 ton'),
        ('1.0', '1.0 ton'),
        ('1.5', '1.5 tons'),
        ('2.0', '2.0 tons'),
        ('4.0', '4.0 tons'),
        ('8.0', '8.0 tons'),
        ('10.0', '10.0 tons'),
    ]
    vehicle_load_capacity = models.CharField(
        max_length=10, 
        choices=LOAD_CAPACITY_CHOICES,
        null=True, 
        blank=True,
        help_text="Select the load capacity of your vehicle"
    )
    vehicle_type = models.CharField(max_length=50, choices=VEHICLE_CHOICES, null=True, blank=True)
    car_image = CloudinaryField('image', null=True, blank=True)
    vehicle_registration = models.CharField(max_length=50, unique=True, null=True, blank=True)
    license_image = CloudinaryField('image', null=True, blank=True)
    current_location = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    is_available = models.BooleanField(default=True)
    is_online = models.BooleanField(default=False)
    total_trips_completed = models.PositiveIntegerField(default=0)
    earnings = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    
    def update_rating(self):
        result = self.ratings.aggregate(total_value=Sum('rating'), total_count=Count('id'))
        
        # Check if there are any ratings
        if result['total_count'] > 0:
            self.average_rating = result['total_value'] / result['total_count']
            self.rating_count = result['total_count']
        self.save()
        
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='driver_users',
        blank=True,
        help_text=_('The groups this driver belongs to.'),
        verbose_name=_('groups')
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='driver_user_permissions',
        blank=True,
        help_text=_('Specific permissions for this driver.'),
        verbose_name=_('user permissions')
    )
    
    objects = BaseCustomUserManager()
    
    def __str__(self):
        return f"{self.email} - {self.vehicle_type}" if self.vehicle_type else self.email
        
    def clean(self):
        super().clean()
        # Removed the load capacity validation since we now use predefined choices
        if self.vehicle_registration:
            if Driver.objects.exclude(id=self.id).filter(vehicle_registration=self.vehicle_registration).exists():
                raise ValidationError({'vehicle_registration': _("This vehicle registration number is already in use.")})
                
    def save(self, *args, **kwargs):
        self.full_clean()  # Ensure clean() is called before saving
        super().save(*args, **kwargs)
        
    def update_location(self, latitude, longitude):
        self.latitude = latitude
        self.longitude = longitude
        self.current_location = f"Latitude: {latitude}, Longitude: {longitude}"
        self.save()


   

###############################################################################
# OTP Model: For handling email verification (shared by Users and Drivers)
###############################################################################
class OTP(models.Model):
    """
    Model to handle email verification via a 4-digit OTP code.
    The OTP is valid for 60 minutes.
    This model supports both client users and drivers by allowing only one of the
    relationships to be set.
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='otp', null=True, blank=True)
    driver = models.OneToOneField(Driver, on_delete=models.CASCADE, related_name='otp', null=True, blank=True)
    code = models.CharField(max_length=4)  # 4-digit OTP code
    created_at = models.DateTimeField(auto_now_add=True)
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        if self.user:
            return f"OTP for {self.user.email}"
        elif self.driver:
            return f"OTP for {self.driver.email}"
        else:
            return "Unassigned OTP"

    def is_expired(self):
        """
        Checks if the OTP has expired (after 60 minutes).
        """
        expiration_time = timezone.now() - timezone.timedelta(minutes=60)
        return self.created_at < expiration_time

