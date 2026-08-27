import { RakhiConfig } from '@/types';

/**
 * =======================================================================
 *  🌟 RAKSHA BANDHAN PERSONALIZATION CONFIGURATION
 * =======================================================================
 *  Edit any value below to fully customize the names, memories, photos,
 *  sibling quiz questions, emotional notes, gift clues, and final letter!
 * =======================================================================
 */

export const rakhiConfig: RakhiConfig = {
  // Names & Metadata
  sisterName: "Didi",
  brotherName: "Akshat",
  sisterNickname: "Didi",
  brotherNickname: "Chhote",
  occasionYear: "2026",
  brotherPhoneNumber: "", // Optional WhatsApp number (e.g. "919876543210")

  // 1. Cinematic Intro Screen
  introTitle: "Hey Didi... ❤️",
  introSubtitle: "I made something special just for you.",
  introButtonText: "Tap to Begin ✨",

  // 2. Royal Wax-Sealed Envelope
  envelopeText: {
    heading: "This isn't just another festival wish...",
    subheading: "It's a little journey through everything we've shared.",
    buttonText: "Open It 💌",
    sealStamp: "FOREVER BOND",
  },

  // 3. Memory Timeline (Polaroid Reel)
  timelineTitle: "Our Story",
  timelineSubtitle: "From stolen snacks to unconditional support.",
  timelineMemories: [
    {
      id: "mem-2010",
      year: "2010",
      title: "Jab hum chhote the...",
      description: "Fighting over the TV remote, hiding each other's toys, and running to Mom to complain first.",
      tag: "Childhood Chaos",
      image: "/images/memory1.jpg",
      aspectRatio: "portrait",
      polaroidRotation: -3,
    },
    {
      id: "mem-2015",
      year: "2015",
      title: "Jab fights thodi serious hone lagi 😂",
      description: "Arguing over who gets the last slice of pizza, who has to open the door, and who gets blamed for broken things.",
      tag: "WWE at Home",
      image: "/images/memory2.jpg",
      aspectRatio: "landscape",
      polaroidRotation: 2.5,
    },
    {
      id: "mem-2020",
      year: "2020",
      title: "Jab tu meri best friend ban gayi",
      description: "Late night talks, career advice, hiding each other's secrets from parents, and being each other's safety net.",
      tag: "Unbreakable Ally",
      image: "/images/memory3.jpg",
      aspectRatio: "square",
      polaroidRotation: -2,
    },
    {
      id: "mem-2024",
      year: "2024",
      title: "Through every high & low",
      description: "Even when life gets busy and we are miles apart, one phone call still makes everything feel like home.",
      tag: "Pure Love",
      image: "/images/memory4.jpg",
      aspectRatio: "portrait",
      polaroidRotation: 3,
    },
    {
      id: "mem-2026",
      year: "2026",
      title: "And here we are today...",
      description: "Older, hopefully a little wiser, but still the exact same two kids at heart.",
      tag: "Forever & Always",
      image: "/images/memory5.jpg",
      aspectRatio: "square",
      polaroidRotation: -1.5,
    },
  ],

  // 4. Interactive Rakhi Ceremony (Thali, Tilak, Aarti, Rakhi Tie)
  ceremony: {
    title: "The Sacred Ritual",
    subtitle: "Every year the same love... but this time, you get to do it digitally ❤️",
    tilak: {
      instruction: "Tap on the forehead area to apply the sacred Tilak & Akshat ✨",
      successTitle: "Tilak Applied with Blessings! 🪔",
      successSubtitle: "May life shower you with boundless health, joy, and peace.",
    },
    aarti: {
      instruction: "Rotate your finger / mouse in a gentle circle to perform the Aarti 🔔",
      successTitle: "Aarti Performed with Pure Devotion! 🪔",
      successSubtitle: "Warding off all negative energies and lighting up your path.",
    },
    rakhiTie: {
      instruction: "Drag & drop the sacred Rakhi onto the wrist to tie our eternal bond 🪢",
      successTitle: "Rakhi Tied Successfully! ❤️",
      successSubtitle: "A golden thread of protection, love, and endless promises.",
    },
    completionQuote: "Some bonds don't need a reset. They just grow deeper with time.",
  },

  // 5. Sibling Banter Quiz
  quiz: {
    title: "Okay... Serious Question.",
    subtitle: "Let's settle some ancient family arguments once and for all.",
    questions: [
      {
        id: 1,
        question: "Who steals food from the fridge first at 1 AM?",
        options: [
          { id: "me", text: "Me (Guilty as charged 🍕)", reaction: "At least you're honest! 😂", isWinnerChoice: false },
          { id: "didi", text: "Obviously Didi! (The midnight snack ninja)", reaction: "Confirmed by 100% of eyewitnesses! 🕵️", isWinnerChoice: true },
        ],
      },
      {
        id: 2,
        question: "Who gets blamed for everything when parents are angry?",
        options: [
          { id: "me", text: "Me! (I am the official family scapegoat 😭)", reaction: "True story of every sibling life! 😂", isWinnerChoice: false },
          { id: "didi", text: "Didi (Master of innocent puppy eyes)", reaction: "Oscar-worthy innocent expression! 🎭", isWinnerChoice: true },
        ],
      },
      {
        id: 3,
        question: "Who is actually Mom's favourite child?",
        options: [
          { id: "me", text: "Obviously me 😎 (In my dreams)", reaction: "Keep dreaming bro! 😂", isWinnerChoice: false },
          { id: "didi", text: "Obviously Didi (Diplomatic first-born privilege)", reaction: "Mom won't admit it, but we all know! 👑", isWinnerChoice: true },
        ],
      },
      {
        id: 4,
        question: "Who has better music and fashion taste?",
        options: [
          { id: "me", text: "Me (My Spotify wrapped is unmatched 🎧)", reaction: "Debatable, very debatable! 🤨", isWinnerChoice: false },
          { id: "didi", text: "Didi (She decides what looks good anyway)", reaction: "Wisest decision you'll make today! ✨", isWinnerChoice: true },
        ],
      },
      {
        id: 5,
        question: "Who annoys the other person with 100% dedication?",
        options: [
          { id: "me", text: "Me (It's a full-time brotherly responsibility)", reaction: "And you do an exceptional job at it! 😈", isWinnerChoice: false },
          { id: "didi", text: "Didi (With masterclass level emotional attacks)", reaction: "Advanced sibling warfare champion! 🤺", isWinnerChoice: true },
        ],
      },
    ],
    result: {
      winnerTitle: "DIDI WINS THE LIFETIME TROPHY! 🏆",
      winnerSubtitle: "After analyzing 15+ years of solid household evidence...",
      winnerNote: "Unfortunately, the jury has concluded that Didi is the undisputed Queen of this house.",
      badgeText: "Certified Best Sister Ever",
    },
  },

  // 6. Things I Don't Say Enough (Emotional section)
  emotionalMessages: {
    sectionTitle: "Things I Don't Say Enough",
    sectionSubtitle: "Behind all the jokes and teasing, here is the absolute truth.",
    messages: [
      {
        id: 1,
        line: "Thank you for always having my back, even when I was at my lowest.",
        subtext: "You believed in me before I even learned to believe in myself.",
      },
      {
        id: 2,
        line: "For every secret you kept and every storm you shielded me from...",
        subtext: "You never let anyone mess with your younger brother.",
      },
      {
        id: 3,
        line: "For every sacrifice you quietly made without ever boasting about it.",
        subtext: "I noticed all of it, and I carry endless respect for you.",
      },
      {
        id: 4,
        line: "No matter how big we grow, or where in the world life takes us...",
        subtext: "My home will always be where you are.",
      },
    ],
    finalStatement: {
      line1: "You're not just my sister.",
      line2: "You're my forever person. ❤️",
    },
  },

  // 7. Virtual Gift Box & Interactive Sister Demands Wishlist
  giftBox: {
    title: "The Official Gift Vault 🎁",
    subtitle: "Tap to open the royal box & select your exact Rakhi demands!",
    buttonText: "Open Gift Box 🎁",
    insideMessage: "Your Rakhi Gift Claim Form is UNLOCKED! 👑",
    secretLocationClue: "Check your WhatsApp / PayTM / Wardrobe top shelf! 💌",
    giftNote: "Pick everything you want from your brother — no excuses accepted!",
    demandSection: {
      title: "Didi's Official Rakhi Demands 📜",
      subtitle: "Select all the gifts brother must provide this year:",
      cashTiers: ["₹2,100", "₹5,100", "₹11,000", "₹21,000", "₹51,000", "Blank Cheque 💸"],
      giftDemandsList: [
        {
          id: "cash",
          category: "Rokda",
          title: "Hard Cash / Shagun 💵",
          icon: "💵",
          description: "Paisa hi Paisa hoga! Select your required cash tier.",
          options: ["₹2,100", "₹5,100", "₹11,000", "₹21,000", "₹51,000", "Blank Cheque 💸"],
        },
        {
          id: "chocolate",
          category: "Chocolates",
          title: "Chocolates & Sweets Box 🍫",
          icon: "🍫",
          description: "Cadbury Silk, Ferrero Rocher & Kaju Katli unlimited supply.",
          options: ["Cadbury Silk Basket", "Ferrero Rocher Box", "Belgian Truffles", "Kaju Katli Pack"],
        },
        {
          id: "shopping",
          category: "Fashion",
          title: "Shopping Spree / New Outfit 👗",
          icon: "👗",
          description: "Zara, H&M, Nykaa cart fully sponsored by brother.",
          options: ["Zara Shopping Spree", "Nykaa / Sephora Makeup", "Ethnic Festive Dress", "Footwear & Bag"],
        },
        {
          id: "toy_gadget",
          category: "Toys & Gadgets",
          title: "Plushies, Toys & Tech 🧸",
          icon: "🧸",
          description: "Giant Teddy bear, AirPods Pro, iPad, or Cute Desk Toys.",
          options: ["Giant Fluffy Teddy 🧸", "AirPods / Headphones 🎧", "Smartwatch / Gadget ⌚", "Cute Collectibles ✨"],
        },
        {
          id: "food_treat",
          category: "Food",
          title: "1-Year Food & Coffee Treats 🍕",
          icon: "🍕",
          description: "Midnight Pizza, Starbucks Coffee & Sushi whenever Didi orders.",
          options: ["Starbucks Unlimited ☕", "Midnight Pizza Pass 🍕", "Fine Dine Dinner 🍷", "Street Food Fiesta 🥟"],
        },
        {
          id: "vacation",
          category: "Travel",
          title: "Weekend Trip / Vacation ✈️",
          icon: "✈️",
          description: "Brother pays for hotel, flights & sightseeing.",
          options: ["Goa Beach Trip 🏖️", "Mountains / Manali Trip 🏔️", "Staycation Spa Weekend 💆‍♀️", "Roadtrip with Brother 🚗"],
        },
        {
          id: "immunity",
          category: "VIP Privilege",
          title: "Brotherly Obedience Pass 👑",
          icon: "👑",
          description: "Brother cannot argue and must do chores on command for 30 days.",
          options: ["30-Day No Argument Rule 🤐", "Room Cleaning Duty 🧹", "All-day Driver Pass 🚗", "TV Remote Monopoly 📺"],
        },
        {
          id: "custom",
          category: "Custom Wish",
          title: "Write Your Own Wish ✍️",
          icon: "✍️",
          description: "Any special dream gift not on the list!",
          isCustom: true,
        },
      ],
    },
  },

  // 8. Handwritten Royal Letter
  finalLetter: {
    salutation: "Dearest Didi,",
    paragraphs: [
      "We've fought over the tiniest things. We've annoyed each other to no end. We've stolen each other's food when no one was looking.",
      "But through every twist, every turn, and every chapter of my life, you have been my constant pillar of strength.",
      "Thank you for being my protector, my mentor, my partner-in-crime, and my greatest cheerleader.",
      "No matter how old we grow or how busy life gets, I promise I will always stand by you, protect your smile, and be your most annoying brother forever.",
    ],
    closing: "With all my love & respect,",
    signature: "Your Brother, Akshat",
    postscript: "P.S. Yes, I still want the bigger share of sweets! 😉❤️",
  },

  // 9. Grand Finale Scene
  finale: {
    title: "Forever Connected 🪢",
    subtitle: "Happy Raksha Bandhan, Didi! ❤️",
    tagline: "Bonded by blood, connected by heart, blessed forever.",
    replayButtonText: "Replay the Journey ↻",
  },

  // 10. Background Audio Configuration
  audio: {
    bgMusicUrl: "/music/rakhi.mp3",
    defaultVolume: 0.6,
  },
};
