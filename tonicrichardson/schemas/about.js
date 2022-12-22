export default {
  name: "about",
  title: "About",
  type: "document",
  fields: [
    {
      name: "version",
      title: "Version",
      type: "string",
    },
    {
      name: "sections",
      title: "Section",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "title", title: "Title", type: "string" },
            { name: "right", title: "Content to Right", type: "boolean" },
            {
              name: "content",
              title: "Content",
              type: "array",
              of: [{ type: "block" }],
            },
            {
              name: "image",
              title: "Image",
              type: "image",
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
  ],
};
