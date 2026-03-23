export const menuSections = [
  {
    id: 'german',
    label: 'Bavarian Classics',
    icon: '🥨',
    items: [
      {
        id: 'schnitzel',
        name: 'Jaeger Schnitzel',
        description: 'Pan-fried pork schnitzel topped with rich mushroom gravy, served with red cabbage, sauerkraut, and roasted potatoes.',
        price: '$22',
        tag: 'House Favorite',
        // Golden crispy schnitzel — perfect match
        image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?auto=format&fit=crop&w=800&q=90',
      },
      {
        id: 'rouladen',
        name: 'Beef Rouladen',
        description: 'Thinly sliced beef rolled with bacon, onions, and pickles, slow-braised in a savory red wine sauce.',
        price: '$24',
        tag: "Chef's Pick",
        // Rich braised beef dish — dark sauce, elegant
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=90',
      },
      {
        id: 'bratwurst',
        name: 'Bratwurst Platter',
        description: 'Grilled house bratwurst served with sauerkraut, whole-grain mustard, and fresh-baked pretzel bread.',
        price: '$18',
        tag: 'Classic',
        // Grilled sausages on board — rustic and hearty
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=90',
      },
      {
        id: 'napoleon',
        name: 'Napoleon Schnitzel',
        description: 'A generous schnitzel topped with tomato, pepperoncini, and melted cheese — bold, hearty, and unforgettable.',
        price: '$23',
        tag: 'Popular',
        // Hearty meat dish with toppings
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&w=800&q=90',
      },
    ],
  },
  {
    id: 'american',
    label: 'Haus Favorites',
    icon: '🥩',
    items: [
      {
        id: 'reuben',
        name: 'Famous Reuben Sandwich',
        description: 'Our legendary house-brined corned beef piled high with sauerkraut, Swiss cheese, and thousand island on rye.',
        price: '$16',
        tag: 'Legend',
        // Classic stacked deli sandwich
        image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=90',
      },
      {
        id: 'steak',
        name: 'Haus Steak',
        description: 'Grilled to order, served with grilled vegetables, fresh-baked bread, Haus salad, and your choice of baked potato.',
        price: '$28',
        tag: 'Signature',
        // Premium steak with perfect sear
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=90',
      },
      {
        id: 'pasta',
        name: 'House Pasta',
        description: 'Rotating seasonal pasta with house-made sauce, served with fresh bread and Haus salad.',
        price: '$17',
        tag: 'Daily Special',
        // Rustic pasta with herbs
        image: 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?auto=format&fit=crop&w=800&q=90',
      },
    ],
  },
  {
    id: 'beer',
    label: 'Beer & Drinks',
    icon: '🍺',
    items: [
      {
        id: 'german-beer',
        name: 'German Draft Beer',
        description: 'Rotating selection of imported German lagers, hefeweizens, and dark beers on tap.',
        price: '$7–$10',
        tag: 'Draft',
        // Two golden German beers — perfect Bavarian shot
        image: 'https://images.unsplash.com/photo-1436076863939-06870fe779c2?auto=format&fit=crop&w=800&q=90',
      },
      {
        id: 'craft',
        name: 'Local Craft Beer',
        description: "Curated selection of Pacific Northwest craft beers celebrating Washington's finest breweries.",
        price: '$6–$9',
        tag: 'Local',
        // Craft beer bottles bar atmosphere
        image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?auto=format&fit=crop&w=800&q=90',
      },
      {
        id: 'pretzel',
        name: 'Giant Pretzel & Beer Cheese',
        description: 'Warm house-baked pretzel served with our signature beer cheese dipping sauce — perfect with any draft.',
        price: '$12',
        tag: 'Must Try',
        // Classic German pretzel — rustic dark background
        image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=90',
      },
    ],
  },
];

export const featuredDishes = [
  { id: 1, name: 'Jaeger Schnitzel',  tagline: 'Our most-ordered dish',    icon: '🥩' },
  { id: 2, name: 'Famous Reuben',     tagline: 'Best in Leavenworth',      icon: '🥪' },
  { id: 3, name: 'Bratwurst Platter', tagline: 'Authentic & hearty',       icon: '🌭' },
  { id: 4, name: 'Giant Pretzel',     tagline: 'Perfect with a cold beer', icon: '🥨' },
];
