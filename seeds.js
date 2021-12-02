const mongoose = require('mongoose');
const connectDB = require('./config/db');
const Campground = require('./models/Campground');
const cities = require('./seeds/cities');
const { descriptors, places } = require('./seeds/seedHelpers');


connectDB();

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i += 1) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20 + 10);
        const randomDescription = descriptors[Math.floor(Math.random() * descriptors.length)];
        const randomPlace = places[Math.floor(Math.random() * places.length)];
        const camp = new Campground({
            title: `${randomDescription} ${randomPlace}`,
            image: 'https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80',
            price,
            description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci veli',
            location: `${cities[random1000].city}, ${cities[random1000].state}`

        });
        await camp.save();
        console.log('Database has been seeded successfully');
    }
}

seedDB();

// const c = new Campground({
//     name: 'Camp Glory',
//     price: 500
// });

// c.save()
//     .then(c => console.log(c))
//     .catch(err => console.error(err.message));

// const seedCamps = [
//     {
//         title: 'Camp Wanahakalugi',
//         price: 200,
//         description: 'Deletes the first document that matches conditions from the collection.',
//         location: 'Oregon'
//     },
//     {
//         title: 'Camp Sunshine',
//         price: 300,
//         description: 'Deletes the first document that matches conditions from the collection.',
//         location: 'Wyoming'
//     },
//     {
//         title: 'Camp Phoenix',
//         price: 400,
//         description: 'Deletes the first document that matches conditions from the collection.',
//         location: 'California'
//     }
// ];

// Campground.insertMany(seedCamps)
//     .then(res => {
//         console.log(res)
//     })
//     .catch(err => console.error(err));
