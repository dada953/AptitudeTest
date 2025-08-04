#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'testproject.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    
    # Add this before the final line
if os.environ.get('CREATE_SUPERUSER') == '1':
    from django.contrib.auth import get_user_model
    User = get_user_model()

    username = os.environ.get('SUPERUSER_USERNAME', 'admin')
    email = os.environ.get('SUPERUSER_EMAIL', 'admin@example.com')
    password = os.environ.get('SUPERUSER_PASSWORD', 'admin123')

    if not User.objects.filter(username=username).exists():
        print("Creating superuser...")
        User.objects.create_superuser(username=username, email=email, password=password)
    else:
        print("Superuser already exists.")
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()
