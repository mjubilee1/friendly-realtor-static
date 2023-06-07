import { createClient } from 'contentful';

// Initialize Contentful client
export const client = createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID || 'v3wxyl8kvdve',
  accessToken:
    process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN ||
    'L7QcNsQyrn5kH5wn0jep7tZQBnIWeTJ2E6gJ8ViLX3k',
});

// Fetch entries from Contentful
export async function fetchEntries(contentType: string) {
  try {
    const response = await client.getEntries({
      content_type: contentType,
    });
    const entries = response.items;
    return entries;
  } catch (error) {
    console.log(`Error fetching ${contentType} entries:`, error);
    throw error;
  }
}

// Fetch single entry from Contentful by ID
export async function fetchEntryById(entryId: string) {
  try {
    const response = await client.getEntry(entryId);
    return response;
  } catch (error) {
    console.log(`Error fetching entry with ID ${entryId}:`, error);
    throw error;
  }
}

// Export the utility functions as an object
const ContentfulUtil = {
  client,
  fetchEntries,
  fetchEntryById,
};

export default ContentfulUtil;
