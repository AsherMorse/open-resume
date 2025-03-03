import { BaseForm } from "components/ResumeForm/Form";
import { Input, Textarea } from "components/ResumeForm/Form/InputGroup";
import { useAppDispatch, useAppSelector } from "lib/redux/hooks";
import { changeProfile, selectProfile } from "lib/redux/resumeSlice";
import { ResumeProfile } from "lib/redux/types";
import { useState } from "react";

export const ProfileForm = () => {
  const profile = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();
  const { name, email, phone, urls, summary, location } = profile;

  const [newUrlName, setNewUrlName] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleProfileChange = (field: keyof ResumeProfile, value: string) => {
    dispatch(changeProfile({ field, value }));
  };

  const handleAddUrl = () => {
    if (newUrl.trim()) {
      const updatedUrls = [...urls, { name: newUrlName.trim() || "Website", url: newUrl.trim() }];
      dispatch(changeProfile({ field: "urls", value: updatedUrls }));
      setNewUrlName("");
      setNewUrl("");
    }
  };

  const handleRemoveUrl = (index: number) => {
    const updatedUrls = [...urls];
    updatedUrls.splice(index, 1);
    dispatch(changeProfile({ field: "urls", value: updatedUrls }));
  };

  const handleUpdateUrlName = (index: number, name: string) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = { ...updatedUrls[index], name };
    dispatch(changeProfile({ field: "urls", value: updatedUrls }));
  };

  const handleUpdateUrl = (index: number, url: string) => {
    const updatedUrls = [...urls];
    updatedUrls[index] = { ...updatedUrls[index], url };
    dispatch(changeProfile({ field: "urls", value: updatedUrls }));
  };

  return (
    <BaseForm>
      <div className="grid grid-cols-6 gap-3">
        <Input
          label="Name"
          labelClassName="col-span-full"
          name="name"
          placeholder="Sal Khan"
          value={name}
          onChange={handleProfileChange}
        />
        <Textarea
          label="Objective"
          labelClassName="col-span-full"
          name="summary"
          placeholder="Entrepreneur and educator obsessed with making education free for anyone"
          value={summary}
          onChange={handleProfileChange}
        />
        <Input
          label="Email"
          labelClassName="col-span-4"
          name="email"
          placeholder="hello@khanacademy.org"
          value={email}
          onChange={handleProfileChange}
        />
        <Input
          label="Phone"
          labelClassName="col-span-2"
          name="phone"
          placeholder="(123)456-7890"
          value={phone}
          onChange={handleProfileChange}
        />

        <div className="col-span-full">
          <label className="block text-sm font-medium">Websites</label>

          {urls.map((urlItem, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <input
                type="text"
                placeholder="Label (e.g. LinkedIn)"
                value={urlItem.name}
                onChange={(e) => handleUpdateUrlName(index, e.target.value)}
                className="flex-1 mt-1 px-3 py-2 block rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-base"
              />
              <input
                type="text"
                placeholder="URL (e.g. linkedin.com/in/profile)"
                value={urlItem.url}
                onChange={(e) => handleUpdateUrl(index, e.target.value)}
                className="flex-2 mt-1 px-3 py-2 block rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-base"
              />
              <button
                type="button"
                onClick={() => handleRemoveUrl(index)}
                className="px-2 py-1 text-red-600 rounded hover:bg-red-100"
              >
                ✕
              </button>
            </div>
          ))}

          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Label (e.g. LinkedIn)"
              value={newUrlName}
              onChange={(e) => setNewUrlName(e.target.value)}
              className="flex-1 mt-1 px-3 py-2 block rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-base"
            />
            <input
              type="text"
              placeholder="URL (e.g. linkedin.com/in/profile)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="flex-2 mt-1 px-3 py-2 block rounded-md border border-gray-300 text-gray-900 shadow-sm outline-none font-normal text-base"
            />
            <button
              type="button"
              onClick={handleAddUrl}
              className="px-2 py-1 text-green-600 rounded hover:bg-green-100"
            >
              +
            </button>
          </div>
        </div>

        <Input
          label="Location"
          labelClassName="col-span-2"
          name="location"
          placeholder="NYC, NY"
          value={location}
          onChange={handleProfileChange}
        />
      </div>
    </BaseForm>
  );
};
