import Button from "@/base-components/Button";
import Lucide from "@/base-components/Lucide";

export function BackButton(props: any) {
  return (
    <Button variant="pending" size="sm" {...props}>
      <Lucide icon="ArrowLeft" className="mr-2" />
      Kembali
    </Button>
  );
}

export function BatalkanButton(props: any) {
  return (
    <Button variant="pending" size="sm" className="mr-2" {...props}>
      <Lucide icon="ArrowLeft" className="mr-2" />
      Batalkan
    </Button>
  );
}

export function SimpanButton(props: any) {
  const { isLoading, ...newProps} = props
  return (
    <Button variant="primary" size="sm" {...newProps} disabled={isLoading}>
      <Lucide icon="Save" className="mr-2" />
      {isLoading ? "Loading..." : "Simpan"}
    </Button>
  );
}

export function AddButton(props: any) {
  const { title, ...newProps } = props;
  return (
    <Button variant="primary" size="sm" {...newProps}>
      <Lucide icon="Plus" className="mr-2" />
      {title}
    </Button>
  );
}

export function ExcelButton(props: any) {
  return (
    <Button variant="facebook" size="sm" {...props}>
      <Lucide icon="Table" className="mr-2" />
      Export Excel
    </Button>
  );
}

export function PengaturanButton(props: any) {
  return (
    <Button variant="warning" size="sm" {...props}>
      <Lucide icon="Settings" className="mr-2" />
      Pengaturan
    </Button>
  );
}

export function PrintTableButton(props: any) {
  return (
    <Tooltip message="Cetak">
      <Button
        variant="linkedin"
        size="xs"
        className="p-1 text-xs m-1"
        {...props}
      >
        <Lucide icon="Printer" className="h-4 w-4" />
      </Button>
    </Tooltip>
  );
}

export function DetailTableButton(props: any) {
  return (
    <Tooltip message="Detail">
      <Button
        variant="primary"
        size="xs"
        className="p-1 text-xs m-1"
        {...props}
      >
        <Lucide icon="Eye" className="h-4 w-4" />
      </Button>
    </Tooltip>
  );
}

export function EditTableButton(props: any) {
  return (
    <Tooltip message="Edit">
      <Button
        variant="warning"
        size="xs"
        className="p-1 text-xs m-1"
        {...props}
      >
        <Lucide icon="Pencil" className="h-4 w-4" />
      </Button>
    </Tooltip>
  );
}

export function DeleteTableButton(props: any) {
  return (
    <Tooltip message="Hapus">
      <Button variant="danger" size="xs" className="p-1 text-xs m-1" {...props}>
        <Lucide icon="X" className="h-4 w-4" />
      </Button>
    </Tooltip>
  );
}

export function DeleteButton(props: any) {
  return (
    <Button variant="danger" size="sm" {...props}>
      <Lucide icon="Trash2" className="mr-2 " />
      Hapus
    </Button>
  );
}


export default function Tooltip({
  message,
  children,
}: {
  message: string;
  children: any;
}) {
  return (
    <div className="group relative flex ">
      {children}
      <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 z-30">
        {message}
      </span>
    </div>
  );
}
