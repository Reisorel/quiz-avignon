import os
import django
from mongoengine import connect

# Configuration Django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from quiz.models import Question  # importe le modèle

# Liste des questions (tu peux ajouter les 40 ici ou dans un fichier JSON séparé)
questions_data = [
    {
        "question_text": "En quelle année a eu lieu la première édition du Festival d’Avignon ?",
        "correct_answer": "1947",
        "wrong_answers": ["1945", "1955"],
        "explanation": "Le premier festival s’est déroulé en 1947, fondé par Jean Vilar.",
        "stats": {"1947": 0, "1945": 0, "1955": 0}
    },
    {
        "question_text": "Quel est le nom du directeur artistique du Festival d’Avignon en 2021 ?",
        "correct_answer": "Olivier Py",
        "wrong_answers": ["Jean Vilar", "Alain Françon"],
        "explanation": "Olivier Py a été le directeur artistique du Festival d’Avignon en 2021.",
        "stats": {"Olivier Py": 0, "Jean Vilar": 0, "Alain Françon": 0}
    },
    {
        "question_text": "Quel est le thème du Festival d’Avignon en 2022 ?",
        "correct_answer": "L'Humanité",
        "wrong_answers": ["La Nature", "La Technologie"],
        "explanation": "Le thème du Festival d’Avignon en 2022 était 'L'Humanité'.",
        "stats": {"L'Humanité": 0, "La Nature": 0, "La Technologie": 0}
    },
    {
        "question_text": "Quel est le lieu principal du Festival d’Avignon ?",
        "correct_answer": "Le Palais des Papes",
        "wrong_answers": ["Le Théâtre Antique", "Le Parc des Expositions"],
        "explanation": "Le Palais des Papes est le lieu principal du Festival d’Avignon.",
        "stats": {"Le Palais des Papes": 0, "Le Théâtre Antique": 0, "Le Parc des Expositions": 0}
    },
    {
        "question_text": "Quel est le nom de la compagnie fondée par Jean Vilar ?",
        "correct_answer": "Le TNP",
        "wrong_answers": ["La Comédie-Française", "Le Théâtre de la Ville"],
        "explanation": "Jean Vilar a fondé le TNP (Théâtre National Populaire).",
        "stats": {"Le TNP": 0, "La Comédie-Française": 0, "Le Théâtre de la Ville": 0}
    },
    {
        "question_text": "Quel est le nom du festival qui se déroule en même temps que le Festival d’Avignon ?",
        "correct_answer": "Le Off",
        "wrong_answers": ["Le In", "Le Festival de Cannes"],
        "explanation": "Le Off est un festival qui se déroule en même temps que le Festival d’Avignon.",
        "stats": {"Le Off": 0, "Le In": 0, "Le Festival de Cannes": 0}
    },
    {
        "question_text": "Quel est le nom de la place emblématique du Festival d’Avignon ?",
        "correct_answer": "La Place de l'Horloge",
        "wrong_answers": ["La Place des Corps Saints", "La Place du Palais"],
        "explanation": "La Place de l'Horloge est une place emblématique du Festival d’Avignon.",
        "stats": {"La Place de l'Horloge": 0, "La Place des Corps Saints": 0, "La Place du Palais": 0}
    },
    {
        "question_text": "Quel est le nom du prix décerné au meilleur spectacle du Festival d’Avignon ?",
        "correct_answer": "Le Prix du Public",
        "wrong_answers": ["Le Prix de la Critique", "Le Prix du Jury"],
        "explanation": "Le Prix du Public est décerné au meilleur spectacle du Festival d’Avignon.",
        "stats": {"Le Prix du Public": 0, "Le Prix de la Critique": 0, "Le Prix du Jury": 0}
    },
    {
        "question_text": "Quel est le nom de la rue principale où se déroulent les spectacles ?",
        "correct_answer": "Rue des Teinturiers",
        "wrong_answers": ["Rue de la République", "Rue des Lices"],
        "explanation": "La Rue des Teinturiers est la rue principale où se déroulent les spectacles.",
        "stats": {"Rue des Teinturiers": 0, "Rue de la République": 0, "Rue des Lices": 0}
    },
    {
        "question_text": "Quel est le nom du directeur artistique du Festival d’Avignon en 2023 ?",
        "correct_answer": "Tiago Rodrigues",
        "wrong_answers": ["Jean Vilar", "Olivier Py"],
        "explanation": "Tiago Rodrigues a été le directeur artistique du Festival d’Avignon en 2023.",
        "stats": {"Tiago Rodrigues": 0, "Jean Vilar": 0, "Olivier Py": 0}
    },
    {
        "question_text": "Quelle est la ville d'origine de Jean Vilar, fondateur du Festival d’Avignon ?",
        "correct_answer": "Sète",
        "wrong_answers": ["Avignon", "Paris"],
        "explanation": "Jean Vilar est né à Sète, dans le sud de la France.",
        "stats": {"Sète": 0, "Avignon": 0, "Paris": 0}
    },
    {
        "question_text": "Combien de spectacles environ sont présentés chaque année dans le Off ?",
        "correct_answer": "Plus de 1000",
        "wrong_answers": ["Environ 200", "Environ 500"],
        "explanation": "Le Off d’Avignon regroupe chaque année plus de 1000 spectacles différents.",
        "stats": {"Plus de 1000": 0, "Environ 200": 0, "Environ 500": 0}
   },
   {
        "question_text": "Quel célèbre dramaturge est souvent joué au Festival d’Avignon ?",
        "correct_answer": "William Shakespeare",
        "wrong_answers": ["Victor Hugo", "Molière"],
        "explanation": "William Shakespeare est fréquemment mis en scène au Festival d’Avignon.",
        "stats": {"William Shakespeare": 0, "Victor Hugo": 0, "Molière": 0}
  },
  {
        "question_text": "Quel type de spectacle n’est pas traditionnellement présenté à Avignon ?",
        "correct_answer": "Concert de rock",
        "wrong_answers": ["Théâtre", "Danse contemporaine"],
        "explanation": "Le Festival d’Avignon est centré sur le spectacle vivant, mais pas les concerts de rock.",
        "stats": {"Concert de rock": 0, "Théâtre": 0, "Danse contemporaine": 0}
  },
  {
        "question_text": "Quel est le nom du journal quotidien du festival édité par les organisateurs ?",
        "correct_answer": "Journal du Festival",
        "wrong_answers": ["La Gazette d’Avignon", "Le Courrier du Off"],
        "explanation": "Le Journal du Festival est édité chaque jour pendant l’événement.",
        "stats": {"Journal du Festival": 0, "La Gazette d’Avignon": 0, "Le Courrier du Off": 0}
  },
  {
        "question_text": "Quelle est la durée moyenne du Festival d’Avignon ?",
        "correct_answer": "3 semaines",
        "wrong_answers": ["1 semaine", "1 mois"],
        "explanation": "Le festival dure généralement environ trois semaines au mois de juillet.",
        "stats": {"3 semaines": 0, "1 semaine": 0, "1 mois": 0}
   },
   {
        "question_text": "En quelle année le Festival d’Avignon a-t-il été annulé pour cause de grève ?",
        "correct_answer": "2003",
        "wrong_answers": ["2010", "1998"],
        "explanation": "L'édition 2003 a été annulée en raison d'un important mouvement de grève des intermittents du spectacle.",
        "stats": {"2003": 0, "2010": 0, "1998": 0}
   },
   {
        "question_text": "Quel est le principal public visé par le Festival d’Avignon ?",
        "correct_answer": "Les amateurs de théâtre et de spectacle vivant",
        "wrong_answers": ["Les touristes gastronomiques", "Les fans de musique électronique"],
        "explanation": "Le festival s’adresse avant tout aux passionnés de théâtre, danse et spectacle vivant.",
        "stats": {
        "Les amateurs de théâtre et de spectacle vivant": 0,
        "Les touristes gastronomiques": 0,
        "Les fans de musique électronique": 0
 }
   },
   {
        "question_text": "Quel outil numérique est utilisé pour réserver des places au Festival ?",
        "correct_answer": "Le site officiel du Festival",
        "wrong_answers": ["La billetterie FNAC", "Le site de la mairie d’Avignon"],
        "explanation": "Les réservations se font principalement via le site officiel du Festival d’Avignon.",
        "stats": {
        "Le site officiel du Festival": 0,
        "La billetterie FNAC": 0,
        "Le site de la mairie d’Avignon": 0
    }
   },
   {
        "question_text": "Quel artiste a ouvert le Festival d’Avignon 2022 avec 'Le Moine noir' ?",
        "correct_answer": "Kirill Serebrennikov",
        "wrong_answers": ["Tiago Rodrigues", "Stanislas Nordey"],
        "explanation": "Kirill Serebrennikov a présenté 'Le Moine noir' en ouverture du Festival 2022.",
        "stats": {
        "Kirill Serebrennikov": 0,
        "Tiago Rodrigues": 0,
        "Stanislas Nordey": 0
    }
  }
]

# Suppression des anciennes questions (optionnel)
Question.objects.delete()

# Insertion
for data in questions_data:
    q = Question(**data)
    q.save()

print(f"{len(questions_data)} questions insérées avec succès.")
