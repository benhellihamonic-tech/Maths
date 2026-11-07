import {makeChapter,chapterItem,chapterWriting} from "./chapter-tools.js";

function bilanChapter(id,code,title,skills,example,recap,practice,first,second,links){
  const items=rows=>rows.map(([prompt,answer,method])=>
    typeof answer==="number"?chapterItem(prompt,answer,method):chapterWriting(prompt,answer,method));
  return makeChapter(id,code,title,skills,example,recap,items(practice),items(first),items(second),links,"Bilans et révisions");
}

export const chapters6Bilans=[
 bilanChapter("bilan-periode-1","Bilan 1","Révisions de la première période",
  ["Lire et écrire un nombre entier","Utiliser les objets et notations géométriques","Représenter une fraction","Choisir et contrôler un calcul","Construire et coder"],
  "Le milieu de [AB] est sur le segment et à la même distance de A et B. Un point de la médiatrice situé hors du segment n’est donc pas son milieu.",
  "Fais une copie numérotée. Pour un tracé, laisse les marques de construction et code ce que tu utilises. Dans un problème, choisis l’opération avant de calculer et vérifie la grandeur du résultat.",
  [
   ["Dans 702 154, donne le nombre de milliers complets.",702,"Les trois derniers chiffres sont les 154 unités restantes."],
   ["A, B, C sont alignés dans cet ordre. C appartient-il à (AB), [AB] ou [AB) ?","À (AB) et [AB), mais pas à [AB].","Le segment s’arrête à B, alors que la demi-droite se poursuit."],
   ["Sur une bande de 12 carreaux, dessine 3/4.","Trois groupes de 3 carreaux sur quatre, soit 9 carreaux.","Le tout est la bande entière."],
   ["Estime le produit de 31 et 19.","Environ 600.","31 ≈ 30 et 19 ≈ 20."],
   ["Décris comment tracer une perpendiculaire à une droite qui passe par un point donné.","Un bord de l’équerre sur la droite, l’autre passant par le point ; tracer le long de ce bord.","Code l’angle droit au point d’intersection."],
  ],
  [
   ["Écris 3 208 014 en lettres, puis indique le chiffre et le nombre complet de milliers.","Trois millions deux cent huit mille quatorze. Chiffre des milliers : 8. Nombre de milliers complets : 3 208.","La décomposition est 3 208 × 1 000 + 14."],
   ["Sur une droite, place E, F et G dans cet ordre, avec EF = 3 cm et FG = 3 cm. Écris deux conditions qui prouvent que F est le milieu de [EG].","F appartient à [EG] et EF = FG.","Code deux longueurs égales sur la figure."],
   ["Représente 7/4 avec des rectangles unités et donne une décomposition.","Un rectangle entier et trois quarts du suivant, soit 1 + 3/4.","Les quatre parts de chaque rectangle ont la même aire."],
   ["La bibliothèque reçoit 18 cartons de 24 livres et 53 livres isolés. Calcule le total et propose un ordre de grandeur.","485 livres. 18 × 24 = 432, puis 432 + 53 = 485. On attend un total de l’ordre de quelques centaines.","Le produit donne les livres en cartons, la somme inclut les livres isolés."],
   ["Construis un cercle de centre O et de diamètre 5 cm, puis trace une droite passant par O. Combien d’intersections avec le cercle ?","Deux intersections, de part et d’autre de O. Elles sont à 2,5 cm de O.","L’ouverture du compas est le rayon, la moitié du diamètre."],
  ],
  [
   ["Écris quatre millions six mille trente-neuf en chiffres et encadre ce nombre par deux milliers consécutifs.","4 006 039 ; 4 006 000 < 4 006 039 < 4 007 000.","Les trois classes sont 4, 006 et 039."],
   ["Trace [PQ], puis place R sur (PQ) mais hors de [PQ). Indique dans quel ordre se trouvent les trois points.","R, P, Q dans cet ordre (ou l’ordre inverse Q, P, R).","[PQ) part de P vers Q. R doit donc se trouver de l’autre côté de P."],
   ["Une unité est partagée en huit parts égales. Représente 11/8 et explique pourquoi la fraction est supérieure à 1.","Colorie huit parts pour une unité et trois autres, soit 1 + 3/8.","Le numérateur 11 dépasse 8 ; plus d’une unité est nécessaire."],
   ["Un stock compte 156 cahiers. On livre 4 lots de 29. Calcule le reste et vérifie par l’opération inverse.","Il reste 40 cahiers. 156 − 4 × 29 = 40. Vérification : 116 + 40 = 156.","Il faut calculer le nombre livré avant la différence."],
   ["Trace une droite d et un point M hors de d. Trace la perpendiculaire r à d passant par M, puis la parallèle à d passant par M.","La parallèle est perpendiculaire à r en M. Code les deux angles droits.","Deux droites perpendiculaires à une même droite sont parallèles entre elles."],
  ],["entiers6","droites6","fractions","operations6","cercles6"]),
 bilanChapter("bilan-periode-3","Bilan 3","Révisions de la troisième période",
  ["Mesurer et construire des angles","Construire et raisonner dans un triangle","Lire et produire un graphique","Calculer et distinguer aire et périmètre","Multiplier des décimaux"],
  "Pour une figure découpée, retire l’aire de l’encoche et examine séparément les nouveaux segments du contour.",
  "Au rapporteur, commence au zéro du premier côté et contrôle si ton résultat est aigu ou obtus. Sur un graphique, nomme les axes et les unités. Pour une aire, écris une unité carrée.",
  [
   ["Un angle plat est découpé en deux angles. L’un mesure 127°. Donne la mesure de l’autre en degrés.",53,"180 − 127 = 53."],
   ["Un triangle rectangle a un angle aigu de 34°. Donne l’autre angle aigu en degrés.",56,"Les deux angles aigus totalisent 90°."],
   ["Quel pas choisir sur l’axe vertical pour représenter 6, 12 et 18 ? Donne deux choix.","Par exemple 2 ou 6 par graduation.","Les trois valeurs tombent sur des graduations."],
   ["Un rectangle de 4 cm sur 11 cm a quelle aire en cm² ?",44,"Multiplie 4 par 11."],
   ["Calcule 3,2 × 0,4.",1.28,"32 dixièmes × 4 dixièmes donnent 128 centièmes."],
  ],
  [
   ["Trace un angle ABC de 118°. Marque le sommet et donne sa nature.","B est le sommet. Place [BA) comme côté initial, puis [BC) à 118°. L’angle est obtus.","Un angle obtus dépasse 90° et mesure moins de 180°."],
   ["Construis un triangle dont les côtés mesurent 5, 6 et 8 cm. Laisse les marques.","Trace le côté de 8 cm puis les arcs de rayons 5 et 6 cm centrés à ses extrémités.","L’intersection des arcs est le troisième sommet."],
   ["Lundi 7 élèves, mardi 12, mercredi 9 fréquentent le CDI. Trace un diagramme en bâtons et écris une comparaison.","Axes : jours et nombre d’élèves. Bâtons 7, 12 et 9. Il y a 5 élèves de plus mardi que lundi.","Choisis un pas commun et une unité claire."],
   ["Un rectangle de 8 m sur 6 m et un carré de côté 3 m sont accolés, sans recouvrement. Donne l’aire totale.","57 m².","8 × 6 + 3 × 3 = 57."],
   ["On achète 2,4 m d’une corde à 3,50 € le mètre. Calcule le prix et contrôle l’ordre de grandeur.","8,40 €. Le résultat est entre 7 € pour 2 m et 10,50 € pour 3 m.","3,50 × (2 + 0,4) = 7 + 1,4."],
  ],
  [
   ["Trace un angle KLM de 37° et nomme ses côtés. Comment vérifies-tu que tu n’as pas lu l’autre graduation ?","Côtés [LK) et [LM). Le zéro est sur [LK) et l’angle doit être aigu.","La graduation opposée indiquerait 143°, un angle obtus."],
   ["Un triangle isocèle en R a un angle de 48° en S. Trouve les deux autres angles.","L’autre angle à la base vaut 48°. L’angle en R vaut 84°.","Les angles à la base sont égaux. Leur somme avec l’angle au sommet vaut 180°."],
   ["Place les points d’une courbe de température : 9 °C à 8 h, 13 °C à 10 h, 17 °C à midi. Compare les hausses.","Points (8 ; 9), (10 ; 13), (12 ; 17). Chaque hausse vaut 4 °C.","Nomme le temps en heures et la température en degrés Celsius."],
   ["Compare l’aire et le périmètre de rectangles de 3 × 8 cm et de 4 × 6 cm.","Même aire de 24 cm². Périmètres 22 cm et 20 cm.","Une aire égale ne fixe pas le contour."],
   ["Une parcelle rectangulaire mesure 5,2 m sur 1,5 m. Calcule son aire et explique pourquoi elle est inférieure à 10 m².","7,8 m². 5,2 × 1,5 = 5,2 + 2,6.","Le calcul est inférieur à 6 × 1,5 = 9 m²."],
  ],["angles6","triangle6","donnees6","aires6","produitdecimal6"]),
 bilanChapter("bilan-annuel","Bilan annuel","Réinvestir les méthodes de 6e",
  ["Calculer et interpréter un reste","Mobiliser fractions et proportionnalité","Organiser et lire des données","Construire une figure et justifier","Choisir une formule de grandeur"],
  "56 = 9 × 6 + 2. Six équipes peuvent être complètes, mais il faut sept groupes pour accueillir toutes les personnes.",
  "Rédige une phrase-réponse avec son unité. Relis le rôle des nombres dans chaque contexte. Pour une construction, vérifie les alignements, angles et longueurs.",
  [
   ["Reste dans la division de 56 par 9 ?",2,"56 = 9 × 6 + 2."],
   ["Calcule 3/5 de 35.",21,"35 ÷ 5 × 3."],
   ["Trois groupes contiennent 4, 8 et 6 élèves. Calcule le total.",18,"Additionne les effectifs."],
   ["Décris le symétrique d’un point placé sur l’axe.","Le point est sa propre image.","La distance du point à l’axe est nulle."],
   ["Volume en cm³ d’un pavé droit de dimensions 4, 3 et 2 cm ?",24,"Multiplie les trois dimensions."],
  ],
  [
   ["Il faut transporter 83 élèves dans des véhicules de 12 places. Combien de véhicules au minimum ? Écris la division.","Sept véhicules. 83 = 12 × 6 + 11.","Six véhicules ne suffisent pas pour les 11 élèves restants."],
   ["On prépare 5/8 de 56 repas sans poisson. Donne les deux effectifs et vérifie le total.","35 repas sans poisson et 21 autres.","Une part vaut 7 ; cinq parts font 35, les trois restantes 21."],
   ["Dans une urne, 6 jetons sont jaunes, 9 bleus et 3 rouges. Donne la probabilité de tirer jaune et construis un diagramme des effectifs.","1/3. Bâtons de hauteur 6, 9 et 3.","On compte 18 jetons et 6 issues favorables."],
   ["Construis l’image d’un segment [AB] par symétrie d’axe d. Donne une vérification autre que la longueur de son image.","Les segments [AA′] et [BB′] sont perpendiculaires à d et leurs milieux sont sur d.","Construis les points images séparément."],
   ["Une boîte de dimensions 12 × 5 × 4 cm est remplie de cubes de 1 cm d’arête. Combien de cubes ? Justifie.","240 cubes : 12 × 5 par couche, sur 4 couches.","Le calcul représente un volume de 240 cm³."],
  ],
  [
   ["On remplit des caisses de 15 pommes avec 146 pommes. Donne le nombre de caisses pleines et le reste.","9 caisses pleines et 11 pommes restantes, car 146 = 15 × 9 + 11.","Le reste est compris entre 0 et 14."],
   ["Une randonnée mesure 4,8 cm sur une carte à 1:25 000. Calcule la distance réelle en km.","1,2 km.","1 cm représente 250 m ; 4,8 × 250 = 1 200 m."],
   ["Une exposition accueille 14, 26 et 20 visiteurs sur trois créneaux. Trace un diagramme et calcule le pourcentage du dernier créneau par rapport au total.","Bâtons 14, 26 et 20. Le total est 60, donc le dernier créneau représente 1/3, soit environ 33,3 %.","Le pourcentage compare 20 au total de 60."],
   ["Trace la médiatrice d’un segment [CD] de 7 cm. Place un point O sur cette médiatrice et explique pourquoi un cercle de centre O peut passer par C et D.","OC = OD par la propriété de la médiatrice. Le rayon peut être OC.","La médiatrice est perpendiculaire au segment et passe par son milieu."],
   ["Un sol rectangulaire de 6,5 m sur 4 m est couvert de dalles. Calcule la surface, puis le contour.","Aire 26 m² ; périmètre 21 m.","Surface : produit des deux longueurs. Contour : somme des quatre côtés."],
  ],["division","proportion6","probabilites6","symetrie6","volumes6"]),
];

export const chapters3Bilans=[
 bilanChapter("devoir-commun-toussaint","Devoir commun 1","Préparer le devoir commun de Toussaint",
  ["Réactiver ratios, fractions, pourcentages et vitesse","Rédiger un raisonnement utilisant Pythagore","Modéliser par la proportionnalité","Passer entre tableau, programme et fonction","Calculer et contrôler une expression"],
  "Un tarif calculé par f(x) = 4x + 6 n’est pas proportionnel à x : f(0) vaut 6. On peut calculer une image et chercher la valeur d’entrée correspondant à un prix donné.",
  "Travaille les automatismes sans calculatrice et rédige les problèmes sur ton cahier. Si Thalès emboîté a été travaillé en classe, révise aussi la fiche G3 : le périmètre dépend de l’avancement du cours.",
  [
   ["Prends 25 % de 76.",19,"Un quart de 76."],
   ["Un rectangle mesure 9 m sur 12 m. Donne et justifie la diagonale.","15 m.","Les côtés sont perpendiculaires ; la somme de leurs carrés vaut 225."],
   ["On partage 72 € dans le ratio 5 : 3. Quelle part revient à la première personne, en euros ?",45,"Une part vaut 9 € et il en faut cinq."],
   ["Le programme double l’entrée, puis ajoute 3. Trouve l’antécédent de 17.",7,"Retire 3 puis divise par 2."],
   ["Calcule 4x − 7 pour x = −3.",-19,"4 × (−3) − 7."],
  ],
  [
   ["Sans calculatrice : écris 0,75 en fraction irréductible ; calcule 10 % de 170 ; donne la vitesse en km/h de 9 km en 30 min.","3/4 ; 17 ; 18 km/h.","0,75 = 75/100 ; 10 % vaut un dixième ; 30 minutes valent 1/2 heure."],
   ["On traverse en diagonale une zone rectangulaire de 16 m sur 12 m. Une corde mesure 18 m. Justifie si elle suffit.","Elle ne suffit pas. La diagonale vaut 20 m.","Le rectangle fournit un angle droit. Par Pythagore : d² = 16² + 12² = 400."],
   ["Un mélange utilise sirop et eau dans le ratio 1 : 7. Pour 1,2 L de mélange, donne le volume de sirop. Quel volume total peut-on produire avec 0,25 L de sirop ?","0,15 L de sirop. Avec 0,25 L de sirop, on produit 2 L de mélange.","Le mélange entier représente huit parts."],
   ["Le tableau x = −2, −1, 0, 1, 2 donne les images 4, 1, 0, 1, 4. Propose un programme compatible, donne les antécédents de 1 dans le tableau et indique une limite du tableau.","Prendre le carré. Dans le tableau, les antécédents sont −1 et 1. Le tableau ne renseigne pas les images des autres entrées.","Deux valeurs d’entrée peuvent avoir la même image."],
   ["Réduis 3x + 5 − 2x, puis calcule la valeur obtenue pour x = −9.","x + 5, puis −4.","Regroupe les termes en x avant la substitution."],
  ],
  [
   ["Sans calculatrice : écris 3/8 sous forme décimale ; calcule 25 % de 68 ; donne la distance en km parcourue à 12 km/h en 15 min.","0,375 ; 17 ; 3 km.","Divise 3 par 8 ; le quart de 68 vaut 17 ; 15 min vaut 1/4 h."],
   ["Une passerelle forme la diagonale d’un rectangle de 9 m sur 40 m. Une pièce de 45 m est-elle suffisante ? Quelle chute reste-t-il ?","La passerelle mesure 41 m ; la pièce suffit, il reste 4 m.","Le triangle est rectangle et 9² + 40² = 1681 = 41²."],
   ["Trois équipes partagent 72 badges selon le ratio 2 : 3 : 4. Donne les parts. Si la première équipe reçoit 20 badges au même ratio, combien en faut-il en tout ?","16, 24 et 32 badges. Il en faut 90 pour une première part de 20.","Neuf parts au total. Dans le second cas, une part vaut 10."],
   ["Le programme « multiplier par −2, puis ajouter 5 » définit g. Donne sa formule, calcule g(−3) et trouve l’antécédent de −1.","g(x) = −2x + 5 ; g(−3) = 11 ; antécédent 3.","Résous −2x + 5 = −1, donc −2x = −6."],
   ["Développe 4(2x − 3) − 3x, puis vérifie la valeur pour x = −2 dans les deux écritures.","5x − 12. Les deux expressions valent −22 pour x = −2.","La substitution vérifie un cas. La distributivité justifie l’égalité pour tout x."],
  ],["pythagore3","proportion4","fonctions","thales3","distributivite3"]),
 bilanChapter("devoir-commun-noel","Devoir commun 2","Préparer le devoir commun de Noël",
  ["Utiliser la décomposition en facteurs premiers","Calculer avec des fractions et justifier","Distinguer réciproque et contraposée","Construire une image et utiliser les invariants","Résoudre ou factoriser une expression"],
  "Pour décider si un triangle est rectangle, compare le carré de son plus grand côté à la somme des deux autres carrés. Égalité : réciproque. Inégalité : contraposée.",
  "Reprends les acquis du premier devoir commun et les fiches de novembre-décembre. Le site distingue le résultat numérique et la justification à vérifier sur le cahier.",
  [
   ["Quel est le plus grand facteur premier de 90 ?",5,"90 = 2 × 3² × 5."],
   ["Calcule 5/6 − 1/4 et donne une fraction.","7/12.","Sur 12 : 10/12 − 3/12."],
   ["Un triangle de côtés 9, 12 et 15 est-il rectangle ? Justifie.","Oui, par la réciproque de Pythagore.","9² + 12² = 225 = 15²."],
   ["Quelle est l’image de A(2 ; −1) par symétrie centrale de centre (0 ; 0) ?","A′(−2 ; 1).","Le centre est le milieu du segment."],
   ["Résous 3x + 4 = x + 16.",6,"2x = 12."],
  ],
  [
   ["Décompose 180 en facteurs premiers et montre que 45 le divise.","180 = 2² × 3² × 5. Comme 45 = 3² × 5, le quotient vaut 4.","On repère tous les facteurs de 45 dans la décomposition."],
   ["Calcule et réduis (7/12 + 1/6) ÷ 3/5.","5/4.","La somme vaut 9/12 = 3/4. Diviser par 3/5 revient à multiplier par 5/3."],
   ["Un triangle mesure 10, 24 et 27 cm. Peut-il être rectangle ? Rédige une justification.","Non, par la contraposée de Pythagore.","10² + 24² = 676 tandis que 27² = 729."],
   ["Le triangle A(0 ; 0), B(2 ; 0), C(1 ; 3) est translaté de deux unités à gauche et une vers le haut. Donne ses images et compare les aires.","A′(−2 ; 1), B′(0 ; 1), C′(−1 ; 4). Aire conservée.","Une translation conserve les longueurs, les angles et les aires."],
   ["Résous 4x − 3 = 2x + 9 et vérifie la solution par substitution.","x = 6. Les deux membres valent 21.","Soustrais 2x puis ajoute 3 aux deux membres."],
  ],
  [
   ["On veut former le plus grand nombre de lots identiques avec 84 badges et 126 autocollants, sans reste. Donne le nombre de lots et leur composition.","42 lots de 2 badges et 3 autocollants.","Le plus grand diviseur commun est 42 = 2 × 3 × 7."],
   ["Le matin, une randonneuse effectue 5/12 du trajet. L’après-midi, elle effectue les 3/7 de la distance restante. Quelle fraction du trajet reste à parcourir ?","1/3.","Il restait 7/12 ; l’après-midi elle effectue 3/7 × 7/12 = 1/4. Reste 7/12 − 1/4 = 1/3."],
   ["Une équerre de contrôle a les côtés 7, 24 et 25 cm. Justifie si elle comporte un angle droit et précise son emplacement.","Oui : l’angle opposé au côté de 25 cm est droit.","7² + 24² = 625 = 25² ; applique la réciproque."],
   ["Construis l’image d’un segment [KL] par un demi-tour de centre O extérieur. Quel lien existe entre les longueurs KL et K′L′ ?","Même longueur. O est le milieu de [KK′] et [LL′].","Le demi-tour est une symétrie centrale qui conserve les distances."],
   ["Factorise 15x + 25 puis détermine x pour que l’expression soit égale à 40.","5(3x + 5) ; x = 1.","Divise l’équation 5(3x + 5) = 40 par 5, puis isole x."],
  ],["premiers3","rationnels3","reciproque3","transformations3","produits3"]),
];
