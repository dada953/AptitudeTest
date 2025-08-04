# from django.apps import AppConfig


# class AppConfig(AppConfig):
#     default_auto_field = 'django.db.models.BigAutoField'
#     name = 'app'



from django.apps import AppConfig
from django.db.models.signals import post_migrate
import os

class MainConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'

    def ready(self):
        from django.conf import settings
        from django.contrib.auth import get_user_model

        def create_superuser(sender, **kwargs):
            if os.environ.get('CREATE_SUPERUSER') == '1':
                User = get_user_model()
                username = os.environ.get('SUPERUSER_USERNAME', 'admin')
                email = os.environ.get('SUPERUSER_EMAIL', 'admin@example.com')
                password = os.environ.get('SUPERUSER_PASSWORD', 'admin123')

                if not User.objects.filter(username=username).exists():
                    print("Creating superuser...")
                    User.objects.create_superuser(username, email, password)
                else:
                    print("Superuser already exists.")

        post_migrate.connect(create_superuser, sender=self)
