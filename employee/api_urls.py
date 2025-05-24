from django.urls import path
from . import api_views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('employees/', api_views.employee_list_create_api, name='api-employee-list-create'),
    path('employees/<int:pk>/', api_views.employee_detail_api, name='api-employee-detail'),
    path('employees/search/', api_views.employee_search_api, name='api-employee-search'),
    
    #####################
    
    path('employee-stats/', api_views.employee_stats_api, name='api-employee-stats'),
    path('location-stats/', api_views.location_stats_api, name='api-location-stats'),
    path('recent-hires/', api_views.recent_hires_api, name='api-recent-hires'),

    # JWT Authentication endpoints
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # Signup endpoint
    path('signup/', api_views.signup_api, name='api-signup'),
]
