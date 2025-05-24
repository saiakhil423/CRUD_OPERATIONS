from django.db import models

GENDER_CHOICES = (
    ('M', 'Male'),
    ('F', 'Female'),
)


class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=15, unique=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)
    date_of_birth = models.DateField()
    address = models.TextField()
    country = models.CharField(max_length=50)
    city = models.CharField(max_length=50)
    
    # storing skills as comma-separated values or use ManyToMany
    skills = models.JSONField(default=list)  

    created_at = models.DateTimeField(auto_now_add=True)  # for tracking
    updated_at = models.DateTimeField(auto_now=True)      # for tracking

    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def __str__(self):
        return self.full_name()
