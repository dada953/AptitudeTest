from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
import random, json
from django.contrib.auth.models import User
from .models import AptitudeQuestion, UserQuestionMap
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserRegistrationSerializer
from rest_framework import viewsets, status
from .models import *
from .serializers import UserProfileSerializer


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import AptitudeQuestion
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import CustomUser  # Your user model if it's custom
from rest_framework import status

# Your Existing Views...
class SubmitAnswersAPIView(APIView):
    permission_classes = [IsAuthenticated]
    # ... your existing code ...

class AptitudeQuestionAPIView(APIView):
    permission_classes = [IsAuthenticated]
    # ... your existing code ...
class SubmitAnswersAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_answers = dict(request.data.get('answers', {}))
        score = 0
        total_questions = 5  # or AptitudeQuestion.objects.count()
        correct_questions = []
        wrong_questions = []

        for q_id, user_option in user_answers.items():
            try:
                question = AptitudeQuestion.objects.get(id=q_id)
                if question.correct_answer == user_option:
                    score += 1
                    correct_questions.append({
                        "id": question.id,
                        "question": question.question_text,
                        "your_answer": user_option,
                        "correct_answer": question.correct_answer
                    })
                else:
                    wrong_questions.append({
                        "id": question.id,
                        "question": question.question_text,
                        "your_answer": user_option,
                        "correct_answer": question.correct_answer
                    })
            except AptitudeQuestion.DoesNotExist:
                continue

        percentage = round((score / total_questions) * 100, 2) if total_questions else 0
        status = "Pass" if percentage >= 40 else "Fail"

        # ✅ Save result to DB
        AptitudeResult.objects.create(
            user=request.user,
            score=score,
            total_questions=total_questions,
            percentage=percentage,
            status=status,
            correct_answers=correct_questions,
            wrong_answers=wrong_questions
        )

        return Response({
            "score": score,
            "total_questions": total_questions,
            "percentage": percentage,
            "status": status,
            "correct_questions": correct_questions,
            "wrong_questions": wrong_questions
        })


class UserRegistrationViewSet(viewsets.ModelViewSet):
    """
    A ModelViewSet for user registration.
    """
    queryset = CustomUser.objects.all()
    serializer_class = UserRegistrationSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {"message": "User registered successfully"},
            status=status.HTTP_201_CREATED
        )    
class UserProfileViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

class AptitudeQuestionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        questions = []
        unique = []

        for _ in range(0, 5):
            question_data = self.generate_question()

            # Avoid same type of question multiple times
            while question_data['type'] in unique:
                question_data = self.generate_question()
            unique.append(question_data['type'])

            # Save in DB
            saved_question = AptitudeQuestion.objects.create(
                question_text=question_data['question'],
                options=json.dumps(question_data['options']),
                correct_answer=question_data['answer']
            )

            # Map user with this question
            UserQuestionMap.objects.create(
                user=user,
                question=saved_question
            )

            # Add id to response
            questions.append({
                "id": saved_question.id,                      # ✅ Sending Question ID
                "question": question_data['question'],
                "options": question_data['options'],
                "type": question_data['type']
            })

        return Response({
            "user": user.username,
            "questions": questions
        })


    def generate_question(self):
        question_type = random.choice(["profit_loss", "ratio", "percentage", "simple_interest", "mixture"])

        if question_type == "profit_loss":
            cost_price = random.randint(500, 1500)
            profit_percent = random.choice([10, 15, 20, 25, 30])
            selling_price = cost_price + (cost_price * profit_percent / 100)
            return {
                "type": question_type,
                "question": f"A shopkeeper buys an item for ₹{cost_price} and sells it for ₹{int(selling_price)}. What is his profit percentage?",
                "options": [
                    f"{profit_percent - 5}%",
                    f"{profit_percent}%",
                    f"{profit_percent + 5}%",
                    f"{profit_percent + 10}%"
                ],
                "answer": f"{profit_percent}%"
            }

        elif question_type == "ratio":
            x = random.randint(2, 5)
            y = x + random.randint(1, 3)
            k = random.randint(3, 8)
            present_age_younger = x * k
            present_age_older = y * k
            new_younger = present_age_younger + 6
            new_older = present_age_older + 6
            return {
                "type": question_type,
                "question": f"The ratio of ages of two brothers is {x}:{y}. After 6 years, the ratio will become {new_younger}:{new_older}. What is the present age of the younger brother?",
                "options": [
                    f"{present_age_younger - 3} years",
                    f"{present_age_younger} years",
                    f"{present_age_younger + 3} years",
                    f"{present_age_younger + 6} years"
                ],
                "answer": f"{present_age_younger} years"
            }

        elif question_type == "percentage":
            inc = random.choice([10, 15, 20, 25])
            dec = random.choice([5, 10, 15, 20])
            net_change = inc - (inc * dec / 100)
            net_percent = net_change - 100
            net_percent_rounded = round(net_percent, 2)
            result_type = "increase" if net_percent_rounded > 0 else "decrease"
            return {
                "type": question_type,
                "question": f"A number is increased by {inc}% and then decreased by {dec}%. What is the net percentage change?",
                "options": [
                    f"{abs(net_percent_rounded - 2)}% {result_type}",
                    f"{abs(net_percent_rounded)}% {result_type}",
                    f"{abs(net_percent_rounded + 2)}% {result_type}",
                    f"{abs(net_percent_rounded + 4)}% {result_type}"
                ],
                "answer": f"{abs(net_percent_rounded)}% {result_type}"
            }

        elif question_type == "simple_interest":
            principal = random.choice([3000, 4000, 5000, 6000])
            rate = random.choice([5, 6, 7, 8])
            time = random.choice([2, 3, 4])
            si = (principal * rate * time) / 100
            return {
                "type": question_type,
                "question": f"If ₹{principal} is invested at {rate}% per annum simple interest, what will be the total interest earned in {time} years?",
                "options": [
                    f"₹{int(si - 100)}",
                    f"₹{int(si)}",
                    f"₹{int(si + 100)}",
                    f"₹{int(si + 200)}"
                ],
                "answer": f"₹{int(si)}"
            }

        elif question_type == "mixture":
            milk_price = random.choice([30, 35, 40])
            final_price = random.choice([20, 25, 30])
            # Avoid divide by zero
            if final_price == 0:
                final_price = 1
            ratio_milk = final_price
            ratio_water = milk_price - final_price
            # Avoid negative ratios
            if ratio_water < 0:
                ratio_water = abs(ratio_water)
            ratio_display = f"1:{int(milk_price/final_price)-1}" if final_price != 0 and (int(milk_price/final_price)-1) > 0 else "1:1"
            return {
                "type": question_type,
                "question": f"In what ratio must water be mixed with milk costing ₹{milk_price} per liter so that the cost of the mixture becomes ₹{final_price} per liter?",
                "options": [
                    "2:3",
                    "1:2",
                    "2:1",
                    ratio_display
                ],
                "answer": ratio_display
            }

        # Final safety return
        return {
            "type": "default",
            "question": "Default Question: Please check logic.",
            "options": ["A", "B", "C", "D"],
            "answer": "A"
        }



class UserProfileAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models.functions import ExtractWeekDay
from .models import AptitudeResult
import calendar
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models.functions import ExtractWeekDay
from .serializers import *
import calendar
class FilterResultByDay(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, day_name):
        user = request.user

        if day_name.lower() == "all":
            results = AptitudeResult.objects.filter(user=user)
        else:
            results = AptitudeResult.objects.filter(user=user, day_name__iexact=day_name)

        serializer = AptitudeResultSerializer(results, many=True)
        return Response(serializer.data)
    
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import AptitudeResult
from collections import defaultdict
from django.db.models import Count

class MultiDayChartDataAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        results = (
            AptitudeResult.objects.filter(user=user)
            .values("day_name")
            .annotate(correct_count=Count("correct_answers"))
            .order_by("day_name")
        )

        data = [{"name": item["day_name"], "value": item["correct_count"]} for item in results]
        return Response(data)


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .serializers import UserUpdateSerializer

class UserUpdateAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Profile updated successfully', 'user': serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
