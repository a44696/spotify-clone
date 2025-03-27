import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ListTodo } from "lucide-react";
import SongsQueuingTable from "./SongsQueuingTable";
import SongPreviewDialog from "./SongPreviewDialog";
import { useState } from "react";

const QueuingTabContent = () => {
  const [selectedSong, setSelectedSong] = useState(null);
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

      <CardContent>
        <SongsQueuingTable onSelectSong={setSelectedSong}/>			
      </CardContent>

      {selectedSong && (
        console.log("Selected song:", selectedSong),
        <SongPreviewDialog song={selectedSong} onClose={() => setSelectedSong(null)} />
      )}
    </Card>
  );
};
export default QueuingTabContent;