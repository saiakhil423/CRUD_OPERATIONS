from django.urls import path
from . import views

urlpatterns = [
    path('', views.employee_list_view, name='employee-list'),
    path('api/create/', views.employee_create_view, name='employee-create'),
    path('api/edit/<int:pk>/', views.employee_update_view, name='employee-edit'),
    path('api/delete/<int:pk>/', views.employee_delete_view, name='employee-delete'),
]
