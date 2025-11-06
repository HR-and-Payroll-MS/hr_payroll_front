import { useMemo } from "react";
export function useFormattedTableData(rawData, bodyStructure) {
  return useMemo(() => {
    if (!Array.isArray(rawData) || !Array.isArray(bodyStructure)) return [];

    return rawData.map((item) => {
      return bodyStructure.map((id) => {
        switch (id) {
          case 4:
            return {
              avatar: item.avatar || "/pic/default-avatar.png",
              name: item.name || "Unknown User",
              email: item.email || "no-email@example.com",
            };
          case 3:
            return {
              avatar: item.avatar || "/pic/default-avatar.png",
              name: item.name || "Unknown User",
              email: item.email || "no-email@example.com",
            };
          case 1:
            return { time: item.phone || item.text || item.value || "" };
          case 2:
            return { country: item.country || "Unknown" };
          case 51:
            return { status: item.status || "N/A" };
          case 52:
            return { status: item.status || "Inactive" };
          case 61:
            return { icon: "/svg/date-2-svgrepo-com.svg" };
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