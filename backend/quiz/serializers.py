from rest_framework import serializers
from quiz.models import Question

class QuestionSerializer(serializers.Serializer):
    id = serializers.CharField()
    question_text = serializers.CharField()
    explanation = serializers.CharField()
    stats = serializers.DictField()
    answers = serializers.SerializerMethodField()

    def get_answers(self, obj):
        return obj.get_shuffled_answers()
