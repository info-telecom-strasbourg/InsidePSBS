// const publications = [
//     {
//         title: "", // String
//         body: "", // String
//         date: "", // Timestamp
//         location: "", // String
//         event: "", // Event
//         author: {}, // User
//         medias: [
//             {
//                 type: "",
//                 url: "",
//             }
//         ],
//         reactions: [{ // GROUP BY emoji
//             emoji: "",
//             authors: [] // [USER]
//         }],
//         number_of_comments: 0,
//         comments: [ // pagination
//             {
//                 body: "",
//                 author: "",
//                 reactions: [{}],
//                 date: "",
//                 anwsers: [{}],
//             },
//         ]
//     }
// ]

const publications = [
    {
        id: 1,
        title: "Soirée fouaille",
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel libero ornare, ornare nibh vel, dictum nulla. Donec porttitor diam quis mi lacinia, condimentum cursus tortor feugiat. Quisque mollis fringilla urna eget laoreet. Aliquam augue leo, dapibus sed sapien vel, ornare volutpat nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In orci nulla, viverra quis ullamcorper in, posuere id erat. Nullam interdum sapien eget euismod varius. Maecenas dapibus justo ut odio rhoncus blandit. Suspendisse in arcu lectus. Pellentesque tristique finibus ligula facilisis feugiat. Vestibulum luctus, massa et sagittis placerat, neque justo cursus neque, at ornare metus metus nec quam.\n",
        date: "2023-06-22",
        location: "Fouaille",
        event: null,
        author: {
            name: "BDE",
            full_name: "Bureau des étudiants",
            logo_url: "https:\\/\\/fouaille.bde-tps.fr\\/storage\\/images\\/organization_logo\\/bureau_des_etudiants_400.png"
        },
        medias: [],
        reactions: [],
        number_of_comments: 0,
        comments: []
    }
]

export default publications;