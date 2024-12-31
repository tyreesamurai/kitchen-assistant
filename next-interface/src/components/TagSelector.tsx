"use client";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/extension/multi-select";
import { useState, useEffect } from "react";
import api from "@/lib/api";

const TagSelector = () => {
  const [value, setValue] = useState<string[]>([]);
  const [tags, setTags] = useState<
    { id: number; name: string; description: string | null }[]
  >([]);

  useEffect(() => {
    // Fetch tags once when the component mounts
    const fetchTags = async () => {
      try {
        const tags = await api.tags.fetchAll();
        setTags(tags);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    fetchTags();
  }, []); // Empty dependency array ensures this runs only once

  return (
    <MultiSelector
      values={value}
      onValuesChange={setValue}
      className="max-w-xs"
    >
      <MultiSelectorTrigger>
        <MultiSelectorInput placeholder="Select tags" />
      </MultiSelectorTrigger>
      <MultiSelectorContent>
        <MultiSelectorList>
          {tags.map((tag) => (
            <MultiSelectorItem key={tag.id} value={tag.name}>
              {tag.name}
            </MultiSelectorItem>
          ))}
        </MultiSelectorList>
      </MultiSelectorContent>
    </MultiSelector>
  );
};

export default TagSelector;

// const TagSelector = () => {
//   const [value, setValue] = useState<string[]>([]);
//   const [tags, setTags] = useState<
//     { id: number; name: string; description: string | null }[]
//   >([]);
//   const [inputValue, setInputValue] = useState<string>(""); // Track the current input value
//
//   useEffect(() => {
//     const fetchTags = async () => {
//       try {
//         const tags = await api.tags.fetchAll();
//         setTags(tags);
//       } catch (error) {
//         console.error("Failed to fetch tags:", error);
//       }
//     };
//
//     fetchTags();
//   }, []);
//
//   const handleAddNewTag = () => {
//     const newTag = inputValue.trim();
//     if (!newTag) return;
//
//     // Add the new tag to the selected values
//     setValue((prev) => [...prev, newTag]);
//
//     // Optionally add it to the tags list
//     setTags((prev) => [
//       ...prev,
//       { id: -1, name: newTag, description: null }, // Placeholder ID
//     ]);
//
//     // Clear the input
//     setInputValue("");
//   };
//
//   return (
//     <MultiSelector values={value} onValuesChange={setValue}>
//       <MultiSelectorTrigger>
//         <MultiSelectorInput
//           placeholder="Select tags"
//           value={inputValue}
//           onChange={(e: React.ElementRef<typeof CommandPrimitive.Input>) => setInputValue(e.target.value)} // Update input value
//         />
//       </MultiSelectorTrigger>
//       <MultiSelectorContent>
//         <MultiSelectorList>
//           {tags
//             .filter((tag) =>
//               tag.name.toLowerCase().includes(inputValue.toLowerCase())
//             )
//             .map((tag) => (
//               <MultiSelectorItem key={tag.id} value={tag.name}>
//                 {tag.name}
//               </MultiSelectorItem>
//             ))}
//           {/* Always show the "Add new tag" option */}
//           <MultiSelectorItem
//             key="add-new"
//             value="add-new-tag"
//             onClick={handleAddNewTag} // Handle adding the new tag
//           >
//             Add new tag: &quot;{inputValue}&quot;
//           </MultiSelectorItem>
//         </MultiSelectorList>
//       </MultiSelectorContent>
//     </MultiSelector>
//   );
// };
//
// export default TagSelector;
