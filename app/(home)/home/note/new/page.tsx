import NoteForm from '@/components/NoteFrom';
import { getNextAuthServerSession } from '@/libs/getNextAuthServerSession';
import { redirect } from 'next/navigation';

export default async function CreateNote() {
  const session = await getNextAuthServerSession();
  if (!session?.user?.id) redirect('/');
  return (
    <div>
      <NoteForm userId={session?.user?.id} />
    </div>
  );
}
