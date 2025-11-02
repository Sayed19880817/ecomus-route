// "use client";

// import LoadingComponent from "@/app/(Pages)/(main)/account/loading";
// import {
//   Button,
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { updateUserData } from "@/helpers/user/updateUserData";
// import { Edit, Save, X } from "lucide-react";
// import { useSession } from "next-auth/react";
// import React, { useEffect, useState } from "react";

// interface UserProfile {
//   name: string | undefined;
//   email: string | undefined;
//   phone: string;
// }

// export default function ProfileDataEditor() {
//   const { data: userData } = useSession();
//   const [isEditing, setIsEditing] = useState(false);
//   const [profile, setProfile] = useState<UserProfile>({
//     name: userData?.user.name,
//     email: userData?.user.email,
//     phone: "01012345678",
//   });
//   const [editedProfile, setEditedProfile] = useState(profile);

//   const handleSave = async () => {
//     // await updateUserData(
//     //   editedProfile.name,
//     //   editedProfile.email,
//     //   editedProfile.phone
//     // );
//     setProfile(editedProfile);
//     setIsEditing(false);
//   };

//   const handleCancel = () => {
//     setEditedProfile(profile);
//     setIsEditing(false);
//   };

//   useEffect(() => {
//     if (userData != null) {
//       setEditedProfile({
//         name: userData?.user.name,
//         email: userData?.user.email,
//         phone: "01012345678",
//       });
//       setProfile({
//         name: userData?.user.name,
//         email: userData?.user.email,
//         phone: "01012345678",
//       });
//     }
//   }, [userData]);

//   return (
//     <>
//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <div>
//             <CardTitle>Personal Information</CardTitle>
//             <CardDescription>Update your personal details</CardDescription>
//           </div>
//           {!isEditing ? (
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => setIsEditing(true)}
//               className="gap-2"
//             >
//               <Edit className="w-4 h-4" />
//               Edit
//             </Button>
//           ) : (
//             <div className="flex gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleCancel}
//                 className="gap-2"
//               >
//                 <X className="w-4 h-4" />
//                 Cancel
//               </Button>
//               <Button
//                 size="sm"
//                 onClick={handleSave}
//                 className="gap-2 bg-gradient-to-r from-blue-600 to-indigo-600"
//               >
//                 <Save className="w-4 h-4" />
//                 Save
//               </Button>
//             </div>
//           )}
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="space-y-2">
//               <Label htmlFor="name">Full Name</Label>
//               <Input
//                 id="name"
//                 value={editedProfile.name}
//                 onChange={(e) =>
//                   setEditedProfile({
//                     ...editedProfile,
//                     name: e.target.value,
//                   })
//                 }
//                 disabled={!isEditing}
//                 className="h-11"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="email">Email Address</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 value={editedProfile.email}
//                 onChange={(e) =>
//                   setEditedProfile({
//                     ...editedProfile,
//                     email: e.target.value,
//                   })
//                 }
//                 disabled={!isEditing}
//                 className="h-11"
//               />
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="phone">Phone Number</Label>
//               <Input
//                 id="phone"
//                 value={editedProfile.phone}
//                 onChange={(e) =>
//                   setEditedProfile({
//                     ...editedProfile,
//                     phone: e.target.value,
//                   })
//                 }
//                 disabled={!isEditing}
//                 className="h-11"
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </>
//   );
// }

"use client";

import { SingleDataOfUpdateUserData } from "@/actions/user/updateUserData.action";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserData } from "@/helpers/user/updateUserData";
import { Edit, Loader2, Save, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface UserProfile {
  name?: string | undefined;
  email?: string | undefined;
  phone?: string;
}

export default function ProfileDataEditor() {
  const { data: userData } = useSession();
  const [profile, setProfile] = useState<UserProfile>({
    name: userData?.user.name,
    email: userData?.user.email,
    phone: "01012345678",
  });
  const [editedProfile, setEditedProfile] = useState(profile);
  const [editingFields, setEditingFields] = useState<Set<string>>(new Set());
  const [isUpdating, setIsUpdating] = useState<boolean>(false);

  const hasChanges = editingFields.size > 0;

  const handleToggleEdit = (field: keyof UserProfile) => {
    setEditingFields((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(field)) {
        newSet.delete(field);
        // Reset the field value when canceling edit
        setEditedProfile((prevProfile) => ({
          ...prevProfile,
          [field]: profile[field],
        }));
      } else {
        newSet.add(field);
      }
      return newSet;
    });
  };

  const handleSave = async () => {
    setIsUpdating(true);
    const sendData: SingleDataOfUpdateUserData[] = [];
    editingFields.forEach((field) => {
      const obj: SingleDataOfUpdateUserData = {
        key: field,
        value: String(editedProfile[field as keyof UserProfile]),
      };
      sendData.push(obj);
    });

    // const obj = sendData.reduce<Record<string, string>>((acc, item) => {
    //   acc[item.key] = item.value;
    //   return acc;
    // }, {});
    // console.log(obj);

    // Uncomment when ready to use the update function
    const res = await updateUserData(sendData);
    if ("user" in res!) {
      setIsUpdating(false);
      await signOut();
    }

    setProfile(editedProfile);
    setEditingFields(new Set());
  };

  const handleCancelAll = () => {
    setEditedProfile(profile);
    setEditingFields(new Set());
  };

  useEffect(() => {
    document.title = "Account - Ecomus";
    if (userData != null) {
      const newProfile = {
        name: userData?.user.name,
        email: userData?.user.email,
        phone: "01012345678",
      };
      setProfile(newProfile);
      setEditedProfile(newProfile);
    }
  }, [userData]);

  const renderField = (
    field: keyof UserProfile,
    label: string,
    type: string = "text"
  ) => {
    const isEditing = editingFields.has(field);

    return (
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor={field}>{label}</Label>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleToggleEdit(field)}
            className="h-8 px-2 text-xs"
            disabled={isUpdating}
          >
            {isEditing ? (
              <>
                <X className="w-3 h-3 mr-1" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="w-3 h-3 mr-1" />
                Edit
              </>
            )}
          </Button>
        </div>
        <Input
          id={field}
          type={type}
          value={editedProfile[field]}
          onChange={(e) =>
            setEditedProfile({
              ...editedProfile,
              [field]: e.target.value,
            })
          }
          disabled={!isEditing || isUpdating}
          className="h-11"
        />
      </div>
    );
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Update your personal details</CardDescription>
          </div>
          {hasChanges && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelAll}
                disabled={isUpdating}
                className="gap-2"
              >
                <X className="w-4 h-4" />
                Cancel All
              </Button>
              <Button
                size="sm"
                disabled={isUpdating}
                onClick={handleSave}
                className="gap-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600"
              >
                {isUpdating ? (
                  <Loader2 className="animate-spin size-4" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Changes
              </Button>
            </div>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {renderField("name", "Full Name")}
            {renderField("email", "Email Address", "email")}
            {renderField("phone", "Phone Number")}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
