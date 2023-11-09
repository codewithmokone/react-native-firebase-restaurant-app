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
                    name: 'Cheezy Beef Pizza',
                    description: 'Cheezy garlic pizza',
                    price: 110,
                    image: require('../assets/images/pizzaDish.png')
                },
                {
                    id: 2,
                    name: 'clasic Cheese Burger ',
                    description: 'Grilled red onion, lettuce & tomato',
                    price: 97,
                    image: require('../assets/categoryImages/burger.png')
                },
                {
                    id: 3,
                    name: 'Salad',
                    description: 'Smoked salmon, baby leaf lettuce, cherry tomatoes, cucumber, feta, avo, with lemon & dill dressing',
                    price: 165,
                    image: require('../assets/categoryImages/salad.png')
                },
                {
                    id: 4,
                    name: 'Sushi',
                    description: 'spicy salmon, prawn, avo, dill pickle & mayo with teriyaki sauce',
                    price: 103,
                    image: require('../assets/categoryImages/chinese.png')
                },
            ]

        },

    ]
}

export const burgerMenu = {
    id: 1,
    title: 'Most Loved Burgers',
    dishes: [
        {
            id: 1,
            name: 'Original BBQ Burger',
            description: 'Grilled red onion, lettuce & tomato',
            price: 97,
            image: require('../assets/categoryImages/burger.png')
        },
        {
            id: 2,
            name: 'Meaty Pizza',
            description: 'Bacon, cheddar cheese, grilled red onion,lettuce & tomato',
            price: 108,
            image: require('../assets/images/pizzaDish.png')
        }
        // {
        //     id: 3,
        //     name: '',
        //     description: '',
        //     price: 119,
        //     image: require('../assets/categoryImages/salad.png')
        // },
        // {
        //     id: 4,
        //     name: 'REVERSE CHEESE',
        //     description: 'Double patty, cheddar cheese, red onion,gherkins, smothered in sriracha cheese sauce & dried onion flakes',
        //     price: 149,
        //     image: require('../assets/images/pizzaDish.png')
        // },
    ]
}

export const pizzaMenu = {
    id: 1,
    title: 'Most Loved pizza',
    Burger: [
        {
            id: 1,
            name: 'ORIGINAL BBQ',
            description: 'Grilled red onion, lettuce & tomato',
            price: 97,
            image: require('../assets/images/pizzaDish.png')
        },
        {
            id: 2,
            name: 'CLASSIC CHEESE',
            description: 'Cheddar cheese, grilled red onion,lettuce & tomato',
            price: 108,
            image: require('../assets/categoryImages/burger.png')
        },
        {
            id: 3,
            name: 'CHEESE & BACON',
            description: 'Bacon, cheddar cheese, grilled red onion,lettuce & tomato',
            price: 119,
            image: require('../assets/categoryImages/salad.png')
        },
        {
            id: 4,
            name: 'REVERSE CHEESE',
            description: 'Double patty, cheddar cheese, red onion,gherkins, smothered in sriracha cheese sauce & dried onion flakes',
            price: 149,
            image: require('../assets/images/pizzaDish.png')
        },
    ]
}

export const featuredDishes = {
    id:1,
    dish: [
        {
            id: 1,
            name: 'Pizza',
            descr: 'cheezy garlic pizza',
            price: 110,
            image: require('../assets/categoryImages/pizza.png')
        },
        {
            id: 2,
            name: 'Burger ',
            descr: 'Grilled red onion, lettuce & tomato',
            price: 97,
            image: require('../assets/categoryImages/burger.png')
        },
        {
            id: 3,
            name: 'Salad',
            descr: 'Smoked salmon, baby leaf lettuce, cherry tomatoes, cucumber, feta, avo, with lemon & dill dressing',
            price: 165,
            image: require('../assets/categoryImages/salad.png')
        },
        {
            id: 4,
            name: 'Sushi',
            descr: 'spicy salmon, prawn, avo, dill pickle & mayo with teriyaki sauce',
            price: 103,
            image: require('../assets/categoryImages/chinese.png')
        },
        {
            id: 5,
            name: 'Tuna',
            descr: 'spicy salmon, prawn, avo, dill pickle & mayo with teriyaki sauce',
            price: 155,
            image: require('../assets/categoryImages/chinese.png')
        },
        {
            id: 6,
            name: 'Chicken Wings',
            descr: 'spicy salmon, prawn, avo, dill pickle & mayo with teriyaki sauce',
            price: 89,
            image: require('../assets/restaurantImages/chicken-wings.png')
        },
    ]
}


