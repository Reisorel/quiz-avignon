from rest_framework import serializers
from quiz.models import Question


#serializer pour api/start
class QuestionSerializer(serializers.Serializer):
    id = serializers.CharField()
    question_text = serializers.CharField()
    explanation = serializers.CharField()
    stats = serializers.DictField()
    answers = serializers.SerializerMethodField()

    def get_answers(self, obj):
        return obj.get_shuffled_answers()

#serializer pour api/test
class RawQuestionSerializer(serializers.Serializer):
    id = serializers.CharField()
    question_text = serializers.CharField()
    correct_answer = serializers.CharField()
    wrong_answers = serializers.ListField(child=serializers.CharField())
    explanation = serializers.CharField()
    stats = serializers.DictField()
