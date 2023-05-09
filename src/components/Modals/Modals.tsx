import { FieldValues, UseFormHandleSubmit } from "react-hook-form";
import Button from "../../base-components/Button";
import Dialog, { Size } from "../../base-components/Headless/Dialog";
import Lucide from "../../base-components/Lucide";
import {
  BackButton,
  BatalkanButton,
  DeleteButton,
  DeleteTableButton,
  SimpanButton,
} from "../Buttons/Buttons";

interface IDeleteModal {
  isModal: boolean;
  handleConfirm(): void;
  handleCancel(): void;
  title: string | undefined;
}

export function DeleteModal({
  isModal,
  handleConfirm,
  handleCancel,
  title,
}: IDeleteModal) {
  return (
    <Dialog open={isModal} onClose={handleCancel}>
      <Dialog.Panel>
        <div className="p-5 text-center">
          <Lucide
            icon="XCircle"
            className="w-16 h-16 mx-auto mt-3 text-danger"
          />
          <div className="mt-5 text-3xl">Konfirmasi Hapus?</div>
          <div className="mt-2 text-slate-500">
            Apakah kamu yakin ingin menghapus record {title} ? <br />
          </div>
        </div>
        <div className="px-5 pb-8 text-center">
          <BatalkanButton onClick={handleCancel} type="button" />
          <DeleteButton onClick={handleConfirm} />
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}

interface IBaseModal {
  title: string;
  isModal: boolean;
  children: JSX.Element;
  handleCancel(): void;
  submitCallback(data : any): void;
  handleSubmit: UseFormHandleSubmit<FieldValues>;
  size ?: Size
  isLoading ?: boolean;
}

export function BaseModal({
  title,
  isModal,
  handleCancel,
  submitCallback,
  handleSubmit,
  children,
  size,
  isLoading
}: IBaseModal) {

  return (
    <Dialog size={size}  open={isModal} onClose={handleCancel}>
      <form onSubmit={handleSubmit(submitCallback)}>
        <Dialog.Panel>
          <div className="p-5 text-left">
            <div className=" text-xl">{title}</div>
          </div>

          {children}
          <Dialog.Footer>
            <div className=" text-right">
              <BackButton
                type="button"
                onClick={handleCancel}
                className="mr-1"
              />
              <SimpanButton type="submit" isLoading={isLoading} />
            </div>
          </Dialog.Footer>
        </Dialog.Panel>
      </form>
    </Dialog>
  );
}


interface IDetailModal {
  title: string;
  isModal: boolean;
  children: JSX.Element;
  handleCancel(): void;
  size ?: Size
}


export function DetailModal({
  title,
  isModal,
  handleCancel,
  children,
  size
}: IDetailModal) {
  return (
    <Dialog size={size}  open={isModal} onClose={handleCancel}>
      
        <Dialog.Panel>
          <div className="p-5 text-left">
            <div className=" text-xl">{title}</div>
          </div>

          {children}
          <Dialog.Footer>
            <div className=" text-right">
              <BackButton
                type="button"
                onClick={handleCancel}
                className="mr-1"
              />
              
            </div>
          </Dialog.Footer>
        </Dialog.Panel>
      
    </Dialog>
  );
}