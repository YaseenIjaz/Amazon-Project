export function getProduct(productId) {
  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  return matchingProduct;
}

class Product{
  id;
  image;
  name;
  rating;
  price;

  constructor(productDetails){
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.price = productDetails.price;
    this.keywords = productDetails.keywords;
    this.type = productDetails.type;
  }

  getStarsUrl(){
   return `images/images/ratings/rating-${this.rating.stars*10}.png`
  }
}
function generateProductId() {
  return crypto.randomUUID();
}

export const products = [
    {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87
      },
      price: 249,
      keywords: [
        "socks",
        "sports",
        "apparel"
      ],
      type: 'sports'
    },
    {
      id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      image: "images/images/products/intermediate-composite-basketball.jpg",
      name: "Intermediate Size Basketball",
      rating: {
        stars: 4,
        count: 127
      },
      price: 599,
      keywords: [
        "sports",
        "basketballs"
      ],
      type: 'sports'
    },
    {
      id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      image: "images/images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
      name: "Adults Plain Cotton T-Shirt - 2 Pack",
      rating: {
        stars: 4.5,
        count: 56
      },
      price: 679,
      keywords: [
        "tshirts",
        "apparel",
        "mens"
      ],
      type: "mens-fashion",
      sizeChartLink: "images/images/clothing-size-chart.png"
    },
    {
      id: "54e0eccd-8f36-462b-b68a-8182611d9add",
      image: "images/images/products/black-2-slot-toaster.jpg",
      name: "2 Slot Toaster - Black",
      rating: {
        stars: 5,
        count: 2197
      },
      price: 1499,
      keywords: [
        "toaster",
        "kitchen",
        "appliances"
      ],
      type: 'kitchen'
    },
    {
      id: "3ebe75dc-64d2-4137-8860-1f5a963e534b",
      image: "images/images/products/6-piece-white-dinner-plate-set.jpg",
      name: "6 Piece White Dinner Plate Set",
      rating: {
        stars: 4,
        count: 37
      },
      price: 499,
      keywords: [
        "plates",
        "kitchen",
        "dining"
      ],
      type: 'kitchen'
    },
    {
      id: "8c9c52b5-5a19-4bcb-a5d1-158a74287c53",
      image: "images/images/products/6-piece-non-stick-baking-set.webp",
      name: "6-Piece Nonstick, Carbon Steel Oven Bakeware Baking Set",
      rating: {
        stars: 4.5,
        count: 175
      },
      price: 5448,
      keywords: [
        "kitchen",
        "cookware"
      ],
      type: 'kitchen'
    },
    {
      id: "dd82ca78-a18b-4e2a-9250-31e67412f98d",
      image: "images/images/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
      name: "Plain Hooded Fleece Sweatshirt",
      rating: {
        stars: 4.5,
        count: 317
      },
      price: 949,
      keywords: [
        "hoodies",
        "sweaters",
        "apparel"
      ],
      type: 'mens'
    },
    {
      id: "77919bbe-0e56-475b-adde-4f24dfed3a04",
      image: "images/images/products/luxury-tower-set-6-piece.jpg",
      name: "Luxury Towel Set - Graphite Gray",
      rating: {
        stars: 4.5,
        count: 144
      },
      price: 4599,
      keywords: [
        "bathroom",
        "washroom",
        "restroom",
        "towels",
        "bath towels"
      ],
      type: 'bathroom'
    },
    {
      id: "3fdfe8d6-9a15-4979-b459-585b0d0545b9",
      image: "images/images/products/liquid-laundry-detergent-plain.jpg",
      name: "Liquid Laundry Detergent, 110 Loads, 82.5 Fl Oz",
      rating: {
        stars: 4.5,
        count: 305
      },
      price: 359,
      keywords: [
        "bathroom",
        "cleaning"
      ],
      type: 'bathroom'
    },
    {
      id: "58b4fc92-e98c-42aa-8c55-b6b79996769a",
      image: "images/images/products/knit-athletic-sneakers-gray.jpg",
      name: "Waterproof Knit Athletic Sneakers - Gray",
      rating: {
        stars: 4,
        count: 89
      },
      price: 1799,
      keywords: [
        "shoes",
        "running shoes",
        "footwear"
      ],
      type: 'mens-fashion'
    },
    {
      id: "5968897c-4d27-4872-89f6-5bcb052746d7",
      image: "images/images/products/bunny-rabbit-soft-toy.jpg",
      name: "Niku Rabbit with Chain Reversible Bunny Rabbit Soft Stuffed Toy",
      rating: {
        stars: 4.5,
        count: 235
      },
      price: 309,
      keywords: [
        "toys",
        "rabbit",
        "soft toy"
      ],
      type: "toys",
      
    },
    {
      id: "aad29d11-ea98-41ee-9285-b916638cac4a",
      image: "images/images/products/round-sunglasses-black.jpg",
      name: "Round Sunglasses",
      rating: {
        stars: 4.5,
        count: 30
      },
      price: 849,
      keywords: [
        "accessories",
        "shades"
      ],
      type: 'mens-fashion'
    },
    {
      id: "04701903-bc79-49c6-bc11-1af7e3651358",
      image: "images/images/products/women-beach-sandals.jpg",
      name: "Women's Two Strap Buckle Sandals - Tan",
      rating: {
        stars: 4.5,
        count: 562
      },
      price: 849,
      keywords: [
        "footwear",
        "sandals",
        "womens",
        "beach",
        "summer"
      ],
      type: 'womens-fashion'
    },
    {
      id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
      image: "images/images/products/blackout-curtain-set-beige.webp",
      name: "Blackout Curtains Set 4-Pack - Beige",
      rating: {
        stars: 4.5,
        count: 232
      },
      price: 929,
      keywords: [
        "bedroom",
        "curtains",
        "home"
      ],
      type: 'home'
    },
    {
      id: "82bb68d7-ebc9-476a-989c-c78a40ee5cd9",
      image: "images/images/products/men-slim-fit-summer-shorts-gray.jpg",
      name: "Men's Slim-Fit Summer Shorts",
      rating: {
        stars: 4,
        count: 160
      },
      price: 679,
      keywords: [
        "shorts",
        "apparel",
        "mens"
      ],
      type: 'mens-fashion'
    },
    {
      id: "c2a82c5e-aff4-435f-9975-517cfaba2ece",
      image: "images/images/products/electric-glass-and-steel-hot-water-kettle.webp",
      name: "Electric Glass and Steel Hot Tea Water Kettle - 1.7-Liter",
      rating: {
        stars: 5,
        count: 846
      },
      price: 1399,
      keywords: [
        "water boiler",
        "appliances",
        "kitchen"
      ],
      type: 'kitchen'
    },
    {
      id: "6b07d4e7-f540-454e-8a1e-363f25dbae7d",
      image: "images/images/products/facial-tissue-2-ply-18-boxes.jpg",
      name: "Ultra Soft Tissue 2-Ply - 6 Box",
      rating: {
        stars: 4,
        count: 99
      },
      price: 349,
      keywords: [
        "kleenex",
        "tissues",
        "kitchen",
        "tissues box",
        "napkins"
      ],
      type: 'kitchen'
    },
    {
      id: "a82c6bac-3067-4e68-a5ba-d827ac0be010",
      image: "images/images/products/straw-sunhat.webp",
      name: "Straw Lifeguard Sun Hat",
      rating: {
        stars: 4,
        count: 215
      },
      price: 5012,
      keywords: [
        "hats",
        "straw hats",
        "summer",
        "apparel"
      ],
      type: 'mens-fashion'
    },
    {
      id: "e4f64a65-1377-42bc-89a5-e572d19252e2",
      image: "images/images/products/sky-flower-stud-earrings.webp",
      name: "Sterling Silver Sky Flower Stud Earrings",
      rating: {
        stars: 4.5,
        count: 52
      },
      price: 710,
      keywords: [
        "jewelry",
        "accessories",
        "womens"
      ],
      type: 'womens-fashion'
    },
    {
      id: "b0f17cc5-8b40-4ca5-9142-b61fe3d98c85",
      image: "images/images/products/women-stretch-popover-hoodie-black.jpg",
      name: "Women's Stretch Popover Hoodie",
      rating: {
        stars: 4.5,
        count: 2465
      },
      price: 849,
      keywords: [
        "hooded",
        "hoodies",
        "sweaters",
        "womens",
        "apparel"
      ],
      type: "womens-fashion",
      sizeChartLink: "images/images/clothing-size-chart.png"
    },
    {
      id: "a93a101d-79ef-4cf3-a6cf-6dbe532a1b4a",
      image: "images/images/products/bathroom-rug.jpg",
      name: "Bathroom Bath Rug Mat 20 x 31 Inch - Grey",
      rating: {
        stars: 4.5,
        count: 119
      },
      price: 545,
      keywords: [
        "bathmat",
        "bathroom",
        "home"
      ],
      type: 'home'
    },
    {
      id: "4f4fbcc2-4e72-45cc-935c-9e13d79cc57f",
      image: "images/images/products/women-knit-ballet-flat-black.jpg",
      name: "Women's Knit Ballet Flat",
      rating: {
        stars: 4,
        count: 326
      },
      price: 899,
      keywords: [
        "shoes",
        "flats",
        "womens",
        "footwear"
      ],
      type: 'womens-fashion'
    },
    {
      id: "8b5a2ee1-6055-422a-a666-b34ba28b76d4",
      image: "images/images/products/men-golf-polo-t-shirt-blue.jpg",
      name: "Men's Regular-Fit Quick-Dry Golf Polo Shirt",
      rating: {
        stars: 4.5,
        count: 2556
      },
      price: 809,
      keywords: [
        "tshirts",
        "shirts",
        "apparel",
        "mens"
      ],
      type: "mens-fashion",
      sizeChartLink: "images/images/clothing-size-chart.png"
    },
    {
      id: "b86ddc8b-3501-4b17-9889-a3bad6fb585f",
      image: "images/images/products/trash-can-with-foot-pedal-50-liter.jpg",
      name: "Trash Can with Foot Pedal - Brushed Stainless Steel",
      rating: {
        stars: 4.5,
        count: 2286
      },
      price: 1148,
      keywords: [
        "garbage",
        "bins",
        "cans",
        "kitchen"
      ],
      type: 'home'
    },
    {
      id: "19c6a64a-5463-4d45-9af8-e41140a4100c",
      image: "images/images/products/duvet-cover-set-blue-twin.jpg",
      name: "Duvet Cover Set with Zipper Closure",
      rating: {
        stars: 4,
        count: 456
      },
      price: 599,
      keywords: [
        "bedroom",
        "bed sheets",
        "sheets",
        "covers",
        "home"
      ],
      type: 'sports'
    },
    {
      id: "d2785924-743d-49b3-8f03-ec258e640503",
      image: "images/images/products/women-chunky-beanie-gray.webp",
      name: "Women's Chunky Cable Beanie - Gray",
      rating: {
        stars: 5,
        count: 83
      },
      price: 3942,
      keywords: [
        "hats",
        "winter hats",
        "beanies",
        "tuques",
        "apparel",
        "womens"
      ],
      type: 'womens-fashion'
    },
    {
      id: "ee1f7c56-f977-40a4-9642-12ba5072e2b0",
      image: "images/images/products/men-chino-pants-beige.jpg",
      name: "Men's Classic-fit Pleated Chino Pants",
      rating: {
        stars: 4.5,
        count: 9017
      },
      price: 1129,
      keywords: [
        "pants",
        "apparel",
        "mens"
      ],
      type: 'mens-fashion'
    },
    {
      id: "1c079479-8586-494f-ab53-219325432536",
      image: "images/images/products/men-athletic-shoes-green.jpg",
      name: "Men's Athletic Sneaker",
      rating: {
        stars: 4,
        count: 229
      },
      price: 1139,
      keywords: [
        "shoes",
        "running shoes",
        "footwear",
        "mens"
      ],
      type: 'mens-fashion'
    },
    {
      id: "4df68c27-fd59-4a6a-bbd1-e754ddb6d53c",
      image: "images/images/products/men-navigator-sunglasses-brown.jpg",
      name: "Men's Navigator Sunglasses Pilot",
      rating: {
        stars: 3.5,
        count: 42
      },
      price: 1119,
      keywords: [
        "sunglasses",
        "glasses",
        "accessories",
        "shades"
      ],
      type: 'mens-fashion'
    },
    {
      id: "4e37dd03-3b23-4bc6-9ff8-44e112a92c64",
      image: "images/images/products/non-stick-cooking-set-15-pieces.webp",
      name: "Non-Stick Cookware Set, Pots, Pans and Utensils - 15 Pieces",
      rating: {
        stars: 4.5,
        count: 511
      },
      price: 4229,
      keywords: [
        "cooking set",
        "kitchen"
      ],
      type: 'kitchen'
    },
    {
      id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
      image: "images/images/products/vanity-mirror-silver.jpg",
      name: "Vanity Mirror with Heavy Base - Chrome",
      rating: {
        stars: 4.5,
        count: 130
      },
      price: 1649,
      keywords: [
        "bathroom",
        "washroom",
        "mirrors",
        "home"
      ],
      type: 'home'
    },
    {
      id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
      image: "images/images/products/women-french-terry-fleece-jogger-camo.jpg",
      name: "Women's Fleece Jogger Sweatpant",
      rating: {
        stars: 4.5,
        count: 248
      },
      price: 699,
      keywords: [
        "pants",
        "sweatpants",
        "jogging",
        "apparel",
        "womens"
      ],
      type: 'womens-fashion'
    },
    {
      id: "d339adf3-e004-4c20-a120-40e8874c66cb",
      image: "images/images/products/double-elongated-twist-french-wire-earrings.webp",
      name: "Double Oval Twist French Wire Earrings - Gold",
      rating: {
        stars: 4.5,
        count: 117
      },
      price: 499,
      keywords: [
        "accessories",
        "womens"
      ],
      type: 'womens-fasionn'
    },
    {
      id: "d37a651a-d501-483b-aae6-a9659b0757a0",
      image: "images/images/products/round-airtight-food-storage-containers.jpg",
      name: "Round Airtight Food Storage Containers - 5 Piece",
      rating: {
        stars: 4,
        count: 126
      },
      price: 749,
      keywords: [
        "boxes",
        "food containers",
        "kitchen"
      ],
      type: 'kitchen'
    },
    {
      id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
      image: "images/images/products/coffeemaker-with-glass-carafe-black.jpg",
      name: "Coffeemaker with Glass Carafe and Reusable Filter - 25 Oz, Black",
      rating: {
        stars: 4.5,
        count: 1211
      },
      price: 1598,
      keywords: [
        "coffeemakers",
        "kitchen",
        "appliances"
      ],
      type: 'kitchen'
    },
    {
      id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
      image: "images/images/products/blackout-curtains-black.jpg",
      name: "Blackout Curtains Set 42 x 84-Inch - Black, 2 Panels",
      rating: {
        stars: 4.5,
        count: 363
      },
      price: 998,
      keywords: [
        "bedroom",
        "home"
      ],
      type: 'home'
    },
    {
      id: "8a53b080-6d40-4a65-ab26-b24ecf700bce",
      image: "images/images/products/cotton-bath-towels-teal.webp",
      name: "100% Cotton Bath Towels - 2 Pack, Light Teal",
      rating: {
        stars: 4.5,
        count: 93
      },
      price: 999,
      keywords: [
        "bathroom",
        "home",
        "towels"
      ],
      type: 'home'
    },
    {
      id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
      image: "images/images/products/knit-athletic-sneakers-pink.webp",
      name: "Waterproof Knit Athletic Sneakers - Pink",
      rating: {
        stars: 4,
        count: 89
      },
      price: 3390,
      keywords: [
        "shoes",
        "running shoes",
        "footwear",
        "womens"
      ],
      type: 'womens-fashion'
    },
    {
      id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
      image: "images/images/products/countertop-blender-64-oz.jpg",
      name: "Countertop Blender - 64oz, 1400 Watts",
      rating: {
        stars: 4,
        count: 3
      },
      price: 2999,
      keywords: [
        "food blenders",
        "kitchen",
        "appliances"
      ],
      type: 'kitchen'
    },
    {
      id: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
      image: "images/images/products/floral-mixing-bowl-set.jpg",
      name: "10-Piece Mixing Bowl Set with Lids - Floral",
      rating: {
        stars: 5,
        count: 679
      },
      price: 759,
      keywords: [
        "mixing bowls",
        "baking",
        "cookware",
        "kitchen"
      ],
      type: 'kitchen'
    },
    {
      id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
      image: "images/images/products/kitchen-paper-towels-30-pack.jpg",
      name: "2-Ply Kitchen Paper Towels",
      rating: {
        stars: 4.5,
        count: 1045
      },
      price: 333,
      keywords: [
        "kitchen",
        "kitchen towels",
        "tissues"
      ],
      type: 'kitchen'
    },
    {
      id: "bc2847e9-5323-403f-b7cf-57fde044a955",
      image: "images/images/products/men-cozy-fleece-zip-up-hoodie-red.jpg",
      name: "Men's Full-Zip Hooded Fleece Sweatshirt",
      rating: {
        stars: 4.5,
        count: 3157
      },
      price: 949,
      keywords: [
        "sweaters",
        "hoodies",
        "apparel",
        "mens"
      ],
      type: 'mens-fashion'
    },
    {
      id: "002847e9-5323-405f-b7cf-57fde244a905",
      image: "images/images/products/rubiks-cube-beginner-speed-cube.jpg",
      name: "Rubiks Cube",
      rating: {
        stars: 4.5,
        count: 352
      },
      price: 949,
      keywords: [
        "toys",
        "cube",
        "rubiks cube"
      ],
      type: 'toys'
    },
    {
      id: "mc2047e9-6323-405f-b3cf-57fle244a905",
      image: "images/images/products/gold-plated-bangles.jpg",
      name: "Gold Plated Bangles",
      rating: {
        stars: 3.5,
        count: 5100
      },
      price: 338,
      keywords: [
        "women",
        "bangles",
        "jewellery"
      ],
      type: 'womens-fashion'
    },
    {
      id: "kc2847e0-2323-905f-b7cf-57mde244a904",
      image: "images/images/products/noise-on-ear.jpg",
      name: "Noise 4 Wireless On-Ear Headphones",
      rating: {
        stars: 4,
        count: 782
      },
      price: 2499,
      keywords: [
        "headphones",
        "noise",
        "on ear"
      ],
      type: 'headphones'
    },
    {
      id: "wc2887e9-5323-405z-07cf-57fde344a905",
      image: "images/images/products/penguin-plush-toy-for-kids.jpg",
      name: "Penguin Plush Toy",
      rating: {
        stars: 4,
        count: 212
      },
      price: 549,
      keywords: [
        "toys",
        "plush toy",
        "soft toy",
        "penguin"
      ],
      type: 'toys'
    },
    {
      id: "wr2867e9-7323-405z-07cr-57fde304a105",
      image: "images/images/products/handbag.jpg",
      name: "Synthetic Leather Women's Satchel Bag | Ladies Purse Handbag",
      rating: {
        stars: 3.5,
        count: 209
      },
      price: 1899,
      keywords: [
        "womens",
        "purse",
        "handbag",
        "leather"
      ],
      type: 'womens-fashion'
    },
    {
      id: "pc2837e9-6323-405z-07of-57fdc344a905",
      image: "images/images/products/lego.jpg",
      name: "Lego Porsche 911 Turbo",
      rating: {
        stars: 5,
        count: 1100
      },
      price: 4224,
      keywords: [
        "toys",
        "lego",
        "porsche",
        "car",
        "cars"
      ],
      type: 'toys'
    },
    {
      id: "wc2287e9-5323-405z-07cf-57fde344a905",
      image: "images/images/products/noise-tws.jpg",
      name: "Noise Buds VS104 Truly Wireless Earbuds",
      rating: {
        stars: 4,
        count: 6700
      },
      price: 1199,
      keywords: [
        "noise",
        "tws",
        "headphones",
        "headphone"
      ],
      type: 'headphone'
    },
    {
      id: "zc4207e9-5323-405v-03cf-57fde344p905",
      image: "images/images/products/georgette-saree.jpg",
      name: "Women's Georgette Digital Printed Saree",
      rating: {
        stars: 3.5,
        count: 1500
      },
      price: 929,
      keywords: [
        "saree",
        "womens"
      ],
      type: 'womens-fashion'
    },
    {
      id: "wc1887e9-5323-405z-07cf-67fde844a05",
      image: "images/images/products/remote-control-car.jpg",
      name: "Rechargebale Rotating & Rolling Small Stunt Car Toy with remote Controller & USB Cable",
      rating: {
        stars: 3.5,
        count: 519
      },
      price: 369,
      keywords: [
        "toys",
        "car",
        "remote control"
      ],
      type: 'toys'
    },
    {
      id: "wc4837e9-5323-435p-07cf-57fde348a905",
      image: "images/images/products/boat-on-ear.jpg",
      name: "boAt Rockerz 450 Pro Bluetooth On Ear Headphones",
      rating: {
        stars: 4,
        count: 18700
      },
      price: 1999,
      keywords: [
        "boat",
        "headphones",
        "on ear",
        "headphone"
      ],
      type: 'headphones'
    },
    {
      id: "xc2887e9-5323-105z-07cf-57fie344a985",
      image: "images/images/products/lego-harry-potter.jpg",
      name: "LEGO Harry Potter Ollivanders & Madam Malkin's Robes Building Blcks Toys",
      rating: {
        stars: 4.5,
        count: 113
      },
      price: 8799,
      keywords: [
        "toys",
        "lego",
        "obuilding blocks",
        "harry potter"
      ],
      type: 'toys'
    },
    {
      id: "72er87e9-5323-40t1-07cf-57fde344a905",
      image: "images/images/products/boat-neckband.jpg",
      name: "boAt Rockerz 255 Pro+ Bluetooth Neckband, Bluetooth Headphones",
      rating: {
        stars: 4,
        count: 5200
      },
      price: 1049,
      keywords: [
        "boat",
        "headphones",
        "neckband",
        "headphone"
      ],
      type: 'headphones'
    }
  ].map((productDetails) =>{
    return new Product(productDetails);
  });

export const groceries = [
  {
    id: "44eee002-f39a-43c8-ad12-3deb6d4f78ba",
    image: "images/images/products/rice.jpg",
    name: "India Gate Basmati Rice Everyday 5 kg",
    rating: {
      stars: 4,
      count: 2087
    },
    price: 347,
    keywords: [
      "rice",
      "groceries",
      "basmati"
    ],
    type: 'groceries'
  },
  {
    id: "917227d8-7267-4de0-a430-b7e2a646a521",
    image: "images/images/products/salt.jpg",
    name: "Tata Salt 1 kg",
    rating: {
      stars: 4.5,
      count: 67093
    },
    price: 28,
    keywords: [
      "salt",
      "groceries",
      "tata"
    ],
    type: 'groceries'
  },
  {
    id: "9fc2702e-9059-4cd0-a345-a35a2bbb4e0c",
    image: "images/images/products/biscuits.jpg",
    name: "Unibic Cookies, 75g(Pack Of 10)",
    rating: {
      stars: 4.5,
      count: 67093
    },
    price: 28,
    keywords: [
      "cookies",
      "groceries",
      "biscuits"
    ],
    type: 'groceries'
  },
  {
    id: "db60931b-5b1e-4b7e-a67a-243e7de254bd",
    image: "images/images/products/ariel-detergent-liquid.jpg", 
    name: "Ariel Liquid Detergent Front Load 4L + 2L",
    rating: {
      stars: 4.5,
      count: 18997
    },
    price: 898,
    keywords: [
      "detergent",
      "liquid detergent",
      "groceries"
    ],
    type: 'groceries'
  },
  {
    id: "744e2bd7-3bfb-4dfb-aa81-9354c9bec168",
    image: "images/images/products/fortune-sunflower-oil.jpg",
    name: "Fortune Sunlite Refined Sunflower Oil, 1L",
    rating: {
      stars: 4.5,
      count: 36934
    },
    price: 170,
    keywords: [
      "oil",
      "sunflower oil",
      "groceries"
    ],
    type: 'groceries'
  },
  {
    id: "fb22b258-4d66-461f-a61b-8aab2d03f9ed",
    image: "images/images/products/kelloggs.jpg",
    name: "Kellogg's Muesli Fruit Nut & Seeds 750G | 12-In-1 Power Breakfast | India'S No. 1 Muesli | Multigrain Breakfast Cereal",
    rating: {
      stars: 4.5,
      count: 23322
    },
    price: 369,
    keywords: [
      "kelloggs",
      "breakfast",
      "groceries"
    ],
    type: 'groceries'
  }
].map((productDetails) =>{
  return new Product(productDetails);
});