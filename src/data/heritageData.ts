import { Craft, Museum, Quest, StoreItem, CommunityPost } from '@/types/heritage';

export const initialCrafts: Craft[] = [
  {
    id: 1,
    name: 'Dabu Mud-Resist Printing',
    nameKey: 'dabuPrinting',
    region: 'Bagru & Akola',
    regionKey: 'rajasthan',
    state: 'Rajasthan',
    category: 'textiles',
    image: 'https://images.unsplash.com/photo-1606744888344-493238955de0?q=80&w=1080&auto=format&fit=crop',
    price: 349,
    description: 'Centuries-old mud-resist hand-block printing using clay, gum, and sawdust, submerged into deep natural fermented indigo vats.',
    descriptionKey: 'dabuDesc',
    originEra: '8th Century CE (Akola & Bagru)',
    materials: ['Black clay (Kali Mitti)', 'Acacia gum (Gond)', 'Sawdust (Baidan)', 'Natural fermented indigo', 'Teakwood blocks'],
    masterArtisan: 'Ustad Ramkishan Chippa (Padma Shri)',
    rating: 4.9,
    reviewsCount: 142,
    steps: [
      {
        stepNumber: 1,
        title: 'Teakwood Block Alignment',
        instructions: 'Align the master carved teakwood border block precisely on natural unbleached cotton washed in the river waters.',
        audioText: {
          en: 'Welcome to Dabu Printing. Step one: Align your carved teak block flatly with the registration guide pins on the cotton fabric.',
          hi: 'दाबू प्रिंटिंग में आपका स्वागत है। पहला चरण: सूती कपड़े पर तराशे गए शीशम के ब्लॉक को सावधानी से संरेखित करें।',
          mr: 'दाबू प्रिंटिंगमध्ये आपले स्वागत आहे. पहिली पायरी: सुती कापडावर लाकडी ब्लॉक अचूकपणे जुळवून घ्या.'
        },
        tip: 'Keep uniform pressure across all 4 corners to prevent bleeding.'
      },
      {
        stepNumber: 2,
        title: 'Mud Resist Paste Application',
        instructions: 'Dip block into the Dabu mud slurry (slaked lime, acacia gum, local clay) and press firmly onto the cloth.',
        audioText: {
          en: 'Step two: Dip into the Dabu mud paste and stamp firmly. Immediately sprinkle fine river sawdust to seal the paste from cracking.',
          hi: 'दूसरा चरण: दाबू मिट्टी के लेप में ब्लॉक डुबोएं और मजबूती से दबाएं। तुरंत नदी की महीन रेत या बुरादा छिड़कें।',
          mr: 'दुसरी पायरी: दाबू मातीच्या पेस्टमध्ये ब्लॉक बुडवून घट्ट दाबा आणि लाकडाचा भुसा टाका.'
        },
        tip: 'Sawdust acts as an organic binder while drying in natural sunlight.'
      },
      {
        stepNumber: 3,
        title: 'Fermented Indigo Immersion',
        instructions: 'Immerse the sun-dried fabric into an underground anaerobic indigo dye pit for 20 minutes.',
        audioText: {
          en: 'Step three: Submerge the dried fabric into the traditional indigo pit. As it oxidizes in the open air, the magical deep blue emerges.',
          hi: 'तीसरा चरण: सूखे कपड़े को पारंपरिक नील की भट्टी में डुबोएं। हवा लगते ही यह गहरा नीला रंग ले लेगा।',
          mr: 'तिसरी पायरी: वाळलेले कापड पारंपारिक नीळच्या कुंडात बुडवा. हवेच्या संपर्काने सुंदर गडद निळा रंग तयार होतो.'
        },
        tip: 'Wash thoroughly in flowing water to dissolve the mud, revealing crisp white resist motifs.'
      }
    ]
  },
  {
    id: 2,
    name: 'Warli Sacred Tribal Art',
    nameKey: 'warliArt',
    region: 'North Sahyadri',
    regionKey: 'maharashtra',
    state: 'Maharashtra',
    category: 'painting',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1080&auto=format&fit=crop',
    price: 299,
    description: 'Neolithic tribal ritual art drawn with rice flour paste and water on ochre mud walls, capturing the Tarpa dance, mother nature, and cosmic harmony.',
    descriptionKey: 'warliDesc',
    originEra: 'Circa 2500 BCE (Dahanu & Palghar)',
    materials: ['Rice flour paste', 'Cow dung & red ochre (Geru) base', 'Chewed bamboo twig brush', 'Natural gum'],
    masterArtisan: 'Guru Jivya Soma Mashe Guild',
    rating: 4.95,
    reviewsCount: 218,
    steps: [
      {
        stepNumber: 1,
        title: 'Geru Earth Canvas Preparation',
        instructions: 'Coat the handmade paper or wall with red terracotta clay (Geru) mixed with organic binder and sun-dry.',
        audioText: {
          en: 'Step one: Prepare your earth canvas with natural red ochre wash. This earthy background symbolizes sacred soil.',
          hi: 'पहला चरण: प्राकृतिक गेरू मिट्टी से अपना कैनवास तैयार करें। यह पवित्र मिट्टी और प्रकृति का प्रतीक है।',
          mr: 'पहिली पायरी: नैसर्गिक गेरू मातीने कॅनव्हास तयार करा. ही तांबडी माती निसर्गाचे प्रतीक आहे.'
        },
        tip: 'The contrast between red ochre and white rice flour gives Warli its ancient vitality.'
      },
      {
        stepNumber: 2,
        title: 'Two Inverted Triangles (Human Form)',
        instructions: 'Create humans by drawing two inverted triangles joined at their apexes. The upper represents the torso, lower represents hips.',
        audioText: {
          en: 'Step two: Using your bamboo twig, paint two inverted triangles touching at the center point. This ancient geometry depicts dynamic human balance.',
          hi: 'दूसरा चरण: बांस की तीली से दो उलटे त्रिकोण बनाएं जो केंद्र में मिलते हों। यह मानव शरीर का संतुलन दिखाता है।',
          mr: 'दुसरी पायरी: बांबूच्या काडीने दोन उलट त्रिकोण जोडून मानवी आकृती काढा. हे विश्वाचे संतुलन दर्शवते.'
        },
        tip: 'The circle represents the sun and moon; the triangle represents mountains and pointed trees.'
      },
      {
        stepNumber: 3,
        title: 'The Sacred Tarpa Circle',
        instructions: 'Form the spiraling circle of community dancers orbiting the Tarpa instrument player.',
        audioText: {
          en: 'Step three: Weave the circular Tarpa dancers holding hands. In Warli philosophy, the circle has no beginning and no end, like life itself.',
          hi: 'तीसरा चरण: तारपा वादक के चारों ओर गोलाकार नृत्य करते लोगों की श्रृंखला बनाएं। यह जीवन चक्र का प्रतीक है।',
          mr: 'तिसरी पायरी: तारपा वादकाभोवती हातात हात घालून फेर धरणाऱ्या नाचणाऱ्या लोकांचे वर्तुळ तयार करा.'
        },
        tip: 'Maintain dynamic rhythmic curvature in each dancer figure.'
      }
    ]
  },
  {
    id: 3,
    name: 'Purulia Chhau Dance Masks',
    nameKey: 'chhauMasks',
    region: 'Charida Village',
    regionKey: 'odisha',
    state: 'West Bengal & Odisha',
    category: 'masks',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1080&auto=format&fit=crop',
    price: 499,
    description: 'Fierce, dramatic theatrical masks hand-sculpted with alluvial clay, paper pulp, and cloth, adorned with peacock feathers and golden tinsel for epic martial dances.',
    descriptionKey: 'chhauDesc',
    originEra: '18th Century CE (Charida Village, Purulia)',
    materials: ['Ganges silt clay', 'Paper-pulp papier-mâché', 'Tulle net & jute', 'Enamel pigments', 'Peacock feathers & tinsel beads'],
    masterArtisan: 'Sutradhar Clan of Charida',
    rating: 4.88,
    reviewsCount: 94,
    steps: [
      {
        stepNumber: 1,
        title: 'Clay Core Sculpting',
        instructions: 'Mould the mythological hero or demon archetype using dark alluvial clay over a wooden armature.',
        audioText: {
          en: 'Step one: Sculpt the exaggerated eyes, raised brows, and fierce jawline in wet alluvial clay.',
          hi: 'पहला चरण: गीली मिट्टी से वीर या असुर पात्र के उभरे हुए नैन-नक्श और जबड़े को आकार दें।',
          mr: 'पहिली पायरी: ओल्या मातीने वीर किंवा असुराच्या चेहऱ्याचे प्रभावी वैशिष्ट्ये कोरून घ्या.'
        },
        tip: 'Exaggerated expressions allow audience members 50 yards away to feel the emotion.'
      },
      {
        stepNumber: 2,
        title: 'Papier-Mâché Layering',
        instructions: 'Apply 8 to 10 alternating layers of torn paper and fine cloth infused with flour adhesive.',
        audioText: {
          en: 'Step two: Paste alternating layers of recycled paper and fine cloth to build featherweight yet indestructible tensile strength.',
          hi: 'दूसरा चरण: पतले कपड़े और कागज की परतें चिपकाएं ताकि मुखौटा हल्का लेकिन अत्यधिक मजबूत बने।',
          mr: 'दुसरी पायरी: कापड आणि कागदाचे थर देऊन मुखवटा हलका आणि मजबूत बनवा.'
        },
        tip: 'Allow 48 hours of shade drying before carefully releasing the core mold.'
      },
      {
        stepNumber: 3,
        title: 'Polychrome & Feather Adornment',
        instructions: 'Paint with brilliant ochre, vermillion, and lapis pigments, followed by zari borders and iridescent peacock plumage.',
        audioText: {
          en: 'Step three: Coat with bold vibrant pigments and crown with glorious zari and real peacock feathers.',
          hi: 'तीसरा चरण: गहरे चटख रंगों से चित्रकारी करें और ज़री तथा मोरपंखों से भव्य मुकुट सजाएं।',
          mr: 'तिसरी पायरी: तेजस्वी रंगांनी रंगवा आणि जरीकाम व मोरपिसांनी मुकुट सजवा.'
        },
        tip: 'Coat with organic resin varnish for sweat-resistant dance performance.'
      }
    ]
  },
  {
    id: 4,
    name: 'Raghurajpur Pattachitra Scroll Art',
    nameKey: 'pattachitra',
    region: 'Raghurajpur Heritage Crafts Village',
    regionKey: 'odisha',
    state: 'Odisha',
    category: 'painting',
    image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?q=80&w=1080&auto=format&fit=crop',
    price: 420,
    description: 'Intricate cloth scroll paintings depicting Lord Jagannath and Dashavatara, rendered with natural stone pigments, conch shell white, and tamarind seed glue.',
    descriptionKey: 'pattachitraDesc',
    originEra: '12th Century CE (Puri Heritage Corridor)',
    materials: ['Cotton canvas treated with tamarind paste', 'Conch shell (Shankha) white', 'Hingula (cinnabar red)', 'Haritala (orpiment yellow)', 'Lampblack carbon'],
    masterArtisan: 'Chitrakar Parampara of Puri',
    rating: 4.97,
    reviewsCount: 310,
    steps: [
      {
        stepNumber: 1,
        title: 'Patti Canvas Burnishing',
        instructions: 'Glue twin layers of cotton using boiled tamarind seed paste. Coat with soft clay and burnish with river stones until glass-smooth.',
        audioText: {
          en: 'Step one: Prepare the Patti canvas using boiled tamarind seeds and polished river stones until it feels like smooth parchment.',
          hi: 'पहला चरण: इमली के बीजों के लेप और नदी के चिकने पत्थरों से सूती कपड़े को चमकाकर तैयार करें।',
          mr: 'पहिली पायरी: चिंचेच्या बियांचा डिंक आणि नदीच्या गुळगुळीत दगडांनी कापडाला चकाकी द्या.'
        },
        tip: 'A well-burnished patti cloth repels moisture and preserves paintings for centuries.'
      },
      {
        stepNumber: 2,
        title: 'Red Line Freehand Outlining',
        instructions: 'Use fine squirrel-hair brushes with Hingula mineral red to sketch the divine posture without preliminary pencil marks.',
        audioText: {
          en: 'Step two: Master the unbroken red outline. Traditional Chitrakars paint divine figures directly without eraser or pencil.',
          hi: 'दूसरा चरण: बिना किसी पेंसिल के सीधे लाल रंग की बारीक रेखाओं से आकृति का खाका खींचें।',
          mr: 'दुसरी पायरी: कोणत्याही पेन्सिलशिवाय थेट लाल रंगाने अखंड आकृती रेखाटा.'
        },
        tip: 'Hold the brush perpendicular at 90 degrees to control line weight.'
      },
      {
        stepNumber: 3,
        title: 'Conch White Detailing & Lacquer Finish',
        instructions: 'Apply crushed sea conch white highlights and seal with heated tree resin lacquer for indelible luster.',
        audioText: {
          en: 'Step three: Add micro-detailing with crushed conch shell white and seal with natural tree lacquer for eternal luster.',
          hi: 'तीसरा चरण: शंख के चूर्ण से सफेद नक्काशी करें और प्राकृतिक लाख के लेप से इसे सुरक्षित करें।',
          mr: 'तिसरी पायरी: शंखाच्या चुऱ्याने बारीक नक्षीकाम करा आणि नैसर्गिक लाखेने सुरक्षित करा.'
        },
        tip: 'The lacquer protects against tropical humidity and fungal growth.'
      }
    ]
  },
  {
    id: 5,
    name: 'Sri Kalahasti Kalamkari',
    nameKey: 'kalamkari',
    region: 'Chittoor District',
    regionKey: 'andhraPradesh',
    state: 'Andhra Pradesh',
    category: 'textiles',
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1080&auto=format&fit=crop',
    price: 380,
    description: 'Freehand bamboo pen (Kalam) drawing on cotton treated with buffalo milk, depicting epics with natural madder root, indigo, and myrobalan dyes.',
    descriptionKey: 'kalamkariDesc',
    originEra: '10th Century CE (Chola & Vijayanagara Empires)',
    materials: ['Bamboo reed pen (Kalam)', 'Fresh buffalo milk treatment', 'Myrobalan (Karakkai) mordant', 'Fermented iron jaggery black', 'Madder root red'],
    masterArtisan: 'Jonnalagadda Gurappa Chetty Guild',
    rating: 4.86,
    reviewsCount: 175,
    steps: [
      {
        stepNumber: 1,
        title: 'Buffalo Milk & Myrobalan Mordanting',
        instructions: 'Soak unbleached cotton in buffalo milk and crushed myrobalan nut solution to prevent natural dyes from bleeding.',
        audioText: {
          en: 'Step one: Treat pure cotton in buffalo milk and myrobalan. The natural fat content locks the dyes firmly into the fibers.',
          hi: 'पहला चरण: सूती कपड़े को भैंस के दूध और हरड़ के घोल में भिगोएं ताकि प्राकृतिक रंग फैलें नहीं।',
          mr: 'पहिली पायरी: सुती कापडाला म्हशीच्या दुधात आणि हिरड्याच्या पाण्यात भिजवा जेणेकरून रंग पसरणार नाही.'
        },
        tip: 'Ensure drying in gentle morning breeze rather than harsh midday sun.'
      },
      {
        stepNumber: 2,
        title: 'Iron-Jaggery Kasim Penwork',
        instructions: 'Draw intricate borders and characters using the pointed bamboo pen dipped into fermented iron and palm jaggery solution.',
        audioText: {
          en: 'Step two: Dip your bamboo kalam into fermented iron jaggery ink. It reacts chemically with the myrobalan to produce rich permanent black.',
          hi: 'दूसरा चरण: बांस की कलम को लोहे और गुड़ के घोल में डुबोएं, जिससे गहरा काला स्थायी रंग प्राप्त होता है।',
          mr: 'दुसरी पायरी: बांबूच्या कलमाने गूळ आणि लोखंडाच्या रंगाने बारीक काळ्या रेषा काढा.'
        },
        tip: 'Squeeze the felt reservoir gently with your thumb to feed ink to the nib.'
      },
      {
        stepNumber: 3,
        title: 'Swarnamukhi River Washing',
        instructions: 'Rinse the painted fabric in running calcium-rich river water to fix the natural colors into deep jewel tones.',
        audioText: {
          en: 'Step three: Wash in flowing natural water. Minerals in the riverbed reactivate the madder root reds into royal crimson.',
          hi: 'तीसरा चरण: बहते नदी के जल में धोएं। नदी के खनिज लाल रंग को चमकीले रूबी रंग में बदल देते हैं।',
          mr: 'तिसरी पायरी: वाहत्या स्वच्छ पाण्यात धुवून घ्या. पाण्यातील खनिजांमुळे लाल रंग अधिक तेजस्वी होतो.'
        },
        tip: 'Sunlight and flowing water are essential co-creators of authentic Kalamkari.'
      }
    ]
  },
  {
    id: 6,
    name: 'Patan Patola Double Ikkat',
    nameKey: 'patola',
    region: 'Patan',
    regionKey: 'gujarat',
    state: 'Gujarat',
    category: 'textiles',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?q=80&w=1080&auto=format&fit=crop',
    price: 850,
    description: 'The pinnacle of global weaving: warp and weft silk threads are tie-dyed separately with mathematical precision before weaving on tilted rosewood handlooms.',
    descriptionKey: 'patolaDesc',
    originEra: '11th Century CE (Solanki Dynasty)',
    materials: ['Mulberry silk yarn', 'Pomegranate rind yellow', 'Cochineal & madder red', 'Henna orange', 'Rosewood slant loom (Vandho)'],
    masterArtisan: 'Salvi Family Heritage Loom',
    rating: 4.99,
    reviewsCount: 420,
    steps: [
      {
        stepNumber: 1,
        title: 'Mathematical Graph Calculation',
        instructions: 'Graph each warp and weft silk thread down to millimeter precision using ancient geometric shlokas.',
        audioText: {
          en: 'Step one: Calculate the mathematical grid. In Double Ikkat, design exists inside individual threads before the loom is even strung.',
          hi: 'पहला चरण: प्रत्येक रेशम के धागे की गणितीय गणना करें। बुनाई से पहले ही धागों में डिज़ाइन छुपा होता है।',
          mr: 'पहिली पायरी: प्रत्येक रेशमी धाग्याची अचूक गणितीय मोजणी करा. विणण्यापूर्वीच डिझाइन धाग्यांमध्ये असते.'
        },
        tip: 'A single complex sari requires up to 6 months of tie-dye preparation.'
      },
      {
        stepNumber: 2,
        title: 'Resist Knotting & Multi-Bath Dyeing',
        instructions: 'Knot sections of silk threads with cotton cords and dip sequentially in natural dye vats from lightest to darkest.',
        audioText: {
          en: 'Step two: Knot and tie-dye the warp and weft bundles through multiple botanical dye baths.',
          hi: 'दूसरा चरण: धागों को बांधकर प्राकृतिक रंगों में क्रमानुसार डुबोएं ताकि रंग तय बिंदुओं पर ही चढ़े।',
          mr: 'दुसरी पायरी: धागे घट्ट बांधून नैसर्गिक रंगात आलटून पालटून बुडवा.'
        },
        tip: 'Both sides of the finished fabric look identical in color and luster.'
      },
      {
        stepNumber: 3,
        title: 'Dual Weave Micro-Alignment',
        instructions: 'Weave at 8 inches per day, adjusting each intersecting thread with pointed brass needles.',
        audioText: {
          en: 'Step three: Weave with extreme patience. Every intersection of warp and weft must meet flawlessly to reveal the sacred elephant or parrot motif.',
          hi: 'तीसरा चरण: पीतल की सुइयों से प्रत्येक धागे को मिलाते हुए धैर्यपूर्वक बुनाई करें।',
          mr: 'तिसरी पायरी: पितळी सुयांच्या साहाय्याने प्रत्येक धागा अचूक जुळवून विणकाम पूर्ण करा.'
        },
        tip: 'Gujarati proverb: "Padi Patole Bhaat, Phate Pan Fite Nahi" — The fabric may tear, but the color never fades.'
      }
    ]
  },
  {
    id: 7,
    name: 'Tanjore 22K Gold Foil Painting',
    nameKey: 'tanjorePainting',
    region: 'Thanjavur Maratha Court',
    regionKey: 'tamilNadu',
    state: 'Tamil Nadu',
    category: 'painting',
    image: 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?q=80&w=1080&auto=format&fit=crop',
    price: 520,
    description: 'Opulent Maratha-era devotional painting characterized by 3D gesso relief work (Chunnamboo), Jaipur semi-precious gems, and genuine 22-carat gold foil.',
    descriptionKey: 'tanjoreDesc',
    originEra: '16th Century CE (Nayakas & Marathas)',
    materials: ['Uncut Teakwood board', 'Limestone powder & glue gesso (Sukku)', '22 Karat gold leaves (Varak)', 'Jaipur uncut gems', 'Natural stone pigments'],
    masterArtisan: 'Raju Chettiar Thanjavur Lineage',
    rating: 4.93,
    reviewsCount: 168,
    steps: [
      {
        stepNumber: 1,
        title: 'Chunnamboo 3D Relief Embossing',
        instructions: 'Apply boiled limestone paste mixed with arabic gum to raise arches, pillars, jewelry, and thrones in tactile 3D relief.',
        audioText: {
          en: 'Step one: Pipe the traditional limestone gesso paste onto architectural pillars and ornamentation to create signature 3D depth.',
          hi: 'पहला चरण: चूने के पत्थर और गोंद के लेप से आभूषणों और खंभों पर 3D नक्काशी का उभार बनाएं।',
          mr: 'पहिली पायरी: चुन्याच्या मिश्रणाने दागिने आणि खांबांवर सुंदर 3D उठाव तयार करा.'
        },
        tip: 'Work quickly before the gesso cures into stone-like hardness.'
      },
      {
        stepNumber: 2,
        title: 'Gem Studding & 22K Gold Gilding',
        instructions: 'Embed faceted uncut gems into the wet relief, then affix pure 22-karat gold foil using gentle leather burnishing.',
        audioText: {
          en: 'Step two: Embed semi-precious stones and lay sheets of authentic 22-karat gold foil over the raised reliefs.',
          hi: 'दूसरा चरण: उभारों पर रत्न जड़ें और 22 कैरेट असली सोने के वर्क को सावधानी से चिपकाएं।',
          mr: 'दुसरी पायरी: रत्ने बसवा आणि 22 कॅरेट शुद्ध सोन्याचे पान काळजीपूर्वक लावा.'
        },
        tip: 'Gold foil never tarnishes and reflects temple lamp light with divine luminescence.'
      },
      {
        stepNumber: 3,
        title: 'Divine Figure Shading',
        instructions: 'Paint serene eyes and radiant skin tones of deities with soft translucent oil pigments against rich vermillion backdrops.',
        audioText: {
          en: 'Step three: Bring the divine countenance alive with expressive almond-shaped eyes and shaded facial contours.',
          hi: 'तीसरा चरण: भगवान के चेहरे को शांत, सौम्य और करुणामयी नयनों के साथ जीवंत रंगों से सजाएं।',
          mr: 'तिसरी पायरी: देवाचे डोळे आणि चेहऱ्याचे भाव भक्तिभावाने आणि नाजूक छटांनी रंगवा.'
        },
        tip: 'The gaze of the deity is traditionally consecrated with the final brush stroke.'
      }
    ]
  },
  {
    id: 8,
    name: 'Bastar Lost-Wax Dhokra Casting',
    nameKey: 'dhokraCasting',
    region: 'Bastar & Bankura',
    regionKey: 'chhattisgarh',
    state: 'Chhattisgarh & West Bengal',
    category: 'sculpture',
    image: 'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?q=80&w=1080&auto=format&fit=crop',
    price: 360,
    description: 'Non-ferrous metal casting using the ancient Cire Perdue lost-wax technique, unchanged for over 4,000 years since the Mohenjo-Daro Dancing Girl.',
    descriptionKey: 'dhokraDesc',
    originEra: '2500 BCE (Indus Valley Civilization)',
    materials: ['Ant-hill clay core', 'Pure natural beeswax threads', 'Brass scrap metal', 'Cow-dung tempering', 'Traditional pit furnace'],
    masterArtisan: 'Ghadwa Tribal Guild of Kondagaon',
    rating: 4.91,
    reviewsCount: 138,
    steps: [
      {
        stepNumber: 1,
        title: 'Clay Core Sculpting',
        instructions: 'Model an inner core from fine riverbed clay mixed with rice husks, slightly smaller than the final sculpture.',
        audioText: {
          en: 'Step one: Sculpt the inner core from ant-hill clay. This provides structural hollow weight reduction.',
          hi: 'पहला चरण: दीमक की बांबी की मिट्टी से मूर्ति का भीतरी ढांचा तैयार करें।',
          mr: 'पहिली पायरी: वाळवीच्या मातीने मूर्तीचा आतील गाभा तयार करा.'
        },
        tip: 'Rice husks burn away during firing, leaving micro-pores that prevent cracking.'
      },
      {
        stepNumber: 2,
        title: 'Beeswax Thread Coiling',
        instructions: 'Extrude warm beeswax into thin spools and wrap around the clay core, crafting delicate filigree patterns.',
        audioText: {
          en: 'Step two: Warm the natural beeswax and coil thin threads around the clay core to form clothing and tribal ornaments.',
          hi: 'दूसरा चरण: मोम को गर्म करके पतले धागे बनाएं और मिट्टी के ढांचे पर लपेटकर बारीक आभूषण रचें।',
          mr: 'दुसरी पायरी: मधाच्या पोळ्याचे मेण गरम करून बारीक धाग्यांनी आभूषणे आणि कपडे सजवा.'
        },
        tip: 'Every single wax coil translates directly into solid molten bronze in the final pour.'
      },
      {
        stepNumber: 3,
        title: 'Molten Brass Pit Furnace Pour',
        instructions: 'Encase in heavy clay coat, heat in furnace until wax vaporizes, and pour molten brass into the negative chamber.',
        audioText: {
          en: 'Step three: Fire in the pit kiln. As the wax melts away, liquid molten brass flows in to take its place forever.',
          hi: 'तीसरा चरण: भट्टी में तपाएं। जैसे ही मोम पिघलती है, पिघला हुआ पीतल उसकी जगह ले लेता है।',
          mr: 'तिसरी पायरी: भट्टीमध्ये गरम करा. मेण वितळल्यावर वितळलेली पितळ त्याची जागा घेते.'
        },
        tip: 'Once broken from the mold, no two Dhokra artifacts are ever identical.'
      }
    ]
  }
];

export const initialMuseums: Museum[] = [
  {
    id: 1,
    name: 'National Crafts Museum & Hastkala Academy',
    city: 'New Delhi',
    state: 'Delhi',
    distance: '2.4 km',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=1080&auto=format&fit=crop',
    curator: 'Dr. Ruchira Sharma',
    iotEnabled: true,
    artifactsCount: 35000,
    keyArtifact: 'Rare 18th-century Bhoota Cult Wooden Totem',
    sensors: {
      temp: 21.8,
      humidity: 47.2,
      light: 240,
      vibration: 0.04,
      airQualityAQI: 38,
      lastUpdated: 'Just now (Telemetry Active)',
      status: 'safe'
    },
    historicalReadings: [
      { time: '10:00', temp: 21.2, humidity: 46.0 },
      { time: '11:00', temp: 21.5, humidity: 46.8 },
      { time: '12:00', temp: 22.0, humidity: 47.9 },
      { time: '13:00', temp: 22.4, humidity: 48.2 },
      { time: '14:00', temp: 21.8, humidity: 47.2 }
    ]
  },
  {
    id: 2,
    name: 'Raja Dinkar Kelkar Museum',
    city: 'Pune',
    state: 'Maharashtra',
    distance: '5.8 km',
    image: 'https://images.unsplash.com/photo-1590059390046-60c78a05ef96?q=80&w=1080&auto=format&fit=crop',
    curator: 'Prof. Sudhanva Kelkar',
    iotEnabled: true,
    artifactsCount: 20000,
    keyArtifact: 'Mastani Mahal Intricate Teakwood Architecture & Instruments',
    sensors: {
      temp: 24.1,
      humidity: 59.4,
      light: 380,
      vibration: 0.12,
      airQualityAQI: 52,
      lastUpdated: 'Just now (Telemetry Active)',
      status: 'warning'
    },
    historicalReadings: [
      { time: '10:00', temp: 23.0, humidity: 55.0 },
      { time: '11:00', temp: 23.6, humidity: 56.5 },
      { time: '12:00', temp: 24.5, humidity: 58.9 },
      { time: '13:00', temp: 24.8, humidity: 61.2 },
      { time: '14:00', temp: 24.1, humidity: 59.4 }
    ]
  },
  {
    id: 3,
    name: 'Salar Jung Museum Heritage Gallery',
    city: 'Hyderabad',
    state: 'Telangana',
    distance: '12.1 km',
    image: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?q=80&w=1080&auto=format&fit=crop',
    curator: 'Dr. A. Nagendra Reddy',
    iotEnabled: true,
    artifactsCount: 46000,
    keyArtifact: 'Veiled Rebecca (1876) & Jade Daggers of the Mughals',
    sensors: {
      temp: 20.5,
      humidity: 44.0,
      light: 190,
      vibration: 0.02,
      airQualityAQI: 29,
      lastUpdated: 'Just now (Telemetry Active)',
      status: 'safe'
    },
    historicalReadings: [
      { time: '10:00', temp: 20.2, humidity: 43.5 },
      { time: '11:00', temp: 20.4, humidity: 43.8 },
      { time: '12:00', temp: 20.6, humidity: 44.2 },
      { time: '13:00', temp: 20.8, humidity: 44.5 },
      { time: '14:00', temp: 20.5, humidity: 44.0 }
    ]
  },
  {
    id: 4,
    name: 'Indian Museum (Jadu Ghar)',
    city: 'Kolkata',
    state: 'West Bengal',
    distance: '18.6 km',
    image: 'https://images.unsplash.com/photo-1566842600175-97dca489844f?q=80&w=1080&auto=format&fit=crop',
    curator: 'Dr. S. Mukherjee',
    iotEnabled: true,
    artifactsCount: 102000,
    keyArtifact: 'Ashoka Lion Capital & 4000-Year Egyptian Mummy Gallery',
    sensors: {
      temp: 22.9,
      humidity: 51.5,
      light: 290,
      vibration: 0.06,
      airQualityAQI: 45,
      lastUpdated: 'Just now (Telemetry Active)',
      status: 'safe'
    },
    historicalReadings: [
      { time: '10:00', temp: 22.0, humidity: 49.0 },
      { time: '11:00', temp: 22.3, humidity: 50.2 },
      { time: '12:00', temp: 22.8, humidity: 51.0 },
      { time: '13:00', temp: 23.2, humidity: 52.4 },
      { time: '14:00', temp: 22.9, humidity: 51.5 }
    ]
  }
];

export const initialQuests: Quest[] = [
  {
    id: 1,
    title: 'Master the Ancient Mud-Resist',
    category: 'Craft Masterclass',
    description: 'Complete 3 steps of the Dabu Printing AR masterclass and record a voice reflection.',
    rewardPoints: 150,
    progress: 66,
    completed: false,
    badgeReward: 'Dabu Master Guild',
    icon: '🧵'
  },
  {
    id: 2,
    title: 'Guardian of the Sacred Climate',
    category: 'IoT Conservation',
    description: 'Monitor sensor anomalies in Raja Dinkar Kelkar Museum and engage automated climate buffering.',
    rewardPoints: 200,
    progress: 40,
    completed: false,
    badgeReward: 'Museum Aegis',
    icon: '🏛️'
  },
  {
    id: 3,
    title: 'Warli Sacred Harmony Scholar',
    category: 'Tribal Philosophy',
    description: 'Score 100% on the Sacred Motif Memory game and create a Warli Tarpa dance circle on canvas.',
    rewardPoints: 180,
    progress: 85,
    completed: false,
    badgeReward: 'Sahyadri Storyteller',
    icon: '🎨'
  },
  {
    id: 4,
    title: 'Verifiable Provenance Patron',
    category: 'Artisan Economy',
    description: 'Acquire or mint an authentic craft item with cryptographic Blockchain GI certificate seal.',
    rewardPoints: 300,
    progress: 25,
    completed: false,
    badgeReward: 'Patron of Antiquity',
    icon: '💎'
  }
];

export const initialStoreItems: StoreItem[] = [
  {
    id: 1,
    name: 'Authentic Bagru Mud-Resist Indigo Stole',
    category: 'Textiles',
    costPoints: 1200,
    cashEquivalent: 850,
    icon: '🧣',
    image: 'https://images.unsplash.com/photo-1606744888344-493238955de0?q=80&w=800&auto=format&fit=crop',
    description: 'Hand-stamped in Akola using natural indigo leaf extract and river mud resist. Comes with physical & on-chain GI certificate.',
    stock: 14,
    artisanName: 'Ramkishan Chippa (Rajasthan)'
  },
  {
    id: 2,
    name: 'Warli Ceremonial Terracotta Plaque',
    category: 'Tribal Art',
    costPoints: 950,
    cashEquivalent: 650,
    icon: '🏺',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop',
    description: 'Painted with real rice-flour paste on sun-baked geru terracotta clay plate depicting the harvest celebration.',
    stock: 9,
    artisanName: 'Savita Mashe (Palghar)'
  },
  {
    id: 3,
    name: 'Handcrafted Purulia Chhau Warrior Mask',
    category: 'Masks',
    costPoints: 1800,
    cashEquivalent: 1250,
    icon: '🎭',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=800&auto=format&fit=crop',
    description: 'Sculpted in Charida village using river silt and layered papier-mâché, adorned with iridescent peacock plumage.',
    stock: 6,
    artisanName: 'Kishore Sutradhar (Purulia)'
  },
  {
    id: 4,
    name: 'National Heritage All-Museum Annual Pass',
    category: 'Museum Pass',
    costPoints: 2500,
    cashEquivalent: 1800,
    icon: '🎫',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=800&auto=format&fit=crop',
    description: 'Unlimited VIP entry to 12 partner national museums across India, including private curator conservation tours.',
    stock: 50,
    artisanName: 'National Heritage Council'
  }
];

export const initialCommunityPosts: CommunityPost[] = [
  {
    id: 1,
    author: 'Pandit Rameshwar Chitrakar',
    avatar: '👨‍🎨',
    role: 'Master Chitrakar (Heritage Artisan)',
    region: 'Raghurajpur, Odisha',
    craft: 'Tamarind-Gum Pattachitra',
    image: 'https://images.unsplash.com/photo-1582560475093-ba66accbc424?q=80&w=1080&auto=format&fit=crop',
    title: 'The Sacred Song of Dashavatara on Cotton Cloth',
    description: 'In our village of Raghurajpur, every household is a studio. This morning we completed the Jagannath Rath Yatra scroll. We sing the shlokas while grinding conch shell powder.',
    likes: 342,
    hasLiked: false,
    comments: [
      { id: 1, author: 'Dr. Anita Roy', text: 'The fine brush lines with Hingula red are so breathtaking!', time: '1 hour ago' },
      { id: 2, author: 'Kabir Patel', text: 'Can this be verified on the blockchain certificate registry?', time: '35 mins ago' }
    ],
    audioStory: {
      title: 'Oral Lore: Grinding Conch White with Tamarind Seed Gum',
      duration: '2:15',
      narrator: 'Pandit Rameshwar Chitrakar',
      summary: 'Listen to the oral chanting traditional artisans sing during the preparation of natural stone pigments.'
    },
    time: '2 hours ago'
  },
  {
    id: 2,
    author: 'Parvati Bai Kondagaon',
    avatar: '👩‍🎨',
    role: 'Tribal Elder & Metal Sculptor',
    region: 'Bastar, Chhattisgarh',
    craft: 'Lost-Wax Dhokra Casting',
    image: 'https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?q=80&w=1080&auto=format&fit=crop',
    title: '4,000 Years of Molten Bronze Memory',
    description: 'The same technique that made the Mohenjo-Daro Dancing Girl lives in our forest kilns today. When we wrap the warm beeswax thread, our ancestors guide our fingers.',
    likes: 489,
    hasLiked: true,
    comments: [
      { id: 1, author: 'Siddharth Rao', text: 'A true living link to Harappan antiquity. Huge respect!', time: '3 hours ago' }
    ],
    audioStory: {
      title: 'Echoes of the Forest Kiln: The Song of the Clay Hive',
      duration: '1:48',
      narrator: 'Parvati Bai',
      summary: 'How Bastar artisans commune with the ant-hill earth before sculpting sacred totems.'
    },
    time: '4 hours ago'
  }
];

export const triviaQuestions = [
  {
    id: 1,
    tier: 'Novice',
    question: 'Which sacred natural ingredient is used as the white paint in authentic Warli tribal wall paintings?',
    options: ['Synthetic acrylic white', 'Rice flour paste with water & gum', 'Crushed chalk powder', 'Titanium dioxide'],
    correctIndex: 1,
    explanation: 'Warli tribal artisans only use natural rice flour paste ground with water and natural acacia gum, applied over a red ochre (geru) base.'
  },
  {
    id: 2,
    tier: 'Novice',
    question: 'Dabu printing from Rajasthan uses which distinctive substance as its resist agent before indigo dyeing?',
    options: ['Hot paraffin wax', 'Clay, acacia gum and river silt mud', 'Chemical latex resist', 'Wheat dough slurry'],
    correctIndex: 1,
    explanation: 'Dabu is named from the Hindi word "Dabana" (to press). It employs a special mud paste made of black clay, slaked lime, and gum.'
  },
  {
    id: 3,
    tier: 'Scholar',
    question: 'Which UNESCO-recognized dance form from Eastern India uses monumental papier-mâché masks sculpted in Charida village?',
    options: ['Kathakali', 'Purulia Chhau Dance', 'Yakshagana', 'Koodiyattam'],
    correctIndex: 1,
    explanation: 'Purulia Chhau is famous for its martial dance drama masks meticulously crafted by the Sutradhar artisan clan in Charida village, West Bengal.'
  },
  {
    id: 4,
    tier: 'Scholar',
    question: 'In Kalamkari textile art from Andhra Pradesh, what natural liquid is used to treat the cotton so dyes do not bleed?',
    options: ['Coconut water', 'Fresh buffalo milk and myrobalan', 'Sea water brine', 'Mustard oil emulsion'],
    correctIndex: 1,
    explanation: 'Fresh buffalo milk contains natural fats that coat cotton fibers, preventing natural mineral and vegetable dyes from bleeding outside freehand lines.'
  },
  {
    id: 5,
    tier: 'Master Artisan',
    question: 'What is the lost-wax metal casting technique called that has remained unbroken in Bastar since 2500 BCE?',
    options: ['Dhokra (Cire Perdue)', 'Bidriware', 'Koftgari', 'Tarkashi'],
    correctIndex: 0,
    explanation: 'Dhokra uses beeswax threads over a clay core, melted out with molten brass. It is directly linked to the famous Dancing Girl bronze of Mohenjo-Daro.'
  },
  {
    id: 6,
    tier: 'Master Artisan',
    question: 'Why are authentic Tanjore paintings from Tamil Nadu adorned with pure 22-karat gold foil (Varak)?',
    options: ['To show modern wealth', 'To reflect lamp light in dark temple sanctums without tarnishing', 'To protect wood from termites', 'To increase resale weight'],
    correctIndex: 1,
    explanation: 'In ancient Indian temples lit only by oil lamps, pure 22K gold foil and Jaipur gems captured flickering flames to create a divine, self-illuminating presence.'
  }
];

export const sacredMotifs = [
  { id: 1, name: 'Kalash (Sacred Pot)', symbol: '🏺', meaning: 'Abundance & Cosmic Creation' },
  { id: 2, name: 'Mayura (Peacock)', symbol: '🦚', meaning: 'Grace, Immortality & Monsoon Rain' },
  { id: 3, name: 'Tarpa Dance Ring', symbol: '⭕', meaning: 'Cycle of Life without Beginning or End' },
  { id: 4, name: 'Padma (Lotus)', symbol: '🪷', meaning: 'Spiritual Purity Unstained by Mud' },
  { id: 5, name: 'Kalga (Paisley Mango)', symbol: '🥭', meaning: 'Fertility & The Seed of Eternal Life' },
  { id: 6, name: 'Gaja (Royal Elephant)', symbol: '🐘', meaning: 'Strength, Memory & Wisdom' },
  { id: 7, name: 'Shankha (Divine Conch)', symbol: '🐚', meaning: 'Original Primordial Cosmic Sound Om' },
  { id: 8, name: 'Surya (Sun Wheel)', symbol: '☀️', meaning: 'Supreme Cosmic Vitality & Dharma' }
];
