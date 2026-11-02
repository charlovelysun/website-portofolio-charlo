// projects.js — Update links and status when deploying
export const projects = [
  {
    id: 1,
    number: "01",
    title: "Mini Warehouse Management System",
    category: "Full-Stack Development",
    categorySlug: "fullstack",
    description:
      "Aplikasi Mini Warehouse Management System untuk mengelola inventaris barang di beberapa gudang, memantau stok, serta mencatat setiap perubahan persediaan.",
    longDescription:
      "Proyek ini dibangun untuk memahami bagaimana sistem manajemen inventaris bekerja secara end-to-end. Menggunakan Laravel sebagai backend API dan React.js sebagai frontend, dengan MySQL sebagai database. Banyak hal yang saya pelajari dari proyek ini, mulai dari relasi antar tabel, REST API, hingga state management di React.",
    techStack: ["Laravel", "React.js", "MySQL", "REST API"],
    features: [
      "Warehouse management",
      "Product management",
      "Inventory management",
      "Stock mutations",
      "Stock in & stock out",
      "Stock audit trail",
    ],
    status: "Completed",
    featured: true,
    githubUrl: null, // Replace with your GitHub URL
    liveUrl: null,   // Replace with live demo URL
    color: "#00F5A0",
  },
  {
    id: 2,
    number: "02",
    title: "Restaurant Finance Management",
    category: "Full-Stack Development",
    categorySlug: "fullstack",
    description:
      "Aplikasi pencatatan keuangan sederhana untuk membantu usaha rumah makan mengelola pemasukan dan pengeluaran.",
    longDescription:
      "Dibuat sebagai solusi sederhana untuk pencatatan keuangan usaha kecil. Saya belajar banyak tentang bagaimana merancang struktur database yang efisien, membuat API yang bersih, dan mengintegrasikan frontend dengan backend.",
    techStack: ["Laravel", "React.js", "MySQL", "REST API"],
    features: [
      "Income management",
      "Expense management",
      "Transaction categories",
      "CRUD transactions",
      "Frontend & backend API integration",
    ],
    status: "Completed",
    featured: true,
    githubUrl: null,
    liveUrl: null,
    color: "#00C2FF",
  },
  {
    id: 3,
    number: "03",
    title: "PT Bunga Laut Mandiri",
    category: "Company Profile",
    categorySlug: "frontend",
    description:
      "Website company profile untuk memperkenalkan profil perusahaan, layanan, galeri kegiatan, serta informasi kontak.",
    longDescription:
      "Website company profile yang dibangun menggunakan HTML, CSS, dan JavaScript murni. Fokus pada responsivitas dan interaksi pengguna yang baik.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    features: [
      "Responsive design",
      "Company profile",
      "Services section",
      "Gallery",
      "Contact form",
      "WhatsApp integration",
      "Interactive navigation",
    ],
    status: "Completed",
    featured: false,
    githubUrl: null,
    liveUrl: "https://website-ptbungalautmandiri.vercel.app/",
    color: "#7C3AED",
  },
  {
    id: 4,
    number: "04",
    title: "StreetVibe",
    category: "Frontend Development",
    categorySlug: "frontend",
    description:
      "Konsep website penjualan pakaian dengan identitas visual streetwear, desain modern, dan tampilan produk yang sederhana.",
    longDescription:
      "Project eksplorasi desain website e-commerce streetwear. Lebih banyak berfokus pada estetika visual dan pengalaman pengguna.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    features: [
      "Product showcase",
      "Responsive navigation",
      "Product information",
      "Modern interface",
    ],
    status: "Concept Project",
    featured: false,
    githubUrl: null,
    liveUrl: "https://streetvibe-seven.vercel.app/",
    color: "#F59E0B",
  },
  {
    id: 5,
    number: "05",
    title: "Flexora Shoes",
    category: "Frontend Development",
    categorySlug: "frontend",
    description:
      "Konsep website penjualan sepatu dengan desain modern, navigasi interaktif, dan fokus pada tampilan produk.",
    longDescription:
      "Project frontend untuk berlatih membuat landing page produk yang clean dan menarik. Berfokus pada tipografi, komposisi layout, dan responsivitas.",
    techStack: ["HTML5", "CSS3", "JavaScript"],
    features: [
      "Product presentation",
      "Interactive navigation",
      "Responsive layout",
      "Modern visual design",
    ],
    status: "Concept Project",
    featured: false,
    githubUrl: "https://charlovelysun.github.io/Flexora-Shoes-Sepatu-Stylish-Nyaman/",
    liveUrl: "https://flexora-shoes-new.vercel.app/",
    color: "#EC4899",
  },
    {
    id: 6,
    number: "06",
    title: "Weather API - Produk",
    category: "Frontend Development",
    categorySlug: "frontend",
    description:
      "Aplikasi informasi cuaca berbasis API yang menampilkan kondisi cuaca berdasarkan lokasi menggunakan HTML, CSS, dan JavaScript.",
    longDescription:
      "Project ini dibuat untuk mempelajari cara menggunakan API dalam mengambil dan menampilkan data cuaca secara dinamis. Menggunakan JavaScript untuk mengolah data dari API dan menampilkannya kepada pengguna.",
    techStack: ["HTML5", "CSS3", "JavaScript", "Weather API"],
    features: [
      "Weather data integration",
      "API data fetching",
      "Dynamic weather information",
      "JavaScript implementation",
    ],
    status: "Completed",
    featured: false,
    githubUrl: "https://github.com/charlovelysun/wheater-api-produk",
    liveUrl: "https://wheater-api-produk.vercel.app/",
    color: "#38BDF8",
  },
];

export const projectCategories = [
  { label: "All", value: "all" },
  { label: "Full-Stack", value: "fullstack" },
  { label: "Frontend", value: "frontend" },
];
