from django.urls import path
from .views import (
    ServicesListCreateView,
    ServicesDetailView,
    ServiceCategoryListCreateView,
    ServiceCategoryDetailView,
    BusinessListCreateView,
    BusinessDetailView,
    ClientListCreateView,
    ClientDetailView,
    TeamMemberListCreateView,
    TeamMemberDetailView,
    AppointmentListCreateView,
    AppointmentDetailView,
    SendOTPView,
    CheckBusinessView,
    VerifyOTPView,
    TokenObtainPairView
)
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    # JWT Token Routes
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # Services
    path('services/', ServicesListCreateView.as_view(), name='services-list-create'),
    path('services/<int:pk>/', ServicesDetailView.as_view(), name='services-detail'),

    # Service Categories
    path('service-categories/', ServiceCategoryListCreateView.as_view(), name='service-category-list-create'),
    path('service-categories/<int:pk>/', ServiceCategoryDetailView.as_view(), name='service-category-detail'),

    # Business
    path('business/', BusinessListCreateView.as_view(), name='business-list-create'),
    path('business/<int:business_id>/', BusinessDetailView.as_view(), name='business-detail'),  # Updated to use 'business_id'

    # Clients
    path('clients/', ClientListCreateView.as_view(), name='client-list-create'),
    path('clients/<int:pk>/', ClientDetailView.as_view(), name='client-detail'),

    # Team Members
    path('team-members/', TeamMemberListCreateView.as_view(), name='team-member-list-create'),
    path('team-members/<int:pk>/', TeamMemberDetailView.as_view(), name='team-member-detail'),

    # Appointments
    path('appointments/', AppointmentListCreateView.as_view(), name='appointment-list-create'),
    path('appointments/<int:pk>/', AppointmentDetailView.as_view(), name='appointment-detail'),

    # Authentication / OTP Routes
    path('check-business/', CheckBusinessView.as_view(), name='check-business'),
    path('send-otp/', SendOTPView.as_view(), name='send_otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify_otp'),
]