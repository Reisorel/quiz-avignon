import random
from mongoengine import Document, StringField, ListField, DictField

class Question(Document):
    question_text = StringField(required=True)
    correct_answer = StringField(required=True)
    wrong_answers = ListField(StringField(), required=True)
    explanation = StringField()
    stats = DictField()

    meta = {'collection': 'questions'}

    def get_shuffled_answers(self):
        all_answers = [self.correct_answer] + self.wrong_answers
        random.shuffle(all_answers)
        return all_answers

from mongoengine import IntField, DateTimeField
from datetime import datetime


class GameSession(Document):
    score = IntField(required=True)
    created_at = DateTimeField(default=datetime.utcnow)

    meta = {'collection': 'game_sessions'}
