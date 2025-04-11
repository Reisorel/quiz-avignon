import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import RetrieveAPIView

from quiz.models import Question, GameSession
from .serializers import QuestionSerializer
from .serializers import RawQuestionSerializer


# Lance une nouvelle partie avec 10 questions aléatoires et réponses mélangées
class QuizStartView(APIView):
    def get(self, request):
        all_questions = list(Question.objects.all())
        selected = random.sample(all_questions, min(10, len(all_questions)))
        serializer = QuestionSerializer(selected, many=True)
        return Response(serializer.data)

# Lance une nouvelle partie test avec 10 questions aléatoires
class QuizTestView(APIView):
    def get(self, request):
        all_questions = list(Question.objects.all())
        selected = random.sample(all_questions, min(10, len(all_questions)))
        serializer = RawQuestionSerializer(selected, many=True)
        return Response(serializer.data)

# Enregistre anonyment le socre de la partie en cours
class SaveScoreView(APIView):
    def post(self, request):
        score = request.data.get("score")
        if score is None:
            return Response({"error": "Missing score"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            GameSession(score=int(score)).save()
            return Response({"message": "Score enregistré"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# Mise à jour des stats de la question
class AnswerView(APIView):
    def post(self, request):
        question_id = request.data.get("question_id")
        selected = request.data.get("selected_answer")

        if not question_id or not selected:
            return Response({"error": "Missing data"}, status=status.HTTP_400_BAD_REQUEST)

        question = Question.objects(id=question_id).first()
        if not question:
            return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)

        question.stats[selected] = question.stats.get(selected, 0) + 1
        question.save()

        return Response({"message": "Stat updated"}, status=status.HTTP_200_OK)

# Séléctionne une question par son ID
class GetQuestionByIdView(APIView):
    def get(self, request, question_id):
        question = Question.objects(id=question_id).first()
        if not question:
            return Response({"error": "Question not found"}, status=404)

        serializer = QuestionSerializer(question)
        return Response(serializer.data)
