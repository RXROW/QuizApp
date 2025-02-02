import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Save } from "lucide-react";

const CreateNewSubject = () => {
  const [subjectData, setSubjectData] = useState({
    name: '',
    description: '',
    imageUrl: '' // Optional: If you want to add an icon/image for the subject
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subject Data:', subjectData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-20">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Subject</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subject Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg"
                value={subjectData.name}
                onChange={(e) => setSubjectData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter subject name"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                className="w-full p-2 border rounded-lg"
                rows={3}
                value={subjectData.description}
                onChange={(e) => setSubjectData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter subject description"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Image URL (Optional)</label>
              <input
                type="url"
                className="w-full p-2 border rounded-lg"
                value={subjectData.imageUrl}
                onChange={(e) => setSubjectData(prev => ({ ...prev, imageUrl: e.target.value }))}
                placeholder="Enter image URL"
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                className="px-6 py-2 border rounded-lg hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Subject
              </button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default CreateNewSubject;