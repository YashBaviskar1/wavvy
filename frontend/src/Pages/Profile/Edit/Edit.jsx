import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { APIURL } from "@/url.config";

export function ProfileEdit({ onSave, onCancel }) {
  const [profile, setProfile] = useState(null); // State to hold profile data
  const [editedProfile, setEditedProfile] = useState(null); // State for editable profile
  const [previewImage, setPreviewImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false); // Saving state
  const businessId = localStorage.getItem("businessId");
  const url = `${APIURL}/api/business/${businessId}/`; // Replace with your API endpoint

  // Prefetch the profile details
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setProfile(data);
          setEditedProfile(data); // Prefill form with fetched data
          setPreviewImage(data.profile_img); // Set initial preview image
        } else {
          console.error("Failed to fetch profile data");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfile();
  }, [url]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setEditedProfile((prev) => ({ ...prev, profile_img: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedProfile),
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        onSave(updatedProfile); // Pass updated data back to parent
      } else {
        console.error("Failed to update profile:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (!profile) {
    return <div>Loading...</div>; // Loading state while fetching profile
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center space-x-4">
        <Avatar className="w-20 h-20">
          <AvatarImage
            src={previewImage || undefined}
            alt={editedProfile.owner_name}
          />
          <AvatarFallback>{editedProfile.owner_name.charAt(0)}</AvatarFallback>
        </Avatar>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="owner_name">Owner Name</Label>
          <Input
            id="owner_name"
            name="owner_name"
            value={editedProfile.owner_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="salon_name">Salon Name</Label>
          <Input
            id="salon_name"
            name="salon_name"
            value={editedProfile.salon_name}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="phone_number">Phone Number</Label>
          <Input
            id="phone_number"
            name="phone_number"
            value={editedProfile.phone_number}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="owner_email">Email</Label>
          <Input
            id="owner_email"
            name="owner_email"
            type="email"
            value={editedProfile.owner_email}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="gst">GST</Label>
          <Input
            id="gst"
            name="gst"
            value={editedProfile.gst}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="salon_description">Salon Description</Label>
        <Textarea
          id="salon_description"
          name="salon_description"
          value={editedProfile.salon_description}
          onChange={handleChange}
          rows={4}
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
