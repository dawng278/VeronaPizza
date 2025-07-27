// frontend/src/data/menuData.js

// Import tất cả các ảnh tĩnh cần thiết
// Đảm bảo các đường dẫn ảnh này tồn tại trong dự án của bạn!

// Cheese Volcano
import cheeseVolcanoCheeseburger from '../assets/images/menu/cheese_volcano_cheeseburger.png'; // Updated image name
import cheeseVolcanoPepperoni from '../assets/images/menu/cheese_volcano_pepperoni.png'; // Updated image name
import cheeseVolcanoExtravaganza from '../assets/images/menu/cheese_volcano_extraveganza.png'; // Updated image name
import cheeseVolcanoMeatLovers from '../assets/images/menu/cheese_volcano_meat_lovers.png'; // Updated image name

// Super Topping
import superToppingManila from '../assets/images/menu/super_topping_manila.png'; // Updated image name
import superToppingShrimp from '../assets/images/menu/super_topping_shrimp.png'; // Updated image name
import superToppingPesto from '../assets/images/menu/super_topping_pesto.png'; // Updated image name
import superToppingCheeseburger from '../assets/images/menu/super_topping_cheeseburger.png'; // Updated image name
import superToppingBeefTurf from '../assets/images/menu/super_topping_beef_turf.png'; // Updated image name
import superToppingPepperoni from '../assets/images/menu/super_topping_pepperoni.png'; // Updated image name

// Seafood Cravers
import oceanManila from '../assets/images/menu/seafood_cravers_ocean_manila.png'; // Updated image name
import pizzamiaSea from '../assets/images/menu/seafood_cravers_pizzamia_sea.png'; // Updated image name
import seafoodDelight from '../assets/images/menu/seafood_cravers_seafood_delight.png'; // Updated image name
import seafoodLimePesto from '../assets/images/menu/seafood_cravers_seafood_lime_pesto.png'; // Updated image name

// Kid Favors
import kidFavorsChickenBbq from '../assets/images/menu/kid_favors_chicken_bbq.png'; // New image import
import kidFavorsHawaiian from '../assets/images/menu/kid_favors_hawaiian.png'; // New image import
import kidFavorsMiniCheese from '../assets/images/menu/kid_favors_mini_cheese.png'; // New image import
import kidFavorsVeggie from '../assets/images/menu/kid_favors_veggie.png'; // New image import

// Traditional & Meat Lovers
import traditionalClassicPepperoni from '../assets/images/menu/traditional_meat_lovers_classic_pepperoni.png'; // New image import
import traditionalFourCheese from '../assets/images/menu/traditional_meat_lovers_four_cheese.png'; // New image import
import traditionalSupreme from '../assets/images/menu/traditional_meat_lovers_supreme.png'; // New image import
import traditionalGardenVeggie from '../assets/images/menu/traditional_meat_lovers_garden_veggie.png'; // New image import
import traditionalBeefSausage from '../assets/images/menu/traditional_meat_lovers_beef_sausage.png'; // New image import
import traditionalPepperoniFeast from '../assets/images/menu/traiditional_pepperoni_feast.png'; // New image import
import traditionalCheeseMania from '../assets/images/menu/cheese-mania.png';

// Drinks
import drinkCocaCola from '../assets/images/menu/drink_coca_cola.png'; // New image import
import drinkSunkistOrange from '../assets/images/menu/drink_sunkist_orange.png'; // New image import
import drinkSprite from '../assets/images/menu/drink_sprite.png'; // New image import
import drinkCocaColaZero from '../assets/images/menu/drink_coca_cola_zero.png'; // New image import
import drinkCocaColaLargeBottle from '../assets/images/menu/drink_coca_cola_large_bottle.png'; // New image import
import drinkCocaColaZeroLargeBottle from '../assets/images/menu/drink_coca_cola_zero_large_bottle.png'; // New image import
import drinkSpriteBottle from '../assets/images/menu/drink_sprite_bottle.png'; // New image import
import drinkFantaOrangeBottle from '../assets/images/menu/drink_fanta_orange_bottle.png'; // New image import
import drinkFruitTeaStrawberry from '../assets/images/menu/drink_fruit_tea_strawberry.png'; // New image import
import drinkFruitTeaLemon from '../assets/images/menu/drink_fruit_tea_lemon.png'; // New image import
import drinkMineralWater1 from '../assets/images/menu/drink_mineral_water_1.png'; // New image import
import drinkMineralWater2 from '../assets/images/menu/drink_mineral_water_2.png'; // New image import


export const menuItems = [
    // --- CHEESE VOLCANO ---
    {
        id: 'cv1',
        name: 'Cheese Volcano Cheeseburger',
        size: '12 inch',
        price: 315000,
        image: cheeseVolcanoCheeseburger,
        category: 'beef',
        section: 'CHEESE VOLCANO',
        badge: 'NEW'
    },
    {
        id: 'cv2',
        name: 'Cheese Volcano Pepperoni',
        size: '12 inch',
        price: 302000,
        image: cheeseVolcanoPepperoni,
        category: 'pork',
        section: 'CHEESE VOLCANO',
        badge: 'NEW'
    },
    {
        id: 'cv3',
        name: 'Cheese Volcano Extravaganza',
        size: '12 inch',
        price: 305000,
        image: cheeseVolcanoExtravaganza,
        category: 'chicken',
        section: 'CHEESE VOLCANO',
        badge: 'NEW'
    },
    {
        id: 'cv4',
        name: 'Cheese Volcano Meat Lovers',
        size: '12 inch',
        price: 302000,
        image: cheeseVolcanoMeatLovers,
        category: 'beef',
        section: 'CHEESE VOLCANO',
        badge: 'NEW'
    },

    // --- SUPER TOPPING ---
    {
        id: 'st1',
        name: 'Super Topping Manila Sea',
        size: '9 inch',
        price: 233000,
        image: superToppingManila,
        category: 'seafood',
        section: 'SUPER TOPPING',
        badge: 'EXTRA 50%'
    },
    {
        id: 'st2',
        name: 'Super Topping Shrimp',
        size: '9 inch',
        price: 233000,
        image: superToppingShrimp,
        category: 'seafood',
        section: 'SUPER TOPPING',
        badge: 'EXTRA 50%'
    },
    {
        id: 'st3',
        name: 'Super Topping Lime Pesto',
        size: '9 inch',
        price: 212000,
        image: superToppingPesto,
        category: 'vegetarian',
        section: 'SUPER TOPPING',
        badge: 'EXTRA 50%'
    },
    {
        id: 'st4',
        name: 'Super Topping Cheeseburger',
        size: '9 inch',
        price: 233000,
        image: superToppingCheeseburger,
        category: 'beef',
        section: 'SUPER TOPPING',
        badge: 'EXTRA 50%'
    },
    {
        id: 'st5',
        name: 'Super Topping Beef & Turf',
        size: '9 inch',
        price: 233000,
        image: superToppingBeefTurf,
        category: 'beef',
        section: 'SUPER TOPPING',
        badge: 'EXTRA 50%'
    },
    {
        id: 'st6',
        name: 'Super Topping Pepperoni',
        size: '9 inch',
        price: 233000,
        image: superToppingPepperoni,
        category: 'pork',
        section: 'SUPER TOPPING',
    },

    // --- SEAFOOD CRAVERS ---
    {
        id: 'sc1',
        name: 'Ocean Manila',
        size: '12 inch',
        price: 280000,
        image: oceanManila,
        category: 'seafood',
        section: 'SEAFOOD CRAVERS',
    },
    {
        id: 'sc2',
        name: 'Pizzamia Sea',
        size: '12 inch',
        price: 275000,
        image: pizzamiaSea,
        category: 'seafood',
        section: 'SEAFOOD CRAVERS',
    },
    {
        id: 'sc3',
        name: 'Seafood Delight',
        size: '12 inch',
        price: 290000,
        image: seafoodDelight,
        category: 'seafood',
        section: 'SEAFOOD CRAVERS',
    },
    {
        id: 'sc4',
        name: 'Seafood Lime Pesto',
        size: '12 inch',
        price: 285000,
        image: seafoodLimePesto,
        category: 'seafood',
        section: 'SEAFOOD CRAVERS',
    },

    // --- KID FAVORS ---
    {
        id: 'kf1',
        name: 'Kid Favors Chicken BBQ',
        size: '7 inch',
        price: 175000,
        image: kidFavorsChickenBbq,
        category: 'chicken',
        section: 'KID FAVORS',
    },
    {
        id: 'kf2',
        name: 'Kid Favors Hawaiian',
        size: '7 inch',
        price: 175000,
        image: kidFavorsHawaiian,
        category: 'pork',
        section: 'KID FAVORS',
    },
    {
        id: 'kf3',
        name: 'Kid Favors Mini Cheese',
        size: '7 inch',
        price: 175000,
        image: kidFavorsMiniCheese,
        category: 'vegetarian',
        section: 'KID FAVORS',
    },
    {
        id: 'kf4',
        name: 'Kid Favors Veggie',
        size: '7 inch',
        price: 175000,
        image: kidFavorsVeggie,
        category: 'vegetarian',
        section: 'KID FAVORS',
    },

    // --- TRADITIONAL & MEAT LOVERS ---
    {
        id: 'tml1',
        name: 'Traditional Classic Pepperoni',
        size: '12 inch',
        price: 285000,
        image: traditionalClassicPepperoni,
        category: 'pork',
        section: 'TRADITIONAL & MEAT LOVERS',
    },
    {
        id: 'tml2',
        name: 'Traditional Four Cheese',
        size: '12 inch',
        price: 285000,
        image: traditionalFourCheese,
        category: 'vegetarian',
        section: 'TRADITIONAL & MEAT LOVERS',
    },
    {
        id: 'tml3',
        name: 'Traditional Supreme',
        size: '12 inch',
        price: 285000,
        image: traditionalSupreme,
        category: 'beef',
        section: 'TRADITIONAL & MEAT LOVERS',
    },
    {
        id: 'tml4',
        name: 'Traditional Garden Veggie',
        size: '12 inch',
        price: 285000,
        image: traditionalGardenVeggie,
        category: 'vegetarian',
        section: 'TRADITIONAL & MEAT LOVERS',
    },
    {
        id: 'tml5',
        name: 'Traditional Beef Sausage',
        size: '12 inch',
        price: 285000,
        image: traditionalBeefSausage,
        category: 'beef',
        section: 'TRADITIONAL & MEAT LOVERS',
    },
    {
        id: 'tml6',
        name: 'Traditional Pepperoni Feast',
        size: '12 inch',
        price: 285000,
        image: traditionalPepperoniFeast,
        category: 'chicken',
        section: 'TRADITIONAL & MEAT LOVERS',
    },
    {
        id: 'tml7',
        name: 'Traditional Cheese Mania',
        size: '12 inch',
        price: 285000,
        image: traditionalCheeseMania,
        category: 'chicken',
        section: 'TRADITIONAL & MEAT LOVERS',
    },

    // --- DRINKS ---
    {
        id: 'd1',
        name: 'Coca-Cola',
        size: '330ml',
        price: 25000,
        image: drinkCocaCola,
        category: 'drinks',
        section: 'DRINKS',
    },
    {
        id: 'd2',
        name: 'Sunkist Orange',
        size: '330ml',
        price: 25000,
        image: drinkSunkistOrange,
        category: 'drinks',
        section: 'DRINKS',
    },
    {
        id: 'd3',
        name: 'Sprite',
        size: '330ml',
        price: 25000,
        image: drinkSprite,
        category: 'drinks',
        section: 'DRINKS',
    },
    {
        id: 'd4',
        name: 'Coca-Cola Zero',
        size: '330ml',
        price: 25000,
        image: drinkCocaColaZero,
        category: 'drinks',
        section: 'DRINKS',
    },
    {
        id: 'd5',
        name: 'Coca-Cola Classic Bottle',
        size: '1.5L',
        price: 45000,
        image: drinkCocaColaLargeBottle,
        category: 'drinks',
        section: 'DRINKS',
    },
    {
        id: 'd6',
        name: 'Coca-Cola Can',
        size: '330ml',
        price: 20000,
        image: drinkCocaColaZeroLargeBottle,
        category: 'drinks',
        section: 'DRINKS',
    },
    {
        id: 'd7',
        name: 'Sprite Bottle',
        size: '1.5L',
        price: 45000,
        image: drinkSpriteBottle,
        category: 'drinks',
        section: 'DRINKS',
    },
    {
        id: 'd8',
        name: 'Fanta Orange Bottle',
        size: '1.5L',
        price: 45000,
        image: drinkFantaOrangeBottle,
        category: 'drinks',
        section: 'DRINKS',
    },
    {
        id: 'd9',
        name: 'Fruit Tea Strawberry',
        size: '500ml',
        price: 30000,
        image: drinkFruitTeaStrawberry,
        category: 'drinks',
        section: 'DRINKS',
    },
    {
        id: 'd10',
        name: 'Fruit Tea Lemon',
        size: '500ml',
        price: 30000,
        image: drinkFruitTeaLemon,
        category: 'drinks',
        section: 'DRINKS',
    },
    {
        id: 'd11',
        name: 'Mineral Water (Small)',
        size: '500ml',
        price: 15000,
        image: drinkMineralWater1,
        category: 'drinks',
        section: 'DRINKS',
    },
    {
        id: 'd12',
        name: 'Mineral Water (Large)',
        size: '1.5L',
        price: 25000,
        image: drinkMineralWater2,
        category: 'drinks',
        section: 'DRINKS',
    },
];