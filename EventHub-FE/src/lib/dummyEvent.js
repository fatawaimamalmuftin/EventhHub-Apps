const Events = [
  {
    id: 1,
    title: "Go Concurrency Workshop",
    image:
      "https://i.pinimg.com/736x/2e/71/d6/2e71d6a4e0946cb15c7112094fa2a7c5.jpg",
    categories: ["Technology", "Programming"],
    date: "Aug 22, 2026",
    time: "09:00 WIB",
    location: "Bandung",
    attendees: 48,
    capacity: 100,
    description:
      "Learn Go concurrency with goroutines, channels, and practical examples.",
    community: "Koda Academy",
    endTime: "11:00 WIB",
    eventFormat: "in_person",
    speakers: [
      {
        name: "Abdul",
        title: "Go Developer",
      },
      {
        name: "Andi",
        title: "Backend Engineer",
      },
    ],
  },

  {
    id: 2,
    title: "React Workshop",
    image:
      "https://i.pinimg.com/736x/44/7a/27/447a275f0c8f2208de4b49eb45d96adc.jpg",
    categories: ["Technology", "Programming"],
    date: "Aug 25, 2026",
    time: "10:00 WIB",
    location: "Jakarta",
    attendees: 75,
    capacity: 100,
    description:
      "Learn the fundamentals of React including components, hooks, and state management.",
    community: "Koda Academy",
    endTime: "12:00 WIB",
    eventFormat: "in_person",
    speakers: [
      {
        name: "Rizky",
        title: "Frontend Developer",
      },
      {
        name: "Dina",
        title: "React Developer",
      },
    ],
  },

  {
    id: 3,
    title: "UI/UX Design Meetup",
    image:
      "https://i.pinimg.com/736x/ea/25/b9/ea25b95af7a45615c15e1d2f37a50a15.jpg",
    categories: ["Design"],
    date: "Aug 28, 2026",
    time: "13:00 WIB",
    location: "Tangerang",
    attendees: 32,
    capacity: 80,
    description:
      "Discuss modern UI/UX design practices and share design experiences.",
    community: "Design Community",
    endTime: "15:00 WIB",
    eventFormat: "in_person",
    speakers: [
      {
        name: "Sarah",
        title: "UI/UX Designer",
      },
      {
        name: "Nadia",
        title: "Product Designer",
      },
    ],
  },

  {
    id: 4,
    title: "JavaScript Developer Meetup",
    image:
      "https://i.pinimg.com/1200x/3f/f3/38/3ff338fded7cab6c231606b35ebe18ab.jpg",
    categories: ["Technology", "Programming"],
    date: "Sep 2, 2026",
    time: "09:30 WIB",
    location: "Depok",
    attendees: 64,
    capacity: 100,
    description:
      "Meet fellow JavaScript developers and discuss modern JavaScript development.",
    community: "Programming Community",
    endTime: "11:30 WIB",
    eventFormat: "in_person",
    speakers: [
      {
        name: "Fajar",
        title: "JavaScript Developer",
      },
    ],
  },

  {
    id: 5,
    title: "Frontend Development Bootcamp",
    image:
      "https://i.pinimg.com/736x/0c/20/66/0c20661fc6955dbd44a3d85df723c1ac.jpg",
    categories: ["Technology", "Programming"],
    date: "Sep 5, 2026",
    time: "08:00 WIB",
    location: "Jakarta",
    attendees: 85,
    capacity: 120,
    description:
      "An intensive frontend development bootcamp covering modern web technologies.",
    community: "Koda Academy",
    endTime: "16:00 WIB",
    eventFormat: "in_person",
    speakers: [
      {
        name: "Budi",
        title: "Frontend Engineer",
      },
      {
        name: "Aldi",
        title: "React Developer",
      },
    ],
  },

  {
    id: 6,
    title: "Backend API Workshop",
    image:
      "https://i.pinimg.com/736x/91/af/7a/91af7af540ac583d9f76b1ca920e962a.jpg",
    categories: ["Technology", "Programming"],
    date: "Sep 8, 2026",
    time: "10:00 WIB",
    location: "Bekasi",
    attendees: 41,
    capacity: 70,
    description:
      "Learn how to build and consume RESTful APIs using modern backend technologies.",
    community: "Programming Community",
    endTime: "12:00 WIB",
    eventFormat: "in_person",
    speakers: [
      {
        name: "Dimas",
        title: "Backend Engineer",
      },
    ],
  },

  {
    id: 7,
    title: "Digital Marketing Summit",
    image:
      "https://i.pinimg.com/736x/b9/9c/5e/b99c5e1cfeb580f532ab453a3152bb01.jpg",
    categories: ["Business"],
    date: "Sep 12, 2026",
    time: "09:00 WIB",
    location: "Jakarta",
    attendees: 92,
    capacity: 150,
    description:
      "Explore digital marketing strategies, trends, and practical business growth techniques.",
    community: "Business Community",
    endTime: "13:00 WIB",
    eventFormat: "in_person",
    speakers: [
      {
        name: "Rina",
        title: "Digital Marketing Specialist",
      },
      {
        name: "Bayu",
        title: "Marketing Manager",
      },
    ],
  },

  {
    id: 8,
    title: "Photography Community Meetup",
    image:
      "https://i.pinimg.com/1200x/0d/e3/50/0de350fd91895b8a880845ad26822bcd.jpg",
    categories: ["Design"],
    date: "Sep 15, 2026",
    time: "14:00 WIB",
    location: "Bandung",
    attendees: 27,
    capacity: 50,
    description:
      "A casual photography meetup to share techniques, experiences, and creative ideas.",
    community: "Creative Community",
    endTime: "17:00 WIB",
    eventFormat: "in_person",
    speakers: [
      {
        name: "Rafi",
        title: "Photographer",
      },
    ],
  },

  {
    id: 9,
    title: "Startup Networking Night",
    image:
      "https://i.pinimg.com/736x/53/7c/4c/537c4cd1309010920fa8ca73b68a936d.jpg",
    categories: ["Business"],
    date: "Sep 20, 2026",
    time: "18:30 WIB",
    location: "Tangerang",
    attendees: 58,
    capacity: 80,
    description:
      "Connect with startup founders, developers, investors, and business professionals.",
    community: "Business Community",
    endTime: "21:00 WIB",
    eventFormat: "in_person",
    speakers: [
      {
        name: "Arif",
        title: "Startup Founder",
      },
      {
        name: "Kevin",
        title: "Business Consultant",
      },
    ],
  },

  {
    id: 10,
    title: "Cloud Computing Workshop",
    image:
      "https://i.pinimg.com/1200x/e2/5e/bb/e25ebbe011b06ba3029b070c22121836.jpg",
    categories: ["Technology", "Programming"],
    date: "Sep 25, 2026",
    time: "09:00 WIB",
    location: "Surabaya",
    attendees: 36,
    capacity: 60,
    description:
      "Learn the fundamentals of cloud computing and modern cloud infrastructure.",
    community: "Technology Community",
    endTime: "11:00 WIB",
    eventFormat: "online",
    speakers: [
      {
        name: "Raka",
        title: "Cloud Engineer",
      },
    ],
  },
];

export default Events;