import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { ListTodo, Music, Album } from "lucide-react";

const QueuingTabContent = () => {
  return (
    <Card className='bg-zinc-800/50 border-zinc-700/50'>
      <CardHeader>
        <div className='flex items-center justify-between'>
          <div>
            <CardTitle className='flex items-center gap-2'>
              <ListTodo className='h-5 w-5 text-violet-500' />
              Queuing
            </CardTitle>
            <CardDescription>Check these artists'musics</CardDescription>
          </div>
        </div>
      </CardHeader>

      <Tabs defaultValue='songs' className='space-y-6'>
        <TabsList className='p-1 bg-zinc-800/50 '>
          <TabsTrigger value='songs' className='data-[state=active]:bg-zinc-700 mx-3'>
            <Music className='mr-2 size-4 rounded-md ' />
            Songs
          </TabsTrigger>
          <TabsTrigger value='albums' className='data-[state=active]:bg-zinc-700 mx-3'>
            <Album className='mr-2 size-4' />
            Albums
          </TabsTrigger>
        </TabsList>

        <TabsContent value='songs'>
          {/* <SongsTabContent /> */}
          <h1>khanh</h1>
        </TabsContent>
        <TabsContent value='albums'>
          {/* <AlbumsTabContent /> */}
          <h1>chi</h1>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
export default QueuingTabContent;