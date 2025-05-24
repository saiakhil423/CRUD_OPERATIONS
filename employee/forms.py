from django import forms
from .models import Employee

class EmployeeForm(forms.ModelForm):
    class Meta:
        model = Employee
        fields = [
            'first_name',
            'last_name',
            'email',
            'mobile',
            'gender',
            'date_of_birth',
            'address',
            'country',
            'city',
            'skills'
        ]
