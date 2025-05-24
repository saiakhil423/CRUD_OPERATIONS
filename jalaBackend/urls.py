from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('employee.urls')),
    path('api/', include('employee.api_urls')),  # new API views 
]