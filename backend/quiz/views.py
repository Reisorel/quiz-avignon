from django.shortcuts import render

# Create your views here.
import random
from rest_framework.views import APIView
from rest_framework.response import Response
from quiz.models import Question
from .serializers import QuestionSerializer

class QuizStartView(APIView):
    def get(self, request):
        all_questions = list(Question.objects.all())
        selected = random.sample(all_questions, min(10, len(all_questions)))  # <= 10 max
        serializer = QuestionSerializer(selected, many=True)
        return Response(serializer.data)


