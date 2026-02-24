// Complete translations for ALL recipes - NL & ES

export const recipeTranslations: Record<string, { 
  nl: { title: string; description: string; ingredients: string[]; instructions: string[] }; 
  es: { title: string; description: string; ingredients: string[]; instructions: string[] } 
}> = {

// =====================
// ASIAN
// =====================

"teriyaki-salmon-bowl": {
  nl: { title: "Teriyaki Zalm Power Bowl", description: "Sappige zalm in huisgemaakte teriyakisaus, geserveerd met bruine rijst en edamame.", 
    ingredients: ["2 zalmfilets", "200g bruine rijst", "100g edamame", "3 el sojasaus", "2 el mirin", "1 el honing", "1 teen knoflook", "1 el sesamzaad"], 
    instructions: ["Kook de rijst", "Bak de zalm 3-4 min per kant", "Meng sojasaus, mirin, honing en knoflook", "Giet de saus over de zalm", "Laat karamelliseren", "Serveer met rijst en edamame"] },
  es: { title: "Bowl de Salmón Teriyaki", description: "Salmón jugoso en salsa teriyaki casera, servido con arroz integral.", 
    ingredients: ["2 filetes de salmón", "200g arroz integral", "100g edamame", "3 cdas salsa soja", "2 cdas mirín", "1 cdta miel", "1 diente ajo", "1 cdta semillas sésamo"], 
    instructions: ["Cocina el arroz", "Cocina el salmón 3-4 min por lado", "Mezcla soja, mirín, miel y ajo", "Vierte la salsa sobre el salmón", "Deja caramelizar", "Sirve con arroz y edamame"] }
},

"thai-basil-chicken": {
  nl: { title: "Thaise Basilicum Kip", description: "Snelle Thaise kip met basilicum en chili.", 
    ingredients: ["400g kipgehakt", "4 tenen knoflook", "3-5 chilipepers", "3 el vissaus", "1 el suiker", "1 el oestersaus", "1 bos basilicum", "2 el olie"], 
    instructions: ["Verhit olie in wok", "Bak knoflook en chili", "Voeg kip toe en bak 3-4 min", "Voeg sauzen toe", "Voeg basilicum toe", "Serveer met rijst"] },
  es: { title: "Pollo Albahaca Tailandés", description: "Pollo rápido con albahaca y chile.", 
    ingredients: ["400g pollo molido", "4 dientes ajo", "3-5 chiles", "3 cdas salsa pescado", "1 cdta azúcar", "1 cdta salsa ostras", "1 manojo albahaca", "2 cdas aceite"], 
    instructions: ["Calienta aceite en wok", "Saltea ajo y chile", "Añade pollo cocina 3-4 min", "Añade salsas", "Añade albahaca", "Sirve con arroz"] }
},

"korean-bibimbap": {
  nl: { title: "Koreaanse Bibimbap", description: "Rijstkom met groenten en rundvlees.", 
    ingredients: ["300g rijst", "300g rundvleesreepjes", "2 wortels", "1 courgettte", "100g taugé", "4 eieren", "3 el gochujang", "2 el sesamolie"], 
    instructions: ["Kook de rijst", "Bak groenten apart", "Bak het rundvlees", "Bak spiegeleieren", "Leg alles op rijst", "Serveer met gochujang"] },
  es: { title: "Bibimbap Coreano", description: "Arroz con verduras y carne.", 
    ingredients: ["300g arroz", "300g carne res en tiras", "2 zanahorias", "1 calabacín", "100g brotes soja", "4 huevos", "3 cdas gochujang", "2 cdas aceite sésamo"], 
    instructions: ["Cocina el arroz", "Saltea verduras por separado", "Cocina la carne", "Fríe huevos", "Coloca todo sobre arroz", "Sirve con gochujang"] }
},

"vietnamese-pho": {
  nl: { title: "Vietnamese Pho", description: "Aromatische runderbouillon met rijstnoedels.", 
    ingredients: ["1 liter runderbouillon", "300g rijstnoedels", "300g biefstukreepjes", "1 ui", "3 steranijs", "1 kaneelstok", "3 el vissaus", "1 limoen"], 
    instructions: ["Kook de bouillon", "Kook noedels apart", "Verdeel over kommen", "Leg biefstuk erop", "Giet hete bouillon erover", "Serveer met vissaus"] },
  es: { title: "Pho Vietnamita", description: "Caldo de res con fideos de arroz.", 
    ingredients: ["1 litro caldo res", "300g fideos arroz", "300g filete", "1 cebolla", "3 estrellas anis", "1 rama canela", "3 cdas salsa pescado", "1 limón"], 
    instructions: ["Hierve el caldo", "Cocina fideos aparte", "Divide en tazones", "Coloca carne encima", "Vierte caldo hirviendo", "Sirve con salsa pescado"] }
},

"kung-pao-chicken": {
  nl: { title: "Kung Pao Kip", description: "Wokgebakken kip met pinda's en chili.", 
    ingredients: ["400g kipfilet", "100g pinda's", "8 gedroogde chilipepers", "3 tenen knoflook", "2 el oestersaus", "1 el rijstazijn", "1 el suiker", "2 el sesamolie"], 
    instructions: ["Snijd kip in blokjes", "Verhit wok", "Bak kip goudbruin", "Voeg chili, knoflook en pinda's toe", "Voeg sauzen toe", "Serveer met rijst"] },
  es: { title: "Pollo Kung Pao", description: "Pollo salteado con cacahuetes y chile.", 
    ingredients: ["400g pechuga pollo", "100g cacahuetes", "8 chiles secos", "3 dientes ajo", "2 cdas salsa ostras", "1 cdta vinagre arroz", "1 cdta azúcar", "2 cdas aceite sésamo"], 
    instructions: ["Corta pollo en cubos", "Calienta wok", "Dora el pollo", "Añade chile, ajo y cacahuetes", "Añade salsas", "Sirve con arroz"] }
},

"chinese-egg-drop-soup": {
  nl: { title: "Chinese Ei Soep", description: "Zijdeachtige bouillon met eislierten.", 
    ingredients: ["4 koppen kippenbouillon", "4 eieren", "200g tofu", "2 el maizena", "2 el sojasaus", "1 tl sesamolie", "2 lente-uitjes", "Witte peper"], 
    instructions: ["Breng bouillon aan de kook", "Los maizena op en voeg toe", "Kluts eieren en roer langzaam in", "Voeg tofu toe", "Voeg sojasaus en sesamolie toe", "Bestrooi met ui"] },
  es: { title: "Sopa de Huevo China", description: "Caldo sedoso con huevos revueltos.", 
    ingredients: ["4 tasas caldo pollo", "4 huevos", "200g tofu", "2 cdas maicena", "2 cdas salsa soja", "1 cdta aceite sésamo", "2 cebolletas", "Pimienta blanca"], 
    instructions: ["Hierve el caldo", "Disuelve maicena y añade", "Bate huevos y vierte lentamente", "Añade tofu", "Añade salsa soja y aceite", "Espolvorea con cebolleta"] }
},

// =====================
// EUROPEAN
// =====================

"greek-chicken-souvlaki": {
  nl: { title: "Griekse Kip Souvlaki", description: "Gemarineerde kipspiesjes met tzatziki en pita.", 
    ingredients: ["500g kipfilet", "4 el olijfolie", "3 el citroensap", "2 tenen knoflook", "2 tl oregano", "150g Griekse yogurt", "1 komkommer", "4 pita broodjes"], 
    instructions: ["Marineer de kip 30 min", "Maak tzatziki", "Gril de spiesjes 3-4 min per kant", "Warm pita broodjes", "Serveer met tzatziki"] },
  es: { title: "Souvlaki de Pollo Griego", description: "Brochetas de pollo marinadas con tzatziki y pita.", 
    ingredients: ["500g pechuga pollo", "4 cdas aceite oliva", "3 cdas limón", "2 dientes ajo", "2 cdta oregano", "150g yogur griego", "1 pepino", "4 pan pita"], 
    instructions: ["Marina el pollo 30 min", "Haz el tzatziki", "A la parrilla 3-4 min por lado", "Calienta el pita", "Sirve con tzatziki"] }
},

"french-coq-au-vin": {
  nl: { title: "Franse Coq au Vin", description: "Kip in rode wijn met champignons.", 
    ingredients: ["8 kippendelen", "250ml rode wijn", "200g champignons", "12 kleine uitjes", "3 tenen knoflook", "2 takjes tijm", "100g bacon", "2 el bloem"], 
    instructions: ["Bak kip en bacon", "Fruit ui en knoflook", "Bestrooi met bloem", "Voeg wijn en champignons toe", "Laat 45 min zachtjes koken", "Serveer met aardappelpuree"] },
  es: { title: "Coq au Vin Francés", description: "Pollo en vino tinto con champiñones.", 
    ingredients: ["8 muslos pollo", "250ml vino tinto", "200g champiñones", "12 chalotas", "3 dientes ajo", "2 ramas tomillo", "100g tocino", "2 cdas harina"], 
    instructions: ["Dora pollo y tocino", "Sofríe chalotas y ajo", "Espolvorea con harina", "Añade vino y champiñones", "Cocina 45 min a fuego lento", "Sirve con puré"] }
},

"french-nicoise-salad": {
  nl: { title: "Salade Niçoise", description: "Franse salade met tonijn, sperziebonen en ei.", 
    ingredients: ["2 tonijnfilets", "200g sperziebonen", "200g aardappeltjes", "100g olijven", "200g cherrytomaten", "4 eieren", "1 rode ui", "3 el olijfolie"], 
    instructions: ["Kook aardappelen en bonen", "Bak de tonijn", "Kook de eieren", "Mix vinaigrette", "Leg alles op schotel", "Serveer koud"] },
  es: { title: "Ensalada Niçoise", description: "Ensalada francesa con atún, judías y huevo.", 
    ingredients: ["2 filetes atún", "200g judías verdes", "200g patatas nuevas", "100g aceitunas", "200g tomates cherry", "4 huevos", "1 cebolla morada", "3 cdas aceite oliva"], 
    instructions: ["Cocina patatas y judías", "Ase el atún", "Hierve los huevos", "Mezcla vinagreta", "Coloca todo en fuente", "Sirve frío"] }
},

"spanish-paella": {
  nl: { title: "Spaanse Paella", description: "Saffraanrijst met kip en garnalen.", 
    ingredients: ["300g paella rijst", "2 kippendelen", "200g garnalen", "200g mosselen", "1 liter kippenbouillon", "1 tl saffraan", "1 rode paprika", "1 ui"], 
    instructions: ["Bak kip en garnalen", "Fruit ui en paprika", "Voeg rijst toe en roer", "Voeg bouillon en saffraan toe", "Laat 20 min koken", "Voeg mosselen toe"] },
  es: { title: "Paella Española", description: "Arroz con azafrán, pollo y gambas.", 
    ingredients: ["300g arroz paella", "2 muslos pollo", "200g gambas", "200g mejillones", "1 litro caldo pollo", "1 cdta azafrán", "1 pimiento rojo", "1 cebolla"], 
    instructions: ["Dora pollo y gambas", "Sofríe cebolla y pimiento", "Añade arroz y revuelve", "Añade caldo y azafrán", "Cocina 20 min", "Añade mejillones"] }
},

"spanish-gazpacho": {
  nl: { title: "Spaanse Gazpacho", description: "Koude tomaatsoep met komkommer.", 
    ingredients: ["500g tomaten", "1 komkommer", "1 rode paprika", "2 tenen knoflook", "50g brood", "3 el olijfolie", "2 el azijn", "100g kikkererwten"], 
    instructions: ["Ontvel de tomaten", "Blend alle ingrediënten", "Voeg olie en azijn toe", "Zout en peper", "Bak kikkererwten knapperig", "Serveer koud"] },
  es: { title: "Gazpacho Español", description: "Sopa de tomate fría con pepino.", 
    ingredients: ["500g tomates", "1 pepino", "1 pimiento rojo", "2 dientes ajo", "50g pan", "3 cdas aceite oliva", "2 cdas vinagre", "100g garbanzos"], 
    instructions: ["Pela los tomates", "Licúa todo", "Añade aceite y vinagre", "Sal y pimienta", "Tosta garbanzos", "Sirve frío"] }
},

"german-schnitzel": {
  nl: { title: "Duitse Schnitzel", description: "Gepaneerde kalkoenborst met koolsalade.", 
    ingredients: ["4 kalkoenfilets", "100g paneermeel", "2 eieren", "50g bloem", "Zout en peper", "Olie", "1 kool", "2 wortels", "2 el mayonaise"], 
    instructions: ["Klop eieren", "Haal door bloem, ei en paneermeel", "Bak goudbruin 3-4 min per kant", "Shred kool en wortel", "Meng met mayonaise", "Serveer"] },
  es: { title: "Schnitzel de Pavo", description: "Pechuga de pavo empanizada con ensalada.", 
    ingredients: ["4 filetes pavo", "100g pan rallado", "2 huevos", "50g harina", "Sal y pimienta", "Aceite", "1 col", "2 zanahorias", "2 cdas mayonesa"], 
    instructions: ["Bate huevos", "Pasa por harina, huevo y pan", "Fríe dorado 3-4 min", "Ralla col y zanahoria", "Mezcla con mayonesa", "Sirve"] }
},

"dutch-stamppot": {
  nl: { title: "Stamppot met Rookworst", description: "Klassieke Nederlandse aardappelpuree met boerenkool.", 
    ingredients: ["1kg aardappelen", "500g boerenkool", "4 rookworsten", "100g boter", "200ml melk", "2 uien", "Nootmuskaat", "Peper"], 
    instructions: ["Schil en kook aardappelen", "Kook de boerenkool", "Stamp aardappelen met kool", "Voeg boter en melk toe", "Bak de rookworsten", "Serveer samen"] },
  es: { title: "Stamppot Holandés", description: "Puré de patatas holandés con col rizada.", 
    ingredients: ["1kg patatas", "500g col rizada", "4 salchichas ahumadas", "100g mantequilla", "200ml leche", "2 cebollas", "Nuez moscada", "Pimienta"], 
    instructions: ["Pela y cocina patatas", "Cocina la col", "Machaca patatas con col", "Añade mantequilla y leche", "Fríe las salchichas", "Sirve juntos"] }
},

"british-cottage-pie": {
  nl: { title: "Engelse Cottage Pie", description: "Gehakt met groenten onder een aardappellaag.", 
    ingredients: ["500g lamsgehakt", "4 grote aardappelen", "2 wortels", "1 ui", "2 tenen knoflook", "200ml runderbouillon", "2 el tomatenpuree", "50g kaas"], 
    instructions: ["Bak gehakt met groenten", "Voeg tomatenpuree en bouillon toe", "Laat 20 min zachtjes koken", "Kook en stamp aardappelen", "Leg op gehakt", "Bak 20 min op 180°C"] },
  es: { title: "Cottage Pie Inglés", description: "Carne con verduras bajo capa de patatas.", 
    ingredients: ["500g carne cordero", "4 patatas grandes", "2 zanahorias", "1 cebolla", "2 dientes ajo", "200ml caldo carne", "2 cdas pasta tomate", "50g queso"], 
    instructions: ["Dora carne con verduras", "Añade pasta tomate y caldo", "Cocina 20 min", "Cocina y machaca patatas", "Coloca sobre carne", "Hornea 20 min a 180°C"] }
},

"polish-pierogi": {
  nl: { title: "Poolse Pierogi", description: "Deeg met kip en aardappelvulling.", 
    ingredients: ["300g bloem", "2 eieren", "200g kipgehakt", "200g aardappelen", "1 ui", "100g zure room", "2 el boter", "Verse dille"], 
    instructions: ["Maak deeg van bloem, ei en water", "Kook en stamp aardappelen", "Meng kip met aardappel en ui", "Vul de deegjes", "Kook 3-4 min", "Serveer met zure room"] },
  es: { title: "Pierogi Polacos", description: "Masa con relleno de pollo y patatas.", 
    ingredients: ["300g harina", "2 huevos", "200g pollo molido", "200g patatas", "1 cebolla", "100g crema agria", "2 cdas mantequilla", "Eneldo fresco"], 
    instructions: ["Haz masa con harina, huevo y agua", "Cocina y machaca patatas", "Mezcla pollo con patata y cebolla", "Rellena la masa", "Cocina 3-4 min", "Sirve con crema agria"] }
},

// =====================
// MIDDLE EASTERN
// =====================

"moroccan-chickpea-tagine": {
  nl: { title: "Marokkaanse Tagine", description: "Kikkererwten met zoete aardappel.", 
    ingredients: ["400g kikkererwten", "2 zoete aardappelen", "1 blik tomaten", "1 ui", "3 tenen knoflook", "1 el komijn", "1 el kurkuma", "250ml groentebouillon"], 
    instructions: ["Fruit ui en knoflook", "Voeg specerijen toe", "Voeg tomaten en kikkererwten toe", "Voeg bouillon toe", "Laat 30 min koken", "Serveer met couscous"] },
  es: { title: "Tagine de Garbanzos", description: "Garbanzos con batata.", 
    ingredients: ["400g garbanzos", "2 batatas", "1 lata tomates", "1 cebolla", "3 dientes ajo", "1 cdta comino", "1 cdta cúrcuma", "250ml caldo verduras"], 
    instructions: ["Sofríe cebolla y ajo", "Añade especias", "Añade tomates y garbanzos", "Añade caldo", "Cocina 30 min", "Sirve con cuscús"] }
},

"turkish-kebab": {
  nl: { title: "Turkse Kebab", description: "Gehakte kip spiesjes gegrild.", 
    ingredients: ["500g kipgehakt", "1 ui", "4 tenen knoflook", "2 tl paprika", "1 tl komijn", "1 tl sumak", "4 platbroden", "2 tomaten"], 
    instructions: ["Meng kip met ui, knoflook en specerijen", "Vorm spiesjes", "Gril 4-5 min per kant", "Warm platbroden", "Serveer met groenten"] },
  es: { title: "Kebab Turco", description: "Brochetas de pollo especiado a la parrilla.", 
    ingredients: ["500g pollo molido", "1 cebolla", "4 dientes ajo", "2 cdta pimentón", "1 cdta comino", "1 cdta sumac", "4 panes planos", "2 tomates"], 
    instructions: ["Mezcla pollo con cebolla, ajo y especias", "Forma Brochetas", "A la parrilla 4-5 min", "Calienta panes planos", "Sirve con verduras"] }
},

// =====================
// INDIAN & SOUTH ASIAN
// =====================

"indian-tandoori-chicken": {
  nl: { title: "Indische Tandoori Kip", description: "Yoghurt-gemarineerde kip met specerijen.", 
    ingredients: ["500g kippendijen", "200g Griekse yogurt", "3 el tandoori masala", "2 el gember-knoflook pasta", "1 tl kurkuma", "1 tl komijn", "2 citroenen", "Rijst"], 
    instructions: ["Marineer kip 2 uur", "Verwarm oven op 200°C", "Leg kip op bakplaat", "Rooster 30-35 min", "Serveer met rijst"] },
  es: { title: "Pollo Tandoori Indio", description: "Pollo marinado en yogur con especias.", 
    ingredients: ["500g muslos pollo", "200g yogur griego", "3 cdas tandoori masala", "2 cdas pasta ajo-jengibre", "1 cdta cúrcuma", "1 cdta comino", "2 limones", "Arroz"], 
    instructions: ["Marina pollo 2 horas", "Precalienta horno a 200°C", "Coloca pollo en bandeja", "Asa 30-35 min", "Sirve con arroz"] }
},

// =====================
// LATIN AMERICAN
// =====================

"mexican-black-bean-quinoa": {
  nl: { title: "Mexicaanse Quinoa Bowl", description: "Kleurrijke bowl met bonen en groenten.", 
    ingredients: ["200g quinoa", "400g zwarte bonen", "1 blik mais", "1 paprika", "1 avocado", "200g cherrytomaten", "1 rode ui", "Verse koriander"], 
    instructions: ["Kook de quinoa", "Mix alle groenten", "Voeg bonen en mais toe", "Pers limoen erover", "Garneer met koriander"] },
  es: { title: "Cuenco de Quinua Mexicana", description: "Tazón colorido con frijoles y verduras.", 
    ingredients: ["200g quinua", "400g frijoles negros", "1 lata maíz", "1 pimiento", "1 aguacate", "200g tomates cherry", "1 cebolla morada", "Cilantro fresco"], 
    instructions: ["Cocina la quinua", "Mezcla todas las verduras", "Añade frijoles y maíz", "Exprime limón encima", "Decora con cilantro"] }
},

"peruvian-ceviche": {
  nl: { title: "Peruaanse Ceviche", description: "Verse vis in citrus marinade.", 
    ingredients: ["400g witte vis", "4 limoenen", "1 rode ui", "1 el aji pasta", "1 bundel koriander", "1 zoete aardappel", "Zout en peper"], 
    instructions: ["Snijd vis in blokjes", "Pers limoensap", "Meng vis met ui, koriander en aji", "Giet limoensap erover", "Laat 15 min marineren", "Serveer met zoete aardappel"] },
  es: { title: "Ceviche Peruano", description: "Pescado fresco en marinada cítrica.", 
    ingredients: ["400g pescado blanco", "4 limones", "1 cebolla morada", "1 cda ají pasta", "1 manojo cilantro", "1 batata", "Sal y pimienta"], 
    instructions: ["Corta pescado en cubos", "Exprime limones", "Mezcla pescado con cebolla, cilantro y ají", "Vierte jugo limón encima", "Deja marinar 15 min", "Sirve con batata"] }
},

"colombian-bandeja-paisa": {
  nl: { title: "Colombiaanse Bandeja Paisa", description: "Rijst, bonen, biefstuk en gebakken banaan.", 
    ingredients: ["200g biefstuk", "200g rode bonen", "200g witte rijst", "1 gebakken banaan", "2 eieren", "1 avocado", "100g tomatenensaus", "Arepas"], 
    instructions: ["Kook bonen en rijst", "Gril de biefstuk", "Bak ei en banaan", "Maak tomatenensaus", "Leg alles op bord", "Serveer met arepas"] },
  es: { title: "Bandeja Paisa Colombiana", description: "Arroz, frijoles, bistec y plátano frito.", 
    ingredients: ["200g bistec", "200g frijoles rojos", "200g arroz blanco", "1 plátano frito", "2 huevos", "1 aguacate", "100g salsa tomate", "Arepas"], 
    instructions: ["Cocina frijoles y arroz", "A la bistec", "Fríe huevo y plátano", "Haz salsa tomate", "Coloca todo en plato", "Sirve con arepas"] }
},

"argentinian-chimichurri-steak": {
  nl: { title: "Argentijnse Chimichurri Biefstuk", description: "Gegrilde flank steak met chimichurri.", 
    ingredients: ["500g flank steak", "1 bosje peterselie", "4 tenen knoflook", "3 el rode wijnazijn", "1 el oregano", "1 tl chilivlokken", "1/2 kop olijfolie", "Rucola"], 
    instructions: ["Maak chimichurri", "Laat 30 min trekken", "Grill steak 4-5 min per kant", "Laat 5 min rusten", "Sniijd tegen vezel in", "Serveer met chimichurri"] },
  es: { title: "Bistec con Chimichurri", description: "Flank steak a la parrilla con chimichurri.", 
    ingredients: ["500g flap steak", "1 manojo perejil", "4 dientes ajo", "3 cdas vinagre vino rojo", "1 cdta orégano", "1 cdta hojuelas chile", "1/2 taza aceite oliva", "Rúcula"], 
    instructions: ["Haz chimichurri", "Deja reposar 30 min", "A la parrilla 4-5 min por lado", "Deja descansar 5 min", "Corta contra la fibra", "Sirve con chimichurri"] }
},

// =====================
// AFRICAN
// =====================

"ethiopian-lentil-stew": {
  nl: { title: "Ethiopische Linzen Stoof", description: "Gekruide linzen met berbere.", 
    ingredients: ["300g rode linzen", "1 ui", "3 tenen knoflook", "2 el tomatenpuree", "1 el berbere", "1 tl komijn", "500ml groentebouillon"], 
    instructions: ["Fruit ui en knoflook", "Voeg tomatenpuree en specerijen toe", "Voeg linzen en bouillon toe", "Laat 30-40 min koken", "Serveer met injera"] },
  es: { title: "Estofado de Lentejas Etíope", description: "Lentejas especiadas con berbere.", 
    ingredients: ["300g lentejas rojas", "1 cebolla", "3 dientes ajo", "2 cdas pasta tomate", "1 cdta berbere", "1 cdta comino", "500ml caldo verduras"], 
    instructions: ["Sofríe cebolla y ajo", "Añade pasta tomate y especias", "Añade lentejas y caldo", "Cocina 30-40 min", "Sirve con injera"] }
},

"nigerian-jollof-rice": {
  nl: { title: "Nigerianse Jollof Rijst", description: "West-Afrikaanse eenpansrijst.", 
    ingredients: ["400g jollof rijst", "4 tomaten", "2 paprika's", "2 uien", "3 tenen knoflook", "2 el tomatenpuree", "1 liter kippenbouillon"], 
    instructions: ["Blend tomaten, paprika en ui", "Bak tomatenpuree 2 min", "Voeg groentemix toe en bak 10 min", "Voeg rijst toe", "Voeg bouillon toe", "Laat 25 min koken"] },
  es: { title: "Jollof Rice Nigeriano", description: "Arroz africano occidental.", 
    ingredients: ["400g arroz jollof", "4 tomates", "2 pimientos", "2 cebollas", "3 dientes ajo", "2 cdas pasta tomate", "1 litro caldo pollo"], 
    instructions: ["Licúa tomates, pimiento y cebolla", "Cocina pasta tomate 2 min", "Añade mezcla de verduras y cocina 10 min", "Añade arroz", "Añade caldo", "Cocina 25 min"] }
},

"south-african-bobootie": {
  nl: { title: "Zuid-Afrikaanse Bobotie", description: "Kruidig gehakt met ei-custard.", 
    ingredients: ["500g lamsgehakt", "1 ui", "2 el milde curry", "2 el fruitcompote", "2 el mango chutney", "3 eieren", "200ml melk"], 
    instructions: ["Bak ui en gehakt", "Voeg curry en chutney toe", "Laat 15 min koken", "Leg in ovenschaal", "Kluts eieren met melk en giet over", "Bak 45 min op 180°C"] },
  es: { title: "Bobotie Sudafricano", description: "Carne especiada con cobertura de huevo.", 
    ingredients: ["500g carne cordero molida", "1 cebolla", "2 cdas curry suave", "2 cdas compota frutas", "2 cdas chutney mango", "3 huevos", "200ml leche"], 
    instructions: ["Sofríe cebolla y carne", "Añade curry y chutney", "Cocina 15 min", "Coloca en refractario", "Bate huevos con leche y vierte", "Hornea 45 min a 180°C"] }
},

// =====================
// OTHER
// =====================

"brazilian-acai-bowl": {
  nl: { title: "Braziliaanse Açai Bowl", description: "Antioxidantrijke açai met granola.", 
    ingredients: ["200g bevroren açai", "1 banaan", "100g frozen berries", "1 el honing", "50g granola", "1 el chiazaad"], 
    instructions: ["Ontdooi açai 5 min", "Blend açai met banaan en honing", "Giet in kom", "Top met granola, banaan en chia"] },
  es: { title: "Cuenco de Açai Brasileño", description: "Açai antioxidante con granola.", 
    ingredients: ["200g açai congelado", "1 plátano", "100g berries congeladas", "1 cdta miel", "50g granola", "1 cdta semillas chía"], 
    instructions: ["Descongela açai 5 min", "Mezcla açai con plátano y miel", "Vierte en tazón", "Top con granola, plátano y chía"] }
},

"italian-protein-pasta": {
  nl: { title: "Italiaanse Proteïne Pasta", description: "Eiwitrijke pasta met groenten.", 
    ingredients: ["300g proteïne pasta", "200g kipworst", "2 courgettes", "200g cherrytomaten", "3 tenen knoflook", "3 el olijfolie", "Basilicum", "Parmezaanse kaas"], 
    instructions: ["Kook de pasta", "Bak de kipworst", "Bak groenten in olijfolie", "Meng alles door elkaar", "Serveer met kaas"] },
  es: { title: "Pasta Proteica Italiana", description: "Pasta rica en proteínas con verduras.", 
    ingredients: ["300g pasta proteica", "200g chorizo pollo", "2 calabacines", "200g tomates cherry", "3 dientes ajo", "3 cdas aceite oliva", "Albahaca", "Queso parmesano"], 
    instructions: ["Cocina la pasta", "Cocina el chorizo", "Saltea verduras en aceite", "Mezcla todo", "Sirve con queso"] }
},

// =====================
// VEGAN RECIPES
// =====================

"vegan-buddha-bowl": {
  nl: { title: "Veganistische Buddha Bowl", description: "Voedzame bowl met quinoa en roasted groenten.", 
    ingredients: ["200g quinoa", "1 zoete aardappel", "1 blik kikkererwten", "1 avocado", "100g spinazie", "2 wortels", "2 el tahini", "1 citroen"], 
    instructions: ["Kook de quinoa", "Roast de zoete aardappel en kikkererwten", "Snijd avocado en wortels", "Leg alles in een kom", "Top met tahini en citroen"] },
  es: { title: "Cuenco Buddha Vegano", description: "Tazón nutritivo con quinua y verduras asadas.", 
    ingredients: ["200g quinua", "1 batata", "1 lata garbanzos", "1 aguacate", "100g espinacas", "2 zanahorias", "2 cdas tahini", "1 limón"], 
    instructions: ["Cocina la quinua", " Asa la batata y garbanzos", "Corta aguacate y zanahorias", "Coloca todo en tazón", "Top con tahini y limón"] }
},

"vegan-thai-green-curry": {
  nl: { title: "Veganistische Thaise Groene Curry", description: "Romige kokos curry met tofu.", 
    ingredients: ["400ml kokosmelk", "200g tofu", "2 el groene curry pasta", "1 blik bamboescheuten", "1 rode paprika", "100g sugar snaps", "Verse basilicum", "Rijst"], 
    instructions: ["Kook kokosmelk met curry pasta", "Voeg tofu en groenten toe", "Laat romige kokos curry", "Voeg bamboescheuten en paprika toe", "Laat 15 min zachtjes koken", "Serveer met rijst en basilicum"] },
    es: { title: "Curry Verde Thai Vegano", description: "Curry de coco cremoso con tofu.", 
    ingredients: ["400ml leche coco", "200g tofu", "2 cdas pasta curry verde", "1 lata retoños bambú", "1 pimiento rojo", "100g judías snap", "Albahaca fresca", "Arroz"], 
    instructions: ["Cocina leche coco con pasta curry", "Añade tofu y verduras", "Cocina 15 min a fuego lento", "Sirve con arroz y albahaca"] }
},

"vegan-mexican-burrito-bowl": {
  nl: { title: "Veganistische Burrito Bowl", description: "Mexicaanse bowl met zwarte bonen en guacamole.", 
    ingredients: ["200g bruine rijst", "1 blik zwarte bonen", "1 avocado", "200g salsa", "100g mais", "1 ui", "2 limoenen", "Verse koriander"], 
    instructions: ["Kook de rijst", "Verwarm de bonen", "Maak guacamole", "Meng alles in een kom", "Top met salsa en koriander"] },
  es: { title: "Tazón Burrito Vegano", description: "Tazón mexicano con frijoles negros y guacamole.", 
    ingredients: ["200g arroz integral", "1 lata frijoles negros", "1 aguacate", "200g salsa", "100g maíz", "1 cebolla", "2 limones", "Cilantro fresco"], 
    instructions: ["Cocina el arroz", "Calienta los frijoles", "Haz guacamole", "Mezcla todo en tazón", "Top con salsa y cilantro"] }
},

"vegan-mediterranean-wrap": {
  nl: { title: "Veganistische Mediterrane Wrap", description: "Hummus en gegrilde groenten in wrap.", 
    ingredients: ["4 wraps", "200g hummus", "1 aubergine", "1 rode paprika", "1 gele paprika", "100g olijven", "2 tomaten", "Verse munt"], 
    instructions: ["Gril de aubergine en paprika", "Smeer hummus op wraps", "Leg groenten op hummus", "Rol strak op", "Serveer met munt"] },
  es: { title: "Wrap Mediterraneo Vegano", description: "Hummus y verduras asadas en wrap.", 
    ingredients: ["4 wraps", "200g hummus", "1 berenjena", "1 pimiento rojo", "1 pimiento amarillo", "100g aceitunas", "2 tomates", "Menta fresca"], 
    instructions: ["Ase la berenjena y pimientos", "Unta hummus en wraps", "Coloca verduras sobre hummus", "Enrolla firmemente", "Sirve con menta"] }
},

"vegan-indian-chana-masala": {
  nl: { title: "Veganistische Chana Masala", description: "Kruidige kikkererwten in tomaat-gember saus.", 
    ingredients: ["400g kikkererwten", "1 blik tomaten", "1 ui", "3 tenen knoflook", "2 el garam masala", "1 tl komijn", "1 tl kurkuma", "Verse koriander"], 
    instructions: ["Fruit ui en knoflook", "Voeg specerijen toe", "Voeg tomaten en kikkererwten toe", "Laat 20 min zachtjes koken", "Serveer met rijst"] },
  es: { title: "Chana Masala Vegana", description: "Garbanzos especiados en salsa de tomate.", 
    ingredients: ["400g garbanzos", "1 lata tomates", "1 cebolla", "3 dientes ajo", "2 cdas garam masala", "1 cdta comino", "1 cdta cúrcuma", "Cilantro fresco"], 
    instructions: ["Sofríe cebolla y ajo", "Añade especias", "Añade tomates y garbanzos", "Cocina 20 min a fuego lento", "Sirve con arroz"] }
},

"vegan-sushi-rolls": {
  nl: { title: "Veganistische Sushi Rolls", description: "Sushi met avocado, komkommer en wortel.", 
    ingredients: ["300g sushirijst", "4 nori vellen", "1 avocado", "1 komkommer", "2 wortels", "1 mango", "2 el sojasaus", "Wasabi"], 
    instructions: ["Kook de sushirijst", "Laat afkoelen", "Leg nori op matje", "Spreid rijst uit", "Leg groenten in lijn", "Rol strak op", "Snijd in stukken"] },
  es: { title: "Rollos de Sushi Veganos", description: "Sushi con aguacate, pepino y zanahoria.", 
    ingredients: ["300g arroz sushi", "4 hojas nori", "1 aguacate", "1 pepino", "2 zanahorias", "1 mango", "2 cdas salsa soja", "Wasabi"], 
    instructions: ["Cocina el arroz sushi", "Deja enfriar", "Coloca nori enesterilla", "Extiende el arroz", "Coloca verduras en línea", "Enrolla firmemente", "Corta en piezas"] }
},

"vegan-stir-fry-noodles": {
  nl: { title: "Veganistische Wok Noedels", description: "Noedels met tofu en Aziatische groenten.", 
    ingredients: ["300g eiernoedels", "200g tofu", "2 cup bok choy", "1 rode paprika", "2 tenen knoflook", "3 el sojasaus", "1 el sesamolie", "Sesamzaad"], 
    instructions: ["Kook de noedels", "Bak tofu goudbruin", "Wok groenten met knoflook", "Voeg noedels toe", "Voeg sauzen toe", "Bestrooi met sesam"] },
  es: { title: "Fideos Wok Veganos", description: "Fideos con tofu y verduras asiáticas.", 
    ingredients: ["300g fideos huevo", "200g tofu", "2 taza bok choy", "1 pimiento rojo", "2 dientes ajo", "3 cdas salsa soja", "1 cdta aceite sésamo", "Semillas sésamo"], 
    instructions: ["Cocina los fideos", "Dora el tofu", "Saltea verduras con ajo", "Añade fideos", "Añade salsas", "Espolvorea con sésamo"] }
},

"vegan-mushroom-risotto": {
  nl: { title: "Veganistische Paddenstoelen Risotto", description: "Romige risotto met gemixte paddenstoelen.", 
    ingredients: ["300g arborio rijst", "300g gemixte paddenstoelen", "1 liter groentebouillon", "1 ui", "3 tenen knoflook", "1/2 glas witte wijn", "Verse peterselie", "Voedingsgist"], 
    instructions: ["Bak paddenstoelen", "Fruit ui en knoflook", "Voeg rijst toe en roer", "Voeg bouillon lepel voor lepel toe", "Voeg paddenstoelen toe", "Serveer met peterselie"] },
  es: { title: "Risotto de Setas Vegano", description: "Risotto cremoso con setas mixtas.", 
    ingredients: ["300g arroz arborio", "300g setas mixtas", "1 litro caldo verduras", "1 cebolla", "3 dientes ajo", "1/2 vaso vino blanco", "Peregil fresco", "Nutritional yeast"], 
    instructions: ["Sofríe las setas", "Sofríe cebolla y ajo", "Añade arroz y revuelve", "Añade caldo lentamente", "Añade setas", "Sirve con peregil"] }
},

// =====================
// Functions
// =====================
};

export function getRecipeTranslation(slug: string, lang: 'nl' | 'es' | null | undefined) {
  if (!lang) return null;
  return recipeTranslations[slug]?.[lang] || null;
}

export function translateRecipe(recipe: any, lang: 'nl' | 'es' | null | undefined) {
  const translation = getRecipeTranslation(recipe.slug, lang);
  if (!translation) return recipe;
  
  return {
    ...recipe,
    title: translation.title,
    description: translation.description,
    ingredients: translation.ingredients?.length > 0 ? translation.ingredients : recipe.ingredients,
    instructions: translation.instructions?.length > 0 ? translation.instructions : recipe.instructions,
  };
}
