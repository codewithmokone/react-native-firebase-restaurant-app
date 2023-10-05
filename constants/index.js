export const categories = [
    {
        id: 1,
        name: 'Pizza',
        image: require('../assets/categoryImages/pizza.png'),
    },
    {
        id: 2,
        name: 'Burger',
        image: require('../assets/categoryImages/burger.png'),
    },
    {
        id: 3,
        name: 'Italian',
        image: require('../assets/categoryImages/italian.png'),
    },
    {
        id: 4,
        name: 'Chinese',
        image: require('../assets/categoryImages/chinese.png'),
    },
    {
        id: 5,
        name: 'Salads',
        image: require('../assets/categoryImages/salad.png'),
    },
    {
        id: 6,
        name: 'Sweets',
        image: require('../assets/images/pizzaIcon.png'),
    },

]


export const featured = {
    id: 1,
    title: 'Hot and Spicy',
    description: 'soft and tender fried chicken',
    restaurants: [
        {
            id: 1,
            name: 'Papa Johns',
            image: require('../assets/restaurantImages/papajohns.jpg'),
            description: 'Hot and spicy pizzas',
            lng: -85.5324269,
            lat: 38.2145602,
            address: '434 second street',
            stars: 4,
            reviews: '4.4k',
            category: 'Burger',
            dishes: [
                {
                   id: 1,
                   name: 'Pizza',
                   description: 'cheezy garlic pizza',
                   price: 110,
                   image:  require('../assets/images/pizzaDish.png')
                },
                {
                   id: 2,
                   name: 'Burger ',
                   description: 'Grilled red onion, lettuce & tomato',
                   price: 97,
                   image:  require('../assets/images/pizzaDish.png')
                },
                {
                   id: 3,
                   name: 'Salad',
                   description: 'Smoked salmon, baby leaf lettuce, cherry tomatoes, cucumber, feta, avo, with lemon & dill dressing',
                   price: 165,
                   image:  require('../assets/images/pizzaDish.png')
                },
                {
                    id: 4,
                    name: 'Sushi',
                    description: 'spicy salmon, prawn, avo, dill pickle & mayo with teriyaki sauce',
                    price: 103,
                    image:  require('../assets/images/pizzaDish.png')
                 },
            ]
    
        },
        {
            id: 2,
            name: 'Papa Johns',
            image: require('../assets/images/pizza.png'),
            description: 'Hot and spicy pizzas',
            lng: -85.5324269,
            lat: 38.2145602,
            address: '434 second street',
            stars: 4,
            reviews: '4.6k',
            category: 'Pizza',
            dishes: [
                {
                   id: 1,
                   name: 'Something Meaty',
                   description: 'Ham, pepperoni, bacon, ground beef, BBQ sauce',
                   price: 139,
                   image:  require('../assets/images/pizzaDish.png')
                },
                {
                   id: 2,
                   name: 'Garlic Meaty Supreme',
                   description: 'Garlic spread base, pepperoni, ham, bacon, ground beef',
                   price: 129,
                   image:  require('../assets/images/pizzaDish.png')
                },
                {
                   id: 3,
                   name: 'Mexican Fiesta',
                   description: 'Ground beef, jalapeño, green pepper, onion, Mexican sauce',
                   price: 139,
                   image:  require('../assets/images/pizzaDish.png')
                },
                {
                    id: 4,
                    name: 'Hawaiian',
                    description: 'Ham, pineapple',
                    price: 109,
                    image:  require('../assets/images/pizzaDish.png')
                 },
            ]
    
        },
        {
            id: 3,
            name: 'Papa Johns',
            image: require('../assets/images/pizza.png'),
            description: 'Hot and spicy pizzas',
            lng: -85.5324269,
            lat: 38.2145602,
            address: '434 second street',
            stars: 4,
            reviews: '4.4k',
            category: 'Fast Food',
            dishes: [
                {
                   id: 1,
                   name: 'pizza',
                   description: 'cheezy garlic pizza',
                   price: 10,
                   image:  require('../assets/images/pizzaDish.png')
                },
                {
                   id: 2,
                   name: 'pizza',
                   description: 'cheezy garlic pizza',
                   price: 10,
                   image:  require('../assets/images/pizzaDish.png')
                },
                {
                   id: 3,
                   name: 'pizza',
                   description: 'cheezy garlic pizza',
                   price: 10,
                   image:  require('../assets/images/pizzaDish.png')
                },
            ]
    
        }
    ]
}

export const todays_specials = {
    id: 1,
    title: 'Most Loved Meals',
    dishes: [
                {
                   id: 1,
                   name: 'Pizza',
                   description: 'cheezy garlic pizza',
                   price: 110,
                   image:  require('../assets/images/pizzaDish.png')
                },
                {
                   id: 2,
                   name: 'Burger ',
                   description: 'Grilled red onion, lettuce & tomato',
                   price: 97,
                   image:  require('../assets/images/pizzaDish.png')
                },
                {
                   id: 3,
                   name: 'Salad',
                   description: 'Smoked salmon, baby leaf lettuce, cherry tomatoes, cucumber, feta, avo, with lemon & dill dressing',
                   price: 165,
                   image:  require('../assets/images/pizzaDish.png')
                },
                {
                    id: 4,
                    name: 'Sushi',
                    description: 'spicy salmon, prawn, avo, dill pickle & mayo with teriyaki sauce',
                    price: 103,
                    image:  require('../assets/images/pizzaDish.png')
                 },
    ]
}