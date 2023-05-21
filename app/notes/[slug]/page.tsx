'use client';

import { useEffect, useState, useTransition } from 'react';
import { FormControl, FormLabel, Input, Textarea, Button } from '../../common/chakra';
import { useRouter } from 'next/navigation';
import { SingleDatepicker } from 'chakra-dayzed-datepicker';
import dayjs from 'dayjs';

interface DataType {
  id: number;
  title: string;
  comment: string;
  date: Date;
  createdAt: string;
}

export default function EditNote({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const [date, setDate] = useState(new Date());
  const [id, setId] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await await fetch(`/api/notes/${params.slug}`);
      const note: DataType = await response.json();
      setId(note.id);
      setDate(note.date);
      setTitle(note.title);
      setComment(note.comment);
    };
    fetchNotes();
  }, []);

  const handleSaveClick = async () => {
    setLoading(true);
    await fetch('/api/notes', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, date, title, comment }),
    });
    setLoading(false);
    router.push('/');
    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <div>
      <FormControl>
        <FormLabel>日付</FormLabel>
        <Input type="date" value={dayjs(date).format('YYYY-MM-DD')} disabled />
        <FormLabel>タイトル</FormLabel>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        <FormLabel>本文</FormLabel>
        <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        <Button
          type="submit"
          color="white"
          bg="orange.400"
          isLoading={loading || isPending}
          mt={4}
          onClick={handleSaveClick}
        >
          Update
        </Button>
      </FormControl>
    </div>
  );
}
