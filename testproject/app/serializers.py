from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    profile_image=serializers.ImageField(use_url=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'profile_image', 'username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
            profile_image=validated_data.get('profile_image'),
            username=validated_data.get('username'),
            email=validated_data.get('email'),
            password=validated_data.get('password')
        )
        return user
  
from rest_framework import serializers
from .models import AptitudeResult

class AptitudeResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AptitudeResult
        fields = '__all__'


class UserProfileSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(use_url=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'profile_image']

from rest_framework import serializers
from .models import AptitudeResult

class AptitudeResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = AptitudeResult
        fields = [
            'id',
            'score',
            'total_questions',
            'percentage',
            'status',
            'correct_answers',
            'wrong_answers',
            'submitted_at',
            'day_name'
        ]


class UserUpdateSerializer(serializers.ModelSerializer):
    profile_image = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'username', 'email', 'profile_image']

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.username = validated_data.get('username', instance.username)
        instance.email = validated_data.get('email', instance.email)

        if 'profile_image' in validated_data:
            instance.profile_image = validated_data['profile_image']

        instance.save()
        return instance
