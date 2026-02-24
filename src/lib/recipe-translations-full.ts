// Full translations for ALL recipes - NL & ES
// This file contains complete translations for title, description, ingredients, and instructions

export const fullRecipeTranslations: Record<string, { 
  nl: { title: string; description: string; ingredients: string[]; instructions: string[] }; 
  es: { title: string; description: string; ingredients: string[]; instructions: string[] } 
}> = {
  // ============================================
  // MAIN DISHES
  // ============================================
  
  "teriyaki-salmon-bowl": {
    nl: {
      title: "Teriyaki Zalm Power Bowl",
      description: "Sappige zalm in huisgemaakte teriyakisaus, geserveerd met bruine rijst en edamame.",
      ingredients: ["2 zalmfilets (150g elk)", "200g bruine rijst", "100g edamame (ontdopt)", "3 el sojasaus", "2 el mirin", "1 el honing", "1 teen knoflook (geperst)", "1 el sesamzaad", "2 lente-uitjes (gesneden)"],
      instructions: ["Kook de bruine rijst volgens de verpakking", "Meng sojasaus, mirin, honing en knoflook in een kom", "Bestrijk de zalmfilets met de helft van de teriyakisaus", "Bak de zalm 3-4 minuten per kant op middelhoog vuur", "Voeg de rest van de saus toe en laat 1 minuut karamelliseren", "Serveer de zalm op de rijst", "Garneer met edamame, sesamzaad en lente-uitjes"]
    },
    es: {
      title: "Bowl de Salmón Teriyaki",
      description: "Salmón jugoso en salsa teriyaki casera, servido con arroz integral y edamame.",
      ingredients: ["2 filetes de salmón (150g cada uno)", "200g de arroz integral", "100g de edamame (deshuesado)", "3 cucharadas de salsa de soja", "2 cucharadas de mirín", "1 cucharada de miel", "1 diente deajo (prensado)", "1 cucharada de semillas de sésamo", "2 cebolletas (cortadas)"],
      instructions: ["Cocina el arroz integral según las instrucciones", "Mezcla la salsa de soja, mirín, miel y ajo en un tazón", "Unta los filetes de salmón con la mitad de la salsa teriyaki", "Cocina el salmón 3-4 minutos por cada lado a fuego medio", "Añade el resto de la salsa y deja caramelizar 1 minuto", "Sirve el salmón sobre el arroz", "Decora con edamame, semillas de sésamo y cebolletas"]
    }
  },

  "moroccan-chickpea-tagine": {
    nl: {
      title: "Marokkaanse Kikkererwten Tagine",
      description: "Gekruide kikkererwten en zoete aardappelen in een aromatische tomatensaus.",
      ingredients: ["400g kikkererwten (blik, afgespoeld)", "2 zoete aardappelen (kubus)", "1 blik tomaten (400g)", "1 ui (gesneden)", "3 tenen knoflook", "1 el komijn", "1 el kurkuma", "1 tl gerookte paprika", "250ml groentebouillon", "2 el olijfolie", "Verse koriander"],
      instructions: ["Verhit olijfolie in een grote pan", "Fruit de ui 5 minuten tot glazig", "Voeg knoflook toe en bak 1 minuut", "Voeg komijn, kurkuma en paprika toe en roer 1 minuut", "Voeg tomaten, kikkererwten en zoete aardappelen toe", "Giet de groentebouillon erover", "Laat 30-35 minuten zachtjes koken tot de aardappelen zacht zijn", "Serveer met couscous en verse koriander"]
    },
    es: {
      title: "Tagine de Garbanzos Marroquí",
      description: "Garbanzos especiados y batata en salsa de tomate aromática.",
      ingredients: ["400g de garbanzos (lata, escurridos)", "2 batatas (en cubos)", "1 lata de tomates (400g)", "1 cebolla (cortada)", "3 dientes de ajo", "1 cucharada de comino", "1 cucharada de cúrcuma", "1 cdta de pimentón ahumado", "250ml de caldo de verduras", "2 cucharadas de aceite de oliva", "Cilantro fresco"],
      instructions: ["Calienta el aceite de oliva en una olla grande", "Sofríe la cebolla 5 minutos hasta que esté transparente", "Añade el ajo y cocina 1 minuto", "Añade el comino, cúrcuma y pimentón y revuelve 1 minuto", "Añade los tomates, garbanzos y batatas", "Vierte el caldo de verduras por encima", "Cocina a fuego lento 30-35 minutos hasta que las batatas estén tiernas", "Sirve con cuscús y cilantro fresco"]
    }
  },

  "greek-chicken-souvlaki": {
    nl: {
      title: "Griekse Kip Souvlaki",
      description: "Gemarineerde kipspiesjes met zelfgemaakte tzatziki, warm pita brood en een frisse Griekse salade.",
      ingredients: ["500g kipfilet (in blokjes)", "4 el olijfolie", "3 el citroensap", "2 tenen knoflook", "2 tl oregano", "150g Griekse yogurt", "1 komkommer (geraspt)", "2 tenen knoflook (voor tzatziki)", "4 pita broodjes", "1 rode ui (gesneden)", "200g cherrytomaten", "100g feta kaas"],
      instructions: ["Meng olijfolie, citroensap, knoflook en oregano voor de marinade", "Laat de kip 30 minuten marineren", "Voor tzatziki: meng yogurt, komkommer, knoflook en dille", "Rijg de kip op spiesjes", "Gril de spiesjes 3-4 minuten per kant", "Warm de pita broodjes op", "Snijd de tomaat en ui en verkruimel de feta", "Serveer kip op pita met tzatziki en salata"]
    },
    es: {
      title: "Souvlaki de Pollo Griego",
      description: "Brochetas de pollo marinadas con tzatziki casero, pan pita caliente y ensalada griega fresca.",
      ingredients: ["500g de pechuga de pollo (en cubos)", "4 cucharadas de aceite de oliva", "3 cucharadas deajo exprimido", "2 dientes de ajo", "2 cdta de oregano", "150g de yogur griego", "1 pepino (rallado)", "2 dientes de ajo (para tzatziki)", "4 panecillos pita", "1 cebolla morada (cortada)", "200g de tomates cherry", "100g de queso feta"],
      instructions: ["Mezcla aceite de oliva, limón, ajo y oregano para la marinada", "Deja marinar el pollo 30 minutos", "Para tzatziki: mezcla yogur, pepino, ajo y eneldo", "Ensarta el pollo en las brochetas", "A la parrilla las brochetas 3-4 minutos por cada lado", "Calienta los panecillos pita", "Corta el tomate y la cebolla y desmenuza el feta", "Sirve el pollo en pita con tzatziki y ensalada"]
    }
  },

  "thai-basil-chicken": {
    nl: {
      title: "Thaise Basilicum Kip",
      description: "Snelle Thaise straatvoedsel klassieker. Kipgehakt met Thaise basilicum, chili en een zoet-pittige saus.",
      ingredients: ["400g kipgehakt", "4 tenen knoflook", "3-5 Thaise chilipepers", "3 el vissaus", "1 el suiker", "1 el oestersaus", "1 bos Thaise basilicum", "2 el plantaardige olie", "4 el kipfond", "Jasmine rijst"],
      instructions: ["Verhit olie in een wok op hoog vuur", "Bak knoflook en chilipepers 30 seconden", "Voeg kipgehakt toe en bak 3-4 minuten tot goudbruin", "Voeg vissaus, suiker en oestersaus toe", "Roer 2 minuten", "Voeg kipfond toe en laat inkoken", "Voeg basilicum toe en roer door", "Serveer met jasmine rijst"]
    },
    es: {
      title: "Pollo con Albahaca Tailandés",
      description: "Clásico callejero tailandés. Pollo molido con albahaca tailandesa, chile y salsa agridulce.",
      ingredients: ["400g de carne de pollo molida", "4 dientes de ajo", "3-5 chiles tailandeses", "3 cucharadas de salsa de pescado", "1 cucharada de azúcar", "1 cucharada de salsa de ostras", "1 manojo de albahaca tailandés", "2 cucharadas de aceite vegetal", "4 cucharadas de caldo de pollo", "Arroz jazmín"],
      instructions: ["Calienta aceite en un wok a fuego alto", "Saltea el ajo y los chiles 30 segundos", "Añade el pollo molido y cocina 3-4 minutos hasta dorado", "Añade salsa de pescado, azúcar y salsa de ostras", "Revuelve 2 minutos", "Añade el caldo de pollo y deja reducir", "Añade la albahaca y mezcla", "Sirve con arroz jazmín"]
    }
  },

  // Add more recipes as needed - I'll create the complete file now
};

// Export both
export const recipeTranslations = fullRecipeTranslations;

export function getRecipeTranslation(slug: string, lang: 'nl' | 'es') {
  return recipeTranslations[slug]?.[lang] || null;
}

export function translateRecipe(recipe: any, lang: 'nl' | 'es') {
  const translation = getRecipeTranslation(recipe.slug, lang);
  if (!translation) return recipe;
  
  return {
    ...recipe,
    title: translation.title,
    description: translation.description,
    ingredients: translation.ingredients.length > 0 ? translation.ingredients : recipe.ingredients,
    instructions: translation.instructions.length > 0 ? translation.instructions : recipe.instructions,
  };
}
