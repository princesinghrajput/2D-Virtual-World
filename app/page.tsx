import VirtualWorld from '@/components/VirtualWorld';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto py-8">
        <h1 className="text-4xl font-bold text-white text-center mb-8">Virtual World Adventure</h1>
        <VirtualWorld />
      </div>
    </main>
  );
}
