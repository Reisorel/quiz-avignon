"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path

urlpatterns = [
    path('admin/', admin.site.urls),
]

# Import the include function to include other URL configurations
from django.urls import path
from quiz.views import QuizStartView
from quiz.views import SaveScoreView
from quiz.views import AnswerView
from quiz.views import GetQuestionByIdView



urlpatterns = [
    path('api/quiz/start/', QuizStartView.as_view()),
    path('api/quiz/answer/', AnswerView.as_view()),
    path('api/quiz/score/', SaveScoreView.as_view()),
    path('api/quiz/question/<str:question_id>/', GetQuestionByIdView.as_view()),
]
