import { useMemo } from "react";
export function useFormattedTableData(rawData, bodyStructure) {
  return useMemo(() => {
    if (!Array.isArray(rawData) || !Array.isArray(bodyStructure)) return [];

    return rawData.map((item) => {
      return bodyStructure.map((id) => {
        switch (id) {
          // 4️⃣ Avatar + Name + Email
          case 4:
            return {
              avatar: item.avatar || "/pic/default-avatar.png",
              name: item.name || "Unknown User",
              email: item.email || "no-email@example.com",
            };

          // 1️⃣ Plain text (time)
          case 1:
            return { time: item.phone || item.text || item.value || "" };

          // 2️⃣ Country
          case 2:
            return { country: item.country || "Unknown" };

          // 3️⃣ Generic text
          case 3:
            return { text: item.name || item.title || item.text || "" };

          // 5️⃣1 - Plain status
          case 51:
            return { status: item.status || "N/A" };

          // 5️⃣2 - Colored badge status
          case 52:
            return { status: item.status || "Inactive" };

          // 6️⃣1 - Single icon (e.g. edit or view)
          case 61:
            return { icon: "/svg/date-2-svgrepo-com.svg" };

          // 6️⃣2 - Two icons (e.g. edit + delete)
          case 62:
            return {
              icons: [
                { icon: "/svg/date-2-svgrepo-com.svg" },
                { icon: "/svg/delete-svgrepo-com.svg" },
              ],
            };

          default:
            return { text: "" };
        }
      });
    });
  }, [rawData, bodyStructure]);
}