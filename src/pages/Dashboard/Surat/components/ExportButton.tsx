import { ExcelButton } from "@/components/Buttons/Buttons";
import { useExport } from "@/hooks/useApi";

export default function ExportButton() {
  const { mutate: doExport, isLoading: isLoadingExport } = useExport({
    name: "surats-export",
    endpoint: "surats/export",
    method: "POST",
    filename: `SURAT.xlsx`,
  });
  return (
    <ExcelButton
      title={`${isLoadingExport ? "Loading..." : "Export"}`}
      onClick={() => doExport({})}
    />
  );
}
