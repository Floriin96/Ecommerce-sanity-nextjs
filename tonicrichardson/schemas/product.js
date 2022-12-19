export default {
    name: 'product',
    title: "Product",
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotspot: true,
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
        },
        {
            title: 'Data adaugari',
            name: 'dataadaugari',
            type: 'date'
          },
        {
            name: 'sizes',
            title: 'Sizes',
            type: 'array',
            of: [{ type: "string" }],
            options: {
                list: [
                    { title: "XS", value: "XS" },
                    { title: "S", value: "S" },
                    { title: "M", value: "M" },
                    { title: "L", value: "L" },
                    { title: "XL", value: "XL" },
                    { title: "XXL", value: "XXL" },
                    { title: "36", value: "36" },
                    { title: "37", value: "37" },
                    { title: "38", value: "38" },
                    { title: "39", value: "39" },
                    { title: "40", value: "40" },
                    { title: "41", value: "41" },
                    { title: "42", value: "42" },
                    { title: "43", value: "43" },
                    { title: "44", value: "44" },
                    { title: "45", value: "45" },


                ]

            }
        },
    ],
}
