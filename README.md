# e-commerce
# Exécuter localement

# 1) Clone repo : 

    $ git clone git@github.com:yanisamrouche/e-commerce.git
    $ cd e-commerce

# 2) Configurer MongoDB : 
 
 # - Méthode 01 : MongoDB en local
    1-Installez MongoDB : https://www.mongodb.com/try/download/community
    2-Créer un fichier .env dans le dossier racine
    3-Veuillez mettre dans le fichier .env la variable : MONGODB_URL=mongodb://localhost/e-commerce
 
 # - Méthode 02 : Atlas Cloud MongoDB
    1-Créer une base de données à : https://account.mongodb.com/account/login
    2-Créer un fichier .env dans le dossier racine
    3-Veuillez mettre dans le fichier .env la variable : MONGODB_URL=mongodb+srv://votre_bdd
 PS : le projet marche sur Atlas Cloud MongoDB   
 
 # 3) Lancez d'abord le serveur : 
    Lancez dans un terminal les commandes suivantes : 
    $ cd Server
    $ npm install
    $ npm start
 
 
 # 4) Lancez l'application : 
    Lancez dans un nouveau terminal les commandes suivantes : 
    $ cd my-app
    $ npm install
    $ npm start
 
 
 # 5) insérez les utilisateurs et les produits dans la bdd :
    -lancez sur Chrome le lien suivant : http://localhost:1241/api/users/seed
    (Ce lien affiche les utilisateurs sous format JSON avec l'email de l'admin et son mot de passe)
    -lancez sur Chrome le lien suivant : http://localhost:1241/api/products/seed
    (Ce lien permet de créer 8 articles)
    1241 : le port du serveur
    
 # 6) Pour lancer l'application :
     -lancez sur Chrome le lien suivant : http://localhost:3000
     - authentification en tant qu'admin : 
       http://localhost:3000/signin 
       entrer l'email et le mot de passe de l'admin 
       cliquez sur 'Sign in'
    
    
 
