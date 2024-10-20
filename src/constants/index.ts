import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  benefitIcon4,
  benefitImage2,
  chromecast,
  disc02,
  discord,
  discordBlack,
  facebook,
  figma,
  file02,
  framer,
  glogo,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
} from '../assets'

export const navigation = [
  {
    id: 1,
    title: 'Hero',
    titulo: 'Banner',
    url: '#hero',
    link: '#hero',
    onlyMobile: false,
  },
  {
    id: 2,
    title: 'Video',
    titulo: 'Video',
    url: '#video',
    link: '#video',
    onlyMobile: false,
  },
  {
    id: '3',
    title: 'New account',
    titulo: 'Nueva cuenta',
    url: '/en/signup',
    link: '/signup',
    onlyMobile: true,
  },
  {
    id: '4',
    title: 'Login',
    titulo: 'Login',
    url: '/en/login',
    link: '/login',
    onlyMobile: true,
  },
  {
    id: '6',
    title: 'Bingo',
    titulo: 'Bingo',
    url: '/en/bingo',
    link: '/bingo',
    onlyMobile: false,
  },
  {
    id: '7',
    title: 'Quiz',
    titulo: 'Trivia',
    url: '/en/trivia',
    link: '/trivia',
    onlyMobile: false,
  },
]

export const heroIcons = [homeSmile, file02, searchMd, plusSquare]

export const companyLogos = [glogo, glogo, glogo, glogo, glogo]

export const socials = [
  {
    id: '0',
    title: 'Discord',
    iconUrl: discordBlack,
    url: '#',
  },
  {
    id: '1',
    title: 'Twitter',
    iconUrl: twitter,
    url: '#',
  },
  {
    id: '2',
    title: 'Instagram',
    iconUrl: instagram,
    url: '#',
  },
  {
    id: '3',
    title: 'Telegram',
    iconUrl: telegram,
    url: '#',
  },
  {
    id: '4',
    title: 'Facebook',
    iconUrl: facebook,
    url: '#',
  },
]

export const menu = [
  {
    id: 1,
    title: 'main',
    titulo: 'principal',
    listItems: [
      {
        id: 1,
        title: 'Homepage',
        titulo: 'Home',
        url: '/',
        link: '/en',
        icon: 'home.svg',
      },
      {
        id: 2,
        title: 'Profile',
        titulo: 'Perfil',
        url: '/users/1',
        link: 'en/user/1',
        icon: 'user.svg',
      },
    ],
  },
  {
    id: 2,
    title: 'lists',
    titulo: 'listas',
    listItems: [
      {
        id: 1,
        title: 'Users',
        titulo: 'Usuarios',
        url: '/users',
        link: '/en/users',
        icon: 'user.svg',
      },
      {
        id: 2,
        title: 'Products',
        titulo: 'Productos',
        url: '/products',
        link: '/en/products',
        icon: 'product.svg',
      },
      {
        id: 3,
        title: 'Orders',
        titulo: 'Ordenes',
        url: '/orders',
        link: '/en/orders',
        icon: 'order.svg',
      },
      {
        id: 4,
        title: 'Posts',
        titulo: 'Posts',
        url: '/posts',
        link: '/en/posts',
        icon: 'post.svg',
      },
    ],
  },
  {
    id: 3,
    title: 'general',
    titulo: 'general',
    listItems: [
      {
        id: 1,
        title: 'Elements',
        titulo: 'Elementos',
        url: '/',
        link: '/en',
        icon: 'element.svg',
      },
      {
        id: 2,
        title: 'Notes',
        titulo: 'Notas',
        url: '/',
        link: '/en',
        icon: 'note.svg',
      },
      {
        id: 3,
        title: 'Calendar',
        titulo: 'Calendario',
        url: '/',
        link: '/en',
        icon: 'calendar.svg',
      },
    ],
  },
  {
    id: 4,
    title: 'Maintenance',
    titulo: 'Mantenimiento',
    listItems: [
      {
        id: 1,
        title: 'Settings',
        titulo: 'Configuraciones',
        url: '/',
        link: '/en',
        icon: 'setting.svg',
      },
      {
        id: 2,
        title: 'Backups',
        titulo: 'Respaldos',
        url: '/',
        link: '/en',
        icon: 'backup.svg',
      },
    ],
  },
  {
    id: 5,
    title: 'analytics',
    titulo: 'analítica',
    listItems: [
      {
        id: 1,
        title: 'Charts',
        titulo: 'Graficos',
        url: '/',
        link: '/',
        icon: 'chart.svg',
      },
      {
        id: 2,
        title: 'Logs',
        titulo: 'Registros',
        url: '/',
        link: '/en',
        icon: 'log.svg',
      },
    ],
  },
]

export const topDealUsers = [
  {
    id: 1,
    img: 'https://upload.wikimedia.org/wikipedia/en/c/ce/Caesar_Planet_of_the_Apes.jpeg',
    username: 'Caesar Rodman',
    email: 'elva@gmail.com',
    amount: '3.668',
  },
  {
    id: 2,
    img: 'https://i.pinimg.com/736x/d3/f0/ed/d3f0ed3719c6fd743dcd2178ee37999a.jpg',
    username: 'Joel Miller',
    email: 'joelmill65@gmail.com',
    amount: '3.256',
  },
  {
    id: 3,
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlMgwA8JvwbeRAa_myUY5iGI__yp7p9_ZEFw&s',
    username: 'Lara Croft',
    email: 'tombraider44@gmail.com',
    amount: '2.998',
  },
  {
    id: 4,
    img: 'https://vignette.wikia.nocookie.net/deadliestfiction/images/a/a9/NathanDrakeU4.png/revision/latest?cb=20160908010854',
    username: 'Nathan Drake',
    email: 'ndrakedracon@gmail.com',
    amount: '2.512',
  },
  {
    id: 5,
    img: 'https://th.bing.com/th/id/R.aa27e97b2d1c35cb9b02e625ccb4f1f0?rik=Bj%2fx8Ux13yLH2A&riu=http%3a%2f%2fimages4.fanpop.com%2fimage%2fphotos%2f19000000%2fIndiana-Jones-Extra-Features-indiana-jones-19001437-1024-768.jpg&ehk=pvD3l1flajhx7pZYK3Tr9Lo%2fihk0HFKKoGnQFKx7ahg%3d&risl=&pid=ImgRaw&r=0',
    username: 'Indiana Jones',
    email: 'indyjj4@gmail.com',
    amount: '2.134',
  },
  {
    id: 6,
    img: 'https://media.revistagq.com/photos/5ca5f89033e751543a1536b4/1:1/w_800,h_800,c_limit/blade_runner_2049_3784.jpg',
    username: 'Blade Runner',
    email: 'augusta@gmail.com',
    amount: '1.932',
  },
  {
    id: 7,
    img: 'https://www.thisisbarry.com/wp-content/uploads/2022/CrimesOfTheFuture/crimes-of-the-future-does-saul-tenser-die.jpg',
    username: 'Saul Tenser',
    email: 'bettertensertor@gmail.com',
    amount: '1.560',
  },
]

export const chartBoxUser = {
  color: '#8884d8',
  icon: '/userIcon.svg',
  title: { es: 'Usuarios Totales', en: 'Total Users' },
  number: '11.238',
  dataKey: 'users',
  percentage: 45,
  chartData: [
    { name: 'Sun', users: 400 },
    { name: 'Mon', users: 600 },
    { name: 'Tue', users: 500 },
    { name: 'Wed', users: 700 },
    { name: 'Thu', users: 400 },
    { name: 'Fri', users: 500 },
    { name: 'Sat', users: 450 },
  ],
}

export const chartBoxProduct = {
  color: 'skyblue',
  icon: '/productIcon.svg',
  title: { es: 'Juegos Totales', en: 'Total Games' },
  number: '238',
  dataKey: 'game',
  percentage: 21,
  chartData: [
    { name: 'Sun', game: 400 },
    { name: 'Mon', game: 100 },
    { name: 'Tue', game: 589 },
    { name: 'Wed', game: 444 },
    { name: 'Thu', game: 356 },
    { name: 'Fri', game: 1080 },
    { name: 'Sat', game: 120 },
  ],
}
export const chartBoxRevenue = {
  color: 'teal',
  icon: '/revenueIcon.svg',
  title: { es: 'Ingresos Totales', en: 'Total Revenue' },
  number: '$56.432',
  dataKey: 'revenue',
  percentage: -12,
  chartData: [
    { name: 'Sun', revenue: 400 },
    { name: 'Mon', revenue: 600 },
    { name: 'Tue', revenue: 500 },
    { name: 'Wed', revenue: 700 },
    { name: 'Thu', revenue: 400 },
    { name: 'Fri', revenue: 500 },
    { name: 'Sat', revenue: 450 },
  ],
}
export const chartBoxConversion = {
  color: 'gold',
  icon: '/conversionIcon.svg',
  title: { es: 'Ratio Total', en: 'Total Ratio' },
  number: '2.6',
  dataKey: 'ratio',
  percentage: 12,
  chartData: [
    { name: 'Sun', ratio: 400 },
    { name: 'Mon', ratio: 600 },
    { name: 'Tue', ratio: 500 },
    { name: 'Wed', ratio: 700 },
    { name: 'Thu', ratio: 400 },
    { name: 'Fri', ratio: 500 },
    { name: 'Sat', ratio: 450 },
  ],
}

export const barChartBoxRevenue = {
  title: { es: 'Ganancias', en: 'Profit Earned' },
  color: '#8884d8',
  dataKey: 'profit',
  chartData: [
    {
      name: 'Sun',
      profit: 4000,
    },
    {
      name: 'Mon',
      profit: 3000,
    },
    {
      name: 'Tue',
      profit: 2000,
    },
    {
      name: 'Wed',
      profit: 2780,
    },
    {
      name: 'Thu',
      profit: 1890,
    },
    {
      name: 'Fri',
      profit: 2390,
    },
    {
      name: 'Sat',
      profit: 3490,
    },
  ],
}

export const barChartBoxVisit = {
  title: { es: 'Visitas Totales', en: 'Total Visit' },
  color: '#FF8042',
  dataKey: 'visit',
  chartData: [
    {
      name: 'Sun',
      visit: 4000,
    },
    {
      name: 'Mon',
      visit: 3000,
    },
    {
      name: 'Tue',
      visit: 2000,
    },
    {
      name: 'Wed',
      visit: 2780,
    },
    {
      name: 'Thu',
      visit: 1890,
    },
    {
      name: 'Fri',
      visit: 2390,
    },
    {
      name: 'Sat',
      visit: 3490,
    },
  ],
}

export const generateBingoCard = (): number[] => {
  const getRandomNumbers = (count: number): number[] => {
    const numbers = new Set<number>()
    while (numbers.size < count) {
      numbers.add(Math.floor(Math.random() * 75) + 1)
    }
    return Array.from(numbers)
  }

  const bingoCard = [
    ...getRandomNumbers(5), // Column 1
    ...getRandomNumbers(5), // Column 2
    ...getRandomNumbers(4), // Column 3 (excluding middle space)
    ...getRandomNumbers(5), // Column 4
    ...getRandomNumbers(5), // Column 5
  ]

  // Insert the free space (0) in the middle (12th position for a 5x5 grid)
  bingoCard.splice(12, 0, 0)

  return bingoCard
}
