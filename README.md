<h1>🎭 Web App - Quiz Théâtre Avignon</h1>

<p>Application web anonyme pour tester ses connaissances sur le Festival d’Avignon. À chaque partie, l’utilisateur répond à 10 questions aléatoires en 30 secondes chacune, avec une interface fluide, responsive et animée.</p>

<h2>🚀 Stack Technique</h2>
<ul>
  <li><strong>Frontend :</strong> React, SCSS, Vite, GSAP</li>
  <li><strong>Backend :</strong> Python, Django (architecture MVT)</li>
  <li><strong>Base de données :</strong> MongoDB (via MongoEngine)</li>
  <li><strong>Déploiement :</strong> Render (backend), Vercel (frontend)</li>
</ul>

<h2>🎮 Fonctionnement</h2>
<ul>
  <li>Chaque partie comporte 10 questions tirées aléatoirement parmi un stock de 40</li>
  <li>Chaque question propose 3 réponses (une seule correcte), elles aussi mélangées aléatoirement</li>
  <li>Un chronomètre circulaire de 30 secondes est affiché pour chaque question</li>
  <li>Si aucune réponse n’est sélectionnée à temps, la question est comptée comme fausse</li>
  <li>Après chaque réponse, un message indique si elle est correcte ou incorrecte, accompagné d’une explication</li>
  <li>Une barre de progression dynamique indique l’avancée dans le quiz, avec code couleur (vert/rouge)</li>
  <li>En fin de quiz, le score est affiché sur 10, accompagné d’un commentaire et d’options pour rejouer ou copier le lien de l'app</li>
</ul>

<h2>📱 Design et UX</h2>
<ul>
  <li>Interface responsive (mobile & desktop)</li>
  <li>Transitions animées via GSAP pour une expérience fluide</li>
  <li>Chrono visuel sous forme de cercle</li>
  <li>Affichage clair des bonnes/mauvaises réponses (vert/rouge/gris)</li>
</ul>

<h2>🔒 Caractéristiques</h2>
<ul>
  <li>Jeu 100% anonyme : aucune création de compte</li>
  <li>Gestion intégralement codée : pas d’interface d’administration</li>
  <li>Application uniquement en français</li>
</ul>

<h2>🛠️ Développement</h2>
<p>
  Le projet suit une architecture Django MVT (Model - View - Template) côté backend, avec des endpoints REST pour alimenter le frontend.
  Le frontend est construit en React avec un état centralisé, une gestion dynamique des questions, des réponses, du score, du chrono et de la progression.
</p>

<h2>📦 Installation (en local)</h2>

<pre><code># Cloner le projet
git clone https://github.com/votre-utilisateur/quizz-avignon.git

# Installer les dépendances front
cd frontend
npm install
npm run dev

# Installer les dépendances back (dans un autre terminal)
cd backend
pip install -r requirements.txt
python manage.py runserver
</code></pre>

<h2>📄 Licence</h2>
<p>Projet open-source sous licence MIT.</p>

<h2>👤 Auteur</h2>
<p>Développé par François Lerosier – contact possible via GitHub ou LinkedIn.</p>
