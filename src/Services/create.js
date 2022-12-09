import axios from "axios";
import { isLoggedIn } from "./auth";

export const createJsonBody = (data) => {
  const relationship = {};
  relationship.field_image = data.image
    ? {
        data: {
          type: "file--file",
          id: data.image.id,
          meta: {
            alt: "json-image",
            title: data.image.attributes.filename,
            width: 400,
            height: 400,
          },
        },
      }
    : undefined;

  relationship.field_tags = data.category
    ? {
        data: {
          type: "taxonomy_term--tags",
          id: "2a3a8100-5c0a-4819-89b3-74daa0ca7ae0",
        },
      }
    : undefined;
  const body = {
    data: {
      type: "node--article",
      attributes: {
        title: data.title,
        body: {
          value: data.body,
          format: "basic_html",
          summary: data.summary,
        },
      },
      relationships: relationship,
    },
  };
  return body;
};

export const createArticle = async (data) => {
  const token = await isLoggedIn();
  if (token) {
    const imageData = await uploadImage(data.image);
    data.image = imageData;
    const body = createJsonBody(data);
    try {
      const res = await axios.post(
        "http://decoupled-drupal.co/jsonapi/node/article",
        body,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "application/vnd.api+json",
            Accept: "application/vnd.api+json",
          },
        }
      );
      return res.data.data;
    } catch (error) {
      return false;
    }
  }
};

export const uploadImage = async (image) => {
  const token = await isLoggedIn();
  if (token) {
    try {
      const res = await axios.post(
        "http://decoupled-drupal.co/jsonapi/node/article/field_image",
        image,
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
            "Content-Type": "application/octet-stream",
            Accept: "application/vnd.api+json",
            "Content-Disposition": `file; filename="${image.name}"`,
          },
        }
      );

      return res.data.data;
    } catch (error) {
      return false;
    }
  }
};
