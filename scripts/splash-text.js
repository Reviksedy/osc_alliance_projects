const splashTextElement = document.getElementById('splash-text');

const splashTexts = [
    "Hold the line",
    "Wplacey's full legal name is TODOEWTSV🅱️SSTTROTRE",
    "Tell Lightbulb to pirate Java Edition",
    "PLEASE tell Cary to make another video about Wplace",
    ":Pin:",
    "screenshot time :onescary:",
    "W sandwich mendingheartemoji",
    "lelellelellee :tismcreature:",
    "hjhjhjhjhj",
    "\"im huge\" — HUGE firey",
    "Check out Canonically Accurate Gijinkas!",
    "I WAS NOT BORN EVIL",
    "better than #gallery",
    "It looks like you're writing a letter! Would you like help?",
    "do yall have a discord server?",
    "\"what do you like most\" — \"FEET\"",
    "This webpage was fact checked by true BFDI patriots",
    "The #1 fandom for trauma-induced therapy, 9/10 doctors recommend!",
    "Meowl is the best",
    "\"man i sure hope i get selected for a splash text!\"",
    "Maybe the true OSC Alliance were the friends we made along the way",
    "In the top 50 of Wplace alliances!",
    "What does he even do?",
    "Sand please come back its been 2763 years.. WAIT HES BACK??",
    "No botting, all manual",
    "Matheus pixel tennis ball matrix man",
    "this message was written by revid",
    "Wplacey will NEVER have a mouth",
    "DEPLOY THE :eightball:",
    "dead chat",
    "WPLACE IS LOST MEDIA?",
    "Wplace has fallen, millions of BFDI fans must take over",
    "Hello, Gordon!",
    "\"Yoink! Gotcha!\" — One",
    "Droplet Competition COMING SOON",
    "Don't let the bed bugs bite",
    "The alliance you'll have 16,051 reactions to!",
    "First we W, then we place. Lets Wplace!",
    "I wonder if there is A Person that uses :tismcreature: a lot...",
    "You know, that's huge, Firey!",
    "What is this, some kind of Battle for Dream Island?",
    "TCH is a user",
    "\"See you get it!\"",
    "Outbeaned",
    "Hey Jerom! Or should I say, ihatebfdi_",
    "YEAH!",
    "grrr thats not nice *bodyslams*",
    "We work to earn the right to work",
    "Beefy Life 2 COMING SOON",
    "Michael my GOAT",
    "Cary our GOAT",
    "Grappler my beloved",
    "hello competition droplet.",
    "we are the grapplerlings please feed us (gunpowder) (why gunpowder)",
    "VC time record: 3000 hours",
    "#WplaceyMyMan",
    "tenis bal... the creatures.... *runs away*",
    "Focus, M.",
    "Oh no, Tophat's driving!",
    "Flathead Lake, Montana",
    "isn't it in like... idaho or something?",
    "We are an alliance forged in the OSC",
    "discord.gg/oscalliance",
    "From the Grasslands to Montana"
];

const birthdays = {
    "01-12": ["One (InvisibleThe2nd)"],
    "01-20": ["Cherry"],
    "01-22": ["TonyDaBest"],
    "01-23": ["zushyart", "Parfaitheart"],

    "02-04": ["Marker The Green"],
    "02-08": ["HeresMappy"],
    "02-22": ["Reviksedy"],
    "02-25": ["Sand"],
    "02-28": ["Magikal"],

    "03-13": ["Crazl"],
    "03-16": ["Gabo Metal"],
    "03-23": ["Kaldot"],
    "03-28": ["BorboStuff15"],

    "04-05": ["akaSandwich"],
    "04-23": ["Two (keviningot72_56444)"],
    "04-26": ["Moonlight"],
    "04-27": ["Frenkizaba1"],

    "05-10": ["IceAzul"],
    "05-13": ["AnalyticalTomato"],
    "05-18": ["MatheusPixel"],

    "06-06": ["moneybird_jr"],
    "06-08": ["JackCraftPlays"],
    "06-11": ["Painkiller lover"],
    "06-13": ["Steely (MrDiamond)"],
    "06-19": ["A Person That Is Me"],
    "06-27": ["Malina"],
    "06-29": ["FireParrot"],
    "06-30": ["SeQuaLL"],

    "07-21": ["Liaway"],
    "07-26": ["PrimeNavigator"],

    "08-02": ["Shelter"],
    "08-12": ["OSC Alliance"],
    "08-13": ["Bookfan"],
    "08-16": ["Cooper"],
    "08-31": ["PizzaGuy"],

    "09-02": ["BlueStevie"],
    "09-06": ["StickerFan"],
    "09-07": ["ArKo"],
    "09-19": ["Poker"],
    "09-24": ["Hexagonix"],

    "10-09": ["Speedy", "keemkar"],
    "10-14": ["Snail"],
    "10-22": ["d7zzz_"],

    "11-21": ["Nugget"],
    "11-28": ["L0v33rx"],

    "12-17": ["Angel/Rulez"],
    "12-19": ["Jace"],
    "12-20": ["Arksomos"],
    "12-31": ["TCH"]
};

function getDate() {
    const today = new Date();
    return String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate()).padStart(2, "0");
}

function setRandomSplash() {

    const today = getDate();

    if (birthdays[today] && Math.random() < 0.25) {
        const people = birthdays[today];
        const person = people[Math.floor(Math.random() * people.length)];

        splashTextElement.textContent = `Happy Birthday, ${person}!`;
        return;
    }

    const randomIndex = Math.floor(Math.random() * splashTexts.length);
    if (splashTextElement.textContent == splashTexts[randomIndex]) {
        setRandomSplash();
    }
    else {
        splashTextElement.textContent = splashTexts[randomIndex];
    }
    
}

setRandomSplash();
