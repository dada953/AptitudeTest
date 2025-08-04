import os
from django.apps import AppConfig
from django.db.models.signals import post_migrate


class MainConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'app'  # your app name here

    def ready(self):
        from django.contrib.auth import get_user_model

        def create_superuser(sender, **kwargs):
            if os.environ.get('CREATE_SUPERUSER') == '1':
                User = get_user_model()
                username = os.environ.get('SUPERUSER_USERNAME', 'admin')
                email = os.environ.get('SUPERUSER_EMAIL', 'admin@example.com')
                password = os.environ.get('SUPERUSER_PASSWORD', 'admin123')

                if not User.objects.filter(username=username).exists():
                    print("🔑 Creating superuser...")
                    User.objects.create_superuser(username=username, email=email, password=password)
                else:
                    print("✅ Superuser already exists.")

        post_migrate.connect(create_superuser, sender=self)
