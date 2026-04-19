const fs = require('fs');
const chroma = require('chroma-js');

const adjectives = ['Neon', 'Forest', 'Sand', 'Ocean', 'Glow', 'Monolith', 'Dream', 'Arcade', 'Haze', 'Latte', 'Cosmic', 'Velvet', 'Electric', 'Rustic', 'Lunar', 'Solar', 'Mystic', 'Crystal', 'Vibrant', 'Muted', 'Pastel', 'Dark', 'Light', 'Golden', 'Silver', 'Bronze', 'Copper', 'Iron', 'Steel', 'Cobalt', 'Crimson', 'Emerald', 'Sapphire', 'Ruby', 'Amethyst', 'Topaz', 'Opal', 'Pearl', 'Obsidian', 'Jade', 'Amber', 'Coral', 'Turquoise', 'Magenta', 'Cyan', 'Indigo', 'Violet', 'Rose', 'Peach', 'Mint', 'Lime', 'Olive', 'Teal', 'Navy', 'Maroon', 'Plum', 'Orchid', 'Lavender', 'Salmon', 'Khaki', 'Beige', 'Ivory', 'Ebony', 'Charcoal', 'Slate', 'Ash', 'Dust', 'Smoke', 'Fog', 'Mist', 'Cloud', 'Sky', 'Sea', 'Wave', 'Tide', 'Reef', 'Abyss', 'Void', 'Star', 'Galaxy', 'Nebula', 'Comet', 'Meteor', 'Asteroid', 'Planet', 'Moon', 'Sun', 'Dawn', 'Dusk', 'Twilight', 'Midnight', 'Noon', 'Morning', 'Evening', 'Night', 'Day', 'Spring', 'Summer', 'Autumn', 'Winter', 'Frost', 'Snow', 'Ice', 'Glacier', 'Tundra', 'Desert', 'Dune', 'Oasis', 'Mirage', 'Canyon', 'Valley', 'Mountain', 'Peak', 'Ridge', 'Cliff', 'Cave', 'Cavern', 'Grotto', 'Mine', 'Quarry', 'Ruins', 'Temple', 'Shrine', 'Palace', 'Castle', 'Fortress', 'Tower', 'Spire', 'Bridge', 'Gate', 'Wall', 'City', 'Town', 'Village', 'Street', 'Alley', 'Square', 'Plaza', 'Market', 'Bazaar', 'Port', 'Harbor', 'Dock', 'Pier', 'Ship', 'Boat', 'Sail', 'Anchor', 'Compass', 'Map', 'Globe', 'Atlas', 'Journey', 'Quest', 'Adventure', 'Expedition', 'Safari', 'Trek', 'Hike', 'Trail', 'Path', 'Road', 'Highway', 'Route', 'Track', 'Railway', 'Station', 'Train', 'Car', 'Bus', 'Truck', 'Bike', 'Plane', 'Jet', 'Rocket', 'Spaceship', 'Satellite', 'Probe', 'Rover', 'Drone', 'Robot', 'Cyborg', 'Android', 'Mecha', 'AI', 'Matrix', 'Network', 'Web', 'Internet', 'Data', 'Code', 'Byte', 'Pixel', 'Screen', 'Monitor', 'Display', 'Interface', 'UI', 'UX', 'Design', 'Art', 'Craft', 'Skill', 'Magic', 'Spell', 'Charm', 'Potion', 'Elixir', 'Poison', 'Venom', 'Toxin', 'Acid', 'Fire', 'Flame', 'Spark', 'Ember', 'Ash', 'Smoke', 'Cinder', 'Coal', 'Lava', 'Magma', 'Volcano', 'Earth', 'Stone', 'Rock', 'Pebble', 'Sand', 'Dust', 'Dirt', 'Mud', 'Clay', 'Soil', 'Grass', 'Leaf', 'Branch', 'Tree', 'Wood', 'Bark', 'Root', 'Seed', 'Flower', 'Petal', 'Bloom', 'Blossom', 'Fruit', 'Berry', 'Nut', 'Shell', 'Bone', 'Horn', 'Tooth', 'Claw', 'Scale', 'Feather', 'Wing', 'Tail', 'Fin', 'Gill', 'Eye', 'Heart', 'Soul', 'Mind', 'Spirit', 'Ghost', 'Phantom', 'Specter', 'Shadow', 'Shade', 'Darkness', 'Light', 'Gleam', 'Glow', 'Shine', 'Sparkle', 'Glitter', 'Shimmer', 'Radiance', 'Brilliance', 'Luminescence', 'Aura', 'Halo', 'Corona', 'Eclipse', 'Nova', 'Supernova', 'Quasar', 'Pulsar', 'Blackhole', 'Wormhole', 'Dimension', 'Realm', 'World', 'Universe', 'Cosmos', 'Multiverse', 'Infinity', 'Eternity', 'Time', 'Space', 'Matter', 'Energy', 'Force', 'Power', 'Strength', 'Might', 'Magic', 'Sorcery', 'Wizardry', 'Witchcraft', 'Alchemy', 'Science', 'Technology', 'Engineering', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Astronomy', 'Geology', 'Meteorology', 'Oceanography', 'Botany', 'Zoology', 'Ecology', 'Psychology', 'Sociology', 'Anthropology', 'History', 'Geography', 'Philosophy', 'Art', 'Music', 'Literature', 'Poetry', 'Drama', 'Dance', 'Film', 'Photography', 'Architecture', 'Sculpture', 'Painting', 'Drawing', 'Design', 'Fashion', 'Culinary', 'Sports', 'Gaming', 'Entertainment', 'Education', 'Business', 'Finance', 'Economics', 'Politics', 'Law', 'Medicine', 'Health', 'Fitness', 'Wellness', 'Travel', 'Tourism', 'Hospitality', 'Culture', 'Society', 'Community', 'Family', 'Friends', 'Love', 'Peace', 'Joy', 'Happiness', 'Hope', 'Faith', 'Courage', 'Wisdom', 'Knowledge', 'Truth', 'Justice', 'Freedom', 'Liberty', 'Equality', 'Fraternity', 'Solidarity', 'Unity', 'Harmony', 'Balance', 'Order', 'Chaos', 'Creation', 'Destruction', 'Life', 'Death', 'Birth', 'Rebirth', 'Evolution', 'Revolution', 'Transformation', 'Change', 'Growth', 'Decay', 'Cycle', 'Rhythm', 'Pattern', 'Structure', 'Form', 'Shape', 'Color', 'Texture', 'Sound', 'Silence', 'Motion', 'Stillness', 'Space', 'Time', 'Energy', 'Matter', 'Mind', 'Body', 'Spirit', 'Soul', 'Heart', 'Brain', 'Eye', 'Ear', 'Nose', 'Mouth', 'Hand', 'Foot', 'Skin', 'Bone', 'Blood', 'Breath', 'Voice', 'Word', 'Thought', 'Feeling', 'Emotion', 'Desire', 'Passion', 'Love', 'Hate', 'Fear', 'Anger', 'Sadness', 'Joy', 'Surprise', 'Disgust', 'Trust', 'Anticipation'];

const generatePalette = (id) => {
  const baseHue = Math.random() * 360;
  const type = Math.random();
  let colors = [];
  
  if (type < 0.25) {
    colors = [
      chroma.hsl((baseHue - 30 + 360) % 360, 0.7, 0.5).hex(),
      chroma.hsl(baseHue, 0.7, 0.5).hex(),
      chroma.hsl((baseHue + 30) % 360, 0.7, 0.5).hex(),
      chroma.hsl((baseHue + 60) % 360, 0.7, 0.5).hex()
    ];
  } else if (type < 0.5) {
    colors = [
      chroma.hsl(baseHue, 0.8, 0.2).hex(),
      chroma.hsl(baseHue, 0.7, 0.4).hex(),
      chroma.hsl(baseHue, 0.6, 0.6).hex(),
      chroma.hsl(baseHue, 0.5, 0.8).hex()
    ];
  } else if (type < 0.75) {
    colors = [
      chroma.hsl(baseHue, 0.7, 0.5).hex(),
      chroma.hsl((baseHue + 120) % 360, 0.7, 0.5).hex(),
      chroma.hsl((baseHue + 240) % 360, 0.7, 0.5).hex(),
      chroma.hsl(baseHue, 0.3, 0.8).hex()
    ];
  } else {
    colors = [
      chroma.hsl(baseHue, 0.8, 0.4).hex(),
      chroma.hsl(baseHue, 0.6, 0.7).hex(),
      chroma.hsl((baseHue + 180) % 360, 0.8, 0.4).hex(),
      chroma.hsl((baseHue + 180) % 360, 0.6, 0.7).hex()
    ];
  }

  const name1 = adjectives[Math.floor(Math.random() * adjectives.length)];
  const name2 = adjectives[Math.floor(Math.random() * adjectives.length)];
  
  return {
    id,
    name: `${name1} ${name2}`,
    colors: colors.map(c => c.toUpperCase())
  };
};

let content = fs.readFileSync('src/data/palettes.ts', 'utf8');
content = content.replace(/\];\s*$/, '');

const newPalettes = [];
for (let i = 163; i <= 212; i++) {
  newPalettes.push(generatePalette(i));
}

const newContent = newPalettes.map(p => ',\n  ' + JSON.stringify(p, null, 2).split('\n').join('\n  ')).join('') + '\n];\n';

fs.writeFileSync('src/data/palettes.ts', content + newContent);
console.log('Appended 50 palettes');
