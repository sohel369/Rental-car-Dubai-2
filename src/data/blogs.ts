export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    image: string;
    category: string;
    readTime: string;
}

export const blogsData: BlogPost[] = [
    {
        id: '1',
        title: 'Top 5 Luxury Cars to Rent in Dubai for a Special Occasion',
        excerpt: 'Discover the most prestigious vehicles that will make your Dubai experience truly unforgettable.',
        content: `Dubai is synonymous with luxury, and what better way to experience it than behind the wheel of a supercar? Whether it's a wedding, a business gala, or just a night out on the town, the right car makes all the difference...`,
        author: 'Ahmed Hassan',
        date: 'March 15, 2024',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80',
        category: 'Lifestyle',
        readTime: '5 min read'
    },
    {
        id: '2',
        title: 'The Ultimate Guide to Renting a Car in Dubai: Everything You Need to Know',
        excerpt: 'From international licenses to insurance policies, we cover all the essentials for tourists and residents.',
        content: `Renting a car in Dubai is straightforward, but there are important rules and regulations to keep in mind. In this guide, we'll walk you through the necessary documentation, age requirements, and how to choose the right insurance...`,
        author: 'Sarah J.',
        date: 'March 10, 2024',
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=800&q=80',
        category: 'Guide',
        readTime: '8 min read'
    },
    {
        id: '3',
        title: '7 Scenic Drives in the UAE You Must Experience',
        excerpt: 'Escape the city and explore the stunning landscapes of Jebel Hafeet, Hatta, and Khorfakkan.',
        content: `Beyond the skyscrapers of Dubai lie some of the most beautiful driving roads in the world. From the winding mountain paths of Ras Al Khaimah to the desert dunes of Liwa...`,
        author: 'Maria Garcia',
        date: 'March 5, 2024',
        image: 'https://images.unsplash.com/photo-1469033059733-0bd602730da4?w=800&q=80',
        category: 'Travel',
        readTime: '6 min read'
    },
    {
        id: '4',
        title: 'Why Renting an SUV is Perfect for Your Dubai Family Vacation',
        excerpt: 'Space, comfort, and safety are key when traveling with family in the UAE.',
        content: `Planning a family trip to Dubai? An SUV offers the perfect blend of luxury and practicality. With ample space for luggage and superior safety features, it's the ideal choice for exploring the city and beyond...`,
        author: 'John Smith',
        date: 'February 28, 2024',
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80',
        category: 'Family',
        readTime: '4 min read'
    }
];
