import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import React, { useState } from "react";

const SongPreviewDialog = ({ song, onClose }) => {
  const [songDetails, setSongDetails] = useState({
    title: song?.title || "",
    description: song?.description || "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSongDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSaveChanges = () => {
    // Your logic to save the changes
    console.log("Song details saved:", songDetails);
    onClose(); // Close the dialog after saving
  };

  return (
    <Dialog open={!!song} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border-zinc-700">
        <DialogHeader>
          <DialogTitle>Preview Song</DialogTitle>
          <DialogDescription>Listen to the uploaded song before approval.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Display the song title and the audio player */}
          <p className="text-lg font-semibold">{song?.title}</p>
          {song?.filePath ? (
            <audio controls className="w-full" onError={(e) => console.log("Audio playback error:", e)}>
              <source src={song?.filePath} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          ) : (
            <p className="text-red-500">No audio file available</p>
          )}
        </div>

        {/* Add song details inputs */}
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Song Title</label>
            <Input
              value={songDetails.title}
              onChange={handleInputChange}
              name="title"
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter song title"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Song Description</label>
            <Input
              value={songDetails.description}
              onChange={handleInputChange}
              name="description"
              className="bg-zinc-800 border-zinc-700"
              placeholder="Enter song description"
            />
          </div>
        </div>

        {/* Dialog Footer with Save and Close buttons */}
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button
            className="bg-green-500"
            onClick={handleSaveChanges}
            disabled={!songDetails.title || !songDetails.description} // Disable Save if no title or description
          >
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SongPreviewDialog;
