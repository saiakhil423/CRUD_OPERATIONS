from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.db.models import Count
from datetime import datetime
from .models import Employee
from .serializers import EmployeeSerializer

@api_view(['GET', 'POST'])
def employee_list_create_api(request):
    if request.method == 'GET':
        employees = Employee.objects.all()
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def employee_detail_api(request, pk):
    try:
        employee = Employee.objects.get(pk=pk)
    except Employee.DoesNotExist:
        return Response({'error': 'Employee not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = EmployeeSerializer(employee)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = EmployeeSerializer(employee, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'DELETE':
        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def employee_search_api(request):
    first_name = request.GET.get('first_name', '')
    phone = request.GET.get('phone', '')
    employees = Employee.objects.all()
    if first_name:
        employees = employees.filter(first_name__icontains=first_name)
    if phone:
        employees = employees.filter(mobile__icontains=phone)
    serializer = EmployeeSerializer(employees, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def employee_stats_api(request):
    total_employees = Employee.objects.count()
    
    # Calculate average tenure in years (using created_at)
    avg_tenure = 0
    if total_employees > 0:
        employees_with_dates = Employee.objects.exclude(created_at__isnull=True)
        if employees_with_dates.exists():
            total_days = sum(
                (datetime.now().date() - emp.created_at.date()).days 
                for emp in employees_with_dates
            )
            avg_tenure = round(total_days / total_employees / 365, 1)
    
    # Count unique skills
    skills_tracked = sum(len(emp.skills) for emp in Employee.objects.all())
    
    return Response({
        'totalEmployees': total_employees,
        'avgEmployeeTenure': avg_tenure,
        'skillsTracked': skills_tracked
    })

@api_view(['GET'])
def location_stats_api(request):
    # Group by country instead of department
    locations = Employee.objects.values('country').annotate(
        count=Count('id')
    ).order_by('-count')
    
    return Response([
        {
            'name': loc['country'] or 'Unknown',
            'value': loc['count'],
        }
        for loc in locations
    ])

@api_view(['GET'])
def recent_hires_api(request):
    recent_hires = Employee.objects.order_by('-created_at')[:10]
    serializer = EmployeeSerializer(recent_hires, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def signup_api(request):
    username = request.data.get('username')
    password = request.data.get('password')

    if not username or not password:
        return Response({'error': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, password=password)
    user.save()

    return Response({'message': 'User created successfully.'}, status=status.HTTP_201_CREATED)
