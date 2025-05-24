from rest_framework import serializers
from .models import Employee

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = ['id', 'first_name', 'last_name', 'email', 'mobile', 'gender', 'date_of_birth', 'address', 'country', 'city', 'skills']
        read_only_fields = ['id']