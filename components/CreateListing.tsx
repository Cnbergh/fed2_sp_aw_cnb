import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useRouter } from 'next/router';

const CreateListing = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [media, setMedia] = useState<string>('');
  const [endsAt, setEndsAt] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleTagsChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value.split(','));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('https://nf-api.onrender.com/api/v1/auction/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          title,
          description,
          tags,
          media: [media],
          endsAt
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create listing');
      }

      const data = await response.json();
      console.log('Listing created:', data);
      window.location.reload();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title (Required)"
        required
        className="input"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (Optional)"
        className="input"
      />
      <input
        type="text"
        value={media}
        onChange={(e) => setMedia(e.target.value)}
        placeholder="Media URL (Optional)"
        className="input"
      />
      <input
        type="text"
        value={tags.join(',')}
        onChange={handleTagsChange}
        placeholder="Tags (comma-separated) (Optional)"
        className="input"
      />
      <input
        type="datetime-local"
        value={endsAt}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setEndsAt(e.target.value)}
        required
        className="input"
      />
      <button type="submit" disabled={loading} className="btn">
        {loading ? 'Creating...' : 'Create Listing'}
      </button>
      {error && <p>Error: {error}</p>}
    </form>
  );
};

export default CreateListing;
