// Questions de transfert et de représentation, en complément des calculs générés.
const choose = (prompt, options, answer, explain, hint) => ({kind:"choice",prompt,options,answer,explain,hint});
const fraction = (prompt, answer, explain, irreducible=false) => ({kind:"fraction",prompt,answer,explain,irreducible,hint:"Repère le numérateur et le dénominateur. Tu peux saisir une fraction comme 3/4."});
const order = (prompt, options, answer, explain) => ({kind:"order",prompt,options,answer,explain,hint:"Repère l’étape de départ, puis ce qui doit être fait avant la conclusion."});
const point = (prompt, answer, explain, given=[]) => ({kind:"point",prompt,answer,explain,given,hint:"Lis d’abord l’abscisse sur l’axe horizontal, puis l’ordonnée sur l’axe vertical."});
const chart = (prompt, values, answer, explain) => ({kind:"number",prompt,values,answer,explain,hint:"Repère la barre demandée et lis le niveau atteint sur l’axe vertical."});

export const assessment = {
  decimaux6:[
    order("Range ces nombres dans l’ordre croissant.",["4,12","4,2","4,021"],[2,0,1],"Écris-les avec trois chiffres après la virgule : 4,021 < 4,120 < 4,200."),
    choose("Quel est l’arrondi au dixième de 7,46 ?",["7,4","7,5","7,46"],1,"Le chiffre des centièmes est 6. Le chiffre des dixièmes augmente d’une unité.","Repère d’abord le chiffre qui suit les dixièmes."),
  ],
  operations6:[choose("Sans poser le calcul, quel ordre de grandeur convient à 19,8 × 5,1 ?",["10","100","1 000"],1,"19,8 est proche de 20 et 5,1 est proche de 5. Le produit est proche de 100.","Arrondis chaque facteur à un entier facile à multiplier.")],
  fractions6:[fraction("Écris 3/4 + 1/8 sous la forme d’une fraction.",[7,8],"Trois quarts valent six huitièmes. Ajouter un huitième donne 7/8.")],
  quotient6:[fraction("Trois mètres sont partagés en quatre longueurs égales. Donne la longueur exacte d’une part, en mètres.",[3,4],"On partage 3 par 4 : une part mesure 3/4 m.")],
  division:[choose("47 élèves montent dans des minibus de 8 places. Quelle égalité justifie qu’il faut prévoir six véhicules ?",["47 = 8 × 5 + 7","47 = 8 × 6 + 1","47 = 8 × 4 + 15"],0,"Cinq minibus sont pleins. Les sept élèves restants ont besoin d’un sixième véhicule.","Dans une division euclidienne, le reste est inférieur au diviseur.")],
  motifs6:[choose("Une frise commence par deux perles, puis chaque motif en ajoute trois. Quelle formule donne le nombre de perles pour n motifs ?",["2n + 3","3n + 2","5n"],1,"Les n motifs apportent 3n perles. Les deux perles de départ sont comptées une seule fois.","Sépare la partie fixe de la partie répétée.")],
  aires6:[choose("Un rectangle de 3 cm sur 8 cm a une aire de 24 cm². Quel autre rectangle a la même aire ?",["4 cm sur 5 cm","2 cm sur 12 cm","3 cm sur 9 cm"],1,"2 × 12 = 24. Les deux rectangles peuvent avoir la même aire et des périmètres différents.","Compare les produits des dimensions.")],
  durees6:[choose("Un trajet commence à 9 h 45 et dure 35 minutes. À quelle heure se termine-t-il ?",["9 h 80","10 h 15","10 h 20"],2,"Quinze minutes mènent à 10 h, puis il reste vingt minutes.","Passe d’abord par l’heure pleine.")],
  bissectrice6:[order("Ordonne les étapes pour construire le cercle circonscrit à ABC.",["Tracer le cercle centré en O passant par A","Tracer les médiatrices de [AB] et [AC]","Nommer O leur point d’intersection"],[1,2,0],"O est à égale distance de A, B et C, donc le cercle de centre O passant par A passe aussi par B et C.")],
  symetrie6:[point("Place l’image du point A(−2 ; 1) par symétrie par rapport à l’axe vertical.",[2,1],"Les deux points ont la même ordonnée et sont à deux unités de l’axe, de part et d’autre.",[["A",-2,1]])],
  triangle6:[order("Sur le cahier, on veut construire un triangle de côtés AB = 5 cm, AC = 4 cm et BC = 3 cm. Remets les étapes dans l’ordre.",["Relier C à A et à B","Tracer [AB] de 5 cm","Placer C à l’intersection des arcs de centres A et B et de rayons 4 cm et 3 cm"],[1,2,0],"Les arcs imposent les deux distances à A et à B.")],
  solides6:[chart("Chaque barre représente la hauteur d’une pile de cubes. Combien de cubes se trouvent dans les trois piles ?",[["A",2],["B",4],["C",3]],9,"Les hauteurs des piles sont 2, 4 et 3. Leur somme vaut 9.")],
  donnees6:[chart("Le diagramme donne le nombre de bateaux par jour. Combien en compte-t-on mardi ?",[["Lun.",3],["Mar.",6],["Mer.",4]],6,"La barre du mardi atteint la graduation 6.")],
  probabilites6:[choose("La probabilité de tirer rouge vaut 1/2. Sur dix tirages avec remise, on a obtenu trois rouges. Quelle conclusion est justifiée ?",["La probabilité vaut maintenant 3/10.","Le résultat est possible même si la probabilité vaut 1/2.","Il doit y avoir exactement cinq rouges."],1,"La fréquence observée est 3/10. Une petite série n’a pas toujours la même fréquence que la probabilité.","Distingue la fréquence constatée et la probabilité calculée.")],
  proportion6:[choose("Quel tarif correspond à une situation proportionnelle ?",["3 € par billet avec 2 € de réservation","3 € par billet, sans frais fixes","6 € pour chaque commande, quel que soit le nombre de billets"],1,"Sans frais fixes, le prix total est le nombre de billets multiplié par 3.","Vérifie ce qui se passe quand on double la quantité.")],
  code6:[order("Le robot doit tracer un L en allant d’abord de 3 cases vers l’est, puis de 2 vers le nord.",["Avancer de 2 cases","Tourner à gauche","Avancer de 3 cases"],[2,1,0],"En partant vers l’est, tourner à gauche oriente le robot vers le nord.")],
  fractionsop5:[fraction("Calcule 5/6 − 1/4. Donne le résultat sous forme de fraction.",[7,12],"5/6 vaut 10/12 et 1/4 vaut 3/12. La différence vaut 7/12.")],
  sommes5:[choose("Quelle expression est égale à 4 − (−7) ?",["4 + 7","4 − 7","−4 − 7"],0,"Soustraire −7 revient à ajouter son opposé, +7.","Cherche l’opposé du nombre soustrait.")],
  inconnue5:[choose("Quelle valeur est un contre-exemple à l’affirmation « n + 3 = 2n pour tout n » ?",["3","5","Les deux"],1,"Pour n = 5, on obtient 8 à gauche et 10 à droite. Pour n = 3, l’égalité est vraie.","Calcule les deux membres pour chaque valeur proposée.")],
  coordonnees5:[point("Place B(−2 ; 3) dans le repère.",[-2,3],"On avance de deux unités à gauche et de trois unités vers le haut.")],
  symetrie5:[point("Place l’image de A(2 ; −1) par symétrie centrale de centre O(0 ; 0).",[-2,1],"Les deux coordonnées changent de signe. O est le milieu de [AA′].",[["A",2,-1]])],
  trianglescotes5:[choose("Quels côtés permettent de construire un triangle non aplati ?",["2, 3 et 5 cm","3, 4 et 6 cm","2, 3 et 7 cm"],1,"6 < 3 + 4. Dans le premier cas, le triangle serait aplati. Le troisième est impossible.","Compare le plus grand côté à la somme des deux autres.")],
  parallelogramme5:[choose("Quel critère suffit pour prouver qu’un quadrilatère est un parallélogramme ?",["Ses diagonales ont la même longueur.","Ses diagonales se coupent en leur milieu.","Il a un angle droit."],1,"Des diagonales de même milieu suffisent à établir que le quadrilatère est un parallélogramme.","Distingue une propriété suffisante d’une propriété qui peut aussi être vraie pour d’autres quadrilatères.")],
  espace5:[choose("Pour réaliser le patron d’un cylindre droit, quelles surfaces faut-il ?",["Deux disques et un rectangle","Deux triangles et trois rectangles","Un disque et un triangle"],0,"Les disques forment les bases. La surface latérale déroulée donne un rectangle.","Imagine la surface latérale déroulée à plat.")],
  statistiques5:[chart("Quel est l’effectif total représenté par le diagramme ?",[["Voile",4],["Kayak",5],["Surf",3]],12,"On additionne les trois effectifs : 4 + 5 + 3 = 12.")],
  probabilites5:[fraction("Un dé équilibré est lancé. Donne la probabilité d’obtenir un nombre strictement supérieur à 4.",[1,3],"Les valeurs 5 et 6 sont favorables. La probabilité vaut 2/6, soit 1/3.")],
  dependance5:[choose("Une droite représentant un tarif passe par (0 ; 4) et (2 ; 8). Le prix est-il proportionnel au nombre de billets ?",["Oui, car les points sont alignés.","Non, car la droite ne passe pas par l’origine.","Oui, car le prix double toujours."],1,"Une situation proportionnelle se représente par une droite passant par l’origine.","Vérifie le prix pour zéro billet.")],
  code5:[order("Ordonne les blocs pour partir de 0, avancer trois fois de 2 cases, puis annoncer la position.",["Afficher la position","Mettre la position à 0","Répéter 3 fois : avancer de 2"],[1,2,0],"On initialise la position, on exécute la boucle, puis on affiche le résultat.")],
  premiers4:[choose("Quelle écriture est une décomposition de 84 en facteurs premiers ?",["4 × 21","2 × 2 × 3 × 7","2 × 6 × 7"],1,"Le produit vaut 84 et chacun de ses facteurs est premier.","Vérifie à la fois le produit et la nature des facteurs.")],
  fractions4:[fraction("Calcule (−3/5) × (10/9). Donne une fraction égale au résultat.",[-2,3],"Le produit vaut −30/45, ce qui se simplifie en −2/3.")],
  developper4:[choose("Quelle expression est une factorisation de 6x + 9 ?",["3(2x + 3)","6(x + 9)","3(2x + 9)"],0,"Distribuer 3 redonne 6x + 9.","Cherche un facteur commun aux deux termes.")],
  equations4:[order("Remets dans l’ordre les étapes pour résoudre 3x + 4 = 19.",["Diviser les deux membres par 3","Soustraire 4 aux deux membres","Vérifier que 3 × 5 + 4 = 19"],[1,0,2],"On obtient 3x = 15, puis x = 5. La substitution vérifie la solution.")],
  pythagore:[choose("Dans un triangle ABC rectangle en B, quelle égalité est valable ?",["AB² = AC² + BC²","AC² = AB² + BC²","BC² = AB² + AC²"],1,"AC est opposé à l’angle droit : c’est l’hypoténuse.","Repère le côté opposé à l’angle droit.")],
  thales4:[choose("Dans un triangle ABC, M appartient à [AB] et N à [AC]. Quelles données permettent d’utiliser le théorème de Thalès pour écrire AM/AB = AN/AC ?",["MN et BC sont parallèles.","MN et AB sont perpendiculaires.","AM et AN sont égales."],0,"L’alignement est donné et le parallélisme de MN et BC permet d’appliquer le théorème.","Cherche une condition sur les deux droites qui coupent les côtés.")],
  translation4:[point("Place l’image de A(−2 ; 1) par la translation de 3 unités vers la droite et 2 vers le bas.",[1,-1],"On ajoute 3 à l’abscisse et on retire 2 à l’ordonnée.",[["A",-2,1]])],
  statistiques4:[choose("On ajoute une valeur très élevée à la série 4, 4, 4, 5, 5. Quel indicateur change le plus ?",["La moyenne","La médiane","Les deux changent autant"],0,"La médiane passe de 4 à 4,5, tandis que la moyenne est très sensible à la valeur extrême.","Pense à la façon dont chaque indicateur utilise les valeurs.")],
  tableur4:[choose("Quelle formule calcule la moyenne des cellules A2 à A6 dans un tableur configuré en français ?",["=MOYENNE(A2:A6)","=SOMME(A2:A6)","MOYENNE(A2+A6)"],0,"MOYENNE calcule la moyenne de la plage continue A2:A6.","Repère la fonction et la notation de la plage.")],
  code4:[choose("Le compteur commence à 0. Dans une boucle de cinq tours, quelle instruction doit être dans la boucle pour terminer à 10 ?",["Mettre le compteur à 2","Ajouter 2 au compteur","Afficher 10 sans modifier le compteur"],1,"Ajouter 2 à chaque tour accumule les valeurs. Mettre à 2 écrase la valeur précédente.","Distingue affecter une valeur et ajouter à la valeur existante.")],
  arithmetique3:[fraction("Écris 18/24 sous forme irréductible.",[3,4],"18 et 24 ont pour plus grand diviseur commun 6. La fraction réduite est 3/4.",true)],
  produits3:[choose("Quelles sont toutes les solutions de (x − 4)(x + 2) = 0 ?",["4 et 2","−4 et −2","4 et −2"],2,"Le premier facteur s’annule pour 4, le second pour −2.","Résous une équation pour chaque facteur.")],
  thales3:[choose("Deux triangles ont leurs côtés de longueurs 3, 4, 5 et 6, 8, 10. Quelle conclusion peut-on justifier ?",["Ils sont égaux.","Ils sont semblables avec un rapport 2.","Ils ne sont ni égaux ni semblables."],1,"Les trois rapports sont égaux à 2. Les côtés correspondants sont proportionnels.","Compare les longueurs correspondantes dans le même ordre.")],
  transformations3:[point("Place l’image de A(1 ; −1) par l’homothétie de centre O et de rapport −2.",[-2,2],"Le rapport −2 place l’image de l’autre côté de O à deux fois la distance.",[["A",1,-1]])],
  trigo3:[choose("Dans un triangle rectangle, on connaît les côtés opposé et adjacent à un angle. Quel rapport calcule-t-on directement ?",["Sinus","Cosinus","Tangente"],2,"La tangente est le quotient opposé ÷ adjacent.","L’hypoténuse n’intervient dans aucun des deux côtés connus.")],
  affine3:[choose("La droite passe par (0 ; 3) et (2 ; 7). Quelle est son expression ?",["f(x) = 2x + 3","f(x) = 3x + 2","f(x) = 7x + 3"],0,"Le terme constant est 3. Quand x augmente de 2, f augmente de 4, donc le coefficient directeur vaut 2.","Lis d’abord la valeur pour x = 0.")],
  probabilites3:[fraction("On tire deux fois avec remise dans une urne contenant autant de rouges que de bleus. Quelle est la probabilité de tirer deux rouges ?",[1,4],"La remise permet deux tirages indépendants. On multiplie 1/2 × 1/2.")],
  simulation3:[choose("Quelle procédure simule 100 lancers d’une pièce équilibrée ?",["Choisir pile ou face une fois et recopier le résultat 100 fois.","Tirer indépendamment 100 nombres de 1 à 2, compter les 1 et diviser par 100.","Alterner pile et face exactement 100 fois."],1,"La deuxième procédure reproduit l’aléa et l’indépendance à chaque lancer.","Chaque lancer doit être un nouveau tirage.")],
  code3:[order("Ordonne les blocs pour simuler une fréquence.",["Afficher compteur ÷ 100","Mettre compteur à 0","Répéter 100 fois : tirer au hasard ; si réussite, ajouter 1"],[1,2,0],"On initialise, on simule et compte, puis on calcule la fréquence.")],
};

export const writtenPractice = {
  triangle6:["Construis sur papier un triangle ABC tel que AB = 5 cm, AC = 4 cm et BC = 3 cm. Laisse les traits de construction.","Trace [AB] de 5 cm. Trace un arc de centre A et de rayon 4 cm puis un arc de centre B et de rayon 3 cm. Leur intersection donne C. Relie C à A et à B.","Les trois longueurs sont contrôlées. Les arcs de construction sont visibles."],
  bissectrice6:["Construis le cercle circonscrit à un triangle quelconque. Explique pourquoi il passe par les trois sommets.","Construis deux médiatrices. Leur intersection O est à la même distance des trois sommets. Trace le cercle de centre O et de rayon OA.","Les médiatrices sont perpendiculaires aux segments en leur milieu. La justification mobilise l’équidistance."],
  donnees6:["Représente en bâtons les données suivantes : lundi 3, mardi 6, mercredi 4.","Écris les jours sur l’axe horizontal. Choisis une graduation régulière sur l’axe vertical. Dessine les trois bâtons de hauteurs 3, 6 et 4.","Les axes et l’unité sont indiqués. Les hauteurs correspondent aux effectifs."],
  parallelogramme5:["ABCD a ses diagonales qui se coupent en leur milieu. Rédige une justification de sa nature.","Les diagonales [AC] et [BD] ont le même milieu. Or un quadrilatère dont les diagonales se coupent en leur milieu est un parallélogramme. Donc ABCD est un parallélogramme.","Les données, le critère et la conclusion sont distingués."],
  statistiques5:["Réalise au tableur un diagramme avec les effectifs 4, 5 et 3. Explique pourquoi un diagramme en barres convient.","Saisis les catégories et leurs effectifs dans deux colonnes, sélectionne-les, puis insère un diagramme en barres. Les longueurs des barres facilitent la comparaison.","Les catégories sont nommées. L’échelle est régulière. Le choix du graphique est justifié."],
  pythagore:["ABC est rectangle en A, AB = 6 cm et AC = 8 cm. Rédige le calcul de BC.","Le triangle ABC est rectangle en A. D’après Pythagore, BC² = AB² + AC² = 36 + 64 = 100. BC est une longueur positive, donc BC = 10 cm.","L’angle droit et l’hypoténuse sont identifiés. Le théorème est cité. L’unité figure dans la conclusion."],
  thales4:["Dans ABC, M est sur [AB], N sur [AC] et MN est parallèle à BC. AM = 3, AB = 5 et AC = 10 cm. Rédige le calcul de AN.","Les points sont alignés dans l’ordre indiqué et (MN) est parallèle à (BC). D’après Thalès, AM/AB = AN/AC, donc AN = 10 × 3/5 = 6 cm.","Alignements, parallélisme et côtés correspondants sont indiqués."],
  affine3:["Trace la représentation de f(x) = 2x + 3 et explique le rôle des deux coefficients.","Place (0 ; 3) et (1 ; 5) puis trace la droite qui les relie. 3 est l’ordonnée à l’origine. Une augmentation de 1 en abscisse donne une hausse de 2 en ordonnée.","Deux points exacts sont placés. Les coefficients sont interprétés."],
  simulation3:["Écris puis exécute un programme par blocs simulant 100 lancers. Compare la fréquence obtenue à 1/2.","Initialise le compteur à zéro. Répète 100 fois : tire 1 ou 2 au hasard et ajoute 1 au compteur si le tirage vaut 1. Affiche compteur ÷ 100. Relance pour comparer les résultats.","Le tirage est dans la boucle. Le compteur est initialisé. La fréquence et la probabilité sont distinguées."],
  trigo3:["Une rampe forme un angle de 12° avec l’horizontale et mesure 5 m. Explique comment calculer sa hauteur puis donne un arrondi au centième.","La rampe est l’hypoténuse. Dans le triangle rectangle, sin(12°) = hauteur/5. La hauteur vaut 5 × sin(12°), soit environ 1,04 m.","Le rapport choisi est justifié. La calculatrice est en degrés. L’arrondi et l’unité sont indiqués."],
};

assessment.pourcentages6=[choose("Quelle écriture représente 25 % ?",["0,25","2,5","1/25"],0,"25 % vaut 25/100, soit 0,25 ou 1/4.","Un pourcentage se lit « sur cent ».")];
assessment.disque6=[choose("Quel calcul donne le périmètre d’une figure constituée d’un demi-disque de rayon 4 cm, diamètre compris ?",["4π","4π + 8","8π + 4"],1,"Le contour comprend l’arc de longueur 4π et le diamètre de longueur 8.","Repère les deux parties du contour.")];
assessment.cylindre5=[choose("Si on double la hauteur d’un cylindre sans changer son rayon, que devient son volume ?",["Il double.","Il quadruple.","Il reste identique."],0,"L’aire de la base reste fixe. Le volume est proportionnel à la hauteur.","Identifie la grandeur qui change dans πr²h.")];
assessment.airesunites6=[choose("Pourquoi 1 m² vaut-il 10 000 cm² ?",["Parce qu’un mètre contient 100 cm.","Parce qu’un carré de côté 1 m contient 100 lignes de 100 carrés de 1 cm².","Parce qu’une aire a toujours quatre chiffres."],1,"Les deux côtés du carré sont convertis en centimètres : 100 × 100 = 10 000.","Compte les carreaux dans les deux dimensions.")];
assessment.affine3.push({
  ...choose("Lis sur le graphique l’ordonnée à l’origine de la droite.",["1","2","3"],1,"La droite coupe l’axe des ordonnées au niveau 2. C’est la valeur de f(0).","Cherche le point où la droite coupe l’axe vertical."),
  graph:{points:[[0,2],[4,6]]},
});
assessment.graphique4=[{
  kind:"number",prompt:"Lis sur la droite la valeur correspondant à l’abscisse 3.",answer:5,
  explain:"On part de 3 sur l’axe horizontal. Le point de la droite est à la hauteur 5.",hint:"Monte depuis 3 jusqu’à la droite, puis lis l’ordonnée.",
  graph:{points:[[0,2],[4,6]]},
}];
assessment.graphiques3=[{
  ...choose("À quelle abscisse les deux droites se coupent-elles ?",["1","2","4"],1,"Les deux droites se coupent au point (2 ; 4). Son abscisse vaut 2.","Repère leur intersection, puis lis l’axe horizontal."),
  graph:{points:[[0,0],[3,6]],second:[[0,2],[4,6]]},
}];

assessment.donnees6.push({
  kind:"bars",prompt:"Construis le diagramme : 2 bateaux lundi, 5 mardi et 3 mercredi.",
  labels:["Lun.","Mar.","Mer."],max:6,answer:[2,5,3],
  explain:"Les trois bâtons ont pour hauteurs 2, 5 et 3. Leur échelle est commune.",
  hint:"Règle chaque bâton sur l’effectif du jour correspondant.",
});
assessment.statistiques5.push({
  kind:"bars",prompt:"Sur 12 élèves, 6 choisissent la voile, 4 le kayak et les autres le surf. Construis le diagramme.",
  labels:["Voile","Kayak","Surf"],max:8,answer:[6,4,2],
  explain:"Le surf représente 12 − 6 − 4 = 2 élèves. Les hauteurs sont 6, 4 et 2.",
  hint:"Calcule l’effectif du surf avant de régler sa barre.",
});

Object.assign(writtenPractice,{
  symetrie6:["Trace sur papier uni une droite d et un triangle ABC dont aucun sommet ne touche d. Construis A′B′C′, son symétrique par rapport à d.","Pour chaque sommet, trace la perpendiculaire à d et reporte la même distance de l’autre côté. Relie les images des sommets dans le même ordre.","La droite d est la médiatrice de [AA′], [BB′] et [CC′]. Les longueurs et les angles sont conservés."],
  espace5:["Dessine le patron d’un cylindre de rayon 2 cm et de hauteur 5 cm. Indique les dimensions de la surface latérale.","Les deux bases sont des disques de rayon 2 cm. Déroulée, la surface latérale est un rectangle de côtés 5 cm et 4π cm, soit environ 12,57 cm pour la longueur.","Le rayon des deux bases est identique. La longueur du rectangle est celle du cercle de base."],
  espace4:["Pour une pyramide régulière à base carrée, esquisse une vue en perspective et un patron. Indique les faces qui se rejoignent au sommet.","Représente un carré et un sommet au-dessus de son centre. Pour le patron, accole quatre triangles isocèles identiques aux quatre côtés du carré.","Le patron a cinq faces. Les arêtes latérales qui se rejoignent ont la même longueur."],
  statistiques3:["Sur 20 inscrits, 5 font de la voile, 8 du kayak et 7 du surf. Construis un diagramme circulaire.","Les angles des trois secteurs sont 90°, 144° et 126° car chaque élève représente 360° ÷ 20 = 18°. Trace les secteurs, puis ajoute une légende.","La somme des angles est 360°. Les secteurs sont proportionnels aux effectifs. La légende est complète."],
  code4:["Écris un programme qui demande un entier positif n, calcule 1 + 2 + … + n et affiche la somme. Teste-le pour 1, 3 et 5.","Initialise somme à 0 et compteur à 1. Répète n fois : ajoute compteur à somme puis augmente compteur de 1. Affiche somme. Les trois résultats attendus sont 1, 6 et 15.","Le compteur et la somme sont initialisés. L’affichage se fait après la boucle. Les trois tests passent."],
  transformations3:["Trace un triangle ABC dans un quadrillage. Construis son image par une homothétie de centre O et de rapport −2, puis explique où se trouvent les images des sommets.","Pour chaque sommet P, trace (OP). Place P′ sur cette droite de l’autre côté de O avec OP′ = 2 × OP. Relie les sommets images.","L’alignement, le changement de côté et le doublement des distances au centre sont visibles."],
});

export const tariffValues = (distance, fee=4) => [3*distance,2*distance+fee];

export function tariffQuestions(seed, level, version=2) {
  const fee=version>=4?2+(seed%6):3+(seed%3);
  const [a,b]=tariffValues(fee,fee);
  const near=fee-1, far=fee+2;
  const graph={fee};
  return [
    {prompt:`D’après le graphique, combien coûte le trajet avec Alizé pour ${near} km ?`,answer:3*near,
      explain:`À ${near} km, on monte jusqu’à la droite Alizé puis on lit ${3*near} € sur l’axe vertical.`,
      hint:"Pars de la distance sur l’axe horizontal.",comparison:graph},
    {prompt:"À quelle distance les deux compagnies demandent-elles le même prix ?",answer:fee,
      explain:`Les droites se coupent au point (${fee} ; ${a}). On lit ${fee} km sur l’axe horizontal.`,
      hint:"Lis l’abscisse du point où les deux droites se croisent.",comparison:graph,
      diagnostics:{[a]:["presque","Tu as lu l’ordonnée, qui donne le prix. Ici, on cherche la distance sur l’axe horizontal."]}},
    {prompt:"Quel est le prix commun au point de croisement ?",answer:b,
      explain:`Au point (${fee} ; ${a}), la première coordonnée est la distance et la seconde est le prix : ${b} €.`,
      hint:"Cette fois, lis l’ordonnée du point de croisement.",comparison:graph,
      diagnostics:{[fee]:["presque","Tu as lu l’abscisse, qui donne la distance. Ici, on cherche le prix sur l’axe vertical."]}},
    {...choose(`Pour un trajet de ${far} km, quelle compagnie coûte le moins cher ?`,["Alizé","Brise","Les deux coûtent autant"],1,
      `À ${far} km, la droite Brise est plus basse : ${2*far+fee} € contre ${3*far} €.`,
      "À la même abscisse, compare les hauteurs des deux droites."),comparison:graph},
    {...choose(level===2?"Pour quelles distances x, entre 0 et 10 km, a-t-on 3x ≤ 2x + "+fee+" ?":"Pour quelles distances Alizé coûte-t-elle au plus autant que Brise ?",
      [`De 0 à ${fee} km inclus`,`Au-delà de ${fee} km seulement`,`À ${fee} km seulement`],0,
      `Avant ${fee} km, Alizé est moins chère. À ${fee} km, les deux prix sont égaux. Le signe ≤ inclut cette égalité.`,
      "Cherche où la droite Alizé est en dessous de l’autre, puis pense au point de croisement."),comparison:graph},
  ];
}

assessment.division[0].diagnostics={
  "1":["reprendre","Six est le nombre de minibus nécessaires. Dans l’égalité euclidienne, on cherche d’abord le nombre de minibus entièrement remplis."],
  "2":["presque","L’égalité est numériquement vraie, mais le reste 15 est trop grand : on peut encore remplir un minibus de 8 places."],
};
assessment.pythagore[0].diagnostics={
  "0":["reprendre","AB est un côté de l’angle droit. Repère AC, le côté opposé à l’angle droit."],
  "2":["reprendre","BC touche l’angle droit. Le côté dont le carré doit être seul est AC."],
};

export function commonFactor(a,b) {
  while(b) [a,b]=[b,a%b];
  return Math.abs(a);
}

export function irreducibleQuestions(seed, level, version=3) {
  const pairs=[[4,3],[5,7],[3,8],[7,9],[5,8],[8,11]];
  const [a,b]=pairs[seed%pairs.length];
  const factors=version>=4?[4,6,8,9,10,12,14,15,18,20,21,25]:[6,10,12,14,15];
  const factor=factors[Math.floor(seed/pairs.length)%factors.length];
  const n=a*factor,d=b*factor;
  const example=`${n}/${d}`;
  const check=choose(`Quel nombre peut diviser à la fois ${n} et ${d}, sans reste ?`,[String(n+d),String(factor),String(n*d)],1,
    `${n} ÷ ${factor} = ${a} et ${d} ÷ ${factor} = ${b}. Les deux quotients sont entiers.`,
    "Teste le même nombre sur les deux termes de la fraction.");
  const method=choose(`Quelle écriture donne une fraction égale à ${example} ?`,[`${a}/${d}`,`${n}/${b}`,`${a}/${b}`],2,
    `Pour conserver la valeur de la fraction, on divise les deux termes par le même nombre : ici ${factor}.`,
    "Vérifie si le numérateur et le dénominateur ont été divisés par le même nombre.");
  method.diagnostics={
    "0":["presque","Tu as bien divisé le numérateur. Divise aussi le dénominateur par le même nombre."],
    "1":["presque","Tu as bien divisé le dénominateur. Divise aussi le numérateur par le même nombre."],
  };
  return [
    check,method,
    {prompt:`On simplifie ${example} en divisant les deux termes par ${factor}. Quel est le nouveau dénominateur ?`,answer:b,
      explain:`Le dénominateur est le terme du bas : ${d} ÷ ${factor} = ${b}.`,
      diagnostics:{[a]:["presque",`Tu as trouvé le numérateur : ${n} ÷ ${factor} = ${a}. On te demande le terme du bas.`]}},
    fraction(`Rends ${example} irréductible. Donne le résultat sous forme de fraction.`,[a,b],
      `On divise ${n} et ${d} par ${factor} pour obtenir ${a}/${b}. ${a} et ${b} n’ont aucun diviseur commun supérieur à 1.`,true),
    level===2 ? {prompt:`Quel est le plus grand diviseur commun de ${n} et ${d} ?`,answer:factor,
      explain:`Leur quotient par ${factor} donne ${a} et ${b}, qui n’ont pas de diviseur commun supérieur à 1. Le plus grand diviseur commun est donc ${factor}.`}
      : choose(`Pourquoi peut-on s’arrêter à ${a}/${b} ?`,["Les deux termes sont différents.","Aucun entier supérieur à 1 ne divise les deux termes.","Le numérateur et le dénominateur sont tous les deux impairs."],1,
      `Le seul diviseur commun de ${a} et ${b} est 1. La fraction est irréductible.`,
      "Cherche un diviseur commun, pas seulement un diviseur du numérateur."),
  ];
}

export function reasoningQuestions(lesson,seed){
  const n=2+seed%11;
  if(lesson==="entiers6"){
    const number=100000*n+7304;
    const thousand=Math.floor(number/1000);
    const tens=Math.floor(number/10);
    const base=1000*n;
    return [
      {prompt:`Écris en chiffres ${n} milliers et quatre cent trente-six unités.`,answer:base+436,explain:`${n} × 1 000 + 436 = ${base+436}.`},
      {prompt:`Quel est le nombre de milliers complets dans ${number} ?`,answer:thousand,explain:`${number} = 1 000 × ${thousand} + 304.`},
      {prompt:`Quel est le chiffre des dizaines de ${number} ?`,answer:0,explain:`Les trois derniers chiffres sont 304. Il y a 0 dizaine dans 304, même si ${number} contient ${tens} dizaines complètes.`},
      choose(`Quel encadrement de ${number} utilise deux milliers consécutifs ?`,[
        `${thousand*1000} < ${number} < ${(thousand+1)*1000}`,
        `${thousand*1000} < ${number} < ${(thousand+2)*1000}`,
        `${(thousand+1)*1000} < ${number} < ${(thousand+2)*1000}`],0,
        "On repère le millier inférieur et le millier immédiatement supérieur."),
      {prompt:`Sur une demi-droite graduée, deux traits voisins sont marqués ${base} et ${base+250}. Quel nombre marque le troisième trait après ${base} ?`,answer:base+750,explain:`Le pas est 250. Ajoute trois fois 250 à ${base}.`},
    ];
  }
  if(lesson==="pythagore"||lesson==="pythagore3"){
    const [a,b,c]=seed%2?[5,12,13]:[8,15,17];
    const u=2+n%5;
    const rounded=Math.round(Math.sqrt(16+u*u)*100)/100;
    const symbol=String(rounded).replace(".",",");
    return [
      {prompt:`RST est rectangle en R. RS = ${a*n} cm et RT = ${b*n} cm. Calcule ST en cm.`,answer:c*n,
        explain:`ST est l’hypoténuse. ST² = ${a*n}² + ${b*n}² = ${(c*n)**2}. ST = ${c*n} cm.`},
      {prompt:`MNP est rectangle en N. MP = ${c*n} cm et NP = ${b*n} cm. Calcule MN en cm.`,answer:a*n,
        explain:`MP est l’hypoténuse. MN² = MP² − NP² = ${(a*n)**2}. MN = ${a*n} cm.`},
      choose("Le triangle KLM est rectangle en M. Quelle relation est correcte ?",["LM² = KL² + KM²","KL² = LM² + KM²","KM² = KL² + LM²"],1,
        "Le côté opposé à l’angle droit est KL, donc KL est l’hypoténuse."),
      {prompt:`Une planche forme la diagonale d’un rectangle de 4 m sur ${u} m. Donne sa longueur en mètres, arrondie au centième.`,answer:rounded,
        explain:`Les côtés du rectangle forment un angle droit. La diagonale mesure √${16+u*u} m, soit environ ${symbol} m.`},
      choose(`Une échelle de ${c*n} m est appuyée contre un mur perpendiculaire au sol. Son pied est à ${a*n} m du mur. Quel calcul donne la hauteur atteinte ?`,
        [`√(${c*n}² − ${a*n}²)`,`√(${c*n}² + ${a*n}²)`,`${c*n} − ${a*n}`],0,
        "L’échelle est l’hypoténuse. On soustrait les carrés avant de prendre la racine."),
    ];
  }
  if(lesson==="fonctions"){
    const m=2+n%4;
    const y=m*n+3;
    return [
      {prompt:`Soit f(x) = ${m}x + 3. Quelle est l’image de ${n} ?`,answer:y,explain:`f(${n}) = ${m} × ${n} + 3 = ${y}.`},
      {prompt:`Soit g(x) = ${m}x + 1. Quel est l’antécédent de ${y-2} ?`,answer:n,explain:`Résous ${m}x + 1 = ${y-2}. On retire 1, puis on divise par ${m}.`},
      choose(`Pour h(x) = x², combien d’antécédents distincts le nombre ${n*n} a-t-il ?`,["Aucun","Un seul","Deux"],2,
        `${n} et −${n} ont tous les deux pour carré ${n*n}.`),
      choose(`Un tableau donne j(0) = 3 et j(2) = ${2*m+3}. Si j est affine, quelle formule lui correspond ?`,[
        `j(x) = ${m}x + 3`,`j(x) = ${2*m}x + 3`,`j(x) = 3x + ${m+3}`],0,
        `L’ordonnée à l’origine est 3. Le taux de variation vaut (${2*m+3} − 3) ÷ (2 − 0) = ${m}.`),
      {prompt:`Pour k(x) = x² − ${m*m}, quelle est l’image de −${m} ?`,answer:0,explain:`Le carré de −${m} vaut ${m*m}. Il reste ${m*m} − ${m*m} = 0.`},
    ];
  }
}
