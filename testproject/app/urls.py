from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import  AptitudeQuestionAPIView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UserRegistrationViewSet
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import SubmitAnswersAPIView
from .views import *
router = DefaultRouter()
router.register(r'register', UserRegistrationViewSet, basename='user-register')
# router.register(r'profile', UserProfileViewSet, basename='user-profiler')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('update_profile/', UserUpdateAPIView.as_view(), name='update-profile'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('submit_answers/', SubmitAnswersAPIView.as_view(), name='submit-answers'),
    path('profile/', UserProfileAPIView.as_view(), name='user-profile'),
    path('aptitude_questions/', AptitudeQuestionAPIView.as_view(), name='aptitude-questions'),
    path('results/<str:day_name>/', FilterResultByDay.as_view(), name='results-for-day'),
    path("piechart/", MultiDayChartDataAPIView.as_view(), name="multi-day-chart-data"),


]
