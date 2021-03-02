const Discord = require('discord.js');
const Pack = require('./pack.js');
const Deck = require('./deck.js');
const mysql = require('mysql');
const ms = require('ms');
const bot = new Discord.Client();
const fs = require('fs');
const CronJob = require('cron').CronJob;

const token = "token-goes-here";
//const token = "token-goes-here";

const PREFIX = "k!";
const PREFIXU = "K!";

//folders containing commands, decks, and packs
bot.commands = new Discord.Collection();
bot.decks = new Discord.Collection();
bot.packs = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);

    bot.commands.set(command.name, command);
}

const deckFiles = fs.readdirSync('./decks/').filter(file => file.endsWith('.js'));
for(const file of deckFiles){
    const deck = require(`./decks/${file}`);

    bot.decks.set(deck.name, deck);
}

const packFiles = fs.readdirSync('./packs/').filter(file => file.endsWith('.js'));
for(const file of packFiles){
    const pack = require(`./packs/${file}`);

    bot.packs.set(pack.name, pack);
}

//login to database 
//password given by "password" in the config
//database given by "database" in the config

var con = mysql.createConnection({
    host: "host-goes-here",
    user: "user-name-here",
    password: "password-here",
    database: "database-name-here"
});

/*
var con = mysql.createConnection({
    host: "host",
    user: "user",
    database: "database"
});
*/

//Variables used for commands and such
var coconut = [];
var walnut = [];
var challengers = [];
var challenge = [];
var tcoconut = [];
var twalnut = [];
var tchallengers = [];
var tchallenge = [];
var rcoconut = [];
var rwalnut = [];
var rchallengers = [];
var rchallenge = [];
var ecoconut = [];
var ewalnut = [];
var echallengers = [];
var echallenge = [];
var acoconut = [];
var awalnut = [];
var achallengers = [];
var achallenge = [];
var tagcoconut1 = [];
var tagcoconut2 = [];
var tagcoconut3 = [];
var tagwalnut = [];
var tagchallengers = [];
var tagchallenge1 = [];
var tagchallenge2 = [];
var tagchallenge3 = [];
var chatPoints = 3;
const packlist = ["pduel","sinfinity","ejustice","sinfinity","tourney1","custom6","lostm","cyrev","elenergy","custom5","custom4","rdestiny","feternity","soulduel","asanctuary","ichaos","destinedroads","swordmasters","custom3","db1","pguardian","dcrisis","magicforce","legendblue","magicruler","metalraider","dailypack", "custom1","dark","light","earth","water","wind","pservant","labnight","ldarkness","demonstuff","newbeginnings"];

const secret = ["Obelisk the Tormentor","Slifer the Sky Dragon","The Winged Dragon of Ra","Five Headed Dragon","Dragon Master Knight"];
const common = ["Avalanching Aussa","Batteryman D","Blazing Hiita","Cyber Kirin","Cyber Prima","Cyber Tutu","D - Shield","D - Time","Elemental Absorber","Elemental HERO Mariner","Elemental Recharge","Grand Convergence","Guard Dog","Harpie's Pet Baby Dragon","Layard the Liberator","Majestic Mech - Senku","Misfortune","Power Capsule","Raging Eria","Royal Knight","Searchlightman","Shattered Axe","Storming Wynn","Whirlwind Weasel","Abaki","Alien Infiltrator","Allure Queen LV3","Blast Asmodian","Blasting Fuse","Byroad Sacrifice","Chain Detonation","Chain Healing","Combo Fighter","Corruption Cell 'A'","Counter Cleaner","Dark Lucius LV4","Dimensional Inversion","Flame Ogre","Level Down!?","Linear Accelerator Cannon","Man Beast of Ares","Queen's Bodyguard","Ritual Foregone","Senet Switch","Straight Flush","Stray Asmodian","Trojan Blast","Vanity's Call","Alien Grey","Alien Hunter","Alien Skull","Ambulanceroid","Bitelon","Black Ptera","Brainwashing Beam","Chrysalis Dolphin","Common Soul","Contact","Crop Circles","D - Chain","D - Spirit","Decoyroid","Destiny HERO - Blade Master","Destiny HERO - Defender","Destiny Mirage","Fake Hero","Flying Saucer Muusik'i","Fossil Excavation","Miracle Jurassic Egg","Orbital Bombardment","Rallis the Star Bird","Rescueroid","Royal Writ of Taxation","Spell Calling","synthetic Seraphim","The Paths of Destiny","Vehicroid Connection Zone","Wonder Garage","Adhesive Explosive","Ancient Gear","Ancient Gear Cannon","Ancient Gear Drill","Beelze Frog","Chain Thrasher","D.D. Guide","Damage Condenser","Disciple of the Forbidden Spell","Full Salvo","Generation Shit","Goblin Out of the Frying Pan","Gokipon","Grass Phantom","Hero Heart","Hero Kid","Magnet Circle LV2","Malfunction","Malice Ascendant","Miracle Kids","Next to be Lost","Option Hunter","Parasitic Ticky","Sand Moth","Silent Insect","Success Probability 0%","Super Junior Confrontation","Trial of the Princess","A Rival Appears","Batteryman C","Conscription","Cybernetic Cyclopean","Cycroid","Dark Catapulter","Des Croaking","Des Frog","Doitsu","Fire Darts","Jerry Beans Man","Jet Roid","Mad Lobster","Patroid","Poison Draw Frog","Pot of Generosity","Prepare to Strike Back","Protective Soul Ailin","Shien's Spy","Soitsu","Spiritual Earth Art - Kurogane","T.A.D.P.O.L.E","Blade Skater","Bonding - H2O","Boss Rush","Branch!","Chthonian Alliance","Chthonian Blast","Chthonian Polymer","Dark Deal","Etoile Cyber","Feather Shot","Feather Wind","Infernal Incinerator","Jack's Knight","Level Limit - Area A","Level Modulation","Nanobreaker","Ojamagic","Ojamuscle","Queen's Knight","Roll Out!","Simultaneous Loss","The League of Uniform Nomenclature","V-Tiger Jet","W-Wing Catapult","Weed Out","Zure, Knight of Dark World","Battery Charger","Des Wombat","Double Attack","Elemental HERO Avian","Elemental HERO Burstinatrix","Elemental HERO Clayman","Elemental HERO Sparkman","Final Ritual of Ancients","Gift of the Martyr","Grave Lure","Hero Signal","Impenetrable Formation","Kaminote Blow","Kozky's Self-Destruct Button","Legendary Black Belt","Level Conversion Lab","Lone Wolf","Lost Guardian","Medusa Worm","Mine Golem","Minefield Eruption","Mispolymerization","Moai Interceptor Cannons","Nitro Unit","Pikeru's Second Sight","Shifting Shadows","Spell-Stopping Statue","Token Feastevil","White Ninja","Mystical Elf","Feral Imp","Winged Dragon, Guardian of the Fortress #1","Beaver Warrior","Celtic Guardian","Gaia the Fierce Knight","Great White","Giant Soldier of Stone","Mystic Clown","Neo the Magic Swordsman","Gazelle the King of Mythical Beasts","Warrior Dai Grepher","Man-Eater Bug","Giant Rat","Dian Keto the Cure Master","The Reliable Guardian","Malevolent Nuzzler","Magic Jammer","Seven tools of the Bandit","The Eye of Truth","Backup Soldier","Disappear","Battle Ox","Koumori Dragon","Rogue Doll","Kojikocy","Uraby","Mystic Horseman","Ryu-Kishin Powered","Skull Red Bird","Hyozanryu","Opticlops","The Dragon Dewlling in the Cave","Luster Dragon #2","Mysterious Puppeteer","Trap Master","Hane-Hane","Spirit Ryu","Ookazi","De-Spell","The Inexperianced Spy","Mountain","Gift of the Mystical Elf","Light of Intervention","Jar of Greed","Riryoku Field","Burst Breath","Twin-Headed Behemoth","The Graveyard in the Fourth Dimension","The Dragon's Bead","Trap Jammer","Curse of Anubis","Master Kyonshee","Despair from the Dark","UFO Turtle","Little Chimera","Molten Zombie","Fox Fire","Molten Destruction","Dark Room of Nightmare","Meteor of Destruction","Spell Shield Type-8","Backfire","Space Mombo","Mother Grizzly","Star Boy","Amphibious Bugroth MK-3","Creeping Doom Manta","Big Wave Small Wave","Xing Zhen Hu","Insect Queen","Archfiend of Gilfer","Machine King","Restructer Revolution","Sengenjin","Lord of the Lamp","Greenkappa","Luminous Soldier","Magical Thorn","Trap of Board Eraser","Tornado Bird","Curse of Royal","Winged Sage Falcos","Dark Designator","Fairy King Truesdale","Cipher Soldier","Sebek's Blessing","Sword of Dragon Soul","Twinheaded Beast","Inferno Hammer","Teva","Watapon","Familiar Knight","D. Tribe","A-Team: Trap Disposal Unit","Bokoichi the Freightening Car","Creeping Doom Manta","Eagle Eye","Flint","Fox Fire","Fruits of Kozaky's Studies","Harpie Girl","Heavy Mech Support Platform","Lighten the Load","Mighty Guard","Mind Haxorz","Pikeru's Circle of Enchantment","Raging Flame Sprite","Rare Metalmorph","Roc from the Valley of Haze","Spell Purification","Tactical Espionage Expert","Tragedy","Triangle Ecstasy Spark","Ultimate Insect LV3","Woodborg Inpachi","Abare Ushioni","Beast Soul Swap","Catnipped Kitty","Centrifugal Field","Chu-Ske the Mouse Fighter","Elemental Burst","Firebird","Fulfillment of the Contract","Hand of Nephthys","Hyena","kangaroo Champ","Maji-Gire Panda","Poison Fangs","Pole Position","Re-Fusion","Release Restraint","Shadowslayer","Space Mambo","Ultimate Insect LV5","Absolute End","Abyssal Designator","Cemetary Bomb","Charcoal Inpachi","Dark Mimic LV1","Enraged Muka Muka","Goblin Calligrapher","Gorgon's Eye","Heavy Slump","Horus the Black Flame Dragon LV4","Howling Insect","Malice Doll of Demise","Mind on Air","Mind Wipe","Mystic Swordsman LV2","Nobleman-Eater Bug","Ritual Weapon","Skull Dog Marron","Taunt","The Graveyard in the Fourth Dimension","Two-Man Cell Battle","Ultimate Baseball Kid","Ultimate Insect Lv1","3-Hump Lacoda","7","Arcane Archer of the Forest","Aswan Apparition","Atomic Firefly","Blessings of the Nile","Delta Attacker","Desert Sunlight","Desertapir","Disc Fighter","Dora of Fate","Earthquake","Elephant Statue of Blessing","Emissary of the Oasis","Fiend Scorpion","Gigobyte","Goblin King","Goblin Thief","Human-Wave Tactics","Judgment of the Desert","KA-2 Des Scissors","Kozaky","Lady Ninja Yae","Legendary Jujitsu Master","Man-Thro' Tro'","Mermaid Knight","Metal Armored Bug","Micro Ray","Mokey Mokey","Mystical Shine Ball","Mystic Wok","Nubian Guard","Opti-Camouflage Armor","Pharaoh's Servant","Pharaonic Protector","Piranha Army","Sand Gambler","Sealmaster Meisei","Solar Ray","Sonic Jammer","Soul-Absorbing Bone Tower","Spirit Caller","Sword of the Soul-Eater","The Kick Man","The Law of Normal","The Unhappy Girl","Thousand Energy","Triangle Power","Two Thousand Needles","Weapon Change","White Magician Pikeru","A Hero Emerges","Anti-Aircraft Flower","Begone, Knave!","Big Koala","Bowganian","Burning Algae","Chaosrider Gustaph","Coach Goblin","D.D. Borderline","Destruction Ring","Dimension Distortion","Don Turtle","Drillago","Earth Chant","Fiends Hand Mirror","Gale Lizard","Giga Gagagio","Gigantes","Gryphon's Fether Duster","Hyper Hammerhead","Insect Princess","Jade Insect Whistle","Lekunga","Lord Poison","Molten Zombie","Multiplication of Ants","Neo Bug","Ojama Black","Ojama Delta Hurricane!!","Ojama Yellow","Pinch Hopper","Recycle","Ryu Kokki","Sasuke Samurai #3","Sea Serpent Warrior of Darkness","Soul Tiger","Spatial Collapse","Spirit of the Pot of Greed","Strike Ninja","Stumbling","Terrorking Salmon","Thunder Crash","Torpedo Fish","Tower of Babel","Trap Jammer","Wild Nature's Release","Witch Doctor of Chaos","Yellow Luster Shield","Zero Gravity","Trap Hole","Mask of Weakness","Stim-Pack","Magic Jammer","Legendary Sword","Goblin's Secret Remedy","Jar of Greed","Big Shield Gardna","Gearfried the Iron Knight","Armed Ninja","Crimson Ninja","Queen's Knight","Warrior Dai Grepher","Axe Raider","Dark Blade","Jack's Knight","Amazoness Fighter","King's Knight","Stop Defence","Suijin","Sword Hunter","Swordsman of Landstar","Tailor of the Fickle","The Cheerful Coffin","The Earl of Demise","The Eye of Truth","The Forgiving Maiden","The Gross Ghost of Fled Dreams","The Portrait's Secret","The Reliable Guardian","The Shallow Grave","Thousand-Eyes Idol","Toll","Toon Mermaid","Toon World","Tornado Wall","Type Zero Magic Crusher","UFO Turtle",
"Umi","Umiiruka","Upstart Goblin","Uraby","Vampire Baby","White Magical Hat","Winged Dragon, Guardian of the Fortress #1","Worm Drake","Masaki the Legendary Swordsman","Mask of Brutality","Mask of Darkness","Mask of Dispel ","Mask of Restrict","Masked Sorcerer","Melchid the Four-Faced Beast","Messenger of Peace","Minar","Minor Goblin Official","Mirror Wall","Molten Destruction","Mystic Lamp","Mystic Plazma Zone","Mystical Elf","Nobleman of Extermination","Numinous Healer","Nuvia the Wicked","Parasite Paracide","Penguin Knight","Petit Moth","Polymerization","Rain of Mercy","Reaper of the Cards","Red Archery Girl","Red Medicine","Respect Play","Return of the Dommed","Rising Air Current","Rush Recklessly","Sangan of the Thunder","Scroll of Bewitchment","Senju of the Thousand Hands","Shadow of Eyes","Shift","Shining Abyss","Silver Fang","Skull Invitation","Skull Servant","Sky Scout","Slot Machine","Solemn Wishes","Sonic Bird","Soul Release","Spirit of the Breeze","St. Joan","Gaia Power","Gamble","Giant Germ","Giant Soldier of Stone","Gift of The Mystical Elf","Gradius","Grand Tiki Elder","Gravekeeper's Servant","Graverobber","Gravity Bind","Griggle","Ground Collapse","Hane-Hane","Harpie Lady","Harpie Lady Sisters","Headless Knight","Hinotama","Hiro's Shadow Scout","Hitotsu-Me Giant","Horn of Light","Horn of the Unicorn","Humanoid Slime","Hyozanryu","Hysteric Fairy","Infinite Cards","Infinite Dismissal","Insect Barrier","Invader of the Throne","Jam Breeding Machine","Jam Defender","Jinzo #7","Karate Man","Kazejin","Kiseitai","Kojikocy","Kotodama","Labyrinth Wall","Larvae Moth","Light of Intervention","Lightforce Sword","Lightning Blade","Luminous Spark","Maha Valio","Malevolent Nuzzler","Mammoth Graveyard","Manga Ryu-Ran","Amazoness Archer","Ameba","Amphibian Beast","Aqua Madoor","Armored Lizard","Armored Zombie","Attack and Receive","Backup Soldier","Beaver Warrior","Big Eye","Blast Juggler","Bombardment Beetle","Burning Land","Celtic Guardian","Ceremonial Bell","Chain Destruction","Chain Energy","Chorus of Sanctuary","Chosen One","Cocoon of Evolution","Cure Mermaid","Curse of Dragon","Curse of the Masked Beast","Dancing Fairy","Dark King of the Abyss","Darklord Marie","Deepsea Warrior","Dimensionhole","DNA Surgery","Dragon Capture Jar","Drill Bug","Earthbound Spirit","Electric Snake","Elegant Egotist","Enchanted Javelin","Eternal Rest","Fairy Box","Fairy's Hand Mirror","Fake Trap","Feral Imp","Final Destiny","Fire Princess","Flame Manipulator","Flash Assailant","Flying Kamakiri #1","Forced Requisition","Aqua Madoor","Armed Ninja","Black Pendant","Castle Walls","Dark Elf","Darkfire Dragon","De-Spell","Dragon Capture Jar","Enchanted Javelin","Final Flame","Fissure","Giant Soldier of Stone","Goblin's Secret Remedy","Hane-Hane","Horn of Heaven","Hrio's Shadow Scout","Illusionist Faceless Mage","Jack's Knight","Jigen Bakudan","Kanan the Swordmistress","Karate Man","Karbonala Warrior","Kwagar Hercules","Mad Sword Beast","Man-Eater Bug","Muka Muka","Nimble Momonga","Patrol Robo","Queen's Knight","Red Archery Girl","Reinforcements","Remove Trap","Ring of Megnetism","Ryu-Ran","Stop Defense","Toon Alligator","Trap Hole","Uraby","Victory Dragon","Yami","Adhesion Trap Hole","Aitsu","Ante","Anti-Spell","Armor Exe","Burning Beast","Cat's Ear Tribe","Continuous Destruction Punch","Dark Cat with White Tail","Demotion","Des Dendle","Exhausting Spell","Formation Union","Freezing Beast","Gather Your Mind","Hidden Spellbook","Huge Revolution","Jar Robber","Kishido Spirit","Koitsu","Magical Plant Mandragola","Metalsilver Armor","Meteorain","Miracle Restoring","Neko Mane King","Oppressed People","People Running About","Physical Double","Pinapple Blast","Pixie Knight","Raregold Armor","Remove Brainwashing","Second Goblin","Senri Eye","The Spell Absorbing Life","Thunder of Ruler","Union Rider","United Resistance","Vampiric Orchis","White Dragon Ritual","X- Head Cannon","Y-Dragon Head","Z-Metal Tank","Zombie Tiger","A Deal with Dark Ruler","Acrobat Monkey","Altar for Tribute","Arsenal Robber","Battle Footballer","Battle-Scarred","Contact with Exodia","Contact with the Abyss","Contact with the Dark Master","Cyber Raider","D.D. Trainer","Dark Scorpion Combination","Darkbishop Archfiend","Dice Re-Roll","Different Dimension Gate","Fairy of the Spring","Final Attack Orders","Goblin of Greed","Guardian Elma","Gyaku-Gire Panda","Incandescent Ordeal","InfernalQueen Archfiend","Kelbek","Keldo","Little-Winguard","Metallizing Parasite - Lumanite","Morale Boost","Mustering of the Dark Scorpions","Non-Spellcasting Area","Ojama Green","Outstanding Dog Marron","Pandemonium Watchbear","Precious Cards from Beyond","Ray of Hope","Rod of Silence - Kay'est","Sasuke Samurai #2","Spell Vanishing","Staunch Defender","Thousand Needles","Token Thanksgiving","Vilepawn Archfiend","Zolga","8-Claws Scorpion","An Owl of Luck","Bottomless Shifiting Sands","Buster Rancher","Card Shuffle","Cobraman Sakuzy","Curse of Aging","Curse of Royal","Dark Designator","Dark Snake Syndrome","Distirbance Strategy","Great Axe Mummy","Gora Turtle","Gravekeeper's Chief","Gravekeeper's Curse","Gravekeeper's Vassal","Gravekeeper's Watcher","Hieroglyph Lithograph","Kryuel","Molten Behemoth","Nightmare Horse","Non Aggression Area","Ordeal of a Traveler","Pharaoh's Treasure","Poison Mummy","Pyramid Energy","Pyro Clock of Destiny","Reaper on the Nightmare","Reckless Greed","Reversal Quiz","Rope of Life","Royal Keeper","Secret Pass to the Treasure","Servant of Catabolism","Shapesnatch","Souleater","Swarm of Locusts","Swarm of Scarabs","Timeater","Timidity","Trap of Board Eraser","Tutan Mask","Wandering Mummy","Winged Sage Falcos","Yomi Ship","Bean Soldier","Blue Medicine","Call of the Grave","Cockroach Knight","Corroding Shark","Cyber Soldier of Darkworld","Dancing Elf","Dharma Cannon","Fairy's Gift","Faith Bird","Fyling Penguin","Garoozis","Giant Flea","Goblin Fan","Hercules Beetle","Kuwagata a","Kwager Hercules","Megasonic Eye","Novox's Prayer","Oscillo Hero","Parrot Dragon","Patrol Robo","Queen of Autumn Leaves","Raimei","Revival of Dokurider","Shining Friendship","Sky Dragon","Slime Toad","Sonic Maid","Spirit of the Books","Stuffed Animal","Takriminos","Takuhee","The Judgement Hand","The Statue of Easter Island","Three-Legged Zombies","Tiger Axe","Turtle Bird","Turu-Purun","Ushi Oni","Warrior of Tradition","Water Magician","Wattkid","White Hole","Winged Dragon, Guardian of the Fortress #2","Wodan the Resident of the Forest","Wow Warrior","Yamadron","Yaranzo","A Feint Plan","After the Struggle","Bark of Dark Ruler","Blast with Chain","Bubble Crash","Burst Breath","Cave Dragon","Convulsion of Nature","Disappear","Double Snare","Dragon Manipulator","Dargon's Gunfire","Emergency Provisions","Fatal Abacus","Fengshen Mirror","Frontier Wiseman","Fushi No Tori","Gradius' Option","Gray Wing","Great Long Nose","Heart of Clear Water","Lesser Fiend","Life Absorbing Machine","Lizard Soldier","Magic Reflector","Mysterious Guard","Otohime","Possessed Dark Soul","Robolady","Robotic Knight","Roboyarou","Ryu-Kishin Clown","Serpentine Princess","Shadow Tamer","Skull Knight #2","Smoke Grenade of the Theif","Soul Demolition","Spirit Ryu","Spring of Rebirth","The Dragon Swelling in the Cave","The Dragon's Bead","The Hunter With 7 Weapons","The Illusory Gentleman","The Secret of the Bandit","Throwstone Unit","Twin-Headed Wolf","Winged Minion","Wolf Axewielder","Woodland Sprite","Amazoness Archer","Bait Doll","Bio-Mage","Boneheimer","Crimson Sentry","Curse of the Masked Beast","Cyclon Laser","Deal of Phantom","Dragonic Attack","Dreamsprite","Earthbound Spirit","Ekibyo Drakmord","Fairy Guardian","Fire Sorcerer","Flame Dancer","Flying Fish","Gadget Soldier","Grand Tiki Elder","Graverobber's Retribution","Headless Knight","Infinite Cards","Lady Panther","Lightning Blade","Lightning Conger","Maryokutai","Mask of Weakness","Melchid the Four-Faced Beast","Miricle Dig","Return of the Doomed","Riryoku Field","Scroll of Bewitchment","Spherous Lady","Spirit Elimination","Summoner of Illusions","Supply","Swordsman of Landstar","The Dark Door","The Emperor's Holiday","The Gross Ghost of Fled Dreams","The Portrait's Secret","The Rock Spirit","The Unfriendly Amazon"," Tornado Bird","Vengeful Bog Spirit","Worm Drake","7 Completed","Armored Glass","Attack and Receive","Bite Shoes","Bombardment Beetle","Cyber Falcon","Dark Bat","Deepsea Warrior","Dimensionhole","Dokuroyaiba","Drill Bug","Earthshaker","Enchanted Javelin","Flying Kamakiri #2","Gamble","Gift of The Mystical Elf","Girochin Kuwagata","Gradius","Ground Collapse","Gust","Infinite Dismissal","Insect Barrier","Insect Imitation","Inspection","Invatation to a Deep Sleep","Island Turtle","Kiseitai","Light of Intervention","Lightforce Sword","Magical Hats","Major Riot","Metal Detector","Minor Goblin Official","Mr. Volcano","Mystic Probe","Numinous Healer","Oni Tank T-34","Rain of Mercy","Respect Play","Science Soldier","Shadow of Eyes","Shift","Skull Mariner","Solemn Wishes","Solomon's Lawbook","Souls of the Forgotten","Spikebot","Steel Ogre Grotto #2","The All-Seeing White Tiger","The Eye of Truth","Thousand-Eyes Idol","Three-Headed Geedo","Type Zero Magic Crusher","Vampire Baby","World Suppression","Sand Stone","Hitotsu-Me Giant","Skull Servant","Celtic Guardian","Basic Insect","Mammoth Graveyard","Silver Fang","Dark Gray","Trial of Nightmare","Nemuriko","The 13th Grave","Charubin the Fire Knight","Flame Manipulator","Monster Egg","Firegrass","Darkfire Dragon","Dark King of the Abyss","Fiend Reflection #2","Fusionist","Turtle Tiger","Petit Dragon","Petit Angel","Hinotama Soul","Aqua Madoor","Kagemusha of the Blue Flame","Flame Ghost","Two-Mouth Darkruler","Dissolverock","Root Water","The Furious Sea King","Green Phantom King","Ray & Temperature","King Fog","Mystical Sheep #2","Masaki the Legendary Swordsman","Kurama","Red Medicine","Sparks","Hinotama","Tyhone","Beaver Warrior","Gravedigger Ghoul","Karbonala Warrior","Uraby","Reaper of the Cards","Witty Phantom","Larvas","Hard Armor","Man Eater","M-Warrior #1","M-Warrior #2","Spirit of the Harp","Armaill","Terra the Terrible","Frenzied Panda","Kumootoko","Meda Bat","Enchanting Mermaid","Fireyarou","Dragoness the Wicked Knight","One-Eyed Shield Dragon","Dark Energy","Laser Cannon Armor","Vile Germs","Silver Bow and Arrow","Dragon Treasure","Electro-Whip","Mystical Moon","Stop Defense","Machine Conversion Factory","Raise Body Heat","Follow Wind","Goblin's Secret Remedy","Metal Dragon","Spike Seadra","Tripwire Beast","Skull Red Bird","Armed Ninja","Flower Wolf","Misairuzame","Steel Ogre Grotto #1","Lesser Dragon","Darkworld Thorns","Drooling Lizard","Armored Starfish","Succubus Knight","Ancient Elf","Ryu-Kishin","Ancient Telescope","Shield & Sword","Ansatsu","Skull Red Bird","Armored Lizard","Sogen","Baby Dragon","Sorcerer of the Doomed","Baron of the Fiend Sword","Swordsman of Landstar","Beaver Warrior","Terra the Terrible","Block Attack","The Inexperienced Spy","Book of Secret Arts","The Reliable Guardian","Castle Walls","The Stern Mystic","Celtic Guardian","The Wicked Worm Beast","Claw Reacher","D. Human","Unknown Warrior of Fiend","Dark Assailant","Uraby","Dark Energy","Winged Dragon, Guardian of the Fortress #1","Dark Titan of Terror","Witty Phantom","De-Spell","Destroyer Golem","Doma the Angel of Silence","Dragon Treasure","Eternal Rest","Fake Trap","Feral Imp","Flame Manipulator","Flame Swordsman","Gyakutenno Megami","Hitotsu-Me Giant","Karate Man","Kojikocy","Koumori Dragon","Magical Ghost","Mammoth Graveyard","Masaki the Legendary Swordsman","Master & Expert","Mountain","Mysterious Puppeteer","Mystic Clown","Mystic Horseman","Ogre of the Black Shadow","Pale Beast","Princess of Tsurugi","Remove Trap","Rude Kaiser","Ameba","Ancient One of the Deep Forest","Black Illusion Ritual","Black Pendant","Boar Soldier","Ceremonial Bell","Commencement Dance","Dark Witch","Dark Zebra","Darkness Approaches","Eatgaboon","Electric Snake","Eternal Rest","Fairy's Hand Mirror","Fire Kraken","Flash Assailant","Giant Turtle Who Feeds on Flames","Griggle","Guardian of the Throne Room","Hamburger Recipe","High Tide Gyojin","Hiro's Shadow Scout","Horn of Light","Horn of the Unicorn","House of Adhesive Tape","Invader of the Throne","Jigen Bakudan","Karate Man","Kotodama","Liquid Beast","Magical Labyrinth","Mechanical Snail","Metal Fish","Minar","Octoberser","Peacock","Penguin Knight","Performance of Sword","Psychic Kappa","Queen Bird","Red Archery Girl","Snake Fang","Spear Cretin","Stone Ogre Grotto","Tailor of the Fickle","The Reliable Guardian","Turtle Oath","Twin Long Rods #2","Tyhone #2","Wall Shadow","Weather Report","Whiptail Crow","Ancient Brain","Ancient Elf","Ancient Lizard Warrior","Armored Lizard","Bickuribox","Bladefly","Blast Juggler","Block Attack","Blue-Winged Crown","Bottom Dweller","Cannon Soldier","Cyber Saurus","Dark Elf","Deepsea Shark","Destroyer Golem","Disk Magician","Dragon Piper","Dream Clown","Electric Lizard","Empress Judge","Fake Trap","Feral Imp","Flame Cerberus","Garnecia Elefantis","Gazelle the King of Mythical Beasts","Germ Infection","Giga-Tech Wolf","Giltia the D. Knight","Ground Attacker Bugroth","Guardian of the Labyrinth","Harpie Lady","Hibikime","Hoshiningen","Hunter Spider","Hyosube","Illusionist Faceless Mage","Insect Soldiers of the Sky","Jinzo #7","Kaminari Attack","Killer Needle","Labyrinth Tank","Lady of Faith","Larvae Moth","Launcher Spider","Leghul","Leogun","Little Chimera","Masked Sorcerer","Mega Thunderball","Milus Radiant","Morinphen","Muka Muka","Mushroom Man #2","Musician King","Mystic Lamp","Niwatori","Ocubeam","Ooguchi","Pale Beast","Paralyzing Potion","Petit Moth","Prevent Rat","Princess of Tsurugi","Protector of the Throne","Punished Eagle","Queen's Double","Rainbow Flower","Ring of Magnetism","Roaring Ocean Snake","Robbin' Goblin","Rock Ogre Grotto #1","Ryu-Kishin Powered","Saggi the Dark Clown","Shadow Ghoul","Shield & Sword","Skull Knight","Star Boy","Steel Scorpion","Stim-Pack","Sword of Deep-Seated","Tainted Wisdom","The Bistro Butcher","The Immortal of Thunder","The Little Swordsman of Aile","The Unhappy Maiden","Tongyo","Trent","Twin-Headed Thunder Dragon","Water Omotics","Winged Dragon, Guardian of the Fortress #1","Witch's Apprentice","Yado Karu"];
const uncommon = ["Bountiful Artemis","Celestial Transformation","Cyber Gymnist","Cyber Phoenix","Destiny HERO - Captain Tenacious","Destiny HERO - Doom Lord","Destruction of Destiny","Elemental HERO Necroid Shaman","Elemental HERO Wild Wingman","Forced Back","Guard Penalty","H - Heated Heart","Herald of Green Light","Herald of Purple Light","Life Equalizer","Majestic Mech - Ohka","Miraculous Descent","O - Oversoul","Swift Birdman Joe","Accumulated Fortune","Alien Mars","Barrier Statue of the Abyss","Barrier Statue of the Heavens","Barrier Statue of the Inferno","Barrier Statue of the Stormwinds","Barrier Statue of the Torrent","Combo Master","Cyber Esper","Cyber Ogre","Cyberdark Edge","Cyberdark Horn","Cyberdark Keel","Degenerate Circuit","Iris, the Earth Mother","Justi-Break","Lightning Punisher","Miraculous Rebirth","Rampaging Rhynos","Alien Warrior","Ambulance Rescueroid","Black Stego","Cyber Summon Blaster","Cyclone Blade","Dark City","Destiny HERO - Dasher","Destiny HERO - Fear Monger","Elemental HERO Neos","Mausoleum of the Emperor","Neo Space","Neo-Spacian Aqua Dolphin","Neo-Spacian Dark Panther","Sabresaurus","Submarineroid","Ancient Gear Factory","Anteatereatingant","Attack Reflector Unit","B.E.S Covered Core","Cyclone Boomerang","Doom Dozer","Elemental Hero Neo Bubbleman","Machine King Prototype","Memory Crusher","Phantasmal Martyrs","Photon Generator Unit","Princess Curran","Princess Pikeru","Proto-Cyber Dragon","Samsara","Symbol of Heritage","B.E.S. Crystal Core","Bubble Shuffle","Cyber Archfiend","D.D. Trap Hole","D.D.M. - Different Dimension Master","Dimension Wall","Ebon Magician Curran","Elemental HERO Bubbleman","Fusion Recovery","Giant Kozaky","Gyroid","Indomitable Fighter Lei Lei","Magical Explosion","Mechanical Hound","Rising Energy","Spark Blaster","Spiritual Water Art - Aoi","Spiritual Wind Art - Miyabi","Steam Gyroid","Transcendent Wings","UFOroid","Wroughtweiler","Armed Changer","Beiige, Vanguard of Dark World","Broww, Huntsman of Dark World","Brron, Mad King of Dark World","Chthonian Soldier","Elemental HERO Wildheart","Familiar-Possessed - Aussa","Familiar-Possessed - Eria","Familiar-Possessed - Hiita","Familiar-Possessed - Wynn","Gateway to Dark World","Hydrogeddon","King's Knight","Oxygeddon","Reborn Zombie","The Forces of Darkness","Ancient Gear Soldier","Auss the Earth Charmer","Batteryman AA","Criosphinx","Doriado's Blessing","Dummy Golem","Eria the Water Charmer","Grave Ohja","Guardian Statue","Hiita the Fire Charmer","Mid Shield Gardna","Millennium Scorpion","Monk Fighter","Rock Bombardment","Royal Surrender","Ultimate Insect LV7","Winged Kuriboh","Wynn the Wind Charmer","Blazing Inpachi","Inferno","Solar Flare Dragon","Ultimate Baseball Kid","Raging Flame Sprite","Gaia Soul the Combustable Collective","Level Limit Area B","Necklace of Command","7 Colored Fish","Sea Serpent Warrior of Darkness","Fenrir","Mermaid Knight","Unshaven Angler","Hammer Shot","Tornado Wall","Total Defense Shogun","Blade Knight","Command Knight","Swift Gaia the Fierce Knight","Big Shield Gardna","Goddess with the Third Eye","Jowgen the Spiritualist","Destruction Punch","Beastking of the Swamp","Mystical Sheep #1","Versago the Destroyer","Toon Gemini Elf","Toon Goblin Attack Force","Slate Warrior","Dark Sage","Dark Magician Knight","Knight's Title","Emes the Infinity","D.D. Assailant","Abyss Soldier","Mind Control","Pyrimid of Light","Rare Metal Dragon","Peten the Dark Clown","Inferno Tempest","Dark Magician","Summoned Skull","Dark Blade","Wall of Illusion","Kuriboh","Sonic Bird","Black Luster Soldier","Black Luster Ritual","Fissure","Change of Heart","Axe of Despair","Mystical Space Typhoon","Swords of Revealing Light","Trap Hole","Waboku","Spellbinding Circle","Raigeki Break","Blue Eyes White Dragon","La Jinn the Mystical Genie of the Lamp","Kaiser Sea Horse","Lord of D.","Mystic Tomato","White Dragon Ritual","The Flute of Summoning Dragon","Tribute to the Doomed","Rush Recklessly","Fairy Meteor Crush","Shadow Spell","Dust Tornado","Red-Eyes Black Dragon","Armed Dragon LV3","Armed Dragon Lv5","Element Dragon","Stamping Destruction","Reload","Dragon's Rage","Spirit Reaper","Ryu Kokki","Vampire Lady","Regenerating Mummy","Great Angus","Astral Barrier","Covering Fire","Dekoichi the Battlechanted Locomotive","Element Magician","Element Saurus","Harpie Lady 1","Harpie Lady 2","Harpie Lady 3","Invasion of Flames","Malice Dispersion","Mokey Mokey Smackdown","Necklace of Command","Nightmare Penguin","Sasuke Samurai #4","Serial Spell","Xing Zhen Hu","A Feather of the Pheonix","Assault on GHQ","Brain Jacker","Cross Counter","Divine Dragon Ragnarok","Flame Ruler","Forced Cesefire","Good Goblin Housekeeping","Insect Knight","Meteor of Destruction","Penalty Game!","The Big March of Animals","Threatening Roar","Whirlwind Prodigy","Armed Dragon LV3","Big Wave Small Wave","Black Dragon's Chick","Dark Mimic LV3","Enervating Mist","Fusion Weapon","Hade-Hane","Hallowed Life Barrier","Hammer Shot","Horus' Servant","Muko","Mystic Swordsman LV4","Neo Aqua Mador","Ninjitsu Art of Decoy","Penumbral Soldier Lady","Sandwitch","Absorbing Kid from the Sky","Armor Break","Avatar of the Pot","Backfire","Double Coston","Draining Shield","Dust Barrier","Elephant Statue of Disaster","Gogiga Gagagigo","Grave Protector","Labyrinth of Nightmare","Legacy Hunter","Light of Judgment","Needle Burrower","Order to Smash","Protector of the Sanctuary","Rocket Jumper","Solar Flare Dragon","Soul Resurrection","Soul Reversal","Special Hurricane","Spell Economics","Stone Statue of the Aztecs","Talisman of Spell Sealing","Talisman of Trap Sealing","The Second Sarcophagus","The Third Sarcophagus","Theban Nightmare","Amphibious Bugroth MK-3","Balloon Lizard","Berserk Gorilla","Big Burn","Blasting the Ruins","Blazing Impachi","Cannonball Spear Shellfish","Chaos Greed","Chopman the Desperate Outlaw","Crimson Ninja","Cursed Seal of the Forbidden Spell","D.D. Scout Plane","Dark Driceratops","Des Kangaroo","Energy Drain","Enraged Battle Ox","Fenrir","Freed the Brave Warrior","Fuhma Shuriken","Getsu Fuhma","Gora Turtle of Illusion","Granadora","Heart of the Underdog","Inferno","Mad Dog of Darkness","Mataza the Zapper","Orca Mega-Fortress of Darkness","Prickle Fairy","Reload","Robbin' Zombie","Sacred Crane","Salvage","Self-Destruct Button","Smashing Ground","Stealth Bird","Stray Lambs","The Thing in the Crater","Ultra Evolution Pill","Kunai With Chain","Sakuretsu Armor","Negate Attack","Mystical Space Typhoon","Divine Sword - Phoenix Blade","Black Pendant","Banner of Courage","The A. Forces","The Warrior Returning Alive","The Unfriendly Amazon","X-Saber Anu Piranha","D.D. Warrior Lady","Field-Commander Rahz","Anti-Raigeki","Axe Raider","Black Illusion Ritual","Black Luster Ritual","Black Skull Dragon","Bladefly","Call of the Grave","Change of Heart","Dian Keto the Cure Master","Dragon Seeker","Dream Clown","Exile of the Wicked","Giant Rat","Giant Red Seasnake","Gryphon Wing","Hayabusa Knight","King's Knight","Little Chimera","Magic Jammer","Manga Ryu-Ran","Mystic Tomato","Mystical Space Typhoon","Rogue Doll","Senju of the Thousand Hands","Seven Tools of the Bandit","Sonic Bird","Soul Release","Spirit of the Harp","Waboku","White Hole","Amazoness Archers","Amazoness Blowpiper","Amazoness Fighter","Amazoness Paladin","Combination Attack","D.D Crazy Beast","Dark Blade","Decayed Commander","Disarmament","Dramatic Rescue","Emblem of Dragon Destroyer","Frontline Base","Great Angus","Great Phantom Theif","Helping Robo for Combat","Kiryu","Mega Ton Magical Cannon","Pitch-Black Power Stone","Pitch-Dark Dragon","Poison of the Old Man","Roulette Barrel","Secret Barrel","Sonic Duck","Spell Shield Type-8","Spellbook Organization","Tribute Doll","Wave-Motion Cannon","XY-Dragon Cannon","XZ-Tank Cannon","YZ-Tank Dragon","Agido","Archfiend's Oath","Archfiend's Roar","Arsenal Summoner","Blindly Loyal Goblin","Butterfly Dagger- Elma","Cetus of Dagla","Checkmate","Dark Flare Knight","Dark Master - Zorc","Dark Scorpion - Chick the Yellow","Dark Scorpion - Gorg the Strong","Dark Scorpion - Meanae the Thron","Des Feral Imp","Different Dimension Dragon","Dragged Down into the Grave","Falling Down","Fear from the Dark","Gagagigo","Guardian Baou","Guardian Ceal","Guardian Kay'est","Guardian Tryce","Iron Blacksmith Kotetsu","Legendary Flame Lord","Maju Garzett","Mudora","Nin-Ken Dog","Really Eternal Rest","Rod of the Mind's Eye","Shadowknight Archfiend","Shinato's Ark","Shooting Star Bow - Ceal","Spell Reproduction","Twin Swords of Flashing Light - Tryce","Wicked-Breaking Flamberge - Baou","A Cat of Ill Omen","A Man With Wdjat","Arsenal Bug","Banner of Courage","Barrel Behind the Door","Charm of Shabti","Cobra Jar","D. Tribe","Dark Coffin","Dark Room of Nightmares","Dark Scorpion Burglars","Des Lacoda","Gravekeeper's Assailant","Gravekeeper's Cannonholder","Helpoemer","Inpachi","Jowls of Dark Demise","Maiden of the Aqua","Moisture Creature","Mucus Yolk","Narrow Pass","Needle Ceiling","Raigeki Break","Sasuke Samurai","Spirit Reaper","Statue of the Wicked","Beautiful Headhuntress","Berfomet","Burning Spear","Chimera the Flying Mythical Beast","Crawling Dragon #2","Dark-Piercing Light","Dokurorider","Dragon seeker","Elf's Light","Exile of the Wicked","Giant Red Seasnake","Gust Fan","MetalZoa","Mikazukinoyaiba","Millennium Shield","Seiyaryu","Skull Guardian","Soul of the Pure","Steel Shell","Two-headed King Rex","Zoa","A Wingbeat of Giant Dragon","Airknight Parshath","Array of Revealing Light","Dark Balter the Terrible","Dragon's Rage","Drop Off","Exiled Force","Fiend Skull Dragon","Inaba White Rabbit","Last Turn","Luster Dragon #2","Maharaghi","Nutrient Z","Ominous Fortunetelling","Opticlops","Ready for Intercepting","Ryu Senshi","Second Coin Toss","Spear Dragon","Spirit's Invitation","Spiritual Energy Settle Machine","Super Robolady","Super Roboyarou","Susa Soldier","The A. Forces","The Puppet Magic of Dark Ruler","Troop Dragon","Warrior Dai Grepher","Amphibian Beast","Aqua Spirit","Chosen One","Collected Power","Cure Mermaid","Dancing Fairy","Darklord Marie","De-Fusion","Destruction Punch","Empress Mantis","Fusion Gate","Garuda the Wind Spirit","Humanoid Slime","Hysteric Fairy","Jam Defender","Jowgen the Spiritualist","Lady Assailant of Flames","Mask of Brutality","Nuvia the Wicked","Shining Abyss","Skull Lair","Soul of Purity and Light","Spirit Message 'A'","Spirit Message 'I'","Spirit Message 'L'","Spirit Message 'N'","Spirit of Flames","Spirit of the Breeze","The Earl of Demise","The Forgiving Maiden","Tornado Wall","Zombyra the Dark","Appropriate","Bubonic Vermin","Burning Land","Darkfire Soldier #1","Darkfire Soldier #2","Driving Snow","Fairy Meteor Crush","Flame Champion","Forced Requisition","Gearfried the Iron Knight","Graverobber","Gravity Bind","Hayabusa Knight","Mad Sword Beast","Michizure","Monster Recovery","Parasite Paracide","Skull Invitation","Sky Scout","Sword Hunter","The Regulation of Tribe","Twin-Headed Fire Dragon","Time Seal","Flame Swordsman","Legendary Sword","Beast Fangs","Violet Crystal","Book of Secret Arts","Power of Kaishin","Dragon Capture Jar","Forest","Wasteland","Mountain","Sogen","Umi","Yami","Remove Trap","Two-Pronged Attack","Mystical Elf","Giant Soldier of Stone","Final Flame","Hane-Hane","Polymerization","7 Colored Fish","Battle Ox","Big Eye","Curse of Dragon","Darkfire Soldier #1","Dian Keto the Cure Master","Dragon Capture Jar","Dragon Zombie","Gearfried the Iron Knight","Giant Soldier of Stone","Great White","Invigoration","Island Turtle","Judge Man","La Jinn the Mystical Genie of the Lamp","Malevolent Nuzzler","Man-Eating Treasure Chest","Milus Radiant","Mystical Elf","Neo the Magic Swordsman","Ookazi","Red-Eyes Black Metal Dragon","Reinforcements","Reverse Trap","Rogue Doll","Ryu-Kishin Powered","Sky Scout","Spirit of the Harp","Sword of Dark Destruction","Time Wizard","Trap Master","Two-Pronged Attack","White Magical Hat","Thousand Dragon","Banisher of the Light","Sonic Bird","Slot Machine","Chain Energy","Chorus of Sanctuary","Crab Turtle","Curse of Fiend","Final Destiny","Flying Kamakiri #1","Gaia Power","Giant Germ","Giant Rat","Gravekeeper's Servant","Hungry Burger","Hyozanryu","Luminous Spark","Malevolent Nuzzler","Manga Ryu-Ran","Molten Destruction","Mother Grizzly","Mystic Plasma Zone","Senju of the Thousand Hands","Mystic Tomato","Nimble Momonga","Rising Air Current","Rush Recklessly","Ryu-Ran","Serpent Night Dragon","Shining Angel","Spellbinding Circle","Toll","Labyrinth Wall","Toon Mermaid","UFO Turtle","Umiiruka","7 Colored Fish","Armored Zombie","Baby Dragon","Battle Steer","Blackland Fire Dragon","Castle of Dark Illusions","Catapult Turtle","Cocoon of Evolution","Crass Clown","Crawling Dragon","Doma the Angel of Silence","Elegant Egotist","Thousand Dragon","Great Moth","Jellyfish","Jirai Gumo","King of Yamimakai","Kojikocy","Kuriboh","Lava Battleguard","Mystic Horseman","Pumpking the King of Ghosts","Rabid Horseman","Share the Pain","Soul Release","Swamp Battleguard","The Cheerful Coffin","Thunder Dragon","Time Wizard","Tremendous Fire","White Magical Hat"];
const rare = ["Banisher of the Radiance","Clock Tower Prison","Destiny Signal","E - Emergency Call","Elemental HERO Phoenix Enforcer","Hero Flash!!","Icarus Attack","Majestic Mech - Goryu","R - Rightous Justice","Super-Electromagnet Voltech Dragon","Victory Viper XX03","Allure Queen LV5","Black Horn of Heaven","Chain Strike","Cyber Shadow Gardna","Dark Lucius LV6","Flash of the Forbidden Spell","Snipe Hunter","Storm Shooter","Vanity's Fiend","Vanity's Ruler","Alien Mother","Babycerasaurus","Cosmic Horror Gangi'el","Destiny HERO - Double Dude","Elemental HERO Aqua Neos","Elemental HERO Dark Neos","Future Fusion","Neo-Spacian Flare Scarab","Supercharge","Ancient Gear Castle","Chainsaw Insect","Cyber Barrier Dragon","Cyber Laser Dragon","D.3.S Frog","Divine Dragon - Excelion","End of the World","Karma Cut","Sabre beetle","Tenkabito Shien","Cyber Dragon","Cybernetic Magician","Drillroid","Goblin Elite Attack Force","Skyscraper","Spiritual Fire Art - Kurenai","Steamroid","System Down","Tyranno Infinity","UFOroid Fighter","Winged Kuriboh LV10","B.E.S. Tetran","Cyber Blader","Elemental HERO Rampart Blaster","Elemental HERO Tempest","Elemental HERO Wildedge","Goldd, Wu-Lord of Dark World","Hero Barrier","Non-Fusion Area","Rapid-Fire Magician","Scarr, Scout of Dark World","VW-Tiger Catapult","Water Dragon","Ancient Gear Beast","Card of Sanctity","D.D. Survivor","Elemental HERO Thunder Giant","Elemental Mistress Doriado","Hieracosphinx","Master Monk","Megarock Dragon","Double-Coston","Book of Life","Call of the Mummy","Compulsory Evacuation Device","Thestalos the Firestorm Monarch","Levia-Dragon - Daedalus","Mobius the Frost Monarch","A Legendary Ocean","Salvage","Fusion Gate","King of the Swamp","Needle Worm","Kycoo the Ghost Destroyer","Bazoo the Soul-Eater","Widespread Ruin","Sage's Stone","Silent Swordsman LV7","Kaibaman","Blue-Eyes Shining Dragon","Sorceror of Dark Magic","Theinen the Great Sphinx","Andro Sphinx","Sphinx Teleia","Sangan","Zombyra the Dark","Royal Magical Library","Dark Hole","Monster Reborn","Pot of Greed","Witch of the Black Forest","Paladin of White Dragon","Soul Exchange","Megamorph","Nobleman of Crossout","Just Desserts","Luster Dragon","Black Dragon's Chick","Masked Dragon","Ceasefire","Reckless Greed","Interdimensional Matter Transporter","Vampire Lord","Dark Dust Spirit","Pyramid Turtle","Soul-Absorbing Bone Tower","Back to Square One","Ballista of Rampart Smashing","Chain Burst","Dark Blade the Dragon Knight","Fusilier Dragon, the Dual-Mode Beast","Gaia Soul the Combustible Collective","Harpies' Hunting Ground","Homunculus the Alchemic Being","Mirage Dragon","Mokey Mokey King","Pitch-Black Warwolf","Silent Swordsman LV3","The Creator Incarnate","Armed Samurai - Ben Kei","Big-Tusked Mammoth","Blast Magician","Chiron the Mage","D.D. Dynamite","Element Doom","Element Valkyrie","Gatling Dragon","Silent Swordsman LV5","Spell Absorption","Spiral Spear Strike","Swords of Concealing Light","The Dark - Hex-Sealed Fusion","The Earth - Hex-Sealed Fusion","The Light - Hex-Sealed Fusion","Armed Dragon LV5","Dark Factory of Mass Production","Element Dragon","Element Soldier","Greed","Horus the Black Flame Dragon LV6","Inferno Fire Blast","Master of Oz","Ninja Grandmaster Sasuke","Rafflesia Seduction","Spirit Barrier","The Trojan Horse","Unshaven Angler","Amplifier","Beckoning Light","Blowback Dragon","Burst Stream of Destruction","Dark Magic Attack","Des CounterBlow","Emissary of the Afterlife","Gear Golem the Moving Fortress","Ghost Knight of Jackal","Level Limit - Area B","Mazera DeVille","Ninjitsu Art of Transformation","Regenerating Mummy","The Agent of Creation - Venus","The Agent of Wisdom - Mercury","The End of Anubis","The First Sarcophagus","The Sanctuary in the Sky","Vampire Lady","Warrior of Zera","Black Tyranno","Chain Disappearance","Chaos End","Chaos Necromancer","Chaos Sorcerer","Compulsory Evacuation Device","Curse of Darkness","D.D. Designator","Dark Mirror Force","Dedication through Light and Darkness","DNA Transplant","Guardian Angel Joan","Primal Seed","Soul Absorption","Magic Cylinder","Exiled Force","Command Kinght","Marauding Captain","Gravity Axe - Grarl","Spellbinding Circle","Amazoness Swords Woman","Makyura the Destructor","Megamorph","Monster Reborn","Morphing Jar #2","Mother Grizzly","Mystic Tomato","Mystical Space Typhoon","Nimble Momonga","Nobleman of Crossout","Painful Choice","Pot of Greed","Premature Burial","Raigeki","Red-Eyes Black Dragon","Relinquished","Right Arm of the Forbidden One","Right Leg of the Forbidden One","Shining Angel","Snatch Steal","Spellbinding Circle","Summoned Skull","Swords of Revealing Light","The Fiend Megacyber","The Forceful Sentry","The Legendary Fisherman","The Masked Beast","Thousand-Eyes Restrict","Time Seal","Toon Summoned Skull","Torrential Tribute","Trap Hole","Tribute to the Dommed","United We Stand","4-Starred Ladybug of Doom","Armed Ninja","Axe of Despair","Banisher of the Light","Big Shield Gardna","Black Pendant","Black Skull Dragon","Blue-Eyes Toon Dragon","Blue-Eyes White Dragon","Bubonic Vermin","Buster Blader","Call of the Haunted","Card of Safe Return","Ceasefire","Change of Heart","Confiscation","Cyber Jar","Dark Hole","Dark Magician","Dark Sage","Delinquent Duo","Dust Tornado","Exchange","Exodia the Forbidden One","Fairy Meteor Crush","Fissure","Flame Swordsman","Gaia the Dragon Champion","Gaia the Fierce Knight","Gearfried the Iron Knight","Giant Rat","Giant Trunade","Goblin Attack Force","Hayabusa Knight","Humanoid Worm Drake","Imperial Order","Jar of Greed","Jinzo","Left Arm of the Forbidden One","Left Leg of the Forbidden One","Limiter Removal","Mad Sword Beast","Mage Power","Magic Drain","Magical Hats","Magician of Faith","Man-Eater Bug","Arcana Knight Joker","Black Luster Soldier","Blue-Eyes Toon Dragon","Blue-Eyes Ultimate Dragon","Dark Hole","Mask of Darkness","Mechanicalchaser","Megamorph","Needle Worm","Nobleman of Extermination","Relinquished","Robbin Goblin","Royal Decree","Rush Recklessly","Toon Summoned Skul","The Shallow Grave","Amazoness Spellcaster","Amazoness Tiger","Apprentice Magician","Autonomous Action Unit","Big Bang Shot","Chaos Command Magician","Dark Core","Dark Scorpion - Cliff the trap Remover","Des Koala","Dimension Jar","Double Spell","Giant Orc","Magical Marionette","Magical Merchant","My Body as a Shield","Old Vindictive Magician","Paladin of White Dragon","Rivalry of Warlords","Skilled White Magician","Tribe-Infecting Virus","Ultimate Obedient Fiend","Archfiend Soldier","Bezerk Dragon","Cost Down","Despair from the Dark","Frozen Soul","Gravity Axe - Grarl","Great Maju Garzett","Guardian Grarl","Interdimensional Matter Transporter","Kaiser Glider","Mefist the Infernal General","Mirage Knight","Ojama Trio","Pandemonium","Sakuretsu Armor","Skull Archfiend of Lightning","Terrorking Archfiend","Birdface","Book of Taiyou","Byser Shock","Call of the Mummy","Coffin Seller","Dark Dust Spirit","Dark Jeroid","Dice jar","Different Dimension Capsule","Don Zaloog","Fushioh Richie","Gravekeeper's Spear Soldier","Great Dezard","Guardian Sphinx","Kabazauls","Master Kyonshee","Mystical Knight of Jackal","Needle Wall","Newdoria","Nightmare Wheel","Pyramid Turtle","Question","Rite of Spirit","Royal Tribute","Terraforming","Acid Trap Hole","Beastking of the Swamps","Black Luster Ritual","Cosmo Queen","Goddess of Whim","Goddess with the Third Eye","Graceful Charity","Harpie's Feather Duster","Mystical Sheep #1","Salamandra","Thousand Knives","Versago the Destroyer","A Legendary Ocean","Asura Priest","Bad Reaction to Simochi","Creature Swap","Dark Ruler Ha Des","Freed the Matchless General","Fusion Sword Murasame Blade","Hino-Kagu Tsuchi","Injection Fairy Lily","Patrician of Darkness","Royal Oppression","Stamping Destruction","Super Rejuvenation","The Warrior Returning Alive","Thunder Nyan Nyan","Twin-Headed Behemoth","Bazoo the Soul Eater","Dark Spirit of the Silent","Destiny Board","Fairy Box","Fire Princess","Gilasaurus","Humanoid Worm Drake","Jam Breeding Machine","Jar of Greed","Magic Cylinder","Mask of Dispel","Mask of the Accursed","Offerings to the Doomed","Revival Jam","Royal Command","Spiritualism","St. Joan","The Masked Beast","Backup Soldier","Beast of Talwar","Buster Blader","Ceasefire","DNA Surgery","Dust Tornado","Goblin Attack Force","Limiter Removal","Mirror Wall","Morphing Jar #2","Nobleman of Crossout","Nobleman of Extermination","Prohibition","The Legendary Fisherman","Thousand-Eyes Restrict","Wingweaver","Blue-Eyes White Dragon","Tri-Horned Dragon","Dark Magician","Dark Hole","Fissure","Trap Hole","Curse of Dragon","Red-Eyes B. Dragon","Swords of Revealing Light","Man-Eater Bug","Gaia the Dragon Champion","Gaia the Fierce Knight","Blue-Eyes White Dragon","Dark Hole","Dark Magician","Fissure","Gaia The Fierce Knight","Giant Trunade","Hane-Hane","Just Desserts","Lord of D.","Maha Vilo","Man-Eater Bug","Metalmorph","Penguin Soldier","Red Eyes Black Dragon","Sangan","Scapegoat","Seven Tools of the Bandit","Soul Exchange","The Flute of Summoning Dragon","Trap Hole","Waboku","Wall of Illusion","Blue-Eyes Toon Dragon","Giant Trunade","Messenger of Peace","Maha Vailo","Megamorph","Mystical Space Typhoon","Painful Choice","Relinquished","Toon World","Upstart Goblin","Big Eye","B. Skull Dragon","Share the Pain","Gate Guardian","Harpie Lady Sisters","Horn of Heaven","Kazejin","Magic Jammer","Mask of Darkness","Sanga of the Thunder","Seven Tools of the Bandit","Suijin","Tribute to the Doomed"];
const ultra = ["Destiny HERO - Diamond Dude","Destiny HERO - Dreadmaster","Dimensional Fissure","Elemental HERO Shining Phoenix Enforcer","Macro Cosmos","Voltanis the Adjudicator","Allure Queen LV7","Cyber Ogre 2","Cyberdark Dragon","Dark Lucius LV8","Instant Fusion","Chimeratech Overdragon","Destiny HERO - Dogma","Elemental HERO Flare Neos","Overload Fusion","Super Vehicroid Jumbo Drill","Ultimate Tyranno","Demise, King of Armageddon","Hamon, Lord of Striking Thunder","Raviel, Lord of Phantasms","Ruin, Queen of Oblivion","Treeborn Frog","Uria, Lord of Searing Flames","Cyber End Dragon","Cyber Twin Dragon","Dragon's Mirror","Miracle Fusion","Power Bond","Dark World Lightning","Elemental HERO Bladedge","Elemental HERO Shining Flare Wingman","Pot of Avarice","Silva, Warlord of Dark World","VWXYZ-Dragon Catapult Cannon","Ancient Gear Golem","Brain Control","Elemental HERO Flame Wingman","King of the Skull Servants","Reshef the Dark Being","Giant Trunade","Card of Safe Return","Torrential Tribute","Infernal Flame Emperor","Ocean Dragon Lord - Neo-Daedalus","Tribe Infecting Virus","Gravity Bind","Cyber-Stein","Return from the Different Dimension","Last Will","Card Destruction","Premature Burial","Red Eyes Darkness Dragon","Snatch Steal","Heavy Storm","Creature Swap","Call of the Haunted","Vampire Genesis","B.E.S Big Core","Divine Wrath","Fuh-Rin-Ka-Zan","Machine Duplication","Monster Reincarnation","Mystic Swordsman LV6","The Creator","Thestalos the Firestorm Monarch","Behemoth the King of All Animals","Deck Devastation Virus","Gearfried the Swordmaster","Granmarg the Rock Monarch","King Dragun","Lightning Vortex","Pheonix Wing Wind Blast","Rescue Cat","Sacred Phoenix of Nephthys","Armed Dragon Lv7","Ectoplasmer","Horus the Black Flame Dragon LV8","Level Up!","Masked Dragon","Mind Crush","Mobius the Frost Monarch","Ojama King","Archlord Zerato","Curse of Anubis","Enchanting Fitting Room","Enemy Controller","King of the Swamp","Monster Gate","Night Assailant","Order to Charge","Spirit of the Pharaoh","The Agent of Force - Mars","The Agent of Judgment - Saturn","Wall of Revealing Light","Zaborg the Thunder Monarch","Black Luster Soldier - Envoy of the Beginning","Chaos Emperor Dragon - Envoy of the End","Dark Magician of Chaos","Dimension Fusion","Gren Maju Da Eiza","Invader of Darkness","Levia-Dragon - Daedalus","Manju of the Ten Thousand Hands","Manticore of Darkness","Gilford the Legend","Chain Destruction","Graceful Charity","Gravity Bind","Magic Drain","Monster Reborn","Morphing Jar","Pot of Greed","The Fiend Megacyber","Ultimate Offering","Witch of the Black Forest","Amazoness Swords Woman","Breaker the Magical Warrior","Dark Magician Girl","Dark Paladin","Diffusion Wave-Motion","Kaiser Colosseum","Luster Dragon","Magical Scientist","Mass Driver","Royal Magical Library","Skilled Dark Magician","Spell Canceller","XYZ-Dragon Cannon","Blast Held by a Tribute","D.D. Warrior Lady","Exodia Necross","Final Countdown","Judgment of Anubis","Reflect Bounder","Shinato, King of a Higher Plane","Skill Drain","Tsukuyomi","Vampire Lord","Book of Life","Book of Moon","Gravekeeper's Guard","Gravekeeper's Spy","King Tiger Wanghu","Lava Golem","Metamorphis","Mirage of Nightmare","Necrovalley","Reasoning","Ring of Destruction","Trap Dustshoot","Anti-Spell Fragrence","Black Luster Soldier","Blue Eyes Ultimate Dragon","Exchange","Harpie's Per Dragon","Mechanicalchaser","Morphing Jar","Ninja Grandmaster Sasuke","Sinister Serpent","Bottomless Trap Hole","Fiber Jar","Marauding Captain","Reinforcement of the Army","Tyrant Dragon","Yamata Dragon","Yata-Garasu","Card of Safe Return","Dark Necrofear","Gemini Elf","Kycoo the Ghost Destroyer","Mage Power","Mask of Restrict","The Last Warrior from Another Planet","Torrential Tribute","United We Stand","Call of the Haunted","Chain Destruction","Cold Wave","Imperial Order","Jinzo","Magic Drain","Premature Burial","The Fiend Megacyber","Right Leg of the Forbidden One","Left Leg of the Forbidden One","Left Arm of the Forbidden One","Right Arm of the Forbidden One","Exodia the Forbidden One","Raigeki","Monster Reborn","Pot of Greed","Card Destruction","Change of Heart","Last Will","Magician of Faith","Monster Reborn","Summoned Skull","Ultimate Offering","Valkyrion the Magna Warrior","Axe of Despair","Confiscation","Cyber Jar","Delinquent Duo","Snatch Steal","The Forceful Sentry","Toon Summoned Skull","Barrel Dragon","Change of Heart","Heavy Storm","Magician of Faith","Mirror Force","Sangan","Solemn Judgment","Summoned Skull","Witch of the Black Forest"];

//connect to database
con.connect(err => {
    if (err) throw err;
    console.log("connected to database");
})

//turn the bot on
bot.on('ready', () => {
    console.log('Kaiba is badass!');
    bot.user.setActivity('k!help for commands', { type: "PLAYING" });
    const announce = bot.channels.cache.get('channel-id');
    const hidden = bot.channels.cache.get('channel-id');
    hidden.send("The bot is online!");

    //do stuff daily/weekly/monthly
    const job = new CronJob({
        // Run at 05:00 Central time, only on weekdays
        cronTime: '00 00 01 * * 0-6',
        onTick: function() {
            // Run whatever you like here..
            let sql = `TRUNCATE days`;
            con.query(sql, console.log);
            announce.send("The daily reward can now be claimed again!");
            console.log("Daily table has been reset!");
        },
        start: true,
        timeZone: 'US/Eastern'
      });
    
    const job1 = new CronJob({
        // Run at 05:00 Central time, only on weekdays
        cronTime: '00 00 01 * * 0',
        onTick: function() {
            // Run whatever you like here..
            let sql = `TRUNCATE weeks`;
            con.query(sql, console.log);
            announce.send("The weekly reward can now be claimed again!");
            console.log("Weekly table has been reset!");
        },
        start: true,
        timeZone: 'US/Eastern'
      });
    
    const job2 = new CronJob({
        // Run at 05:00 Central time, only on weekdays
        cronTime: '00 00 01 01 * *',
        onTick: function() {
            // Run whatever you like here..
            let sql = `TRUNCATE months`;
            con.query(sql, console.log);
            announce.send("The monthly reward can now be claimed again!");
            console.log("monthly table has been reset!");
        },
        start: true,
        timeZone: 'US/Eastern'
      });

      const job3 = new CronJob({
        // Run at 05:00 Central time, only on weekdays
        cronTime: '00 00 12 * * 0-6',
        onTick: function() {
            // Run whatever you like here..
            let com1 = Math.floor(Math.random() * common.length);
            let com2 = Math.floor(Math.random() * common.length);
            let com3 = Math.floor(Math.random() * common.length);
            let uncom1 = Math.floor(Math.random() * uncommon.length);
            let uncom2 = Math.floor(Math.random() * uncommon.length);
            let rare1 = Math.floor(Math.random() * rare.length);
            let rare2 = Math.floor(Math.random() * rare.length);
            let ultra1 = Math.floor(Math.random() * ultra.length);
            let ultraChance = Math.floor(Math.random() * 2);
            let sql = `UPDATE shop SET shopCard = "${common[com1]}" WHERE shopID = 1`;
            con.query(sql, console.log);
            let sql2 = `UPDATE shop SET shopCard = "${common[com2]}" WHERE shopID = 2`;
            con.query(sql2, console.log);
            let sql3 = `UPDATE shop SET shopCard = "${common[com3]}" WHERE shopID = 3`;
            con.query(sql3, console.log);
            let sql4 = `UPDATE shop SET shopCard = "${uncommon[uncom1]}" WHERE shopID = 4`;
            con.query(sql4, console.log);
            let sql5 = `UPDATE shop SET shopCard = "${uncommon[uncom2]}" WHERE shopID = 5`;
            con.query(sql5, console.log);
            let sql6 = `UPDATE shop SET shopCard = "${rare[rare1]}" WHERE shopID = 6`;
            con.query(sql6, console.log);
            if(ultraChance === 1){
                let sql7 = `UPDATE shop SET shopRarity = "Ultra", shopCard = "${ultra[ultra1]}", shopCost = 200 WHERE shopID = 7`;
                con.query(sql7, console.log);
            } else {
                let sql8 = `UPDATE shop SET shopRarity = "Rare", shopCard = "${rare[rare2]}", shopCost = 100 WHERE shopID = 7`;
                con.query(sql8, console.log);
            }
            announce.send("The shop has been restocked!");
            console.log("Shop restocked!");
        },
        start: true,
        timeZone: 'US/Eastern'
      });
});
//Does stuff when a user joins
bot.on('guildMemberAdd', member => {
    con.query(`SELECT * FROM points WHERE id = '${member.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;

        //if message sender doesn't have a place in the database
        //creates row in points giving them the "defaultPoints" value in the config
        //Otherwise they gain points equal to "points" in config
        if (rows.length < 1) {
            sql = `INSERT INTO points (id, points) VALUES ('${member.id}', ${3000})`
            con.query(sql, console.log);
        } 
    });
    con.query(`SELECT * FROM stats WHERE id = '${member.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;

        if (rows.length < 1) {
            sql = `INSERT INTO stats (id, numpacks, numcards, numduels) VALUES ('${member.id}', ${0}, ${0}, ${0})`
            con.query(sql, console.log);
        }
    });
    con.query(`SELECT * FROM days WHERE id = '${member.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;

        let time = 0;

        //if id not found, adds them to the table
        if (rows.length < 1) {
            sql = `INSERT INTO days (id, days) VALUES ('${member.id}', ${time})`
            con.query(sql, console.log);
        }

    })

    con.query(`SELECT * FROM weeks WHERE id = '${member.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;

        let time2 = 0;

        //if id not found, adds them to the table
        if (rows.length < 1) {
            sql = `INSERT INTO weeks (id, weeks) VALUES ('${member.id}', ${time2})`
            con.query(sql, console.log);
        }


    })
    con.query(`SELECT * FROM months WHERE id = '${member.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;

        let time3 = 0;

        //if id not found, adds them to the table
        if (rows.length < 1) {
            sql = `INSERT INTO months (id, months) VALUES ('${member.id}', ${time3})`
            con.query(sql, console.log);
        }


    })

    con.query(`SELECT * FROM ticket WHERE id = '${member.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;

        if (rows.length < 1) {
            sql = `INSERT INTO ticket (id, ticket) VALUES ('${member.id}', ${0})`
            con.query(sql, console.log);
        }
    })
});

bot.on('message', msg =>{
    
    let args = msg.content.substring(PREFIX.length).split(" ");
    
    //various roles
    let points = msg.guild.roles.cache.find(role => role.name === 'points');  
    let duelist = msg.guild.roles.cache.find(r => r.name === 'duelist');
    let admin = msg.guild.roles.cache.find(role => role.name === 'Admin');
    let helper = msg.guild.roles.cache.find(role => role.name === 'Helper');
    let mod = msg.guild.roles.cache.find(role => role.name === 'Moderator');
    let shadow = msg.guild.roles.cache.find(role => role.name === 'Shadow Realm');
    let gold = msg.guild.roles.cache.find(role => role.name === 'Gold Supporter');
    let silver = msg.guild.roles.cache.find(role => role.name === 'Silver Supporter');
    let boost = msg.guild.roles.cache.find(role => role.name === 'Server Booster');
    let bronze = msg.guild.roles.cache.find(role => role.name === 'Bronze Supporter');
    let five = msg.guild.roles.cache.find(role => role.name === 'Raviel Blue');
    let four = msg.guild.roles.cache.find(role => role.name === 'Hamon Yellow');
    let three = msg.guild.roles.cache.find(role => role.name === 'Uria Red');
    let two = msg.guild.roles.cache.find(role => role.name === 'Armityle Purple');
    let one = msg.guild.roles.cache.find(role => role.name === 'King of Games');
    let vote = msg.guild.roles.cache.find(role => role.name === 'vote');
    let rankedban = msg.guild.roles.cache.find(role => role.name === 'rankedban');
    let noraffle = msg.guild.roles.cache.find(role => role.name === 'NoRaffle');
    let eraser = msg.guild.roles.cache.find(role => role.name === 'House of Eraser');
    let avatar = msg.guild.roles.cache.find(role => role.name === 'House of Avatar');
    let dreadroot = msg.guild.roles.cache.find(role => role.name === 'House of Dreadroot');

    //looking in database for everything in table points
    //where id equals the message sender
    if (msg.channel.name !== 'music-bot-spam' && msg.channel.name !== 'memes' && msg.channel.name !== 'ranting-debates-and-arguments') {
        con.query(`SELECT * FROM points WHERE id = '${msg.author.id}'`, (err, rows) => {
            if (err) throw err;

            let sql;

            //if message sender doesn't have a place in the database
            //creates row in points giving them the "defaultPoints" value in the config
            //Otherwise they gain points equal to "points" in config
            if (rows.length < 1) {
                sql = `INSERT INTO points (id, points) VALUES ('${msg.author.id}', ${3000})`
                con.query(sql, console.log);
            } else {
                if(msg.channel.name == 'trivia-with-nexus-bot'){
                    let points = parseInt(rows[0].points) + 2;
                    sql = `UPDATE points SET points = ${points} WHERE id = '${msg.author.id}'`;
                    con.query(sql, console.log);
                } else if(msg.member.roles.cache.has(bronze.id)){
                    let points = parseInt(rows[0].points) + parseInt(chatPoints) + 1;
                    sql = `UPDATE points SET points = ${points} WHERE id = '${msg.author.id}'`;
                    con.query(sql, console.log);
                } else if(msg.member.roles.cache.has(silver.id) || (msg.member.roles.cache.has(boost.id) && !msg.member.roles.cache.has(gold.id))) {
                    let points = parseInt(rows[0].points) + parseInt(chatPoints) + 2;
                    sql = `UPDATE points SET points = ${points} WHERE id = '${msg.author.id}'`;
                    con.query(sql, console.log);
                } else if(msg.member.roles.cache.has(gold.id)) {
                    let points = parseInt(rows[0].points) + parseInt(chatPoints) + 3;
                    sql = `UPDATE points SET points = ${points} WHERE id = '${msg.author.id}'`;
                    con.query(sql, console.log);
                }else {
                    let points = parseInt(rows[0].points) + parseInt(chatPoints);
                    sql = `UPDATE points SET points = ${points} WHERE id = '${msg.author.id}'`;
                    con.query(sql, console.log);
                }
            }
        })
    }

    con.query(`SELECT * FROM wins WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            if(msg.member !== undefined && msg.member !== null){
                sql = `INSERT INTO wins (id, wins, lose, name) VALUES ('${msg.author.id}', ${0}, ${0}, "${msg.member.displayName}")`
                con.query(sql, console.log);
            }
        }else{
            if(msg.member !== undefined && msg.member !== null){
                sql = `UPDATE wins SET name = "${msg.member.displayName}" WHERE id = '${msg.author.id}'`
                con.query(sql, console.log);
            }
        }

    })

    con.query(`SELECT * FROM days WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;

        let time = 0;

        //if id not found, adds them to the table
        if (rows.length < 1) {
            sql = `INSERT INTO days (id, days) VALUES ('${msg.author.id}', ${time})`
            con.query(sql, console.log);
        }

    })

    con.query(`SELECT * FROM weeks WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;

        let time2 = 0;

        //if id not found, adds them to the table
        if (rows.length < 1) {
            sql = `INSERT INTO weeks (id, weeks) VALUES ('${msg.author.id}', ${time2})`
            con.query(sql, console.log);
        }


    })
    con.query(`SELECT * FROM months WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;

        let time3 = 0;

        //if id not found, adds them to the table
        if (rows.length < 1) {
            sql = `INSERT INTO months (id, months) VALUES ('${msg.author.id}', ${time3})`
            con.query(sql, console.log);
        }


    })

    con.query(`SELECT * FROM traditional WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            if(msg.member !== undefined && msg.member !== null){
                sql = `INSERT INTO traditional (id, wins, lose, name) VALUES ('${msg.author.id}', ${0}, ${0}, "${msg.member.displayName}")`
                con.query(sql, console.log);
            }
        }else{
            if(msg.member !== undefined && msg.member !== null){
                sql = `UPDATE traditional SET name = "${msg.member.displayName}" WHERE id = '${msg.author.id}'`
                con.query(sql, console.log);
            }
        }

    })

    con.query(`SELECT * FROM advance WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            if(msg.member !== undefined && msg.member !== null){
                sql = `INSERT INTO advance (id, wins, lose, name) VALUES ('${msg.author.id}', ${0}, ${0}, "${msg.member.displayName}")`
                con.query(sql, console.log);
            }
        }else{
            if(msg.member !== undefined && msg.member !== null){
                sql = `UPDATE advance SET name = "${msg.member.displayName}" WHERE id = '${msg.author.id}'`
                con.query(sql, console.log);
            }
        }

    })

    con.query(`SELECT * FROM modern WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            if(msg.member !== undefined && msg.member !== null){
                sql = `INSERT INTO modern (id, wins, lose, name) VALUES ('${msg.author.id}', ${0}, ${0}, "${msg.member.displayName}")`
                con.query(sql, console.log);
            }
        }else{
            if(msg.member !== undefined && msg.member !== null){
                sql = `UPDATE modern SET name = "${msg.member.displayName}" WHERE id = '${msg.author.id}'`
                con.query(sql, console.log);
            }
        }

    })

    con.query(`SELECT * FROM goat WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            if(msg.member !== undefined && msg.member !== null){
                sql = `INSERT INTO goat (id, wins, lose, name) VALUES ('${msg.author.id}', ${0}, ${0}, "${msg.member.displayName}")`
                con.query(sql, console.log);
            }
        }else{
            if(msg.member !== undefined && msg.member !== null){
                sql = `UPDATE goat SET name = "${msg.member.displayName}" WHERE id = '${msg.author.id}'`
                con.query(sql, console.log);
            }
        }

    })

    con.query(`SELECT * FROM custom WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            if(msg.member !== undefined && msg.member !== null){
                sql = `INSERT INTO custom (id, wins, lose, name) VALUES ('${msg.author.id}', ${0}, ${0}, "${msg.member.displayName}")`
                con.query(sql, console.log);
            }
        }else{
            if(msg.member !== undefined && msg.member !== null){
                sql = `UPDATE custom SET name = "${msg.member.displayName}" WHERE id = '${msg.author.id}'`
                con.query(sql, console.log);
            }
        }

    })

    con.query(`SELECT * FROM dmbot WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            if(msg.member !== undefined && msg.member !== null){
                sql = `INSERT INTO dmbot (id, wins, lose, name) VALUES ('${msg.author.id}', ${0}, ${0}, "${msg.member.displayName}")`
                con.query(sql, console.log);
            }
        }else{
            if(msg.member !== undefined && msg.member !== null){
                sql = `UPDATE dmbot SET name = "${msg.member.displayName}" WHERE id = '${msg.author.id}'`
                con.query(sql, console.log);
            }
        }

    })

    con.query(`SELECT * FROM tag WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            if(msg.member !== undefined && msg.member !== null){
                sql = `INSERT INTO tag (id, wins, lose, name) VALUES ('${msg.author.id}', ${0}, ${0}, "${msg.member.displayName}")`
                con.query(sql, console.log);
            }
        }else{
            if(msg.member !== undefined && msg.member !== null){
                sql = `UPDATE tag SET name = "${msg.member.displayName}" WHERE id = '${msg.author.id}'`
                con.query(sql, console.log);
            }
        }

    })

    con.query(`SELECT * FROM ranked WHERE id = '${msg.author.id}'`, (err, rows) => {
        if (err) throw err;

        let sql;
        if (rows.length < 1) {
            if(msg.member !== undefined && msg.member !== null){
                sql = `INSERT INTO ranked (id, wins, lose, duels, ratio, name, level) VALUES ('${msg.author.id}', ${0}, ${0}, ${0}, ${0}, "${msg.member.displayName}", ${0})`
                con.query(sql, console.log);
            }
        }else{
            if(msg.member !== undefined && msg.member !== null){
                sql = `UPDATE ranked SET name = "${msg.member.displayName}" WHERE id = '${msg.author.id}'`
                con.query(sql, console.log);
            }
        }

    })
    
    //all commands
    if ((msg.content.startsWith(PREFIX) || msg.content.startsWith(PREFIXU)) && msg.channel.name !== 'general' && msg.channel.name !== 'general-dueling'){
        switch(args[0].toLowerCase()){
            case "ping":
                bot.commands.get('ping').execute(msg, bot);
            break;
            
            case "points":
                bot.commands.get('points').execute(msg, con);
            break;

            case "bal":
                bot.commands.get('points').execute(msg, con);
            break;

            case "balance":
                bot.commands.get('points').execute(msg, con);
            break;

            case "tickets":
                bot.commands.get('tickets').execute(msg, args, con);
            break;

            case "admingive":
                bot.commands.get('admingive').execute(msg, args, con, helper);
            break;

            case "givehouse":
                bot.commands.get('givehouse').execute(msg, args, con, avatar, dreadroot, eraser, helper);
            break;

            case "reset":
                bot.commands.get('reset').execute(msg, args, con, points, duelist);
            break;

            case "admingivecard":
                bot.commands.get('admingivecard').execute(msg, args, con, helper);
            break;

            case "admintake":
                bot.commands.get('admintake').execute(msg, args, con, points);
            break;

            case "giveticket":
                bot.commands.get('giveticket').execute(msg, args, con, helper);
            break;

            case "give":
                bot.commands.get('give').execute(msg, args, con);
            break;

            case "buydeck":
                bot.commands.get('buydeck').execute(msg, args, con, duelist, bot.decks, Discord);
            break;
            
            case "viewdecks":
                bot.commands.get('viewdecks').execute(msg, Discord);
            break;

            case "viewpacks":
                bot.commands.get('viewpacks').execute(msg, Discord);
            break;
            
            case "listcards":
                bot.commands.get('listcards').execute(msg, args, con,Discord);
            break;

            case "collection":
                bot.commands.get('listcards').execute(msg, args, con,Discord);
            break;

            case "trunk":
                bot.commands.get('listcards').execute(msg, args, con,Discord);
            break;

            case "binder":
                bot.commands.get('listcards').execute(msg, args, con,Discord);
            break;

            case "buypack":
                bot.commands.get('buypack').execute(msg, args, con, bot.packs, Discord);
            break;
            
            case "help":
                bot.commands.get('help').execute(msg, args, Discord, PREFIX);
            break;

            case "stats":
                bot.commands.get('stats').execute(msg, Discord, con);
            break;

            case "daily":
                bot.commands.get('daily').execute(msg, con);
            break;

            case "weekly":
                bot.commands.get('weekly').execute(msg, args, con);
            break;
            /*
            case "cchallenge":
                bot.commands.get('cchallenge').execute(msg, args, coconut, walnut, challengers, challenge);
            break;

            case "caccept":
                bot.commands.get('caccept').execute(msg, args, walnut, challenge);
            break;

            case "cdecline":
                bot.commands.get('cdecline').execute(msg, args, coconut, walnut, challengers, challenge);
            break;

            case "cvictory":
                bot.commands.get('cvictory').execute(msg, args, con, coconut, walnut, challengers, challenge, admin);
            break;

            case "ccancel":
                bot.commands.get('ccancel').execute(msg, args, coconut, walnut, challengers, challenge);
            break;
            */
            
            case "givecard":
                bot.commands.get('givecard').execute(msg, args, con);
            break;

            case "convert":
                bot.commands.get('convert').execute(msg, args, con);
            break;
            
            case "banish":
                bot.commands.get('banish').execute(msg, args, admin, mod, helper, shadow, duelist, ms);
            break;
            /*
            case "cwl":
                bot.commands.get('cwl').execute(msg, args, con);
            break;
            */
           
            case "publist":
                bot.commands.get('publist').execute(msg, args, con, Discord);
            break;
            
            case "timeroulette":
                bot.commands.get('timeroulette').execute(msg);
            break;

            case "tr":
                bot.commands.get('timeroulette').execute(msg);
            break;

            case "find":
                bot.commands.get('find').execute(msg, args, bot.packs, packlist, Discord);
            break;

            case "check":
                bot.commands.get('check').execute(msg, args, bot.packs, packlist, Discord);
            break;

            case "archcheck":
                bot.commands.get('archcheck').execute(msg, args, bot.packs, packlist, Discord);
            break;

            case "slap":
                bot.commands.get('slap').execute(msg);
            break;
            
            case "lct":
                bot.commands.get('lct').execute(msg, args, con, Discord, packlist);
            break;

            case "sort":
                bot.commands.get('lct').execute(msg, args, con, Discord, packlist);
            break;
            
            /*
            case "clb":
                bot.commands.get('clb').execute(msg, args, con, Discord);
            break;
            */
           
            case "monthly":
                bot.commands.get('monthly').execute(msg, con, bronze, silver, boost, gold, bot.packs, Discord);
            break;
            
            case "rchallenge":
                bot.commands.get('rchallenge').execute(msg, args, rcoconut, rwalnut, rchallengers, rchallenge, rankedban);
            break;

            case "raccept":
                bot.commands.get('raccept').execute(msg, rwalnut, rchallenge, rankedban);
            break;

            case "rdecline":
                bot.commands.get('rdecline').execute(msg, rcoconut, rwalnut, rchallengers, rchallenge);
            break;

            case "rvictory":
                bot.commands.get('rvictory').execute(msg, args, con, rcoconut, rwalnut, rchallengers, rchallenge, admin, duelist, five, four, three, two, one, avatar, dreadroot, eraser);
            break;

            case "rcancel":
                bot.commands.get('rcancel').execute(msg, rcoconut, rwalnut, rchallengers, rchallenge);
            break;
            
            case "rank":
                bot.commands.get('rank').execute(msg, con);
            break;

            case "rlb":
                bot.commands.get('rlb').execute(msg, con, Discord);
            break;
            
            case "vote":
                bot.commands.get('vote').execute(msg, args, vote, ms);
            break;

            case "giverole":
                bot.commands.get('giverole').execute(msg, args, con, admin);
            break;

            case "rankban":
                bot.commands.get('rankban').execute(msg, args, admin, rankedban, ms);
            break;

            case "checkcards":
                bot.commands.get('checkcards').execute(msg, args, con, Discord, admin);
            break;

            case "challenge":
                bot.commands.get('achallenge').execute(msg, args, acoconut, awalnut, achallengers, achallenge);
            break;

            case "accept":
                bot.commands.get('aaccept').execute(msg, awalnut, achallenge);
            break;

            case "decline":
                bot.commands.get('adecline').execute(msg, acoconut, awalnut, achallengers, achallenge);
            break;

            case "victory":
                bot.commands.get('avictory').execute(msg, con, acoconut, awalnut, achallengers, achallenge, admin, avatar, dreadroot, eraser);
            break;

            case "cancel":
                bot.commands.get('acancel').execute(msg, acoconut, awalnut, achallengers, achallenge);
            break;

            case "lb":
                bot.commands.get('alb').execute(msg, con, Discord);
            break;

            case "hlb":
                bot.commands.get('hlb').execute(msg, args, con, Discord);
            break;

            case "wl":
                bot.commands.get('awl').execute(msg, con);
            break;
            /*
            case "echallenge":
                bot.commands.get('echallenge').execute(msg, args, ecoconut, ewalnut, echallengers, echallenge, signer, darksigner);
            break;

            case "eaccept":
                bot.commands.get('eaccept').execute(msg, args, ewalnut, echallenge);
            break;

            case "edecline":
                bot.commands.get('edecline').execute(msg, args, ecoconut, ewalnut, echallengers, echallenge);
            break;

            case "evictory":
                bot.commands.get('evictory').execute(msg, args, con, ecoconut, ewalnut, echallengers, echallenge, admin, signer, darksigner);
            break;

            case "ecancel":
                bot.commands.get('ecancel').execute(msg, args, ecoconut, ewalnut, echallengers, echallenge);
            break;
            
            case "elb":
                bot.commands.get('elb').execute(msg, args, con, Discord);
            break;
            */
            case "raffle":
                bot.commands.get('raffle').execute(msg, args, ms, admin, con, helper);
            break;

            case "raffleinfo":
                bot.commands.get('raffleinfo').execute(msg, con);
            break;

            case "rafflejoin":
                bot.commands.get('rafflejoin').execute(msg, con, noraffle);
            break;
            
            case "wchallenge":
                bot.commands.get('tchallenge').execute(msg, args, tcoconut, twalnut, tchallengers, tchallenge);
            break;

            case "waccept":
                bot.commands.get('taccept').execute(msg, args, twalnut, tchallenge);
            break;

            case "wdecline":
                bot.commands.get('tdecline').execute(msg, args, tcoconut, twalnut, tchallengers, tchallenge);
            break;

            case "wvictory":
                bot.commands.get('tvictory').execute(msg, args, con, tcoconut, twalnut, tchallengers, tchallenge, admin);
            break;

            case "wcancel":
                bot.commands.get('tcancel').execute(msg, args, tcoconut, twalnut, tchallengers, tchallenge);
            break;

            case "wlb":
                bot.commands.get('tlb').execute(msg, args, con, Discord);
            break;

            case "wwl":
                bot.commands.get('twl').execute(msg, args, con);
            break;
            
            case "tagchallenge":
                bot.commands.get('tagchallenge').execute(msg, args, tagcoconut1, tagcoconut2, tagcoconut3, tagwalnut, tagchallengers, tagchallenge1, tagchallenge2, tagchallenge3);
            break;

            case "tagaccept":
                bot.commands.get('tagaccept').execute(msg, args, tagwalnut, tagchallenge1, tagchallenge2, tagchallenge3);
            break;

            case "tagdecline":
                bot.commands.get('tagdecline').execute(msg, args, tagcoconut1, tagcoconut2, tagcoconut3, tagwalnut, tagchallengers, tagchallenge1, tagchallenge2, tagchallenge3);
            break;

            case "tagvictory":
                bot.commands.get('tagvictory').execute(msg, args, con, tagcoconut1, tagcoconut2, tagcoconut3, tagwalnut, tagchallengers, tagchallenge1, tagchallenge2, tagchallenge3, admin);
            break;

            case "tagcancel":
                bot.commands.get('tagcancel').execute(msg, args, tagcoconut1, tagcoconut2, tagcoconut3, tagwalnut, tagchallengers, tagchallenge1, tagchallenge2, tagchallenge3);
            break;

            case "taglb":
                bot.commands.get('taglb').execute(msg, args, con, Discord);
            break;

            case "tagwl":
                bot.commands.get('tagwl').execute(msg, args, con);
            break;

            case "rarity":
                bot.commands.get('rarity').execute(msg, args);
            break;

            case "taglink":
                bot.commands.get('taglink').execute(msg);
            break;

            case "modernlink":
                bot.commands.get('modernlink').execute(msg);
            break;

            case "view":
                bot.commands.get('view').execute(msg, args, bot.packs, bot.decks, Discord);
            break;

            case "joinhouse":
                bot.commands.get('joinhouse').execute(msg, args, avatar, dreadroot, eraser);
            break;

            case "viewshop":
                bot.commands.get('viewshop').execute(msg, con, Discord);
            break;

            case "shopbuy":
                bot.commands.get('shopbuy').execute(msg, con, args);
            break;
            /*
            case "reward":
                bot.commands.get('reward').execute(msg, args, con, three, four, five);
            break;
            */
        }
    }

    if(msg.content.toLowerCase().includes('rip')){
        msg.react('<:F_:765738830653292594>');
    }

});

bot.login(token);