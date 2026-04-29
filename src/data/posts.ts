import { Post } from '../types';

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//  HOW TO EDIT CONTENT
//  1. To change a title, excerpt, image, date or readTime —
//     just update the field value directly below.
//  2. To change the article body, edit the `content` array.
//     Each entry can be one of:
//       { type: 'paragraph', text: '...' }
//       { type: 'heading',   text: '...' }
//       { type: 'list',      items: ['...', '...'] }
//       { type: 'tip',       text: '...' }   ← highlighted tip box
//  3. To add a new article, copy one of the blocks below,
//     give it a unique `id`, and add it to the array.
//  4. To change an image, replace the URL in the `image` field
//     with any image URL (e.g. from Pexels or your own host).
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const allPosts: Post[] = [
  {
    id: '1',
    title: 'Everything You Need to Know About NYSC Call-up Letter',
    category: 'NYSC Updates',
    excerpt: 'A comprehensive guide on how to print your call-up letter, what documents you need, and common issues to avoid.',
    image: 'https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-20',
    readTime: '5 min read',
    content: [
      { type: 'paragraph', text: 'Your NYSC call-up letter is one of the most important documents you will need at the start of your service year. It contains your State Code, Call-up Number, and Batch information — all essential for camp registration.' },
      { type: 'heading', text: 'How to Print Your Call-Up Letter' },
      { type: 'list', items: [
        'Visit the official NYSC portal at portal.nysc.org.ng',
        'Log in with your registered email and password',
        'Click "Print Call-Up Letter" on your dashboard',
        'Ensure your browser allows pop-ups from the site',
        'Print at least 3 copies — for camp, your PPA, and personal records',
      ]},
      { type: 'tip', text: 'Print on white A4 paper. Ensure the QR code is clearly visible and not cut off at the edges.' },
      { type: 'heading', text: 'Documents to Bring Along' },
      { type: 'paragraph', text: 'Alongside your call-up letter, bring your original degree certificate, NYSC pre-registration printout, a valid ID (national ID, driver\'s license, or international passport), and at least 6 passport photographs.' },
      { type: 'heading', text: 'Common Issues and Fixes' },
      { type: 'list', items: [
        'Can\'t log in? Reset your password using the "Forgot Password" link',
        'Letter not generating? Contact your nearest NYSC state secretariat',
        'Wrong personal details? Correct at your school\'s academic registry before camp',
        'Portal slow? Try early mornings (5–8am) when traffic is lower',
      ]},
      { type: 'paragraph', text: 'If issues persist, visit the NYSC secretariat in your state or call the official helpline. Do not travel to camp without your printed call-up letter.' },
    ],
  },
  {
    id: '2',
    title: '10 Essential Items to Pack for NYSC Camp',
    category: 'Camp Life',
    excerpt: 'Don\'t make the mistake of going to camp unprepared. Here\'s everything you need to make your camp experience comfortable.',
    image: 'https://images.pexels.com/photos/2462015/pexels-photo-2462015.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-18',
    readTime: '7 min read',
    content: [
      { type: 'paragraph', text: 'Going to NYSC camp unprepared can turn an exciting experience into unnecessary stress. After speaking with dozens of corps members, here are the 10 things you absolutely cannot leave at home.' },
      { type: 'heading', text: 'The Essential Packing List' },
      { type: 'list', items: [
        'White shorts & white T-shirts (at least 3 pairs) — worn daily for drills',
        'Toiletries — soap, toothpaste, deodorant, feminine hygiene products',
        'Padlock — to secure your locker or box at the hostel',
        'Rechargeable lamp or torch — power outages are common',
        'Insect repellent and mosquito net — camps can be in bushy areas',
        'Basic medications — paracetamol, antimalaria, plasters, personal prescriptions',
        'Laundry detergent and a bucket — for handwashing clothes',
        'Comfortable sandals and canvas shoes — for drills and daily movement',
        'Power bank (at least 20,000mAh) — charging points are very limited',
        'Enough cash — ATMs can be far from camp with long queues',
      ]},
      { type: 'tip', text: 'Leave expensive jewellery and gadgets at home. Camp is a communal environment — keep it safe and minimal.' },
      { type: 'heading', text: 'What NOT to Bring' },
      { type: 'paragraph', text: 'Avoid packing too many clothes, high heels or formal shoes, large amounts of cash, or expensive electronics. Keep it practical — you\'ll thank yourself later.' },
      { type: 'heading', text: 'Extra Comfort Tips' },
      { type: 'list', items: [
        'A small pillow — camp mattresses are very thin',
        'A portable fan for hot weather',
        'Snacks for your first day before you find the camp market',
        'A small speaker for evening entertainment',
      ]},
    ],
  },
  {
    id: '3',
    title: 'Top Side Hustles for Corps Members in 2024',
    category: 'Opportunities',
    excerpt: 'Make the most of your service year with these lucrative side hustle ideas that won\'t interfere with your PPA duties.',
    image: 'https://images.pexels.com/photos/4050315/pexels-photo-4050315.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-15',
    readTime: '6 min read',
    content: [
      { type: 'paragraph', text: 'The ₦33,000 monthly stipend barely covers basics. But your service year is one of the best times to build income streams — you have time, energy, and minimal obligations. Here are the best side hustles for corps members in 2024.' },
      { type: 'heading', text: '1. Freelancing (Design, Writing, Coding)' },
      { type: 'paragraph', text: 'If you have any digital skill — graphic design, copywriting, web development, video editing — platforms like Fiverr and Upwork can earn you ₦50,000–₦500,000 per month depending on your skill level and consistency.' },
      { type: 'heading', text: '2. Online Tutoring' },
      { type: 'paragraph', text: 'Your degree qualifies you to tutor. Platforms like Tuteria and PrepClass are great starting points. Many corps members earn ₦20,000–₦80,000 per month tutoring secondary school students.' },
      { type: 'heading', text: '3. Social Media Management' },
      { type: 'paragraph', text: 'Local businesses need help with Instagram, Facebook, and TikTok. Start with businesses in your posting state — charge ₦15,000–₦50,000 per client monthly.' },
      { type: 'heading', text: '4. Mini Importation & Reselling' },
      { type: 'paragraph', text: 'Buy affordable products from Alibaba and resell on Jumia, Konga, or Instagram. Many corpers have built this into profitable businesses with as little as ₦20,000 seed capital.' },
      { type: 'heading', text: '5. Content Creation' },
      { type: 'paragraph', text: 'Document your NYSC journey on TikTok, YouTube, or Instagram. NYSC content is highly searched, and you can monetize through brand deals and ad revenue once you grow.' },
      { type: 'tip', text: 'Start ONE side hustle and master it before adding another. Spreading too thin leads to poor results across all of them.' },
    ],
  },
  {
    id: '4',
    title: 'How I Started a Business During NYSC',
    category: 'Stories',
    excerpt: 'One corper\'s journey from batch mate to successful entrepreneur, and how NYSC provided the perfect launching pad.',
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-12',
    readTime: '8 min read',
    content: [
      { type: 'paragraph', text: 'I graduated with a B.Sc. in Economics from the University of Nigeria, Nsukka, and went into NYSC hoping to find a job immediately after. What I found instead was something far more valuable — a business I still run today.' },
      { type: 'heading', text: 'The Idea That Started It All' },
      { type: 'paragraph', text: 'I was posted to a rural community in Kogi State where I noticed that most small business owners had no online presence. I had basic Instagram skills from running my student union page. I offered one restaurant owner free social media management for a month. Their sales increased noticeably. They paid me ₦15,000 and referred me to two other businesses.' },
      { type: 'heading', text: 'Scaling During Service Year' },
      { type: 'paragraph', text: 'By my third month, I had 5 paying clients earning close to ₦80,000 per month — more than twice the NYSC stipend. I reinvested in a better phone for content creation and paid online courses in digital marketing.' },
      { type: 'tip', text: 'Your posting state is not a limitation — it\'s a goldmine of untapped opportunities if you look carefully.' },
      { type: 'heading', text: 'What NYSC Gave Me That School Didn\'t' },
      { type: 'paragraph', text: 'By the time I passed out, I had 12 regular clients and a business generating over ₦200,000 monthly. I turned down three job offers because my business was doing better. NYSC gave me the structure and low-pressure environment to test ideas without catastrophic consequences. I am forever grateful for that.' },
    ],
  },
  {
    id: '5',
    title: 'Navigating Your First Week at Camp',
    category: 'Camp Life',
    excerpt: 'Survival tips, what to expect, and how to make friends quickly during your first week in the orientation camp.',
    image: 'https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-10',
    readTime: '5 min read',
    content: [
      { type: 'paragraph', text: 'The first week of NYSC orientation camp is both the most chaotic and the most memorable. Here\'s what to expect and how to handle it like a pro.' },
      { type: 'heading', text: 'Day 1: Registration' },
      { type: 'paragraph', text: 'Arrive as early as possible — before 9am if you can. The registration queue can be very long. Bring water and a snack. Have all documents ready: call-up letter, degree certificate, NYSC printout, valid ID, and passport photos.' },
      { type: 'heading', text: 'Days 2–3: Settling In' },
      { type: 'paragraph', text: 'You\'ll be assigned to a platoon and hostel. Wake up early — the bugle sounds at 5am. Locate key spots: the camp market, kitchen, sick bay, and charging points.' },
      { type: 'heading', text: 'Days 4–7: Finding Your Feet' },
      { type: 'list', items: [
        'Attend all mandatory activities — absenteeism affects your posting',
        'Participate in skill acquisition activities — genuinely useful',
        'Make friends across platoons — your network here will last beyond service year',
        'Rest properly — fatigue sets in quickly with early morning drills',
      ]},
      { type: 'tip', text: 'Join at least one social group (drama, choir, sports) in the first few days. It makes camp life much more enjoyable and builds your network fast.' },
      { type: 'paragraph', text: 'Camp is 3 weeks most corpers remember for life. Keep an open mind, be flexible, and embrace the discomfort — the memories and friendships are lasting.' },
    ],
  },
  {
    id: '6',
    title: 'NYSC Allowance Increase: What You Need to Know',
    category: 'NYSC Updates',
    excerpt: 'Breaking down the new allowance structure, when it takes effect, and how it affects current corps members.',
    image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-08',
    readTime: '4 min read',
    content: [
      { type: 'paragraph', text: 'The Federal Government has periodically reviewed the NYSC monthly stipend since its introduction. Here\'s everything corps members need to know about the current allowance structure.' },
      { type: 'heading', text: 'Current Federal Stipend' },
      { type: 'paragraph', text: 'As of 2024, the NYSC monthly stipend stands at ₦33,000, paid directly by the Federal Government. Some state governments and PPAs offer additional allowances on top of this.' },
      { type: 'heading', text: 'State and PPA Top-Ups' },
      { type: 'paragraph', text: 'Several states provide additional stipends to corps members. States like Lagos, Rivers, and Anambra have been known to supplement the federal allowance. Private sector PPAs may also offer competitive salaries.' },
      { type: 'tip', text: 'Before accepting a PPA, research whether they offer additional allowances. It can make a significant difference to your finances during the service year.' },
      { type: 'heading', text: 'When Allowances Are Paid' },
      { type: 'paragraph', text: 'Allowances are typically paid between the 20th–25th of each month. Delays can occur during holidays. Ensure your bank account is correctly registered on the NYSC portal to avoid payment issues.' },
    ],
  },
  {
    id: '7',
    title: 'Remote Job Opportunities for Corps Members',
    category: 'Opportunities',
    excerpt: 'Discover legitimate remote work opportunities perfect for corps members looking to earn extra income online.',
    image: 'https://images.pexels.com/photos/4050287/pexels-photo-4050287.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-05',
    readTime: '6 min read',
    content: [
      { type: 'paragraph', text: 'The rise of remote work has opened incredible opportunities for corps members regardless of posting state. Whether you\'re in Lagos or a rural LGA in Kebbi State, these remote opportunities can supplement your stipend significantly.' },
      { type: 'heading', text: 'Top Platforms for Nigerians' },
      { type: 'list', items: [
        'Upwork — great for writers, designers, developers, and virtual assistants',
        'Fiverr — good for quick gigs and creative services',
        'LinkedIn — many Nigerian and international companies post remote roles here',
        'Jobberman — Nigerian job board with growing remote listings',
        'Remote.co — curated remote job listings across many fields',
      ]},
      { type: 'heading', text: 'In-Demand Remote Skills' },
      { type: 'paragraph', text: 'The most sought-after remote skills right now: software development (React, Python, Node.js), UI/UX design, digital marketing, data analysis, content writing, and customer support.' },
      { type: 'tip', text: 'Get paid in dollars where possible. Use Payoneer or Grey to receive international payments in Nigeria — even small USD amounts are significant in naira.' },
      { type: 'heading', text: 'Getting Started with No Experience' },
      { type: 'paragraph', text: 'Start by building a portfolio — do 2–3 projects for free or at a discount to build credibility. Use free resources on YouTube and platforms like Google Digital Skills for Africa and ALX to upskill quickly.' },
    ],
  },
  {
    id: '8',
    title: 'My Most Memorable CDS Experience',
    category: 'Stories',
    excerpt: 'How community development service turned into a life-changing experience that shaped my career path.',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-03',
    readTime: '7 min read',
    content: [
      { type: 'paragraph', text: 'I never expected CDS to mean anything to me. I chose the Health CDS group purely because it seemed easy. What happened over the following months completely changed my perspective on service — and on my own career.' },
      { type: 'heading', text: 'A Community Without a Clinic' },
      { type: 'paragraph', text: 'Our CDS group was tasked with a health sensitization programme in a community in Benue State. When we arrived, we found the nearest health centre was over 14km away and many residents had never had a basic health screening. We organized free check-ups and health talks every month.' },
      { type: 'heading', text: 'The Impact' },
      { type: 'paragraph', text: 'Over 6 months, our group screened over 400 community members, referred 23 people for urgent medical attention, and trained 15 community health volunteers who continue the work. The local government recognized our effort with a formal commendation.' },
      { type: 'tip', text: 'Choose your CDS group based on what you can genuinely contribute to — not what seems easiest. The impact you make will surprise you.' },
      { type: 'heading', text: 'How It Shaped My Career' },
      { type: 'paragraph', text: 'This experience confirmed that I wanted to work in public health. I am now pursuing a Master\'s in Public Health and have been offered a position with an NGO that focuses on rural healthcare access. It all started with one CDS session I almost skipped.' },
    ],
  },
  {
    id: '9',
    title: 'Understanding PPA Posting and Redeployment',
    category: 'NYSC Updates',
    excerpt: 'Complete guide to PPA assignments, when and how to request redeployment, and what documents you need.',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
    date: '2024-03-01',
    readTime: '5 min read',
    content: [
      { type: 'paragraph', text: 'Your Place of Primary Assignment (PPA) is where you will spend the bulk of your service year. Understanding how posting and redeployment work can save you significant stress.' },
      { type: 'heading', text: 'How PPA Posting Works' },
      { type: 'paragraph', text: 'After camp, you are officially posted to a PPA by the NYSC secretariat. Postings are based on your qualifications, the available vacancies in the state, and in some cases, personal requests made during or before camp.' },
      { type: 'heading', text: 'Grounds for Redeployment' },
      { type: 'list', items: [
        'Medical grounds — certified by a hospital or NYSC medical officer',
        'Marriage — if posted far from your spouse\'s location',
        'Security concerns — in states or LGAs with active unrest',
        'Indigeneship — you can apply to be posted to your home state',
        'No job at current PPA — if your PPA has no meaningful work for you',
      ]},
      { type: 'heading', text: 'How to Apply for Redeployment' },
      { type: 'list', items: [
        'Write a formal letter of application addressed to the NYSC State Coordinator',
        'Attach supporting documents (medical reports, marriage certificate, etc.)',
        'Submit at the NYSC secretariat in your current state',
        'Follow up regularly — processing can take 4–8 weeks',
      ]},
      { type: 'tip', text: 'Redeployment is not guaranteed. Have a plan B in case your application is not approved within your expected timeline.' },
      { type: 'paragraph', text: 'Whichever PPA you end up at, make the most of it. Many of the most impactful corpers in NYSC history were posted to places they never expected — and thrived anyway.' },
    ],
  },
];

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// LATEST POSTS (shown on the Home page — pick 3 from above)
// Change the IDs here to control which posts appear on Home.
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const latestPosts: Post[] = allPosts.slice(0, 3);
