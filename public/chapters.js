import {chapters4} from "./chapters4.js";
import {chapters5} from "./chapters5.js";
import {chapters3Algebre} from "./chapters3-algebre.js";
import {chapters6Bilans,chapters3Bilans} from "./chapters-bilans.js";
// Énoncés originaux. Les codes suivent la progression 2026–2027 lorsqu’elle est disponible.
import {makeChapter,chapterItem,chapterWriting} from "./chapter-tools.js";
const C=makeChapter, Q=chapterItem, W=chapterWriting;
const classeSixieme=[
C("entiers","1 · N1–N6","Nombres entiers",["Lire, écrire et décomposer","Comparer, encadrer et intercaler","Lire et placer sur une demi-droite graduée"],
 "Dans 4 072 805, le chiffre des milliers est 2, mais le nombre de milliers complets est 4 072.",
 "Sépare les classes par trois chiffres à partir de la droite. Compare d’abord la longueur des écritures puis les chiffres de gauche à droite. Sur une droite, calcule le pas à partir de l’écart entre les valeurs repérées.",
 [Q("Combien de centaines complètes contient 256 819 ?",2568,"256 819 = 2 568 × 100 + 19."),Q("Quel est le premier multiple de 1 000 strictement supérieur à 25 902 ?",26000,"25 000 < 25 902 < 26 000."),Q("Trois intervalles séparent 4 200 et 4 800. Quel est le pas ?",200,"600 ÷ 3 = 200.")],
 [W("Écris 2 006 340 017 en lettres et décompose-le par rang.","Deux milliards six millions trois cent quarante mille dix-sept. 2 × 1 000 000 000 + 6 × 1 000 000 + 3 × 100 000 + 4 × 10 000 + 1 × 10 + 7.","Repère les classes, puis retire les rangs dont le chiffre est zéro."),W("Encadre 5 098 342 par deux multiples consécutifs de 10 000 puis intercale un entier plus grand.","5 090 000 < 5 098 342 < 5 100 000. Par exemple 5 099 000 convient pour l’intercalation.","L’écart entre les bornes vaut 10 000."),W("Sur une demi-droite graduée, la première graduation indiquée vaut 27 000 et celle située quatre intervalles plus à droite vaut 29 000. Place 28 500.","Le pas est 500. Place le point trois intervalles à droite de 27 000.","Compte les intervalles, puis ajoute 500 à chaque étape.")],
 [W("Écris en chiffres « trois milliards quatre millions dix-huit mille trente » puis indique le chiffre des milliers et le nombre de milliers complets.","3 004 018 030. Chiffre des milliers : 8. Nombre de milliers : 3 004 018.","On trouve les milliers complets en supprimant les trois derniers chiffres."),W("Range 8 300 050 ; 8 030 500 ; 8 305 000 dans l’ordre croissant et encadre le plus petit au millier.","8 030 500 < 8 300 050 < 8 305 000. 8 030 000 < 8 030 500 < 8 031 000.","Les millions sont identiques. Compare ensuite les groupes des milliers puis des unités."),W("Six intervalles réguliers séparent 13 000 et 16 000. Trace ce morceau de demi-droite et place 14 000 et 15 500.","Chaque intervalle vaut 500. Place le premier point deux intervalles après 13 000 et le second cinq intervalles après 13 000.","Vérifie les deux écarts par multiplication.")],["entiers6"]),
C("premiers-elements","2","Premiers éléments de géométrie plane",["Distinguer droite, demi-droite, segment et longueur","Utiliser alignement, appartenance et distance","Construire et reconnaître un milieu"],
 "Si M est le milieu de [AB] et AB = 8 cm, alors M appartient à [AB] et AM = MB = 4 cm.",
 "Les parenthèses désignent une droite, les crochets un segment, et [AB) une demi-droite d’origine A. AB sans signe autour désigne une longueur. L’égalité AM = BM seule ne suffit pas pour conclure que M est un milieu.",
 [W("A, B, C sont alignés dans cet ordre. C appartient-il à [AB] ? à [AB) ?","Non pour [AB], oui pour [AB).","Le segment s’arrête à B, la demi-droite continue après B."),Q("Un milieu partage un segment de 7,4 cm. Donne la longueur d’une moitié en cm.",3.7,"7,4 ÷ 2 = 3,7."),W("N est à égale distance de A et B mais n’est pas aligné avec eux. Est-ce le milieu ?","Non. Le milieu doit appartenir au segment [AB].","Deux conditions sont nécessaires : appartenance et égalité des longueurs.")],
 [W("Trace trois points P, Q et R alignés dans cet ordre. Code R ∉ [PQ] et R ∈ [PQ) sur ta copie.","Trace [PQ] entre P et Q, prolonge au-delà de Q et place R sur ce prolongement.","Repère l’origine de la demi-droite."),W("Écris les notations pour la droite passant par E et F, le segment d’extrémités E et F et leur distance.","(EF), [EF], puis EF.","L’objet et sa mesure ont des notations différentes."),W("Sur un segment CD de 9 cm, construis son milieu I et code la figure.","Place I sur [CD] à 4,5 cm de C ; marque CI et ID par deux codes identiques.","La construction doit assurer simultanément alignement et égalité.")],
 [W("Trace une droite (XY) puis place T sur [YX) sans le placer sur [XY].","Place T au-delà de X lorsque l’on part de Y en direction de X.","Les demi-droites [YX) et [XY) n’ont pas la même origine."),W("L appartient à [ST], SL = 2,5 cm et LT = 3,5 cm. Calcule ST et précise si L est le milieu.","ST = 6 cm. L n’est pas le milieu car SL ≠ LT.","L’appartenance à [ST] permet d’additionner les longueurs."),W("Explique comment vérifier qu’un point K est le milieu d’un segment UV.","Vérifier K ∈ [UV], puis mesurer ou comparer UK et KV. Les longueurs doivent être égales.","Un point hors du segment peut être à égale distance de U et V.")],["droites6"]),
C("fractions-partage","3","Fractions : partage et mesure",["Identifier l’unité et ses parts égales","Représenter une fraction","Mesurer au-delà de l’unité"],
 "Sur une bande unité partagée en 5 parts égales, 7/5 représente une bande entière et 2 cinquièmes.",
 "Le dénominateur indique le nombre de parts égales dans l’unité, le numérateur indique combien de parts sont prises. Une fraction peut dépasser 1.",
 [Q("Sur 8 parts égales, on colorie 3 parts. Écris la fraction coloriée.","3/8","Chaque part vaut un huitième."),W("Dessine 9/4 à l’aide de bandes identiques.","Colorie deux bandes entières et un quart de la troisième.","9 = 4 + 4 + 1."),Q("Écris l’unité en sixièmes.","6/6","Six parts d’un sixième font une unité.")],
 [W("Dessine un rectangle unité et représente 5/6.","Divise le rectangle en six parts de même aire et colorie cinq parts.","Le partage peut avoir plusieurs formes, mais les aires doivent être égales."),Q("Une unité est formée de 7 carreaux. Combien de carreaux représentent 9/7 ?",9,"Une part vaut un carreau."),W("Deux barres sont partagées chacune en trois parts égales. Représente 5/3 et explique pourquoi ce nombre dépasse 1.","Colorie une barre complète et deux parts de l’autre. 5/3 = 3/3 + 2/3 > 1.","Précise qu’une seule barre est l’unité.")],
 [W("Représente 3/4 sur une collection unité de 12 objets.","Fais quatre groupes de trois objets, puis entoure trois groupes.","Une part est un groupe, pas un objet."),Q("Un segment unité mesure 10 cm. Combien mesure 13/10 de ce segment, en cm ?",13,"Un dixième mesure 1 cm."),W("Explique pourquoi trois morceaux colorés sur cinq ne représentent pas toujours 3/5.","Si les cinq morceaux ne sont pas de même taille, chaque morceau ne représente pas un cinquième.","Construis un contre-exemple avec un petit morceau et quatre grands.")],["fractions"]),
C("operations","4","Opérations : techniques et vocabulaire",["Choisir une opération","Calculer et estimer","Employer le vocabulaire des opérations"],
 "19 × 41 est proche de 20 × 40 = 800. Le résultat exact, 779, est cohérent.",
 "Une somme additionne des termes ; une différence compare deux termes ; un produit multiplie des facteurs ; un quotient est le résultat d’une division. Estimer aide à contrôler un résultat.",
 [Q("Calcule 673 + 248.",921,"673 + 200 + 48 = 921."),Q("Calcule 27 × 14.",378,"27 × (10 + 4) = 270 + 108."),W("Dans 35 − 18 = 17, quel mot nomme 17 ?","Une différence.","L’opération est une soustraction.")],
 [W("Deux cartons contiennent 36 sachets chacun. Il reste aussi 14 sachets en vrac. Écris un calcul pour le total.","2 × 36 + 14 = 86 sachets.","Le produit donne la quantité des cartons, puis la somme donne le total."),Q("Calcule 503 − 287.",216,"Contrôle : 287 + 216 = 503."),W("Lina annonce 103 × 28 = 28 840. Sans poser le calcul, explique pourquoi ce résultat est impossible.","103 × 28 est proche de 100 × 30 = 3 000, très loin de 28 840.","Un produit cohérent est de l’ordre de quelques milliers.")],
 [W("On range 144 cartes en 12 pochettes identiques. Choisis et nomme l’opération, puis donne le résultat.","144 ÷ 12 = 12 cartes par pochette ; 12 est le quotient.","Le nombre de pochettes et le nombre de cartes par pochette sont distincts même s’ils ont ici la même valeur."),Q("Calcule 46 × 23.",1058,"46 × 20 + 46 × 3 = 920 + 138."),W("Dans 70 + 16 = 86 et 8 × 9 = 72, nomme les nombres qui figurent avant le signe égal.","70 et 16 sont les termes de la somme ; 8 et 9 sont les facteurs du produit.","Le mot dépend de l’opération.")],["operations6"]),
C("constructions","5","Constructions : parallèles, perpendiculaires et cercle",["Construire avec les instruments","Coder le parallélisme et la perpendicularité","Distinguer cercle, disque et distances"],
 "Sur un cercle de centre O et de rayon 3 cm, tout point du cercle est à 3 cm de O. Un point à 2 cm appartient au disque et n’est pas sur le cercle.",
 "Une équerre permet de tracer ou vérifier un angle droit. Deux droites perpendiculaires à une même droite sont parallèles. Le cercle est un contour, le disque inclut son intérieur.",
 [W("Trace une droite d et une perpendiculaire p passant par P situé hors de d.","Aligne un bord de l’équerre sur d ; fais glisser l’équerre jusqu’à P et trace le long de l’autre bord.","Marque l’angle droit à l’intersection."),Q("Le diamètre d’un cercle est 7,6 cm. Donne le rayon en cm.",3.8,"Le rayon vaut la moitié du diamètre."),W("A est à 5 cm de O. Peut-il appartenir au disque de rayon 4 cm ?","Non, car OA > 4 cm.","Pour le disque, on accepte les distances inférieures ou égales au rayon.")],
 [W("Trace d, choisis A hors de d et trace la parallèle à d passant par A à l’équerre et à la règle.","Trace une perpendiculaire à d puis une perpendiculaire à celle-ci qui passe par A.","Les deux angles droits établissent le parallélisme."),W("Construis un cercle de centre M et rayon 2,5 cm. Place T à 2 cm de M et S à 2,5 cm de M.","T est à l’intérieur du disque et S est sur le cercle.","Règle l’ouverture du compas à 2,5 cm."),W("Deux droites p et q forment chacune un angle droit avec r. Déduis la relation entre p et q.","Si p et q sont distinctes, p ∥ q.","Deux droites distinctes perpendiculaires à une même droite sont parallèles.")],
 [W("Sur papier, trace un segment [AB] de 6 cm et la perpendiculaire à (AB) passant par A.","Place le sommet de l’angle droit de l’équerre en A et aligne un côté sur (AB). Trace l’autre côté puis code l’angle droit.","Vérifie la position de l’équerre avant de tracer."),W("Sur le cercle de centre O et de diamètre 9 cm, place un point C et donne OC. Où se trouve D si OD = 5 cm ?","OC = 4,5 cm. D est à l’extérieur du disque.","Le diamètre représente deux rayons."),W("Construis un cercle de centre I qui passe par J. Explique le réglage du compas.","Pique en I et ouvre jusqu’à J ; l’ouverture est IJ.","Un cercle donné par son centre et un point est entièrement déterminé.")],["cercles6","droites6"]),
C("decimaux","6","Nombres décimaux",["Passer de la fraction décimale à l’écriture à virgule","Comparer et encadrer","Trouver le pas puis placer un nombre"],
 "2,305 = 2 + 3/10 + 5/1 000. Le zéro marque une absence de centièmes.",
 "Aligne unités et virgules pour comparer ; ajouter des zéros à droite après la virgule ne change pas la valeur. Pour déterminer un pas, divise l’écart entre deux valeurs par le nombre d’intervalles.",
 [Q("Écris 431/100 en écriture à virgule.",4.31,"431 centièmes représentent 4 unités et 31 centièmes."),W("Compare 2,4 et 2,37.","2,4 > 2,37 car 2,4 = 2,40.","Compare 40 et 37 centièmes."),Q("De 1,2 à 1,8, il y a trois intervalles égaux. Quel est le pas ?",.2,"0,6 ÷ 3 = 0,2.")],
 [Q("Écris 3 + 7/10 + 8/1 000 à virgule.",3.708,"Il y a zéro centième, donc le zéro doit rester."),W("Encadre 6,247 par deux centièmes consécutifs.","6,24 < 6,247 < 6,25.","Un centième d’écart sépare les bornes."),W("Quatre intervalles séparent 2,1 et 2,5. Place 2,4.","Le pas est 0,1. Place 2,4 à la troisième graduation après 2,1.","Calcule (2,5 − 2,1) ÷ 4.")],
 [W("Décompose 8,062 en unités et fractions décimales.","8 + 6/100 + 2/1 000.","Il y a zéro dixième."),W("Range 5,08 ; 5,8 ; 5,018 du plus petit au plus grand.","5,018 < 5,08 < 5,8.","Écris 5,018 ; 5,080 ; 5,800 pour comparer."),W("Deux intervalles séparent 0,75 et 0,85. Place 0,80 et donne la graduation après 0,85.","Le pas est 0,05 ; 0,80 est au milieu, et la graduation suivante vaut 0,90.","Ne compte pas les graduations comme des intervalles.")],["decimaux6"]),
C("fractions-repere","7","Fractions : demi-droite, égalité et comparaison",["Graduer et placer","Produire une fraction égale","Comparer et encadrer"],
 "3/4 = 6/8. Sur une droite, les deux écritures désignent le même point.",
 "Divise l’intervalle unité selon le dénominateur. Une fraction garde sa valeur si on multiplie ou divise ses deux termes par le même nombre non nul. Compare à dénominateur commun ou utilise une borne.",
 [Q("Combien de huitièmes valent 3/4 ?",6,"Multiplie les deux termes par 2."),W("Place 5/3 sur une demi-droite graduée.","Entre 1 et 2, deux tiers après 1.","5/3 = 3/3 + 2/3."),W("Compare 7/6 et 5/6.","7/6 > 5/6.","Les parts ont même taille.")],
 [W("Sur une droite graduée par quarts, place 3/4 et 7/4.","3/4 est un quart avant 1 ; 7/4 est un quart avant 2.","Compte les quarts depuis 0."),Q("Donne le numérateur de la fraction égale à 5/6 dont le dénominateur est 18.",15,"Multiplie 5 et 6 par 3."),W("Compare 5/8 et 3/4 en justifiant.","5/8 < 3/4 car 3/4 = 6/8.","Convertis les quarts en huitièmes.")],
 [W("Encadre 11/5 par deux entiers et place-le sur une droite.","2 < 11/5 < 3 ; un cinquième après 2.","10/5 = 2 et 15/5 = 3."),W("Explique avec une bande pourquoi 2/3 = 8/12.","Divise chaque tiers en quatre douzièmes : deux tiers donnent huit douzièmes.","L’unité reste la même."),W("Compare 7/10 et 4/5 en utilisant des dixièmes.","7/10 < 4/5 car 4/5 = 8/10.","Compte les parts de même taille.")],["fractions","fractions6"]),
C("fractions-calcul","8","Fractions : décomposition et calculs simples",["Décomposer en partie entière et fraction","Additionner ou multiplier par un entier","Soustraire et vérifier la cohérence"],
 "11/6 = 1 + 5/6. Pour 3/4 + 1/8, écrire 6/8 + 1/8 donne 7/8.",
 "Le dénominateur donne la taille d’une part. Additionne ou soustrais seulement des parts de même taille. Vérifie si le résultat doit être inférieur ou supérieur à 1.",
 [W("Décompose 13/5 en un entier et une fraction inférieure à 1.","2 + 3/5.","13 = 2 × 5 + 3."),Q("Calcule 2/7 + 4/7.","6/7","Il y a six septièmes."),Q("Calcule 3/4 − 1/8.","5/8","3/4 = 6/8.")],
 [W("Décompose 17/6 puis repère la partie entière.","2 + 5/6 ; la partie entière est 2.","Divise 17 par 6."),Q("Calcule 2/3 + 1/6.","5/6","2/3 = 4/6."),W("Un ruban mesure 7/8 m. On enlève 1/4 m. Donne la longueur et contrôle qu’elle est inférieure à 7/8 m.","Il reste 5/8 m, car 1/4 m = 2/8 m.","Enlever une longueur positive diminue la longueur initiale.")],
 [W("Représente 9/4 par bandes et donne sa décomposition.","Deux bandes entières et un quart, soit 2 + 1/4.","8/4 = 2."),Q("Calcule 3/5 + 4/10.",1,"3/5 = 6/10."),W("Noé écrit 6/7 − 2/7 = 4/0. Corrige et explique.","6/7 − 2/7 = 4/7. Les parts restent des septièmes.","On ne soustrait pas le dénominateur.")],["fractions6"]),
C("somme-decimaux","9","Addition et soustraction de décimaux",["Poser en alignant les rangs","Traiter les longueurs d’écriture différentes","Vérifier par estimation"],
 "3,7 + 1,45 = 3,70 + 1,45 = 5,15.",
 "Aligne les virgules puis calcule par rang. Complète au besoin par des zéros. Estime le résultat en arrondissant les termes à des nombres simples.",
 [Q("Calcule 6,3 + 4,08.",10.38,"6,30 + 4,08 = 10,38."),Q("Calcule 8,2 − 3,74.",4.46,"8,20 − 3,74 = 4,46."),W("Estime 19,9 + 8,1.","Environ 28.","Arrondis à 20 et 8.")],
 [Q("Calcule 17,6 + 8,045.",25.645,"Aligne 17,600 sur 8,045."),Q("Calcule 25,07 − 4,9.",20.17,"Écris 4,90 puis soustrais."),W("Sam obtient 34,5 pour 3,45 + 0,06. Corrige et justifie par un ordre de grandeur.","3,51. Le résultat est voisin de 3,5 et légèrement supérieur à 3,45.","Un ajout de six centièmes ne peut pas multiplier le nombre par dix.")],
 [Q("Calcule 2,895 + 13,4.",16.295,"Écris 13,400."),Q("Calcule 12 − 7,685.",4.315,"Écris 12,000."),W("Un bidon contient 9,95 L et on verse 2,6 L. Calcule le reste et vérifie mentalement.","9,95 − 2,60 = 7,35 L. Environ 10 − 3 = 7 L.","L’estimation permet de repérer une virgule décalée.")],["sommedecimale6"]),
C("perimetres","10","Périmètres, longueurs et disque",["Distinguer contour et surface","Calculer un périmètre simple ou composé","Exprimer une longueur dans une unité cohérente"],
 "Le contour d’un demi-disque de rayon 3 cm est formé d’un demi-cercle de longueur 3π et d’un diamètre de 6 cm.",
 "Le périmètre est une longueur. Le cercle de rayon r a pour longueur 2πr. Pour une figure composée, ne compte que les morceaux qui restent visibles sur le contour.",
 [Q("Périmètre d’un rectangle de 9 cm sur 4 cm, en cm ?",26,"2 × (9 + 4)."),W("Distingue le cercle du disque.","Le cercle est le contour ; le disque comprend le contour et son intérieur.","Un point intérieur appartient au disque."),Q("Convertis 2,4 m en cm.",240,"1 m = 100 cm.")],
 [W("Donne en fonction de π le périmètre d’un demi-disque de rayon 5 cm.","5π + 10 cm.","L’arc vaut la moitié de 2π × 5 et le diamètre vaut 10."),Q("Un rectangle mesure 1,2 m sur 80 cm. Calcule son périmètre en cm.",400,"2 × (120 + 80) = 400."),W("Explique pourquoi on ne compte pas le côté commun de deux rectangles accolés dans leur contour extérieur.","Ce côté est devenu intérieur. Il ne fait plus partie de la frontière extérieure.","On peut suivre le contour avec le doigt pour repérer les côtés utiles.")],
 [W("Un carré de côté 8 cm est accolé par un côté entier à un demi-disque de diamètre 8 cm. Calcule le périmètre exact.","24 + 4π cm.","Trois côtés du carré et le demi-cercle apparaissent sur le contour."),Q("Un carré a un périmètre de 1,8 m. Donne le côté en cm.",45,"180 ÷ 4 = 45."),W("Explique ce qui change si le rayon d’un cercle est triplé.","Le périmètre est triplé, puisque 2π × (3r) = 3 × (2πr).","C’est la longueur du contour que l’on compare.")],["disque6","aires6"]),
C("durees","11","Durées",["Convertir heures et minutes","Trouver une durée","Trouver un horaire de départ ou d’arrivée"],
 "De 10 h 48 à 11 h 23, il y a 12 min jusqu’à 11 h, puis 23 min : 35 min au total.",
 "Une heure vaut 60 min et une minute vaut 60 s. Utilise un passage par l’heure pleine ou convertis tout dans la même unité.",
 [Q("Convertis 2 h 18 min en minutes.",138,"2 × 60 + 18."),Q("De 14 h 47 à 15 h 12 : combien de minutes ?",25,"13 + 12 = 25."),W("Il est 9 h 52. Donne l’horaire 24 min plus tard.","10 h 16.","Après 8 min il est 10 h ; il reste 16 min.")],
 [Q("Convertis 1 h 36 min en minutes.",96,"60 + 36."),Q("Un cours dure de 8 h 49 à 10 h 07. Donne la durée en minutes.",78,"11 + 60 + 7 = 78."),W("Un train arrive à 12 h 18 après 47 min. Calcule le départ.","11 h 31.","Retranche 18 min pour atteindre midi puis 29 min.")],
 [Q("Convertis 175 minutes en heures et minutes ; donne seulement le nombre de minutes restantes.",55,"175 = 2 × 60 + 55."),Q("Une activité commence à 17 h 54 et finit à 18 h 37. Quelle durée en minutes ?",43,"6 + 37 = 43."),W("Une traversée commence à 23 h 47 et dure 38 min. Donne son heure de fin.","0 h 25 le lendemain.","Après 13 min il est minuit, puis il reste 25 min.")],["durees6"]),
C("angles","12","Angles",["Nommer le sommet et les côtés","Mesurer et construire","Exploiter un angle droit ou plat"],
 "Dans l’angle ABC, le sommet est B. Pour mesurer, place le centre du rapporteur sur B et son zéro sur [BA).",
 "Utilise la graduation qui commence à 0 sur le côté aligné. Un angle aigu est inférieur à 90°, un angle obtus entre 90° et 180°.",
 [W("Dans l’angle RST, donne le sommet et les côtés.","S ; [SR) et [ST).","Le sommet est la lettre du milieu."),W("Décris le placement du rapporteur pour construire un angle de 65° en M.","Centre sur M, zéro sur le premier côté, marque 65° dans la bonne graduation puis trace le second côté.","Vérifie que l’angle construit est aigu."),Q("Un angle plat est partagé en 52° et un autre angle. Donne la seconde mesure en degrés.",128,"180 − 52 = 128.")],
 [W("Trace un angle BCD de 112° ; indique son sommet et sa nature.","Le sommet est C, et l’angle est obtus. Trace [CB), place le rapporteur puis trace [CD) à 112°.","Ne confonds pas 112° et la lecture opposée 68°."),W("Deux graduations donnent 43° et 137°. La figure montre un angle aigu. Quelle valeur choisis-tu et pourquoi ?","43°, car un angle aigu mesure moins de 90°.","Vérifie néanmoins le zéro aligné sur le premier côté."),Q("Un angle droit est partagé en deux angles, dont l’un vaut 34°. Donne l’autre en degrés.",56,"90 − 34 = 56.")],
 [W("Construis un angle KLM de 48° et décris ta procédure.","Trace [LK), aligne le zéro du rapporteur sur [LK), marque 48°, puis trace [LM).","Vérifie que le sommet est L et l’angle aigu."),W("Explique pourquoi l’angle AOB et l’angle BOA désignent ici le même secteur non orienté.","Ils ont le même sommet O et les mêmes deux demi-droites.","L’ordre des deux extrémités peut être inversé pour un angle non orienté."),Q("Deux angles adjacents forment un angle plat. Le premier vaut 121°. Donne l’autre en degrés.",59,"180 − 121 = 59.")],["angles6"]),
C("triangles","13","Triangles : construire et calculer",["Construire à partir de données","Coder et reconnaître des propriétés","Utiliser la somme des angles"],
 "Un triangle dont deux angles mesurent 50° et 62° a un troisième angle de 68°.",
 "La somme des angles d’un triangle vaut 180°. Au compas, l’intersection de deux arcs impose simultanément deux distances.",
 [W("Construis ABC avec AB = 6 cm, AC = 4 cm et BC = 5 cm.","Trace [AB]. Trace les arcs de centres A et B, de rayons respectifs 4 cm et 5 cm. Leur intersection donne C.","Laisse les arcs et relie les sommets."),Q("Deux angles d’un triangle mesurent 75° et 41°. Donne le troisième en degrés.",64,"180 − 75 − 41 = 64."),W("Un triangle isocèle en A a un angle de 50° en B. Donne l’angle en C.","50°, car les angles à la base sont égaux.","Les côtés de même longueur sont [AB] et [AC].")],
 [W("Construis PQR avec PQ = 7 cm, PR = 5 cm et QR = 4 cm.","Trace [PQ] puis les arcs de rayons 5 et 4 cm centrés respectivement en P et Q. Place R à leur intersection.","Vérifie au compas les deux longueurs."),W("Un triangle isocèle en M possède un angle au sommet de 38°. Calcule les deux autres.","Chaque angle de base vaut (180 − 38) ÷ 2 = 71°.","Les angles à la base sont égaux."),Q("Dans un triangle rectangle, un angle aigu vaut 27°. Donne l’autre en degrés.",63,"Les angles aigus ont une somme de 90°.")],
 [W("Trace AB = 6 cm et construis un triangle ABC rectangle en A avec AC = 3 cm.","Trace la perpendiculaire à (AB) en A. Place C à 3 cm de A sur cette droite, puis relie B et C.","Code l’angle droit en A."),W("Un triangle peut-il avoir deux angles de 92° ?","Non, 92° + 92° = 184° dépasse déjà 180°.","La somme des trois angles vaut 180°."),Q("Dans un triangle, deux angles valent 48° et 84°. Donne le troisième en degrés.",48,"180 − 48 − 84 = 48.")],["triangle6"]),
C("donnees","14","Tableaux et graphiques",["Lire une valeur avec unité","Construire une représentation graduée","Comparer et interpréter"],
 "Avec 6, 9 et 12 inscriptions lundi, mardi et mercredi, des graduations de 3 unités conviennent à un diagramme en bâtons.",
 "Indique ce que mesurent les axes, l’unité et le titre. Garde un pas constant. Une comparaison s’exprime avec les nombres et une phrase en contexte.",
 [Q("Sur trois jours : 8, 12 et 5 livres empruntés. Combien en tout ?",25,"Additionne les trois effectifs."),W("Avec des effectifs 7, 14 et 21, propose un pas pour l’axe vertical.","Un pas de 7 permet de placer les trois bâtons à des graduations exactes.","Un pas de 1 fonctionnerait aussi avec un axe assez grand."),W("Compare 18 visiteurs lundi et 26 mardi.","Il y a eu 8 visiteurs de plus mardi que lundi.","26 − 18 = 8.")],
 [Q("Quatre clubs comptent 8, 12, 6 et 14 inscrits. Calcule le total.",40,"Additionne les quatre effectifs."),W("Trace un diagramme en bâtons des valeurs 8, 12, 6, 14 pour quatre clubs. Choisis une échelle et nomme les axes.","Axe horizontal : noms des clubs. Axe vertical : nombre d’inscrits, pas 2 jusqu’à 14. Bâtons aux hauteurs 8, 12, 6 et 14.","Les catégories occupent la même largeur et l’échelle reste régulière."),W("Quelle est la différence entre le club le plus fréquenté et le moins fréquenté ?","8 inscrits : 14 − 6 = 8.","Donne une phrase et l’unité.")],
 [Q("Une courbe donne la température : 10 °C à 8 h, 13 °C à 10 h, 16 °C à midi. Quelle température lit-on à 10 h ?",13,"Repère 10 h puis lis l’ordonnée."),W("Place ces trois températures dans un repère et indique le titre et les unités.","Titre : température au cours de la matinée. Temps en heures, température en °C. Place (8 ; 10), (10 ; 13) et (12 ; 16).","Choisis des graduations régulières sur chacun des axes."),W("Compare la hausse de 8 h à 10 h et celle de 10 h à 12 h.","Les deux hausses valent 3 °C.","Compare les différences, non les températures elles-mêmes.")],["donnees6"]),
C("aires","15","Aires du carré et du rectangle",["Calculer et nommer l’unité","Décomposer une figure","Distinguer aire, périmètre et conversions"],
 "Un rectangle de 8 cm sur 3 cm a une aire de 24 cm² et un périmètre de 22 cm.",
 "Une aire compte des carrés-unité. Multiplie longueur et largeur exprimées dans la même unité. Pour convertir des aires, chaque changement d’unité adjacente vaut un facteur 100.",
 [Q("Aire d’un carré de côté 7 cm, en cm² ?",49,"7 × 7 = 49."),Q("On retire 6 cm² d’une aire de 40 cm². Quelle aire reste-t-il ?",34,"40 − 6 = 34."),Q("Convertis 3 dm² en cm².",300,"Un carré de 1 dm a 10 cm de côté.")],
 [Q("Un rectangle mesure 11 cm sur 4 cm. Calcule son aire en cm².",44,"11 × 4 = 44."),W("On découpe un carré de côté 2 cm dans un rectangle de 8 cm sur 5 cm. Calcule l’aire restante.","36 cm².","8 × 5 − 2 × 2 = 36."),W("Trouve deux rectangles d’aire 24 cm² et compare leurs périmètres.","3 cm sur 8 cm : 22 cm. 4 cm sur 6 cm : 20 cm.","Une aire égale ne fixe pas le périmètre.")],
 [Q("Un carré de côté 9 dm a quelle aire en dm² ?",81,"9 × 9 = 81."),W("Une surface est composée d’un rectangle de 6 m sur 4 m et d’un carré de côté 3 m, sans recouvrement. Calcule son aire.","33 m².","6 × 4 + 3 × 3 = 33."),Q("Convertis 0,4 m² en cm².",4000,"1 m² = 100 × 100 cm².")],["aires6","airesunites6"]),
C("produit-decimaux","16","Multiplication de nombres décimaux",["Donner du sens au produit","Calculer en contrôlant la virgule","Estimer et interpréter en contexte"],
 "2,4 × 0,3 = 24 × 3 ÷ 100 = 0,72. Le produit est inférieur à 2,4 car 0,3 est inférieur à 1.",
 "On peut multiplier les entiers correspondants, puis rétablir la valeur en tenant compte des dixièmes et centièmes des facteurs. Estime l’ordre de grandeur avant de conclure.",
 [Q("Calcule 1,6 × 0,4.",.64,"16 dixièmes × 4 dixièmes = 64 centièmes."),Q("Calcule 3,2 × 1,5.",4.8,"3,2 × (1 + 0,5) = 3,2 + 1,6."),W("Estime 5,1 × 7,9.","Environ 40.","5 × 8 = 40.")],
 [W("Écris le produit 0,7 × 0,25 sous forme de produit de fractions décimales et calcule.","(7/10) × (25/100) = 175/1 000 = 0,175.","Le produit des dénominateurs donne 1 000."),Q("Calcule 6,4 × 2,05.",13.12,"6,4 × 2 + 6,4 × 0,05 = 12,8 + 0,32."),W("On achète 2,5 kg de pommes à 3,2 €/kg. Donne le prix et un contrôle mental.","8 €. Comme 2,5 est entre 2 et 3, le prix est entre 6,4 € et 9,6 €.","3,2 × (2 + 0,5) = 8.")],
 [W("Explique pourquoi 0,6 × 0,08 est inférieur à 0,08.","Multiplier par 0,6 revient à prendre six dixièmes de 0,08.","Le produit vaut 0,048."),Q("Calcule 4,3 × 1,2.",5.16,"43 × 12 = 516 centièmes."),W("Une bordure a 1,75 m par côté. Quel est le périmètre de 4 côtés ? Une surface carrée de même côté a-t-elle la même mesure ?","Le périmètre vaut 7 m. L’aire vaut 1,75 × 1,75 = 3,0625 m².","On multiplie par 4 pour la longueur de contour et par 1,75 pour l’aire.")],["produitdecimal6"]),
C("division-euclidienne","17","Division euclidienne",["Écrire et vérifier l’égalité, reconnaître un diviseur","Trouver le quotient et le reste","Interpréter le reste selon la question"],
 "53 = 8 × 6 + 5. On remplit 6 navettes, il reste 5 personnes et il faut 7 navettes pour transporter tout le monde.",
 "Pour une division euclidienne, dividende = diviseur × quotient + reste, avec 0 ≤ reste < diviseur. Distingue groupe plein, reste et nombre de groupes nécessaires.",
 [W("Effectue la division euclidienne de 76 par 9.","76 = 9 × 8 + 4.","4 est bien inférieur à 9."),Q("On remplit des sachets de 7 avec 60 jetons. Combien de sachets pleins ?",8,"60 = 7 × 8 + 4."),Q("On transporte 60 personnes par groupes d’au plus 7. Combien de véhicules ?",9,"8 pleins ne suffisent pas ; les 4 derniers prennent un véhicule.")],
 [W("Un élève écrit 73 = 8 × 8 + 9. Explique pourquoi ce n’est pas l’égalité de la division, puis corrige.","9 n’est pas inférieur à 8. 73 = 8 × 9 + 1.","Retire un groupe de 8 du reste proposé."),Q("Combien de rangées de 12 complètes avec 101 chaises ?",8,"101 = 12 × 8 + 5."),W("Un minibus a 12 places. Combien en faut-il pour transporter 101 personnes ? Justifie.","9 minibus. Huit transportent 96 personnes, il en reste 5.","La question porte sur le nombre nécessaire, pas sur le nombre plein.")],
 [W("Trouve et vérifie l’égalité de la division euclidienne de 145 par 11.","145 = 11 × 13 + 2, et 0 ≤ 2 < 11.","11 × 13 = 143."),Q("On partage 145 autocollants en pochettes de 11. Combien en reste-t-il après les pochettes pleines ?",2,"C’est le reste de la division."),W("Des groupes de 14 places sont proposés à 98 personnes. Faut-il prévoir un groupe supplémentaire au-delà du quotient ?","Non : 98 = 14 × 7 + 0. Sept groupes pleins suffisent.","Seul un reste positif impose un groupe supplémentaire.")],["division"]),
C("division-decimale","18","Division décimale",["Calculer un quotient décimal","Poursuivre selon la précision","Contrôler par multiplication"],
 "7,5 ÷ 4 = 1,875. On poursuit la division à droite de la virgule et on vérifie 1,875 × 4 = 7,5.",
 "Convertis le reste en dixièmes, centièmes et ainsi de suite. Certains quotients n’ont pas d’écriture décimale finie. Indique quand le résultat est approché.",
 [Q("Calcule 5,6 ÷ 4.",1.4,"56 dixièmes divisés par 4 donnent 14 dixièmes."),Q("Calcule 9 ÷ 8.",1.125,"9 = 8 × 1,125."),W("8,4 ÷ 4 vaut-il 21 ?","Non, le quotient exact est 2,1.","4 × 21 = 84 et non 8,4.")],
 [Q("On partage 10,5 L entre 6 récipients. Combien de litres par récipient ?",1.75,"6 × 1,75 = 10,5."),W("Calcule 7 ÷ 3 au centième près en précisant si c’est exact.","2,33 est une approximation au centième. La valeur exacte est 7/3.","Les chiffres 3 continuent indéfiniment après la virgule."),W("Un quotient de 31,2 par 8 est annoncé égal à 0,39. Vérifie.","8 × 0,39 = 3,12. Il faut 3,9 car 8 × 3,9 = 31,2.","Le résultat est proche de 32 ÷ 8 = 4.")],
 [Q("Calcule 6,25 ÷ 5.",1.25,"5 × 1,25 = 6,25."),W("Calcule 13 ÷ 6 au dixième près.","2,2. Le quotient commence par 2,166…, donc on arrondit à 2,2.","Le chiffre des centièmes est 6."),W("Trois rubans identiques totalisent 4,5 m. Donne leur longueur et vérifie.","1,5 m par ruban. 1,5 × 3 = 4,5 m.","La multiplication reconstitue le total.")],["divdecimal6"]),
C("fraction-quotient","19","La fraction comme quotient",["Relier quotient et fraction","Résoudre une multiplication à trou","Distinguer exact et approché"],
 "La part quand on partage 5 m en 3 parts égales est 5/3 m. Elle vérifie 3 × (5/3) = 5.",
 "La fraction a/b désigne le quotient de a par b (b non nul), le nombre qui multiplié par b donne a. Garde la fraction pour un résultat exact si l’écriture décimale ne se termine pas.",
 [Q("Donne le résultat exact de 11 ÷ 4.",2.75,"11/4 = 2,75."),Q("Quel nombre multiplié par 7 donne 3 ?","3/7","Le quotient de 3 par 7 répond à 7 × ? = 3."),W("7/6 et 1,17 sont-ils égaux ?","Non, 1,17 est un arrondi au centième de 7/6.","6 × 1,17 = 7,02.")],
 [Q("Écris la longueur exacte d’une part de 5 m partagés en 8 parts égales.","5/8","5 ÷ 8 = 5/8, qui vaut aussi 0,625."),Q("Complète 9 × ? = 14.","14/9","On divise 14 par 9."),W("Pour 5 ÷ 6, propose la valeur exacte et un arrondi au centième.","Valeur exacte 5/6 ; arrondi 0,83.","La division donne 0,8333…")],
 [Q("Quatre personnes se partagent 7 kg. Écris la part exacte en kg.","7/4","7 ÷ 4 = 7/4."),W("Une personne affirme que 4/7 est le nombre qui multiplié par 4 donne 7. Rectifie.","C’est 7/4 qui, multiplié par 4, donne 7.","Pour retrouver l’inconnue, on divise le résultat 7 par le facteur 4."),W("Sans effectuer la division, explique si 2/3 est exactement égal à 0,67.","Non. 0,67 × 3 = 2,01, pas 2. C’est un arrondi.","Le produit par 3 teste l’égalité exacte.")],["quotient6"]),
C("proportionnalite","20","Proportionnalité",["Reconnaître une situation proportionnelle","Utiliser un tableau ou l’unité","Résoudre par une seconde méthode"],
 "Trois billets coûtent 12 €. Un billet coûte 4 €, donc cinq coûtent 20 €.",
 "Dans un tableau proportionnel, on multiplie toutes les valeurs de la première ligne par le même coefficient. On peut aussi multiplier ou additionner les colonnes.",
 [W("Une entrée coûte 3 € par billet plus 2 € de réservation fixe. Le coût total est-il proportionnel ?","Non. 1 billet coûte 5 €, 2 coûtent 8 €, et 8 n’est pas le double de 5.","Les frais fixes cassent le coefficient constant."),Q("4 kg coûtent 14 €. Combien coûtent 2 kg ?",7,"Prends la moitié de chaque valeur."),Q("Deux jours donnent 9 relevés au même rythme. Combien pour six jours ?",27,"Six jours sont trois fois deux jours.")],
 [W("Un tableau donne (2 ; 5), (4 ; 10), (8 ; 22). Est-il proportionnel ?","Non. Pour 8, le double de 4, il faudrait 20 et non 22.","Deux colonnes cohérentes ne suffisent pas à valider tout le tableau."),Q("Pour 4 gâteaux, il faut 300 g de farine. Combien pour 7 gâteaux ?",525,"300 ÷ 4 × 7 = 525."),W("Calcule le prix de 9 places si 3 places coûtent 21 €, de deux façons.","Par l’unité : 21 ÷ 3 × 9 = 63 €. Par le triplement : 9 = 3 × 3 donc 21 × 3 = 63 €.","Les deux méthodes conservent le même rapport.")],
 [W("Un rectangle a une largeur fixe de 4 m. L’aire est-elle proportionnelle à sa longueur ? Et son périmètre ?","Oui pour l’aire (coefficient 4). Non pour le périmètre qui contient 8 m fixes.","Teste par exemple les longueurs 1 et 2 m."),Q("6 oranges coûtent 4,80 €. Donne le prix de 15 oranges.",12,"Le prix unitaire est 0,80 €."),W("Deux bouteilles contiennent 1,5 L. Quelle quantité pour 10 bouteilles identiques ? Donne deux méthodes.","7,5 L. 1,5 × 5 ou (1,5 ÷ 2) × 10.","Regrouper par paires et passer par l’unité sont deux méthodes.")],["proportion6"]),
C("probabilites","21","Probabilités simples",["Décrire les issues et l’événement","Calculer en équiprobabilité","Distinguer fréquence et probabilité"],
 "Sur un dé équilibré, obtenir plus de 4 donne les issues 5 et 6. La probabilité est 2/6 = 1/3.",
 "Si les issues élémentaires sont équiprobables, P = nombre de cas favorables ÷ nombre de cas possibles. La fréquence observée dépend des essais.",
 [W("Sur un dé, liste les issues de « obtenir un nombre pair ».","2, 4 et 6.","Un événement regroupe des issues."),Q("Un sac contient 3 billes bleues et 5 rouges. Probabilité de tirer bleu ?","3/8","Sur 8 billes, 3 sont bleues."),W("Une pièce équilibrée donne 7 piles sur 10. Sa probabilité de pile a-t-elle changé ?","Non, elle vaut 1/2. La fréquence de cette série est 7/10.","Le modèle et l’observation sont différents.")],
 [W("Sur un dé à six faces, liste les issues de « inférieur ou égal à 3 ».","1, 2 et 3.","Le nombre 3 est inclus par « ou égal »."),Q("Parmi 4 cartes vertes, 3 bleues et 2 rouges, probabilité de bleu ?","1/3","3 cartes sur 9, soit 1/3."),W("Dans 20 essais, un événement de probabilité 1/4 se produit 8 fois. Est-ce possible ?","Oui. La fréquence observée 8/20 diffère de la probabilité théorique.","La probabilité ne fixe pas exactement le nombre de réussites.")],
 [W("Dans une urne de billes bleues et rouges, donne un événement impossible et un événement certain.","Impossible : tirer une bille verte. Certain : tirer une bille bleue ou rouge.","Les probabilités respectives valent 0 et 1."),Q("Sur un dé équilibré, probabilité d’un multiple de 3 ?","1/3","3 et 6 : 2 issues sur 6."),W("On obtient 3 faces sur 4 lancers. Écris la fréquence et donne la probabilité pour une pièce équilibrée.","Fréquence : 3/4 ; probabilité : 1/2.","Le résultat des lancers ne redéfinit pas l’équilibre de la pièce.")],["probabilites6"]),
C("symetrie","22","Symétrie axiale",["Construire l’image par symétrie","Vérifier la médiatrice","Utiliser les invariants"],
 "Par rapport à l’axe vertical du quadrillage, le point (−2 ; 3) a pour image (2 ; 3).",
 "Le segment joignant un point à son image est perpendiculaire à l’axe et coupé en son milieu par l’axe. Un point de l’axe reste fixe ; longueurs et angles sont conservés.",
 [W("Explique comment construire A′ sur papier uni à partir de A et de l’axe d.","Trace la perpendiculaire à d passant par A et reporte la distance à d de l’autre côté.","Utilise règle, équerre et compas."),Q("A est à 3 cm de l’axe. Quelle longueur AA′ en cm ?",6,"3 + 3 = 6."),W("Un sommet est sur l’axe. Où se trouve son image ?","Sur le sommet lui-même.","Sa distance à l’axe est nulle.")],
 [W("Trace un axe oblique d, un segment [MN] d’un côté, puis son symétrique.","Construis séparément M′ et N′ par la perpendiculaire et le report de longueur. Relie M′ à N′.","Vérifie les deux distances et deux angles droits."),W("Une droite d passe par le milieu de [PP′] mais n’est pas perpendiculaire au segment. Peut-elle être l’axe qui envoie P sur P′ ?","Non, l’axe doit aussi être perpendiculaire à [PP′].","Le seul milieu ne suffit pas."),Q("Un segment mesure 7,2 cm. Longueur de son image en cm ?",7.2,"La symétrie conserve la longueur.")],
 [W("Sur quadrillage, construis l’image du triangle A(1 ; 2), B(3 ; 1), C(2 ; 4) par rapport à l’axe vertical d’abscisse 0.","A′(−1 ; 2), B′(−3 ; 1), C′(−2 ; 4).","L’abscisse change de signe, pas l’ordonnée."),W("Décris deux vérifications à effectuer sur [BB′].","Le milieu est sur l’axe et [BB′] lui est perpendiculaire.","Les deux conditions caractérisent la médiatrice."),Q("Un angle de 58° est transformé. Donne la mesure de son image.",58,"La symétrie conserve les angles.")],["symetrie6"]),
C("mediatrice","23","Médiatrice et cercle circonscrit",["Distinguer médiatrice et bissectrice","Construire une médiatrice","Justifier un cercle circonscrit"],
 "Si P appartient à la médiatrice de [AB], alors PA = PB. La bissectrice, elle, partage un angle.",
 "Trace deux arcs de même rayon, supérieur à la moitié de AB, centrés en A et B. Leur droite d’intersection est la médiatrice. Le croisement de deux médiatrices d’un triangle est à égale distance des trois sommets.",
 [W("Une droite passe par le milieu d’un segment sans être perpendiculaire. Est-ce sa médiatrice ?","Non, la perpendiculaire est nécessaire.","Elle est perpendiculaire au segment en son milieu."),W("Construis la médiatrice de [AB] avec un compas.","Trace deux arcs sécants à même ouverture, centrés en A et B. Relie leurs intersections.","Chaque intersection est à égale distance de A et B."),Q("O est sur la médiatrice de [AB] et OA vaut 5,2 cm. Donne OB en cm.",5.2,"Les distances sont égales.")],
 [W("Donne la différence entre médiatrice et bissectrice.","La médiatrice est une droite liée à un segment ; la bissectrice partage un angle en deux angles égaux.","L’objet de départ permet de choisir le bon mot."),W("Construis le centre du cercle circonscrit à un triangle ABC non aplati.","Trace les médiatrices de [AB] et [AC] ; leur intersection O est le centre.","O vérifie OA = OB et OA = OC."),W("Quel rayon choisir et pourquoi le cercle passe-t-il par C ?","Choisis OA. Comme OA = OC, le cercle passe par C.","Un point du cercle est à la distance du rayon du centre.")],
 [W("M vérifie MA = MB. Sur quelle droite se trouve-t-il ?","La médiatrice de [AB].","C’est l’ensemble des points à égale distance de A et B."),W("Construis la médiatrice d’un segment de 8 cm en n’utilisant qu’un compas et une règle non graduée.","Ouvre le compas au-delà de la demi-longueur estimée. Trace deux intersections d’arcs centrés aux extrémités, puis relie-les.","Une ouverture trop petite ne donne pas d’intersection."),W("Le centre du cercle circonscrit doit-il toujours être à l’intérieur du triangle ?","Non. Par exemple, pour un triangle rectangle, c’est le milieu de l’hypoténuse.","Dans un triangle rectangle, ce point est à la même distance des trois sommets.")],["bissectrice6"]),
C("fraction-quantite","24","Fraction d’une quantité",["Calculer une part puis plusieurs","Représenter le tout et les parts","Retrouver le tout à partir d’une fraction"],
 "3/5 de 40 : une part vaut 40 ÷ 5 = 8, puis trois parts valent 24.",
 "Divise le tout par le dénominateur, puis multiplie par le numérateur. Dans le sens inverse, divise la quantité connue par le nombre de parts connues, puis reconstitue le tout.",
 [Q("Calcule 3/4 de 28.",21,"28 ÷ 4 × 3 = 21."),W("Représente 2/3 de 18 par une barre.","Trois parts égales de 6, dont deux coloriées, soit 12.","Le tout reste 18."),Q("4/5 d’une collection valent 20. Combien d’objets en tout ?",25,"20 ÷ 4 × 5 = 25.")],
 [Q("Calcule 5/6 de 42.",35,"42 ÷ 6 = 7, puis 7 × 5."),W("Dessine le tout 36 en parts égales pour montrer 2/9 de 36.","Neuf parts égales de 4 ; deux parts valent 8.","Étiquette la barre entière 36."),W("Les 3/7 des oiseaux d’un refuge sont 18 moineaux. Combien d’oiseaux au total ?","42 oiseaux.","Une part vaut 18 ÷ 3 = 6 et sept parts valent 42.")],
 [Q("Calcule 7/10 de 80.",56,"80 ÷ 10 × 7 = 56."),W("Lina cherche 3/8 de 32. Elle divise par 3 et multiplie par 8. Corrige avec un schéma.","Partage une barre de 32 en huit parts égales de 4 ; trois parts valent 12.","Le dénominateur donne le nombre de parts du tout."),W("Les 2/5 d’une réserve représentent 14 L. Trouve la réserve totale.","35 L.","Une part vaut 7 L, puis cinq parts valent 35 L.")],["quotient6"]),
C("pourcentages","25","Pourcentages",["Relier pourcentage, fraction et décimal","Calculer des taux usuels","Appliquer un pourcentage en contexte"],
 "25 % = 25/100 = 1/4 = 0,25. Donc 25 % de 36 vaut 9.",
 "p % signifie p sur 100. Pour en prendre p % multiplie la quantité par p/100. Dix pour cent donne un dixième, cinquante pour cent la moitié.",
 [Q("Écris 40 % comme nombre décimal.",.4,"40/100 = 0,40."),Q("Calcule 25 % de 68.",17,"68 ÷ 4 = 17."),W("Une classe de 30 élèves a 10 % d’absents. Donne leur nombre.","3 élèves.","Un dixième de 30 vaut 3.")],
 [Q("Écris 3/4 en pourcentage, sans écrire le signe %.",75,"3/4 = 75/100."),Q("Calcule 50 % de 74.",37,"50 % est la moitié."),W("Une médiathèque possède 240 livres et 20 % sont des BD. Combien de BD ?","48 BD.","10 % vaut 24, donc 20 % vaut 48.")],
 [Q("Écris 0,35 en pourcentage, sans écrire le signe %.",35,"0,35 = 35/100."),Q("Calcule 10 % de 85.",8.5,"85 ÷ 10 = 8,5."),W("Il reste 25 % d’un stock de 96 feuilles. Combien de feuilles ont été utilisées ?","72 feuilles.","Il en reste 96 ÷ 4 = 24 ; 96 − 24 = 72.")],["pourcentages6"]),
C("echelles","26","Échelles",["Interpréter l’échelle","Passer du plan au réel","Passer du réel au plan"],
 "À l’échelle 1:2 000, 1 cm sur le plan représente 2 000 cm, donc 20 m en réalité.",
 "L’échelle est le rapport distance sur le plan ÷ distance réelle dans la même unité. Multiplie par le dénominateur pour aller du plan au réel, divise pour le trajet inverse.",
 [Q("À 1:500, 1 cm représente combien de mètres ?",5,"500 cm = 5 m."),Q("À 1:1 000, 4 cm représentent combien de mètres ?",40,"4 000 cm = 40 m."),Q("À 1:200, quelle longueur en cm représente 12 m ?",6,"1 200 ÷ 200 = 6.")],
 [W("Explique l’écriture 1:25 000 sur une carte.","Une unité sur la carte représente 25 000 mêmes unités en réalité, par exemple 1 cm pour 250 m.","Convertis seulement après avoir appliqué l’échelle."),Q("4,4 cm sur une carte à 1:25 000 représentent combien de km ?",1.1,"4,4 × 250 m = 1 100 m."),Q("À cette échelle, combien de cm sur la carte pour 2 km ?",8,"2 000 m ÷ 250 m par cm = 8 cm.")],
 [W("4 cm sur un plan représentent 60 m. Détermine l’échelle.","1:1 500.","60 m = 6 000 cm ; 6 000 ÷ 4 = 1 500."),Q("À 1:300, 6,5 cm représentent combien de mètres ?",19.5,"6,5 × 300 = 1 950 cm = 19,5 m."),Q("Pour un chemin de 36 m à 1:600, quelle longueur en cm sur le plan ?",6,"3 600 ÷ 600 = 6.")],["echelles6"]),
C("espace","27","Vision dans l’espace et volumes",["Lire des vues ou un patron","Dénombrer des cubes visibles et cachés","Calculer un volume"],
 "Un pavé de dimensions 4 cm, 3 cm et 2 cm est formé de deux couches de douze cubes d’1 cm³. Son volume est de 24 cm³.",
 "Une vue ne montre qu’une direction. Dessine ou lis les couches pour compter sans oublier les cubes cachés. Multiplie les trois dimensions exprimées dans la même unité pour un pavé droit.",
 [W("Combien de carrés faut-il pour un patron de cube ? Explique pourquoi une rangée de six ne suffit pas.","Six carrés. Une rangée ne permet pas de refermer sans recouvrement les six faces.","Essaie une croix de quatre carrés en colonne et deux sur les côtés d’un carré central."),Q("Deux couches de 3 × 4 cubes sont empilées. Combien de cubes ?",24,"2 × 3 × 4."),Q("Volume en cm³ d’un pavé de dimensions 7, 2 et 5 cm ?",70,"7 × 2 × 5.")],
 [W("Deux piles accolées, disposées de gauche à droite et sans pile devant elles, mesurent 3 et 2 cubes. Décris la vue de dessus et la vue de face lorsqu’on regarde de manière à voir les deux piles côte à côte.","De dessus on voit deux carrés. De face on voit deux colonnes de 3 et 2 carrés.","La vue de dessus ne permet pas de retrouver les hauteurs."),Q("Une construction a des couches de 12, 8 et 4 cubes. Combien au total ?",24,"Additionne les effectifs des couches."),W("Un pavé de base 5 cm par 4 cm a un volume de 60 cm³. Calcule sa hauteur.","3 cm.","L’aire de base vaut 20 cm² et 60 ÷ 20 = 3.")],
 [W("Dessine un patron de cube et entoure deux faces qui se retrouveront opposées.","Par exemple quatre carrés A, B, C, D alignés, puis un carré au-dessus et un au-dessous de B. A et C sont opposés.","Imagine les rotations des faces autour des arêtes."),Q("Un pavé fait 4 × 3 × 3 cubes. On retire 5 cubes. Combien restent ?",31,"4 × 3 × 3 − 5 = 31."),Q("Calcule le volume en cm³ d’un pavé de dimensions 1 dm, 5 cm et 3 cm.",150,"1 dm = 10 cm ; 10 × 5 × 3 = 150.")],["solides6","volumes6"]),
];

// Chaque ligne d’exercice suit la forme consigne | réponse | méthode. Le préfixe * indique un travail à rédiger.
function decodeChapterItems(lines) {
  return lines.trim().split("\n").map(line=>{
    const [prompt,answer,explain]=line.trim().split("|").map(value=>value.trim());
    return prompt.startsWith("*")?W(prompt.slice(1),answer,explain):Q(prompt,answer,explain);
  });
}
function compactChapter(id,code,title,skills,example,recap,practice,first,second,links=[],track="cours"){
  return C(id,code,title,skills.split(";"),example,recap,decodeChapterItems(practice),decodeChapterItems(first),decodeChapterItems(second),links,track);
}
const T=compactChapter;
const classeTroisieme=[
T("pythagore","G1","Pythagore : sens direct","Reconnaître l’hypoténuse;Calculer une longueur exacte puis approchée;Rédiger et vérifier",
 "Dans un triangle rectangle de côtés de l’angle droit 5 et 8 cm, l’hypoténuse vaut √89 cm, soit environ 9,43 cm.","Écris la relation en nommant le triangle et son angle droit. Si l’inconnue est un côté de l’angle droit, soustrais les carrés avant de prendre la racine.",
 "Les côtés de l’angle droit mesurent 6 et 8 cm. Donne l’hypoténuse en cm. | 10 | √(36 + 64) = 10.",
 `*Le triangle RST est rectangle en T. Écris l’égalité de Pythagore. | RS² = RT² + ST². | RS est opposé à l’angle droit.
 *Dans ABC rectangle en A, AB = 7 cm et AC = 9 cm. Donne BC exacte puis au centième. | √130 cm, environ 11,40 cm. | BC² = 49 + 81 = 130.
 *Un câble de 13 m rejoint le sommet d’un poteau ; son pied d’ancrage est à 5 m du pied du poteau sur sol horizontal. Calcule la hauteur. | 12 m. | Le câble est l’hypoténuse ; la hauteur vaut √(169 − 25).`,
 `*ABC est rectangle en B, AB = 9 cm et AC = 15 cm. Identifie l’hypoténuse et écris l’égalité. | AC est l’hypoténuse ; AC² = AB² + BC². | L’hypoténuse est opposée à B.
 *Dans un triangle rectangle, l’hypoténuse mesure 10 cm et l’un des autres côtés 4 cm. Donne le côté manquant exact puis au dixième. | √84 cm, environ 9,2 cm. | √(100 − 16) = √84.
 *Un écran rectangulaire mesure 48 cm sur 36 cm. Calcule sa diagonale et justifie. | 60 cm. | Le rectangle donne un angle droit et 48² + 36² = 3 600.`,["pythagore3"]),
T("proportion-ratios","O1","Proportionnalité et ratios","Choisir une méthode;Partager selon un ratio;Résoudre un problème d’échelle et de conversion",
 "Un mélange 3:5 contient huit parts. Pour 1,2 L, une part vaut 150 mL, donc 450 mL et 750 mL.","Teste le rapport des grandeurs. Pour une échelle, écris les deux longueurs dans la même unité. Dans un partage en ratio, additionne d’abord les parts.",
 "Cinq objets coûtent 17,50 €. Combien coûtent 8 objets ? | 28 | 17,50 ÷ 5 × 8 = 28.",
 `*Un tableau donne 5 → 12,5 et 8 → 20. Justifie la proportionnalité et complète pour 11. | Coefficient 2,5 ; 11 → 27,5. | Les deux quotients valent 2,5.
 *Partage 84 selon le ratio 2:5. | 24 et 60. | Sept parts de 12.
 5,6 cm à l’échelle 1:25 000 représentent combien de km ? | 1,4 | 140 000 cm = 1,4 km.`,
 `*Compare 600 g à 7,50 € et 1 kg à 12 €. Quelle offre est moins chère au kg ? | Le lot d’1 kg : 12 €/kg contre 12,50 €/kg. | Ramène les prix à la même masse.
 *Partage 1,8 L selon le ratio 1:2:3. | 0,3 L ; 0,6 L ; 0,9 L. | Six parts de 0,3 L.
 À 1:8 000, combien de cm représentent 560 m ? | 7 | 56 000 ÷ 8 000 = 7.`,["proportion4"]),
T("fonctions","O2","Notion de fonction","Passer de la règle à l’image;Chercher des antécédents;Interpréter une représentation et son domaine",
 "Pour f(x) = x² sur [−2 ; 3], 4 a deux antécédents −2 et 2, mais 9 n’en a qu’un : 3 appartient au domaine, −3 n’y appartient pas.","Une valeur de x a exactement une image. Une hauteur peut avoir zéro, un ou plusieurs antécédents. Sur une courbe, une horizontale coupe aux points d’ordonnées égales.",
 "f(x) = 3x − 1. Quelle est l’image de −2 ? | −7 | 3 × (−2) − 1 = −7.",
 `Un programme prend un nombre x, le met au carré puis retranche 4. Calcule l’image de −3. | 5 | (−3)² − 4 = 5.
 *Sur le domaine [−3 ; 2], trouve tous les antécédents de 0 par f(x) = x² − 4. | −2 et 2. | Les deux vérifient x² = 4 et appartiennent au domaine.
 *Trace la ligne brisée reliant (0 ; 2), (1 ; 5), (3 ; 1), (5 ; 5). Combien 3 possède-t-il d’antécédents ? | Trois. | L’horizontale y = 3 coupe chacune des trois portions une fois.`,
 `La fonction f vérifie f(x) = (x + 1)². Donne l’image de 2. | 9 | (2 + 1)² = 9.
 *Sur [−2 ; 2], trouve les antécédents de 4 puis de 10 par f(x) = x². | −2 et 2 pour 4 ; aucun pour 10. | La valeur maximale sur ce domaine est 4.
 *Trace la ligne brisée reliant (−2 ; 4), (0 ; 0), (2 ; 4). Donne les antécédents de 2 et explique pourquoi l’image de 0 est unique. | −1 et 1. L’image de 0 vaut seulement 0. | Une verticale coupe le graphe d’une fonction une seule fois pour une abscisse du domaine.`,["fonctions","graphique4"]),
T("thales-emboite","G3","Thalès : configuration emboîtée","Reconnaître les hypothèses;Écrire les rapports;Calculer et rédiger",
 "A, M, B et A, N, C sont alignés dans cet ordre. Si (MN) ∥ (BC), AM/AB = AN/AC = MN/BC.","Nomme les alignements et les parallèles, identifie les côtés correspondants, puis calcule l’inconnue. Une figure à main levée ne prouve pas le parallélisme.",
 "*Dans ABC, M ∈ [AB], N ∈ [AC] et (MN) ∥ (BC). Écris les rapports. | AM/AB = AN/AC = MN/BC. | Les côtés issus de A se correspondent.",
 `*Construis un schéma avec M ∈ [AB], N ∈ [AC] et (MN) ∥ (BC). Code les hypothèses. | M et N à l’intérieur des côtés, MN parallèle à BC. | On a deux triangles emboîtés de sommet commun A.
 *Écris les rapports en commençant par AB/AM. | AB/AM = AC/AN = BC/MN. | Inverse tous les rapports ensemble.
 *AM = 4 cm, AB = 10 cm et AC = 15 cm. Calcule AN en rédigeant. | AN = 6 cm. | Par Thalès, AN/15 = 4/10.`,
 `*Dans PRS, U et V sont sur [PR] et [PS]. Quelle information supplémentaire autorise Thalès ? | (UV) ∥ (RS). | Les alignements sont déjà donnés.
 *On suppose (UV) parallèle à (RS). PU = 3 cm, PR = 8 cm et RS = 12 cm. Écris l’égalité utile pour UV. | UV/12 = 3/8. | Le petit triangle PUV correspond à PRS.
 Dans la configuration précédente, quelle est la longueur UV en cm ? | 4,5 | 12 × 3 ÷ 8 = 4,5.`,["thales3"]),
T("arithmetique","N1","Arithmétique et fractions irréductibles","Utiliser les critères et facteurs premiers;Trouver un PGCD en contexte;Produire une fraction irréductible",
 "84 = 2² × 3 × 7 et 126 = 2 × 3² × 7. Leur PGCD vaut 2 × 3 × 7 = 42.","Le PGCD utilise les facteurs premiers communs avec le plus petit exposant. Divise par le PGCD pour obtenir une fraction irréductible.",
 "Donne le PGCD de 30 et 42. | 6 | 30 = 2 × 3 × 5 ; 42 = 2 × 3 × 7.",
 `*Décompose 180 en facteurs premiers. | 2² × 3² × 5. | 180 = 18 × 10.
 *Avec 72 cartes bleues et 108 rouges, forme le plus grand nombre de lots identiques en utilisant tout. | 36 lots avec 2 bleues et 3 rouges chacun. | PGCD(72, 108) = 36.
 *Rends 126/198 irréductible et justifie l’arrêt. | 7/11. | Divise par 18 ; 7 et 11 sont premiers distincts.`,
 `*Vérifie si 2 145 est divisible par 3, 5 et 9. | Oui par 3 et 5, non par 9. | La somme des chiffres vaut 12 et le chiffre des unités est 5.
 *Découpe des rubans de 84 et 60 cm en morceaux égaux de longueur maximale, sans perte. | 12 cm ; 7 et 5 morceaux. | PGCD(84, 60) = 12.
 *Rends 90/144 irréductible. | 5/8. | Divise les deux termes par 18. 5 et 8 n’ont pas de diviseur commun autre que 1.`,["premiers3","arithmetique3"]),
T("fractions","N2","Fractions et calculs enchaînés","Additionner et soustraire;Multiplier ou diviser;Respecter les priorités et simplifier",
 "5/6 ÷ (−10/9) = 5/6 × (−9/10) = −3/4.","Dénominateur commun pour addition ou soustraction. Multiplie numérateurs et dénominateurs pour un produit. Pour diviser, multiplie par l’inverse du diviseur non nul.",
 "Calcule −3/8 + 5/12. | 1/24 | −9/24 + 10/24.",
 `Calcule 5/6 − 7/9. | 1/18 | 15/18 − 14/18.
 Calcule −4/15 × 5/6. | −2/9 | −20/90 = −2/9.
 *Calcule 1/2 + (3/4 ÷ 9/8). Présente une fraction irréductible. | 7/6. | Le quotient vaut 2/3, donc 1/2 + 2/3 = 7/6.`,
 `Calcule −5/12 − (−7/18). | −1/36 | −15/36 + 14/36.
 Calcule 7/10 ÷ (−14/15). | −3/4 | Multiplie par −15/14.
 *Calcule (2/3 − 1/6) × 9/5 et donne une fraction irréductible. | 9/10. | Les parenthèses valent 1/2 puis 1/2 × 9/5 = 9/10.`,["rationnels3","arithmetique3"]),
T("pythagore-converse","G2","Réciproque et contraposée de Pythagore","Choisir le théorème adapté;Comparer les carrés;Conclure avec rédaction",
 "Si les côtés mesurent 8, 15 et 17, 8² + 15² = 17² ; la réciproque prouve que le triangle est rectangle.","Compare le carré du plus grand côté à la somme des deux autres. Égalité : réciproque. Inégalité : contraposée. Le sens direct nécessite un angle droit déjà connu.",
 "*Côtés 7, 8, 10 cm. Le triangle est-il rectangle ? | Non. 7² + 8² = 113 et 10² = 100. | Par la contraposée.",
 `*On connaît un angle droit et deux côtés. Quelle propriété utiliser pour calculer le troisième ? | Le théorème direct. | L’angle droit est une hypothèse donnée.
 Calcule 9² + 12². | 225 | 81 + 144 = 225.
 *LM = 9, MN = 12 et LN = 15. Détermine la nature de LMN. | Rectangle en M. | LN² = 225 = LM² + MN², donc réciproque.`,
 `*On soupçonne un triangle de ne pas être rectangle. Quel calcul et quelle propriété permettent de le montrer ? | Comparer les carrés. S’ils diffèrent, utiliser la contraposée. | Le plus grand côté est le seul candidat pour l’hypoténuse.
 Calcule 6² + 8² − 11². | −21 | 36 + 64 − 121 = −21.
 *Un triangle a des côtés de 6, 8 et 11 cm. Rédige une conclusion. | Non rectangle par la contraposée. | 11² = 121, tandis que 6² + 8² = 100.`,["reciproque3"]),
T("transformations","G6","Transformations : symétries, translations et rotations","Construire une image;Identifier la transformation;Justifier un invariant",
 "Une translation de déplacement (3 ; −2) envoie (1 ; 4) sur (4 ; 2).","Identifie axe, centre ou déplacement. Les symétries, translations et rotations conservent les longueurs et les angles.",
 "*Image de A(2 ; 5) par la translation (−3 ; 1) ? | A′(−1 ; 6). | Ajoute le déplacement aux coordonnées.",
 `*Trace l’image de A(2 ; 1) et B(3 ; 2) par symétrie d’axe vertical x = 0. | A′(−2 ; 1), B′(−3 ; 2). | L’axe est la médiatrice des segments joignant chaque point à son image.
 *Un demi-tour autour de O envoie A sur A′. Quel lien avec une symétrie ? | C’est la symétrie centrale de centre O. | O est le milieu de [AA′].
 *Un triangle a un angle de 35° et un côté de 6 cm. Quelle mesure ont leurs images par rotation ? | 35° et 6 cm. | La rotation est une isométrie.`,
 `*Construis l’image de P(−1 ; 2) par rotation de 90° dans le sens inverse des aiguilles d’une montre autour de O. | P′(−2 ; −1). | Tourne le vecteur (x ; y) en (−y ; x).
 *A et B se déplacent tous deux de 4 unités à droite et une unité vers le bas. Quelle transformation ? | Une translation de déplacement (4 ; −1). | Chaque point suit le même déplacement.
 *Explique pourquoi les images de trois points alignés restent alignées par symétrie. | L’image d’une droite est une droite qui contient les trois points images. | La symétrie conserve l’alignement.`,["transformations3"]),
T("thales-papillon","G4","Thalès : configuration en papillon","Lire les alignements;Identifier les côtés correspondants;Calculer dans un problème",
 "Les droites (AB) et (CD) se coupent en O entre A et B, entre C et D. Si (AC) ∥ (BD), OA/OB = OC/OD = AC/BD.","Les triangles ont le même sommet O mais sont de part et d’autre. Fais correspondre les sommets sur chaque droite avant d’écrire les rapports.",
 "OA = 3, OB = 9, OC = 4 et (AC) ∥ (BD) avec O entre les points alignés. Donne OD. | 12 | OB/OA = 3, donc OD = 3 × OC.",
 `*Construis une configuration papillon de sommet S avec triangles SPR et SQT. | Place S entre P et Q et entre R et T, avec (PR) ∥ (QT). | Les segments PR et QT sont les bases parallèles.
 *Écris les rapports pour cette configuration. | SP/SQ = SR/ST = PR/QT. | P correspond à Q ; R correspond à T.
 PR = 5, QT = 12 et SP = 3,5. Calcule SQ. | 8,4 | 3,5 × 12 ÷ 5 = 8,4.`,
 `*Pourquoi ne pas utiliser Thalès si seuls les alignements sont donnés ? | Le parallélisme des deux bases doit aussi être connu. | Les alignements seuls n’imposent pas l’égalité des rapports.
 *Si OA/OB = 3/5 et OC = 6 cm, quel rapport permet de déterminer OD ? | OC/OD = OA/OB = 3/5. | Les côtés sont appariés le long des mêmes droites.
 Dans la configuration précédente, donne OD en cm. | 10 | 6 × 5 ÷ 3 = 10.`,["papillon3"]),
T("vitesse","O6","Vitesse, distance et durée","Calculer les trois grandeurs;Convertir des unités;Interpréter la vitesse moyenne",
 "18 km/h = 5 m/s. Divise par 3,6 de km/h vers m/s, multiplie par 3,6 dans l’autre sens.","v = d/t avec unités compatibles. Pour un parcours entier, divise la distance totale par la durée totale.",
 "24 km sont parcourus en 1 h 30 min. Donne la vitesse moyenne en km/h. | 16 | 1 h 30 = 1,5 h ; 24 ÷ 1,5 = 16.",
 `Calcule la durée en minutes de 15 km parcourus à 12 km/h. | 75 | 15 ÷ 12 = 1,25 h = 75 min.
 Convertis 72 km/h en m/s. | 20 | 72 ÷ 3,6 = 20.
 *On parcourt 4 km en 20 min puis 6 km en 40 min. Calcule la vitesse moyenne. | 10 km/h. | 10 km en 1 h, sans faire la moyenne des deux vitesses.`,
 `À 3 m/s, quelle distance en mètres en 2 min ? | 360 | 2 min = 120 s.
 Convertis 7,5 m/s en km/h. | 27 | 7,5 × 3,6 = 27.
 *Un voyage de 60 km prend 45 min de conduite et 15 min d’arrêt. Compare les vitesses moyennes avec et sans l’arrêt. | 60 km/h avec l’arrêt, 80 km/h sans l’arrêt. | Le temps considéré doit être précisé.`,["grandeurs4","conversions4"]),
T("pourcentages-evolution","O5","Pourcentages d’évolution","Choisir un coefficient;Trouver un taux ou une valeur initiale;Composer les évolutions",
 "Une hausse de 12 % donne 1,12. Puis une baisse de 12 % donne 1,12 × 0,88 = 0,9856, soit une baisse totale de 1,44 %.","Valeur finale = valeur initiale × coefficient. Inverse par une division. Les coefficients se multiplient quand les évolutions se succèdent.",
 "80 € augmentent de 15 %. Donne le prix final. | 92 | 80 × 1,15 = 92.",
 `135 € diminuent de 20 %. Donne le prix final. | 108 | Multiplie par 0,80.
 Un prix passe de 50 € à 62 €. Donne le taux en pourcentage. | 24 | (62 − 50) ÷ 50 = 0,24.
 *Un tarif augmente de 10 %, puis de 20 %. Donne l’évolution totale. | +32 %. | 1,10 × 1,20 = 1,32.`,
 `Un effectif de 450 baisse de 8 %. Donne l’effectif final. | 414 | 450 × 0,92 = 414.
 Après une réduction de 25 %, un objet vaut 54 €. Donne le prix initial. | 72 | 54 ÷ 0,75 = 72.
 *Une quantité baisse de 20 % puis augmente de 20 %. Retrouve-t-on la valeur de départ ? | Non, on conserve 96 %, soit une baisse de 4 %. | 0,8 × 1,2 = 0,96.`,["pourcentages","evolutions3"]),
T("fonction-lineaire","O3","Fonction linéaire","Modéliser une situation;Relier tableau, droite et formule;Lire image et antécédent",
 "f(x) = 2,5x modélise le prix de x kilogrammes à 2,50 €/kg. La droite passe par (0 ; 0) et (4 ; 10).","La fonction linéaire f(x) = ax correspond à une proportionnalité. Le coefficient a est l’image de 1. Si a ≠ 0, cherche un antécédent en divisant par a.",
 "f(x) = −3x. Donne f(−2). | 6 | Produit de deux nombres négatifs.",
 `*Un robinet verse 18 L en 3 min à débit constant. Donne la fonction volume en fonction du temps. | f(t) = 6t. | Le débit est 6 L/min.
 *Trace f(x) = 6x sur [0 ; 5] à partir de deux points. | Relie (0 ; 0) à (5 ; 30). | Calcule l’image de 5.
 Quel est l’antécédent de 21 par f(x) = 6x ? | 3,5 | 21 ÷ 6 = 3,5.`,
 `*Une droite passe par l’origine et par (4 ; −10). Donne la fonction. | f(x) = −2,5x. | Coefficient −10 ÷ 4.
 *Crée un tableau pour les entrées −2, 0, 2 de f(x) = −2,5x. | Images 5, 0, −5. | Multiplie chaque entrée par −2,5.
 Quel est l’antécédent de 7,5 par f(x) = −2,5x ? | −3 | 7,5 ÷ (−2,5) = −3.`,["lineaire3"]),
T("statistiques","O7","Statistiques","Lire effectif et fréquence;Calculer les indicateurs;Construire et interpréter un graphique",
 "Série 2, 3, 3, 7 : moyenne 3,75 ; médiane 3 ; étendue 5.","Ordonne pour la médiane. Pondère par les effectifs pour la moyenne. Pour des classes de même largeur, les hauteurs d’un histogramme peuvent être proportionnelles aux effectifs.",
 "Étendue de 5, 8, 12 et 14 ? | 9 | 14 − 5 = 9.",
 `Sur 36 élèves, 9 viennent à vélo. Donne la fréquence. | 0,25 | 9/36 = 1/4.
 *Calcule moyenne, médiane et étendue de 2, 4, 4, 6, 9. | Moyenne 5, médiane 4, étendue 7. | Somme 25 ; troisième valeur 4 ; 9 − 2 = 7.
 *Représente 5, 10 et 15 réponses dans un diagramme circulaire. | Angles 60°, 120°, 180°. | Chaque réponse vaut 360° ÷ 30 = 12°.`,
 `Sur 50 durées relevées, 16 sont inférieures à 10 min. Donne la fréquence. | 0,32 | 16 ÷ 50 = 0,32.
 *Trois valeurs 10 et deux valeurs 15 sont relevées. Donne moyenne, médiane et étendue. | Moyenne 12, médiane 10, étendue 5. | Somme 60 sur cinq valeurs.
 *Trace un histogramme de durées [0 ; 5[, [5 ; 10[, [10 ; 15[ avec effectifs 3, 9, 6. | Rectangles contigus de largeurs 5 et de hauteurs proportionnelles à 3, 9, 6. | L’égalité des largeurs permet de lire directement la comparaison des effectifs.`,["statistiques3"]),
T("trigonometrie-longueurs","G10","Trigonométrie : calculer une longueur","Identifier les côtés;Choisir sinus, cosinus ou tangente;Calculer et interpréter",
 "Une rampe de 6 m inclinée de 30° atteint une hauteur de 3 m, car sin(30°) = hauteur/6.","Pour l’angle choisi, repère opposé, adjacent et hypoténuse. Utilise sin = opposé/hypoténuse, cos = adjacent/hypoténuse ou tan = opposé/adjacent. Travaille en degrés.",
 "*Triangle ABC rectangle en A. Par rapport à B, quels sont les côtés opposé, adjacent et l’hypoténuse ? | AC, AB, BC. | Repère d’abord BC, opposé à l’angle droit.",
 `*Dans RST rectangle en T, nomme les côtés par rapport à l’angle R. | Opposé ST, adjacent RT, hypoténuse RS. | L’hypoténuse est opposée à T.
 *On connaît l’hypoténuse et on cherche l’opposé à l’angle. Quel rapport utiliser ? | Le sinus. | sin(angle) = opposé/hypoténuse.
 *Une échelle de 5 m fait un angle de 62° avec le sol. Calcule la hauteur atteinte au centième. | Environ 4,41 m. | 5 × sin(62°) ≈ 4,4147.`,
 `*Dans ABC rectangle en B, nomme l’opposé et l’adjacent à l’angle C. | Opposé AB et adjacent BC ; hypoténuse AC. | L’adjacent contient C sans être l’hypoténuse.
 *On connaît l’adjacent et on cherche l’opposé. Quel rapport utiliser ? | La tangente. | tan(angle) = opposé/adjacent.
 *Un sentier rectiligne monte de 35° par rapport à l’horizontale et sa projection horizontale mesure 120 m. Donne le dénivelé au mètre. | Environ 84 m. | 120 × tan(35°) ≈ 84,0 m.`,["trigo3"]),
T("puissances","N3","Puissances et notation scientifique","Maîtriser exposants et signes;Convertir en notation scientifique;Comparer des ordres de grandeur",
 "0,00042 = 4,2 × 10⁻⁴ et 72 000 = 7,2 × 10⁴.","Une puissance à exposant négatif d’un nombre non nul désigne un inverse. En notation scientifique, le coefficient positif est au moins 1 et strictement inférieur à 10.",
 "Calcule 10⁻³. | 0,001 | 1 ÷ 1 000.",
 `Calcule (−3)² − 2³. | 1 | Les puissances valent 9 et 8.
 *Écris 0,000083 en notation scientifique. | 8,3 × 10⁻⁵. | Le coefficient est 8,3 ; déplace la virgule de cinq rangs.
 *Compare 2,8 × 10⁻³ et 6,1 × 10⁻⁴. | 2,8 × 10⁻³ est plus grand. | 2,8 × 10⁻³ = 28 × 10⁻⁴.`,
 `Calcule 2⁻³. | 0,125 | 1/8 = 0,125.
 *Écris 7 480 000 en notation scientifique. | 7,48 × 10⁶. | Le nombre est de l’ordre du million.
 *Encadre 9,1 × 10⁶ par deux puissances de 10 consécutives. | 10⁶ < 9,1 × 10⁶ < 10⁷. | 1 < 9,1 < 10.`,["puissances3"]),
T("probabilites","O8","Probabilités et simulation","Décrire les issues;Calculer un événement ou son contraire;Comparer fréquence et probabilité",
 "Si P(A) = 0,35, alors P(non A) = 0,65. Sur 20 essais, la fréquence peut s’écarter de 0,35.","Liste les issues possibles. En équiprobabilité, compte les cas. Le contraire rassemble toutes les issues qui n’appartiennent pas à l’événement.",
 "Un dé équilibré est lancé. Probabilité d’obtenir un nombre strictement supérieur à 4 ? | 1/3 | 2 issues sur 6.",
 `*Avec un dé à six faces, décris l’événement « au moins 5 » et son contraire. | {5, 6} ; contraire {1, 2, 3, 4}. | Les deux ensembles sont disjoints et couvrent toutes les issues.
 La probabilité d’un événement vaut 0,28. Donne celle du contraire. | 0,72 | 1 − 0,28 = 0,72.
 *Un événement de probabilité 0,4 réussit 3 fois sur 10 et 41 fois sur 100. Compare les fréquences. | 0,30 et 0,41 ; la seconde est plus proche de 0,40 dans cet exemple. | Une série plus longue ne garantit pas toujours une fréquence plus proche.`,
 `*Un tirage parmi quatre cartes marquées A, A, B, C est uniforme sur les cartes. A, B et C sont-ils équiprobables ? | Non : A vaut 1/2, B et C valent 1/4. | Les cartes sont équiprobables mais pas les lettres.
 Probabilité de ne pas tirer A dans cette expérience ? | 1/2 | Deux cartes ne sont pas A.
 *Deux séries d’un dé donnent 4 six sur 12 lancers et 20 six sur 120. Compare à 1/6. | 4/12 = 1/3 s’en écarte ; 20/120 = 1/6 coïncide ici. | Le calcul théorique et le résultat observé sont distincts.`,["simulation3"]),
T("thales-converse","G5","Réciproque et contraposée de Thalès","Contrôler l’ordre des points;Comparer les rapports;Conclure avec le bon théorème",
 "A, M, B et A, N, C sont alignés dans le même ordre. Si AM/AB = AN/AC, la réciproque donne (MN) ∥ (BC).","L’égalité de rapports doit s’accompagner des alignements et du même ordre pour la réciproque. Une inégalité de rapports contredit le parallélisme.",
 "*M ∈ [AB], N ∈ [AC], AM/AB = 2/5 et AN/AC = 3/5. Conclusion ? | (MN) et (BC) ne sont pas parallèles. | Si elles l’étaient, le théorème donnerait des rapports égaux.",
 `*A, M, B et A, N, C sont alignés dans cet ordre. Précise ce qu’il faut comparer. | AM/AB et AN/AC. | Les deux rapports comparent une petite longueur à la longueur correspondante.
 *AM = 6, AB = 10, AN = 9, AC = 15. Compare les rapports. | 6/10 = 9/15 = 3/5. | Réduis ou compare les produits en croix.
 *Rédige la conclusion. | (MN) ∥ (BC), par la réciproque de Thalès. | Les alignements dans le même ordre et l’égalité sont vérifiés.`,
 `*M ∈ [AB] et N ∈ [AC]. Quels points sont alignés et dans quel ordre si M et N sont intérieurs ? | A, M, B et A, N, C dans cet ordre. | Les points intermédiaires sont sur les segments.
 *AM = 4, AB = 7, AN = 6, AC = 10. Compare 4/7 et 6/10. | 4/7 < 6/10. | 4 × 10 = 40 et 6 × 7 = 42.
 *Peut-on dire que (MN) et (BC) sont parallèles ? Justifie. | Non, par contraposée de Thalès. | Des parallèles imposeraient des rapports égaux.`,["thalesreciproque3"]),
T("agrandissements","G7","Agrandissements et réductions","Déterminer le coefficient;Calculer l’effet sur l’aire;Calculer l’effet sur le volume",
 "Si une maquette double ses longueurs, ses aires quadruplent et ses volumes sont multipliés par huit.","Le rapport k multiplie les longueurs, k² multiplie les aires et k³ multiplie les volumes. Pour retrouver k, distingue bien la grandeur donnée.",
 "Une longueur de 6 cm devient 9 cm. Donne k. | 1,5 | 9 ÷ 6 = 1,5.",
 `Un objet passe d’une largeur de 18 cm à 12 cm. Donne k. | 2/3 | Longueur image ÷ longueur initiale.
 Une aire de 36 cm² est réduite au rapport 2/3. Donne la nouvelle aire en cm². | 16 | 36 × 4/9 = 16.
 Un volume initial de 81 cm³ est réduit au rapport 2/3. Donne le volume final en cm³. | 24 | 81 × 8/27 = 24.`,
 `*Une affiche a une aire quatre fois plus grande que son modèle et lui est semblable. Donne le coefficient de longueur. | 2. | La longueur change par √4.
 Un plan de 20 cm² est agrandi au rapport 1,5. Donne la nouvelle aire en cm². | 45 | 20 × 1,5² = 45.
 *Une maquette de volume 7 cm³ a des longueurs cinq fois plus petites que l’objet. Donne le volume de l’objet. | 875 cm³. | 7 × 5³ = 875.`,["airesvolumes3"]),
T("triangles-semblables","G8","Triangles semblables","Apparier sommets et côtés;Justifier la similitude;Calculer une longueur",
 "Si les angles de A et P se correspondent ainsi que B et Q, alors C correspond à R et AB à PQ, même si les dessins sont tournés.","Deux triangles qui ont deux paires d’angles égaux sont semblables. Les longueurs des côtés correspondants ont le même rapport.",
 "*Dans ABC et DEF, A correspond à E et B à F. Quel côté correspond à [AC] ? | [ED]. | Le sommet restant C correspond à D.",
 `*ABC a A = 50°, B = 60°. RST a S = 60°, T = 50°. Écris les correspondances. | A ↔ T, B ↔ S, C ↔ R. | Les troisièmes angles valent 70°.
 *Pourquoi sont-ils semblables ? | Deux paires d’angles sont égales, donc les troisièmes le sont aussi. | L’orientation du dessin ne change rien.
 AB = 4 et TS = 6. Si BC = 5, combien vaut SR ? | 7,5 | SR/BC = TS/AB = 1,5.`,
 `*Un triangle de côtés 3, 5, 6 et un autre de côtés 7,5, 9, 4,5 sont tournés différemment. Apparier leurs côtés. | 3 ↔ 4,5 ; 5 ↔ 7,5 ; 6 ↔ 9. | Apparier les côtés dans l’ordre des longueurs.
 *Justifie qu’ils sont semblables. | Les trois rapports de longueurs correspondantes valent 1,5. | La proportionnalité des trois côtés est un critère de similitude.
 *Deux triangles semblables ont un côté de 15 cm qui correspond à un côté de 9 cm. Le plus grand a un autre côté de 20 cm. Donne son correspondant. | 12 cm. | Le coefficient du grand vers le petit vaut 9/15 = 0,6.`,["semblables4"]),
T("homotheties","G9","Homothéties","Construire depuis un centre quelconque;Lire signe et grandeur du rapport;Interpréter les invariants",
 "Pour un rapport −2, l’image A′ est de l’autre côté de O que A et OA′ = 2 OA.","Centre, point et image sont alignés. Le signe du rapport indique le même côté ou le côté opposé. Les longueurs sont multipliées par la valeur absolue du rapport.",
 "*O(0 ; 0), A(2 ; −1), rapport −2. Donne A′. | (−4 ; 2). | Multiplie les coordonnées par −2 lorsque O est l’origine.",
 `*O(1 ; 2), A(3 ; 4), rapport 1/2. Donne A′. | (2 ; 3). | C’est le milieu de [OA].
 *O(1 ; 2), B(2 ; 5), rapport −2. Donne B′. | (−1 ; −4). | Depuis O, prends −2 fois le déplacement (1 ; 3).
 *Que deviennent un angle de 55° et un côté de 4 cm pour le rapport −2 ? | 55° et 8 cm. | L’angle est conservé ; la longueur est multipliée par 2.`,
 `*Centre C(2 ; −1), P(6 ; 3), rapport 3/4. Donne P′. | (5 ; 2). | Depuis C, prends les trois quarts du déplacement (4 ; 4).
 *O est entre A et A′ et OA′ = 3 OA. Donne le rapport. | −3. | Le côté est opposé et le facteur de longueur vaut 3.
 *Une droite ne passe pas par le centre d’une homothétie de rapport non nul. Quelle est la direction de son image ? | Elle est parallèle à la droite initiale. | Deux points et leurs images forment des segments de même direction.`,["transformations3"]),
T("comparaison-affine","O4","Fonctions affines et comparaison graphique","Interpréter les coefficients;Déterminer un seuil;Justifier un intervalle de comparaison",
 "A(x) = 3x et B(x) = 2x + 4 se croisent en (4 ; 12). Avant 4, A est moins cher ; après 4, B est moins cher.","Pour y = ax + b, b est l’ordonnée à l’origine et a la variation verticale par unité horizontale. Compare les courbes par leur hauteur. Vérifie l’abscisse du croisement par une équation.",
 "*Dans f(x) = 4x + 7, donne l’ordonnée à l’origine et la variation pour une unité de plus. | 7 et +4. | f(0) = 7 et f(x + 1) − f(x) = 4.",
 `*Un service A coûte 5 € par trajet. B coûte 12 € puis 2 € par trajet. Donne les deux expressions et trace sur un repère. | A(x) = 5x et B(x) = 12 + 2x. | A part de 0 et B de 12 ; utilise deux points par droite.
 À combien de trajets les deux tarifs sont-ils égaux ? | 4 | 5x = 12 + 2x, soit 3x = 12.
 *Pour combien de trajets B coûte-t-il strictement moins que A ? Interprète le point de croisement. | Au moins 5 trajets entiers. Au croisement, les 4 trajets coûtent 20 € pour chaque tarif. | 12 + 2x < 5x équivaut à x > 4.`,
 `*Pour une distance x en km, A coûte 4x + 3 et B coûte x + 18. Repère le départ de chaque droite et la pente. | A : départ 3, pente 4 ; B : départ 18, pente 1. | Les départs valent les prix à 0 km.
 À quelle distance en km les prix sont-ils égaux ? | 5 | 4x + 3 = x + 18 donne 3x = 15.
 *À quelles distances positives ou nulles A est-il au plus aussi cher que B ? Donne le prix au seuil. | De 0 à 5 km inclus. Au seuil les deux prix valent 23 €. | 4x + 3 ≤ x + 18, donc x ≤ 5. « Au plus » inclut l’égalité.`,["affine3","graphiques3"]),
T("trigonometrie-angles","G11","Trigonométrie : calculer un angle","Choisir un rapport avec les côtés donnés;Utiliser la fonction inverse;Arrondir et contrôler",
 "Si opposé/adjacent = 3/4, alors l’angle vaut arctan(3/4) ≈ 36,9°.","Identifie le rapport des longueurs connu. Utilise arcsin, arccos ou arctan en mode degrés. Le résultat d’un angle aigu doit être entre 0° et 90°.",
 "*Opposé 4, hypoténuse 8. Calcule l’angle. | 30°. | arcsin(4/8) = 30°.",
 `*On connaît adjacent et hypoténuse. Quel rapport puis quelle touche utiliser ? | Cosinus puis arccos, parfois noté cos⁻¹. | L’inverse de la fonction redonne l’angle.
 *Triangle rectangle : côté adjacent 6 cm, hypoténuse 10 cm. Donne l’angle au dixième. | 53,1°. | arccos(6/10) ≈ 53,130°.
 *Pourquoi 126,9° n’est-il pas un résultat possible ici ? | L’angle cherché est un angle aigu d’un triangle rectangle. | Les deux angles non droits ont ensemble 90°.`,
 `*On connaît opposé et adjacent. Quel rapport permet de retrouver l’angle ? | La tangente puis arctan. | tan(angle) = opposé/adjacent.
 *Un mât de 6 m a une ombre de 8 m sur un sol horizontal. Calcule au dixième l’angle entre le sol et la droite qui relie le sommet du mât à l’extrémité de l’ombre. | 36,9°. | arctan(6/8) ≈ 36,87°.
 *Explique pourquoi cet angle est inférieur à 45° sans calculatrice. | Le côté opposé est plus court que l’adjacent, donc la tangente est inférieure à 1. | À 45°, les deux côtés ont même longueur.`,["trigo3"]),
T("espace","G12","Sections et repérage dans l’espace","Reconnaître une section plane;Relier plusieurs vues;Lire latitude et longitude",
 "Une section de la boule par un plan est un disque. Le disque est de rayon maximal lorsque le plan passe par le centre.","Une section dépend de la direction et de la position du plan. Sur le globe, la latitude mesure l’écart vers le nord ou le sud de l’équateur ; la longitude repère l’est ou l’ouest du méridien de référence.",
 "*Quelle section donne un cylindre droit coupé par un plan parallèle à ses bases ? | Un disque. | La coupe est de même forme que la base.",
 `*Un plan coupe une boule de rayon 5 cm et passe par son centre. Décris la section. | Un disque de rayon 5 cm. | C’est une section de rayon maximal.
 *Un cube est coupé par un plan parallèle à une face. Quelle figure obtient-on si la coupe traverse le cube ? | Un carré de même taille qu’une face. | Les quatre arêtes parallèles qui traversent le plan déterminent les sommets.
 *Que signifie (35° N ; 20° O) pour un point terrestre ? | Latitude 35° nord, longitude 20° ouest. | Le premier repère est lié à l’équateur, le second au méridien de Greenwich.`,
 `*Un plan coupe une boule à 3 cm du centre d’une boule de rayon 5 cm. Calcule le rayon du disque. | 4 cm. | Dans le triangle rectangle de rayon et distance au plan, √(5² − 3²) = 4.
 *Une section axiale d’un cylindre droit de rayon 3 cm et de hauteur 8 cm a quelle forme ? | Un rectangle de 6 cm sur 8 cm. | Le plan contient l’axe et coupe la base sur un diamètre.
 *Deux points ont latitude 0°, mais des longitudes différentes. Où se trouvent-ils ? | Tous les deux sur l’équateur, sur des méridiens différents. | Une latitude nulle ne détermine pas un point unique.`,["sections3","sphere3"]),
T("aires-volumes","G13","Aires, volumes et boule","Distinguer sphère et boule;Calculer un volume exact puis approché;Résoudre avec unités",
 "Une boule de rayon 3 cm a un volume 36π cm³. Sa sphère est la surface qui la délimite.","L’aire d’une sphère vaut 4πr² et le volume de la boule vaut 4πr³/3. Pour un assemblage, ajoute des volumes sans recouvrement ou retire la partie enlevée.",
 "Quel coefficient de π pour le volume d’une boule de rayon 6 cm ? | 288 | 4 × 6³ ÷ 3 = 288.",
 `*Donne l’aire de la sphère de rayon 4 cm. | 64π cm². | 4π × 4² = 64π.
 *Calcule le volume de la boule de rayon 4 cm, exact puis au cm³. | 256π/3 cm³, soit environ 268 cm³. | 4π × 64 ÷ 3 ≈ 268,08.
 *Un pavé de 8 × 5 × 4 cm est creusé de 12 cm³. Donne le volume restant. | 148 cm³. | 8 × 5 × 4 − 12 = 148.`,
 `*Quelle grandeur mesure la surface d’une balle et quelle grandeur mesure son intérieur ? | Aire de la sphère ; volume de la boule. | Les unités sont carrées et cubiques respectivement.
 *Une boule a un diamètre de 10 cm. Donne son volume exact puis au cm³. | 500π/3 cm³, soit environ 524 cm³. | Le rayon est 5 cm, pas 10 cm.
 *Un récipient possède un volume intérieur de 750 cm³. Donne sa capacité en mL. | 750 mL. | 1 cm³ correspond à 1 mL.`,["boule3","airesvolumes3"]),
T("conversions","G14","Conversions de longueurs, aires, volumes et capacités","Convertir longueurs et aires;Convertir volumes et capacités;Appliquer à un problème",
 "1 dm = 10 cm ; 1 dm² = 100 cm² ; 1 dm³ = 1 000 cm³ = 1 L.","Un facteur de conversion de longueur se met au carré pour une aire et au cube pour un volume. Aligne les unités avant de calculer.",
 "Convertis 2,5 m² en cm². | 25000 | Multiplie 2,5 par 100².",
 `Convertis 0,08 m² en cm². | 800 | 0,08 × 10 000 = 800.
 Convertis 1,6 dm³ en mL. | 1600 | 1,6 dm³ = 1,6 L = 1 600 mL.
 *Un bac fait 30 cm sur 20 cm et 15 cm de haut. Quelle capacité en litres ? | 9 L. | 9 000 cm³ = 9 dm³ = 9 L.`,
 `Convertis 120 cm² en dm². | 1,2 | 120 ÷ 100 = 1,2.
 Convertis 0,42 L en cm³. | 420 | 0,42 L = 420 mL = 420 cm³.
 *On répartit 1,5 L dans des flacons de 125 cm³. Combien en faut-il ? | 12 flacons. | 1,5 L = 1 500 cm³ ; 1 500 ÷ 125 = 12.`,["conversions4","airesvolumes3"]),
T("probabilites-composees","O9","Probabilités : deux épreuves","Construire un tableau ou un arbre;Calculer un événement composé;Distinguer avec et sans remise",
 "Dans une urne à 3 rouges et 2 bleues, tirer deux rouges sans remise donne (3/5) × (2/4).","Sur un chemin, multiplie les probabilités successives. Pour un événement réuni par plusieurs chemins incompatibles, additionne. Sans remise, le deuxième tirage dépend du premier.",
 "Une pièce équilibrée est lancée deux fois. Probabilité de deux piles ? | 1/4 | (1/2) × (1/2).",
 `*Construis le tableau des issues pour deux lancers de pièce. | PP, PF, FP, FF. | Deux issues possibles par lancer, quatre issues élémentaires.
 Donne la probabilité d’obtenir exactement une fois pile. | 1/2 | Deux issues sur quatre : PF et FP.
 *Une urne a deux vertes et trois jaunes. Calcule P(deux vertes) avec puis sans remise. | Avec : 4/25 ; sans : 1/10. | (2/5)² ou (2/5) × (1/4).`,
 `*Une urne a 4 rouges et 2 blanches. Dessine le premier niveau puis le niveau après avoir tiré rouge sans remise. | Au départ : 4/6 rouges, 2/6 blanches. Après rouge : 3/5 rouges, 2/5 blanches. | Le total diminue et la couleur tirée perd une bille.
 Probabilité de tirer rouge puis blanc sans remise ? | 4/15 | (4/6) × (2/5).
 *Calcule la probabilité de deux couleurs différentes sans remise. | 8/15. | Additionne rouge-blanc et blanc-rouge, chacune de probabilité 4/15.`,["probabilites3"]),
];


const sixiemeProlongements=[
T("arrondis","N28","Donner une valeur arrondie","Identifier les deux bornes;Choisir la plus proche;Utiliser une valeur approchée",
 "6,247 est entre 6,24 et 6,25 et plus près de 6,25 : son arrondi au centième est 6,25.","Encadre par deux valeurs consécutives au rang demandé. Compare les distances, ou lis le chiffre immédiatement après le rang d’arrondi.",
 "Arrondis 3,864 au centième. | 3,86 | Le chiffre des millièmes est 4.",
 `*Encadre 7,386 par deux dixièmes consécutifs. | 7,3 < 7,386 < 7,4. | Les deux bornes diffèrent de 0,1.
 Quel est l’arrondi de 7,386 au dixième ? | 7,4 | 7,386 est plus près de 7,4 que de 7,3.
 *Une longueur vaut 12,658 m. Donne une valeur au centième et indique sa précision. | Environ 12,66 m, au centième de mètre. | Un centième de mètre vaut un centimètre.`,
 `*Encadre 2,998 par deux centièmes consécutifs. | 2,99 < 2,998 < 3,00. | 3,00 est le centième suivant 2,99.
 Arrondis 2,998 au centième. | 3 | 2,998 est plus près de 3,00 que de 2,99.
 *Une randonnée est mesurée à 5,762 km. Affiche la distance au dixième de km et explique le signe utilisé. | 5,762 km ≈ 5,8 km. | 5,8 est une approximation, pas une égalité.`,["decimaux6"],"complément"),
T("denombrement-optimisation","N43–N44","Dénombrer et chercher le meilleur choix","Lister sans doublon;Organiser et compter;Justifier l’optimalité",
 "Deux couleurs de t-shirts et trois tailles donnent 2 × 3 = 6 modèles. Un tableau évite les oublis.","Pour dénombrer, organise les choix en tableau ou arbre. Pour optimiser, fixe le critère et compare toutes les possibilités pertinentes.",
 "Quatre boissons et trois desserts, un de chaque : combien de choix ? | 12 | 4 × 3 = 12.",
 `*Liste toutes les paires possibles avec un chapeau bleu ou blanc et une écharpe rouge, verte ou grise. | Bleu-rouge, bleu-verte, bleu-grise, blanc-rouge, blanc-verte, blanc-grise. | Pour chaque chapeau, énumère les trois écharpes.
 Avec 5 entrées et 4 plats, combien de menus avec une entrée et un plat ? | 20 | 5 × 4 = 20.
 *Un bus offre 11 places et une voiture 5 places. Il faut transporter 26 personnes avec au plus trois véhicules. Donne une solution qui laisse le moins de places vides. | Deux bus et une voiture : 27 places, une vide. | Un seul bus et deux voitures donnent 21 places ; trois bus donnent 33 places.`,
 `*Liste les nombres à deux chiffres différents faits avec 1, 2 et 4. | 12, 14, 21, 24, 41, 42. | Choisis la dizaine puis une unité différente.
 Avec 3 façons d’aller à la gare et 5 trains possibles après chaque trajet, combien de combinaisons ? | 15 | 3 × 5 = 15.
 *Pour exactement 22 personnes, compare des véhicules de 8 ou de 5 places. Est-il possible de remplir exactement les places ? Justifie. | Il n’existe pas de combinaison exacte. Par exemple, un véhicule de 8 et trois de 5 donneraient 23 places. | Avec 0, 1 ou 2 véhicules de 8, il manque respectivement 22, 14 ou 6 places, aucun multiple de 5.`,["division"],"complément"),
T("modeles-algebriques","N45–N47","Schémas en barres, inconnues et motifs","Traduire une situation par un schéma;Retrouver une quantité inconnue;Prévoir la structure d’un motif",
 "Deux barres de même longueur plus 6 donnent 30. Retire 6, puis partage 24 en deux parts de 12.","Les barres montrent des parts égales et les écarts. Une lettre peut représenter un nombre inconnu ou variable. Pour un motif, sépare ce qui reste fixe et ce qui se répète.",
 "*Lina a 5 jetons de plus que Sam. Ils en ont 23 ensemble. Dessine les barres. | Une barre x, l’autre x + 5 ; Sam en a 9, Lina 14. | Retire 5 au total puis partage 18 en deux.",
 `*Une petite boîte contient une quantité inconnue. Une grande en contient le triple. Fais un schéma si elles contiennent ensemble 32 objets. | Petite barre d’une part ; grande barre de trois parts ; tout de quatre parts. | Les quatre parts ont même longueur.
 *Combien d’objets dans chaque boîte ? | 8 et 24. | 32 ÷ 4 = 8 ; 3 × 8 = 24.
 *Une frise commence par 2 perles et ajoute 4 perles par motif. Donne la règle et la quantité pour 10 motifs. | 2 + 4n ; 42 perles. | 2 est la partie fixe.`,
 `*Deux collections diffèrent de 9 objets et comptent 41 objets ensemble. Dessine les barres. | Deux parts égales et un morceau supplémentaire de 9. | La grande barre a la partie égale plus 9.
 *Calcule le contenu des deux collections. | 16 et 25. | (41 − 9) ÷ 2 = 16.
 *Un escalier décoratif commence à 3 carreaux et gagne 2 carreaux à chaque étape suivante. Donne le nombre à l’étape n puis pour n = 12. | 3 + 2(n − 1), donc 25. | On effectue onze ajouts après la première étape.`,["motifs6"],"complément"),
T("quadrilateres","G21–G24","Polygones et quadrilatères particuliers","Reconnaître et nommer;Construire et coder;Justifier une propriété",
 "Un carré est à la fois un rectangle et un losange. Il possède quatre angles droits et quatre côtés de même longueur.","Décris les figures par leurs propriétés, sans t’appuyer sur l’orientation du dessin. Le rectangle a quatre angles droits. Un losange a quatre côtés de même longueur.",
 "*Décris la différence entre un polygone et un cercle. | Un polygone a un contour fermé formé de segments ; le cercle a un contour courbe. | Cherche des sommets et des côtés droits.",
 `*Un quadrilatère a quatre angles droits et ses côtés mesurent 6, 4, 6, 4 cm dans cet ordre. Nomme-le. | Un rectangle. | Quatre angles droits suffisent ; les côtés ne sont pas tous égaux.
 *Construis un rectangle ABCD de dimensions 6 cm sur 4 cm avec règle et équerre. | Trace AB de 6 cm, les perpendiculaires en A et B, reporte 4 cm du même côté, puis relie les points obtenus. | Code les angles droits.
 *Un triangle a deux côtés de 5 cm et un troisième de 3 cm. Donne sa nature. | Il est isocèle. | Deux côtés sont égaux.`,
 `*Un quadrilatère a quatre côtés égaux sans angle droit. Nomme-le et explique pourquoi il n’est pas un carré. | C’est un losange ; un carré aurait quatre angles droits. | Ne confonds pas côtés égaux et angles droits.
 *Construis un carré de 4 cm de côté. Donne les codes à ajouter. | Quatre côtés portant le même code et quatre angles droits. | Utilise l’équerre à chaque sommet.
 *Un triangle est équilatéral. Quelle mesure a chacun de ses angles ? | 60°. | Les trois angles sont égaux et leur somme vaut 180°.`,["triangle6","droites6"],"complément"),
T("hasard-deux-etapes","O5","Hasard : deux étapes simples","Lister les issues par tableau;Compter les issues favorables;Distinguer ordre et événement",
 "Deux pièces équilibrées donnent quatre couples ordonnés PP, PF, FP, FF. « Un seul pile » correspond à PF et FP.","Écris les résultats possibles de chaque étape, puis associe-les dans un tableau. Si les couples sont équiprobables, leur comptage donne les probabilités.",
 "Deux pièces sont lancées. Combien de couples possibles ? | 4 | Deux choix à la première étape et deux à la seconde.",
 `*Liste les couples de deux lancers de pièce. | PP, PF, FP, FF. | Dans PF, le pile vient en premier.
 Quelle est la probabilité d’obtenir deux piles avec deux pièces équilibrées lancées indépendamment ? | 1/4 | Un couple sur quatre.
 *La probabilité de PF est-elle celle d’un seul pile ? | Non : « un seul pile » comprend PF et FP, donc 1/2. | Ne confonds pas un ordre fixé et un événement comprenant deux ordres.`,
 `*On choisit indépendamment une lettre A ou B et un nombre 1, 2 ou 3, à chaque fois au hasard de manière uniforme. Liste les couples. | A1, A2, A3, B1, B2, B3. | Fais deux lignes de trois.
 Probabilité d’obtenir B avec un nombre pair ? | 1/6 | Seul B2 convient.
 *Compare la probabilité d’obtenir le nombre 2 à celle d’obtenir précisément A2. | Nombre 2 : 1/3 ; A2 : 1/6. | Le nombre 2 concerne A2 et B2.`,["probabilites6"],"complément"),
];
const sixiemeRefs={
  entiers:"N1–N6","premiers-elements":"G1–G3","fractions-partage":"N7–N8",
  operations:"N29–N30 N33–N34 N41–N42",constructions:"G4–G8",decimaux:"N22–N27",
  "fractions-repere":"N9–N11 N13–N15","fractions-calcul":"N12 N16–N17","somme-decimaux":"N31–N34",
  perimetres:"M1–M5",durees:"M10–M13",angles:"G12–G20",triangles:"G24–G27",
  donnees:"O1–O2",aires:"M6–M8","produit-decimaux":"N35–N37","division-euclidienne":"N38–N39",
  "division-decimale":"N40","fraction-quotient":"N19",proportionnalite:"P1–P3",
  probabilites:"O3–O4",symetrie:"G29–G35",mediatrice:"G9–G11 G28","fraction-quantite":"N18",
  pourcentages:"N20–N21",echelles:"P4",espace:"G36–G38 M9",arrondis:"N28",
  "denombrement-optimisation":"N43–N44","modeles-algebriques":"N45–N47",quadrilateres:"G21–G24",
  "hasard-deux-etapes":"O5",
};
function referencesSixieme(chapter){
  const references=sixiemeRefs[chapter.id];
  const refs=references.split(" ").flatMap(group=>{
    const match=/^([A-Z])(\d+)–[A-Z](\d+)$/.exec(group);
    return match?Array.from({length:Number(match[3])-Number(match[2])+1},(_,i)=>match[1]+(Number(match[2])+i)):[group];
  });
  return {...chapter,code:chapter.code===references||chapter.code.endsWith(references)?chapter.code:chapter.code+" · "+references,refs};
}

// Les tableaux suivent l’ordre des items, et non l’ordre d’affichage des objectifs.
const sixiemeSkillOrder={
  "premiers-elements":[[1,2,2],[1,0,2],[0,1,2]],
  "fractions-partage":[[0,1,0]],
  constructions:[[0,2,2],[0,2,1],[0,2,2]],
  "fractions-repere":[[1,0,2]],
  perimetres:[[1,0,2],[1,2,0],[1,2,1]],
  triangles:[[0,2,1]],
  arrondis:[[1]],"denombrement-optimisation":[[1]],
  "modeles-algebriques":[[0]],
};
const troisiemeSkillOrder={
  pythagore:[[1]],"thales-emboite":[[1]],arithmetique:[[1]],
  "pythagore-converse":[[2]],"thales-papillon":[[2]],"fonction-lineaire":[[2]],
  statistiques:[[1]],probabilites:[[1]],"thales-converse":[[2]],
  "trigonometrie-angles":[[1]],"aires-volumes":[[1]],"probabilites-composees":[[1]],
};
function chapterSkillOrder(chapter,order){
  if(!order)return chapter;
  const tag=(items,skills)=>skills?items.map((item,index)=>({...item,skill:skills[index]})):items;
  return {...chapter,practice:tag(chapter.practice,order[0]),
    tests:chapter.tests.map((items,index)=>tag(items,order[index+1]))};
}

const sixiemeAdaptation=T("entiers-adapte","N1–N6 · Parcours accompagné","Nombres entiers avec aides",
 "Repérer les classes;Comparer et encadrer;Lire une graduation régulière",
 "Dans 5 038, le chiffre des milliers est 5. On peut écrire 5 × 1 000 + 0 × 100 + 3 × 10 + 8.",
 "Écris les nombres dans un tableau milliers / centaines / dizaines / unités. Déplace le doigt de gauche à droite pour comparer. Pour placer un nombre, complète les graduations l’une après l’autre.",
 `*Dans 6 042, remplis le tableau milliers, centaines, dizaines, unités. | 6 ; 0 ; 4 ; 2. | Une colonne vide correspond à un zéro.
 *Compare 4 507 et 4 570. Souligne la première différence. | 4 507 < 4 570. | Au rang des dizaines, 0 est inférieur à 7.
 Une droite passe de 600 à 800 en deux intervalles. Donne la graduation du milieu. | 700 | Chaque saut vaut 100.`,
 `*Écris 3 508 en lettres et décompose-le. Aide : M 3, C 5, D 0, U 8. | Trois-mille-cinq-cent-huit. 3 × 1 000 + 5 × 100 + 8. | Ne fais pas apparaître le rang des dizaines dans la somme si son chiffre est nul.
 *Encadre 6 246 par deux centaines consécutives. Aide : garde 6 milliers et 2 centaines pour commencer. | 6 200 < 6 246 < 6 300. | Passe à la centaine suivante pour la borne de droite.
 *Dessine quatre intervalles réguliers entre 1 200 et 2 000. Place 1 800. | Pas de 200. Place le point sur la troisième graduation après 1 200. | Écris d’abord 1 200, 1 400, 1 600, 1 800, 2 000.`,
 `*Écris en chiffres « sept-mille-quarante-deux » puis indique le chiffre des centaines. | 7 042 ; chiffre des centaines : 0. | Le tableau garde le rang des centaines même lorsqu’il est vide.
 *Range 5 819, 5 189 et 5 918 du plus petit au plus grand. | 5 189 < 5 819 < 5 918. | Les milliers sont identiques. Compare ensuite les centaines.
 *Trois intervalles séparent 3 500 et 3 800. Marque la graduation 3 700. | Elle se trouve deux intervalles après 3 500. | Pas : (3 800 − 3 500) ÷ 3 = 100.`,["entiers6"],"Parcours accompagné");

const exerciseSkill=(item,skill)=>({...item,skill});
const sixiemeAdditions={
  "premiers-elements":[
    [exerciseSkill(W("Écris séparément les symboles de la droite passant par A et B, du segment et de sa longueur.","(AB), [AB], AB.","Les parenthèses désignent la droite ; l’absence de crochets désigne la longueur."),0)],
  ],
  "fractions-partage":[
    [exerciseSkill(W("Sur une bande partagée en six parts, représente 8/6 et donne le nombre de bandes entières.","Une bande entière et deux sixièmes de la suivante.","Six sixièmes composent une unité."),2)],
  ],
  constructions:[
    [exerciseSkill(W("Quelle marque ajouter à deux droites perpendiculaires qui se coupent ?","Un petit carré à leur intersection.","Cette marque code l’angle droit."),1)],
    [],
    [exerciseSkill(W("Trace deux droites parallèles et code leur relation sur la figure.","Trace une droite, puis une droite distincte de même direction. Marque le parallélisme par deux flèches identiques.","Une perpendiculaire commune à ces deux droites permet de vérifier leur direction."),1)],
  ],
  perimetres:[
    [],
    [],
    [exerciseSkill(W("On veut peindre un disque puis poser une bordure. À quoi correspondent les deux mesures ?","La peinture concerne la surface du disque, la bordure la longueur du cercle.","La surface s’exprime par exemple en cm² ; la bordure en cm."),0)],
  ],
  arrondis:[
    [exerciseSkill(W("Encadre 5,81 par deux dixièmes consécutifs.","5,8 < 5,81 < 5,9.","Les deux bornes sont distantes d’un dixième."),0),
     exerciseSkill(W("On lit 12,578 kg, mais l’étiquette affiche seulement des centièmes de kg. Que faut-il afficher ?","12,58 kg environ.","Au rang suivant, 8 conduit à arrondir au centième supérieur."),2)],
  ],
  "denombrement-optimisation":[
    [exerciseSkill(W("Liste les codes de deux lettres composés d’un A ou B suivi d’un C ou D.","AC, AD, BC, BD.","Traite tous les suffixes pour chaque première lettre."),0),
     exerciseSkill(W("Pour déplacer 17 personnes, on a des voitures de 4 et des minibus de 7 places. Si on veut utiliser deux minibus, combien de voitures au minimum ?","Une voiture.","Deux minibus donnent 14 places. Une voiture ajoute 4 places et suffit."),2)],
  ],
  "modeles-algebriques":[
    [exerciseSkill(W("Deux sacs identiques et trois billes contiennent ensemble 19 billes. Combien par sac ?","8 billes par sac.","Retire 3 puis partage 16 en deux."),1),
     exerciseSkill(W("Une frise commence avec 4 carreaux et en ajoute 3 à chaque étape. Combien à l’étape 5 ?","16 carreaux.","La première étape vaut 4 ; fais quatre ajouts de 3."),2)],
  ],
  quadrilateres:[
    [exerciseSkill(W("Trace un rectangle de 3 cm sur 7 cm et code les angles.","Quatre angles droits.","L’équerre permet de construire et contrôler chaque angle droit."),1),
     exerciseSkill(W("Pourquoi un carré est-il aussi un losange ?","Ses quatre côtés ont la même longueur.","La condition du losange n’interdit pas les angles droits."),2)],
  ],
  "hasard-deux-etapes":[
    [exerciseSkill(Q("Deux lancers indépendants d’une pièce équilibrée : probabilité d’obtenir deux faces ?","1/4","FF est un couple sur quatre."),1),
     exerciseSkill(W("Les résultats pile puis face et face puis pile sont-ils la même issue ?","Non, ils ont un ordre différent. Ils appartiennent au même événement « un pile et une face ».","Un événement peut réunir plusieurs issues."),2)],
  ],
  "fractions-calcul":[
    [exerciseSkill(Q("Calcule 3 × 2/7.","6/7","Il s’agit de 2/7 + 2/7 + 2/7."),1)],
    [exerciseSkill(Q("On coupe quatre morceaux de 2/5 m. Donne la longueur totale en mètres.","8/5","Multiplie le nombre de cinquièmes par quatre."),1)],
    [exerciseSkill(Q("Calcule 3 × 5/8.","15/8","Trois fois cinq huitièmes donne quinze huitièmes."),1)],
  ],
  "produit-decimaux":[
    [exerciseSkill(Q("Calcule 3,57 × 100.",357,"Chaque chiffre monte de deux rangs."),1)],
    [exerciseSkill(Q("Calcule 75,6 × 0,01.",.756,"Multiplier par un centième revient à diviser par 100."),1)],
    [exerciseSkill(Q("Calcule 31,7 ÷ 1000.",.0317,"Chaque chiffre descend de trois rangs."),1)],
  ],
  "division-euclidienne":[
    [exerciseSkill(W("72 est-il un multiple de 8 ? 8 est-il un diviseur de 72 ?","Oui aux deux.","72 = 8 × 9, donc le reste est nul."),0)],
    [exerciseSkill(W("Explique si 6 divise 88.","Non. 88 = 6 × 14 + 4.","Un diviseur doit donner un reste nul."),0)],
    [exerciseSkill(W("Vérifie si 91 est un multiple de 7.","Oui. 91 = 7 × 13.","Écris le produit qui le prouve."),0)],
  ],
  angles:[
    [exerciseSkill(W("Deux droites se coupent en O. Un angle vaut 128°. Quelle mesure a son opposé par le sommet ?","128°.","Les angles opposés par le sommet sont égaux."),2)],
    [exerciseSkill(W("Construis la bissectrice d’un angle de 76° et donne les deux mesures.","Les deux angles mesurent 38°. Trace à 38° du premier côté.","La bissectrice partage l’angle en deux angles égaux."),1)],
    [exerciseSkill(W("Deux droites se coupent. Un angle vaut 117°. Calcule son adjacent qui complète un angle plat et son opposé par le sommet.","L’adjacent vaut 63° ; l’opposé vaut 117°.","117° + 63° = 180° ; les angles opposés sont égaux."),2)],
  ],
  durees:[
    [exerciseSkill(W("Décris la position des deux aiguilles d’une horloge à 7 h 30.","La grande aiguille est sur 6 et la petite à mi-chemin de 7 et 8.","La petite aiguille avance continûment entre les heures."),2)],
  ],
};
function enrichChapter(chapter,additional){
  if(!additional)return chapter;
  return {...chapter,practice:chapter.practice.concat(additional[0]||[]),
    tests:chapter.tests.map((items,i)=>items.concat(additional[i+1]||[]))};
}

const troisiemePratiques={
  pythagore:`*Dans un triangle MNP rectangle en P, quel est le côté à mettre seul à gauche de l’égalité des carrés ? | MN, l’hypoténuse. | MN est opposé à l’angle droit P.
 *Un rectangle de 9 cm sur 12 cm a une diagonale annoncée de 14 cm. Vérifie et corrige. | Elle mesure 15 cm. | Les angles sont droits et 9² + 12² = 225 ≠ 14².`,
  "proportion-ratios":`*Partage 45 cartes selon le ratio 4:5. | 20 cartes et 25 cartes. | Il y a neuf parts de cinq cartes.
 À l’échelle 1:50 000, combien de kilomètres représentent 3,4 cm ? | 1,7 | 3,4 × 50 000 = 170 000 cm, soit 1,7 km.`,
  fonctions:`*Donne les antécédents de 1 par h(x) = (x − 2)² sur [0 ; 4]. | 1 et 3. | x − 2 vaut −1 ou 1 ; les deux valeurs appartiennent au domaine.
 *Un tableau donne g(0) = 4, g(2) = 3, g(5) = 4 ; le domaine est {0 ; 2 ; 5}. Donne l’image de 2 et tous les antécédents de 4. | L’image de 2 est 3 ; les antécédents de 4 sont 0 et 5. | Lis de l’entrée vers la sortie pour l’image et inversement pour les antécédents.`,
  "thales-emboite":`*Avec M ∈ [AB] et N ∈ [AC], une figure ressemble à deux triangles emboîtés. Quel codage manque pour calculer par Thalès ? | Le parallélisme de (MN) et (BC). | Les alignements sont indiqués, mais l’apparence seule ne garantit pas le parallélisme.
 *M ∈ [AB], N ∈ [AC], (MN) ∥ (BC), AM = 3 cm, AB = 8 cm et BC = 12 cm. Rédige le calcul de MN. | Par Thalès, MN/12 = 3/8 ; MN = 4,5 cm. | Le rapport petite base/grande base correspond à AM/AB.`,
  arithmetique:`*Décompose 210 en facteurs premiers. | 2 × 3 × 5 × 7. | 210 = 21 × 10 et chaque facteur obtenu est premier.
 *Rends 112/168 irréductible en justifiant. | 2/3. | Les deux termes sont divisés par leur PGCD 56.`,
  fractions:`Calcule −7/9 × 3/14. | −1/6 | Simplifie 7 avec 14 et 3 avec 9.
 *Calcule 2/3 − (1/2 ÷ 3/4) et vérifie l’ordre des opérations. | 0. | La division se calcule d’abord et vaut 2/3.`,
  "pythagore-converse":`*Faut-il partir du théorème direct ou de sa réciproque pour prouver qu’un triangle est rectangle à partir des longueurs ? | De sa réciproque, après avoir constaté l’égalité des carrés. | L’angle droit est la conclusion recherchée.
 Calcule 5² + 12² − 13². | 0 | 25 + 144 − 169 = 0.`,
  transformations:`*Un déplacement envoie tous les points 2 carreaux à gauche et 5 vers le haut. Nomme la transformation. | Translation de déplacement (−2 ; 5). | Même direction, sens et longueur pour chaque point.
 *Deux droites sont parallèles. Pourquoi leurs images par rotation le restent-elles ? | Leurs directions tournent du même angle, donc elles restent parallèles. | La rotation conserve les angles entre droites.`,
  "thales-papillon":`*Dessine un papillon où les droites (UV) et (WX) se croisent en I. Place et nomme les bases parallèles. | I entre U et V et entre W et X ; (UW) et (VX) parallèles. | Construis d’abord les deux sécantes puis une parallèle à la première base.
 *Quels côtés se correspondent dans les triangles IUW et IVX ? | IU avec IV, IW avec IX, UW avec VX. | Deux côtés homologues partent de I sur la même sécante ou appartiennent aux parallèles.`,
  vitesse:`Convertis 54 km/h en m/s. | 15 | 54 ÷ 3,6 = 15.
 *Un cycliste fait 9 km en 30 min, puis 9 km en 45 min. Calcule sa vitesse moyenne. | 14,4 km/h. | Distance totale 18 km et durée totale 1,25 h ; 18 ÷ 1,25 = 14,4.`,
  "pourcentages-evolution":`Après une hausse de 25 %, le prix est de 75 €. Donne le prix initial. | 60 | 75 ÷ 1,25 = 60.
 *Une population augmente de 20 %, puis diminue de 10 %. Calcule l’évolution totale. | Une hausse de 8 %. | 1,20 × 0,90 = 1,08.`,
  "fonction-lineaire":`*Une photocopieuse débite 15 pages en 3 min. Donne le nombre de pages après t minutes à débit constant. | p(t) = 5t. | 15 ÷ 3 donne le débit en pages par minute.
 *Le graphique de f est une droite passant par O et (6 ; 9). Donne f et complète pour x = 4. | f(x) = 1,5x ; f(4) = 6. | Le coefficient se lit 9 ÷ 6.`,
  statistiques:`Sur 80 mesures, 18 appartiennent à la première classe. Donne sa fréquence. | 0,225 | 18 ÷ 80 = 0,225, soit 22,5 %.
 *On relève les effectifs 4, 10, 6 pour trois classes de même largeur. Quelles hauteurs choisir dans l’histogramme avec un pas d’une unité ? | 4, 10 et 6 unités. | Les bases sont de même largeur ; les hauteurs sont proportionnelles aux effectifs.`,
  "trigonometrie-longueurs":`*On connaît l’angle aigu et la longueur de l’hypoténuse. On cherche le côté adjacent. Quel rapport donne la relation directe ? | Le cosinus. | cos(angle) = adjacent/hypoténuse.
 *Une échelle de 4 m fait un angle de 55° avec le sol. Calcule au centième la distance horizontale entre son pied et le mur. | Environ 2,29 m. | 4 × cos(55°) ≈ 2,2943 m.`,
  puissances:`*Écris 0,00672 en notation scientifique. | 6,72 × 10⁻³. | Le coefficient doit être entre 1 et 10.
 *Compare 8,5 × 10³ et 1,3 × 10⁴. | 8,5 × 10³ < 1,3 × 10⁴. | Dans la même puissance de dix, 8,5 × 10³ < 13 × 10³.`,
  probabilites:`*Liste les issues de l’événement « obtenir au plus 2 » sur un dé numéroté de 1 à 6. | 1 et 2. | La valeur 2 est incluse.
 *Une simulation de 50 lancers donne 8 six. Compare la fréquence à la probabilité d’un dé équilibré. | Fréquence 0,16 ; probabilité 1/6, soit environ 0,167. | Les deux valeurs sont proches sans être égales.`,
  "thales-converse":`*A, B, M sont alignés dans cet ordre et A, N, C le sont dans cet ordre. M et N occupent-ils la même position relative pour appliquer directement la réciproque ? | Non, M est au-delà de B alors que N est entre A et C. | Il faut vérifier que les points sont placés dans le même ordre sur les deux sécantes.
 *Compare 7/12 et 14/25 à l’aide de produits en croix. | 7/12 > 14/25. | 7 × 25 = 175 et 14 × 12 = 168.`,
  agrandissements:`Une aire de 18 cm² est agrandie au rapport 3. Donne l’aire obtenue. | 162 | 18 × 3² = 162.
 Un volume de 216 cm³ est réduit au rapport 1/3. Donne le nouveau volume. | 8 | 216 × (1/3)³ = 216 ÷ 27.`,
  "triangles-semblables":`*Deux triangles ont chacun un angle de 40° et un de 75°. Sont-ils semblables ? | Oui. Le troisième angle vaut 65° dans les deux triangles. | Deux paires d’angles égaux suffisent.
 Deux triangles semblables ont un rapport d’agrandissement 2,4. Un côté du petit triangle vaut 3,5 cm. Donne le correspondant en cm. | 8,4 | 3,5 × 2,4 = 8,4.`,
  homotheties:`*Une homothétie de centre O envoie M à mi-distance de O, du même côté que M. Donne son rapport. | 1/2. | Même côté donc rapport positif, distance divisée par deux.
 *Une homothétie de rapport −3 transforme une figure d’aire 7 cm². Donne l’aire de l’image et l’image d’un angle de 52°. | 63 cm² et 52°. | L’aire est multipliée par 3² ; les angles sont conservés.`,
  "comparaison-affine":`Trouve l’abscisse du croisement de y = 2x + 8 et y = 5x − 4. | 4 | Résous 2x + 8 = 5x − 4.
 *Pour quels x réels la droite y = 2x + 8 est-elle strictement en dessous de y = 5x − 4 ? | x > 4. | 2x + 8 < 5x − 4 équivaut à 12 < 3x.`,
  "trigonometrie-angles":`*Dans un triangle rectangle, tu connais les longueurs des deux côtés de l’angle droit. Quel rapport permet de chercher un angle aigu ? | Opposé sur adjacent, la tangente. | Ce rapport utilise directement les deux côtés connus.
 *Un rapport opposé/adjacent vaut 1,2. Sans calculatrice, l’angle est-il inférieur ou supérieur à 45° ? | Supérieur. | La tangente est croissante entre 0° et 90° et vaut 1 à 45°.`,
  espace:`*Décris le contour de la vue de dessus et de face d’un cylindre droit posé sur une base, en projection orthogonale. | Dessus : un cercle. Face : un rectangle de largeur égale au diamètre et de hauteur égale à la hauteur du cylindre. | Les deux vues correspondent à des directions perpendiculaires.
 *Que signifie 12° S et 77° O ? | Latitude 12° sud, longitude 77° ouest. | Sud par rapport à l’équateur, ouest par rapport au méridien de référence.`,
  "aires-volumes":`*Pour une orange idéalisée comme une boule, à quoi correspondent la surface extérieure et la partie à l’intérieur ? | La surface extérieure est la sphère ; l’ensemble intérieur avec sa frontière est la boule. | L’aire mesure une surface et le volume une portion d’espace.
 *Un réservoir de 2 400 cm³ contient déjà 1,7 L. Quelle capacité libre en mL ? | 700 mL. | 2 400 cm³ = 2 400 mL et 1,7 L = 1 700 mL.`,
  conversions:`Convertis 0,75 m³ en litres. | 750 | 0,75 m³ = 750 dm³ = 750 L.
 *Une boîte de base 2 dm sur 3 dm et de hauteur 5 cm est remplie d’eau. Donne son volume en litres. | 3 L. | 5 cm = 0,5 dm et 2 × 3 × 0,5 = 3 dm³.`,
  "probabilites-composees":`*Construis le tableau des couples possibles avec deux dés dont on ne note que la parité. | PP, PI, IP, II, où P veut dire pair et I impair. | Deux lignes et deux colonnes. Pour des dés équilibrés, les quatre couples sont équiprobables.
 *Une urne contient trois noires et une blanche. Compare deux tirages de blanches avec et sans remise. | Avec remise 1/16 ; sans remise 0. | Après la première blanche, aucune blanche ne reste si on ne la remet pas.`,
};
function enrichTroisieme(chapter){
  const practice=chapterSkillOrder(chapter,troisiemeSkillOrder[chapter.id]).practice;
  const missing=chapter.skills.map((_,index)=>index).filter(index=>!practice.some(item=>item.skill===index));
  const additional=decodeChapterItems(troisiemePratiques[chapter.id]).map((item,index)=>exerciseSkill(item,missing[index]));
  return {...chapter,practice:practice.concat(additional).sort((a,b)=>a.skill-b.skill)};
}

export const chapters={
  "6e":[...classeSixieme,...sixiemeProlongements].map(chapter=>
    enrichChapter(chapterSkillOrder(referencesSixieme(chapter),sixiemeSkillOrder[chapter.id]),sixiemeAdditions[chapter.id])
  ).concat(chapters6Bilans,{...sixiemeAdaptation,refs:["N1","N2","N3","N4","N5","N6"]}),
  "5e":chapters5,
  "4e":chapters4,
  "3e":[...classeTroisieme.map(enrichTroisieme),...chapters3Algebre,...chapters3Bilans],
};
