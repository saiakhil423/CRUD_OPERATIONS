from django.shortcuts import render, redirect, get_object_or_404
from .models import Employee
from .forms import EmployeeForm  # we'll create this form below

def employee_list_view(request):
    employees = Employee.objects.all()
    return render(request, 'employee/list.html', {'employees': employees})

def employee_create_view(request):
    if request.method == 'POST':
        form = EmployeeForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('employee-list')
    else:
        form = EmployeeForm()
    return render(request, 'employee/form.html', {'form': form})

def employee_update_view(request, pk):
    employee = get_object_or_404(Employee, pk=pk)
    if request.method == 'POST':
        form = EmployeeForm(request.POST, instance=employee)
        if form.is_valid():
            form.save()
            return redirect('employee-list')
    else:
        form = EmployeeForm(instance=employee)
    return render(request, 'employee/form.html', {'form': form})

def employee_delete_view(request, pk):
    employee = get_object_or_404(Employee, pk=pk)
    if request.method == 'POST':
        employee.delete()
        return redirect('employee-list')
    return render(request, 'employee/confirm_delete.html', {'employee': employee})
